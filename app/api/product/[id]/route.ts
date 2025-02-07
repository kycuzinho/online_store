import { getCurrentUser } from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const currentUser = await getCurrentUser();

    if (!currentUser) return NextResponse.error();

    if (currentUser.role !== "ADMIN") {
        return NextResponse.error();
    }

    try {
        // Excluir todos os reviews associados ao produto antes de removê-lo
        await prisma.review.deleteMany({
            where: { productId: params.id },
        });

        // Agora excluir o produto
        const product = await prisma.product.delete({
            where: { id: params.id },
        });

        return NextResponse.json(product);
    } catch (error) {
        console.error("Erro ao apagar produto:", error);
        return NextResponse.error();
    }
}