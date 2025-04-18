import Container from "@/app/components/Container";
import ManageProductsClient from "./ManageProductsClient";
import getProducts from "@/actions/getProducts";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/app/components/NullData";
import { redirect } from "next/navigation";

const ManageProducts = async() => {

    const products = await getProducts({category: null})
    const currentUser = await getCurrentUser()

    if(!currentUser || currentUser.role != 'ADMIN'){
        /* return <NullData title="Sem acesso"/> */
        
        redirect("/")
    }

    return (
        <div className="pt-8">
            <Container>
                <ManageProductsClient products = {products}/>
            </Container>  
        </div>
    );
}
 
export default ManageProducts;