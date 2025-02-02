import Container from "@/app/components/Container";
import ProductDetails from "./ProductDetails";
import ListRating from "./ListRating";
import { products } from "@/utils/products";
import getProductById from "@/actions/getProductById";
import NullData from "@/app/components/NullData";
import AddRating from "./AddRating";
import { getCurrentUser } from "@/actions/getCurrentUser";

interface IPrams {
    productId?: string
}

const Product = async({params}: {params: IPrams}) => {

    const product = await getProductById(params);
    const user = await getCurrentUser();

    if(!product) return <NullData title="Este produto não existe"/>

    const transformedUser = user ? {
        ...user,
        createdAt: new Date(user.createdAt), // Convert to Date
        updatedAt: new Date(user.updatedAt), // Convert to Date
        emailVerified: user.emailVerified ? new Date(user.emailVerified) : null, // Convert to Date or null
    } : null;
    
    return ( 
        <div className="p-8">
            <Container>
                <ProductDetails product = {product}/>
                <div className="flex flex-col mt-20 gap-4">
                    <AddRating product={product} user={transformedUser}/>
                    <ListRating product={product}/>
                </div>
            </Container>
        </div>
     );
}
 
export default Product;