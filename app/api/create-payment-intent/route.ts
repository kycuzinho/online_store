import Stripe from "stripe";
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";
import { CartProductType } from "@/app/product/[productId]/ProductDetails";
import { getCurrentUser } from "@/actions/getCurrentUser";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2024-10-28.acacia",
});

const calculateOrderAmount = (items: CartProductType[]) => {
    const totalPrice = items.reduce((acc, item) => {
        const itemTotal = item.price * item.quantity;
        return acc + itemTotal;
    }, 0);

    return totalPrice;
};

export async function POST(request: Request) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const body = await request.json();
    const { items, payment_intent_id } = body;
    const total = calculateOrderAmount(items) * 100;
    const orderData = {
        user: { connect: { id: currentUser.id } },
        amount: total,
        currency: 'eur',
        status: "pending",
        deliveryStatus: "pending",
        paymentIntentId: payment_intent_id,
        products: items,
    };

    if (payment_intent_id) {
        const current_intent = await stripe.paymentIntents.retrieve(payment_intent_id);

        // Verificar o estado do PaymentIntent
        if (current_intent.status === 'succeeded') {
            // Se o PaymentIntent já foi concluído, cria um novo
            const newPaymentIntent = await stripe.paymentIntents.create({
                amount: total,
                currency: 'eur',
                automatic_payment_methods: { enabled: true },
            });

            // Criar novo pedido
            orderData.paymentIntentId = newPaymentIntent.id;
            await prisma.order.create({
                data: orderData,
            });

            return NextResponse.json({ paymentIntent: newPaymentIntent });
        } else {
            // Atualizar o PaymentIntent existente
            const updated_intent = await stripe.paymentIntents.update(payment_intent_id, {
                amount: total,
            });

            // Atualizar a compra no banco de dados
            const [existing_order, updated_order] = await Promise.all([
                prisma.order.findFirst({
                    where: { paymentIntentId: payment_intent_id },
                }),
                prisma.order.update({
                    where: { paymentIntentId: payment_intent_id },
                    data: {
                        amount: total,
                        products: items,
                    },
                }),
            ]);

            if (!existing_order) {
                return NextResponse.error();
            }

            return NextResponse.json({ paymentIntent: updated_intent });
        }
    } else {
        // Criar o PaymentIntent se não existir
        const paymentIntent = await stripe.paymentIntents.create({
            amount: total,
            currency: 'eur',
            automatic_payment_methods: { enabled: true },
        });

        // Criar o pedido de compra
        orderData.paymentIntentId = paymentIntent.id;

        await prisma.order.create({
            data: orderData,
        });

        return NextResponse.json({ paymentIntent });
    }
    return NextResponse.error();
}
