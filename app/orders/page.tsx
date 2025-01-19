import Container from "@/app/components/Container";
import OrderClient from "./OrderClient";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/app/components/NullData";
import getOrdersByUserId from "@/actions/getOrdersByUserId";

const Orders = async() => {

    const currentUser = await getCurrentUser()

    if(!currentUser){
        return <NullData title="Sem acesso"/>
    }

    const orders = await getOrdersByUserId(currentUser.id)

    if(!orders){
        return <NullData title="Ainda não fez nenhuma compra."/>
    }    

    return (
        <div className="pt-8">
            <Container>
                <OrderClient orders = {orders}/>
            </Container>  
        </div>
    );
}
 
export default Orders;