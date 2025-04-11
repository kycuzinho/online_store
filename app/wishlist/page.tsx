import { getCurrentUser } from "@/actions/getCurrentUser";
import Container from "../components/Container";
import CartClient from "../cart/CartClient";
import WishListClient from "./WishListClient";
/* import CartClient from "./CartClient"; */

const WishList = async() => {

    const currentUser = await getCurrentUser()

    return ( 
        <div className="pt-8">
            <Container>
                <WishListClient currentUser = {currentUser ?? null}/>
            </Container>
        </div>
     );
}
 
export default WishList;