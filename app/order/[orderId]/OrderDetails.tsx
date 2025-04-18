'use client'

import Heading from "@/app/components/Heading";
import Status from "@/app/components/Status";
import { formatPrice } from "@/utils/formatPrice";
import { Order } from "@prisma/client";
import moment from "moment";
import "moment/locale/pt"; 
import { useRouter } from "next/navigation";
import { MdAccessTimeFilled, MdDeliveryDining, MdDone } from "react-icons/md";
import OrderItem from "./OrderItem";

interface OrderDetailsProps{
    order: Order
}

const OrderDetails:React.FC<OrderDetailsProps> = ({order}) => {

    //const router = useRouter();
    moment.locale("pt");

    return ( 
        <div className="max-w-[1150px] m-auto flex flex-col gap-2">
            <div className="mt-8">
                <Heading title="Detalhes do Pedido"/>
            </div>
            <div>Order ID: {order.id}</div>
            <div>
                Preço total da compra: <span className="font-bold">{formatPrice(order.amount / 100)}</span>
            </div>
            <div className="flex gap-2 items-center">
                <div>Estado do pagamento:</div>
                <div>{order.status === 'pending'? 
                <Status 
                    text="Pendente" 
                    icon={MdAccessTimeFilled} 
                    bg="bg-slate-200"
                    color="text-slate-700"
                /> : order.status === 'complete'? 
                <Status 
                    text="Completo" 
                    icon={MdDone} 
                    bg="bg-green-200"
                    color="text-green-700"
                /> : <></>   
                }
                </div>
            </div>

            <div className="flex gap-2 items-center">
                <div>Estado de Entrega:</div>
                <div>{order.deliveryStatus === 'pending'? 
                <Status 
                    text="Pendente" 
                    icon={MdAccessTimeFilled} 
                    bg="bg-slate-200"
                    color="text-slate-700"
                /> : order.deliveryStatus === 'dispatched'? 
                <Status 
                    text="Despachado" 
                    icon={MdDeliveryDining} 
                    bg="bg-purple-200"
                    color="text-purple-700"
                /> : order.deliveryStatus === 'delivered'? 
                <Status 
                    text="Entregue" 
                    icon={MdDone} 
                    bg="bg-green-200"
                    color="text-green-700"
                /> : <></>   
                }
                </div>
            </div>
            <div>Data: {moment(order.createdAt).fromNow()}</div>
            <div>
                <h2 className="font-semibold mt-4 mb-2">Produtos</h2>
                <div className="grid grid-cols-5 text-xs gap-4 pb-2 items-center">
                    <div className="col-span-2 justify-self-start">Produto</div>
                    <div className="justify-self-center">Preço</div>
                    <div className="justify-self-center">Quantidade</div>
                    <div className="justify-self-end">Total</div>
                </div>
                {order.products && order.products.map(item => {
                    return <OrderItem key={item.id} item={item}></OrderItem>
                })}
            </div>
        </div>
     );
}
 
export default OrderDetails;