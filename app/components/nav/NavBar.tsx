import Link from "next/link";
import Container from "../Container";

import { Redressed } from "next/font/google"; // não está a funcionar
import CartCount from "./CartCount";
import UserMenu from "./UserMenu";
import { getCurrentUser } from "@/actions/getCurrentUser";
import Categories from "./Categories";

const redressed = Redressed({ subsets: ['latin'], weight: ["400"] });// não está a funcionar

const NavBar = async () => {

    
    const currentUser = await getCurrentUser();

    return ( 
        <div 
        className="
        sticky
        top-0
        w-full
        bg-sky-200
        z-30
        shadow-sm
        ">
            <div className="py-4 border-b-[1px]">
                <Container>
                    <div className="
                    flex
                    items-center
                    justify-between
                    gap-3
                    md:gap-0
                    ">
                        <Link href="/" 
                            className="font-bold">
                            Online Store
                        </Link>
                        <div className="hidden md:block">Search</div>
                        <div className="flex items-center gap-8 md:gap-12">
                            <CartCount />
                            <div>
                                <UserMenu  currentUser={currentUser ?? null}/>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
            <Categories/>
        </div>
     );
}
 
export default NavBar;