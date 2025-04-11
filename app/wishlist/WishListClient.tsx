'use client'

import { useWishList } from "@/hooks/useWishList"
import { SafeUser } from "@/types"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { MdArrowBack } from "react-icons/md"
import Heading from "../components/Heading"
import ItemContent from "./ItemContent"
import Button from "../components/Button"

interface WishListClientProps {
    currentUser: SafeUser | null
}

const WishListClient: React.FC<WishListClientProps> = ({currentUser}) => {

    const {wishListProducts, handleClearWishList} = useWishList()

    const router = useRouter()

    if(!wishListProducts || wishListProducts.length === 0){
        return (
            <div className="
        flex
        flex-col
        items-center
        ">
            <div className="text-2xl">A lista de desejos está vazia</div>
            <div>
                <Link href={"/"} className="
                text-slate-500 
                flex
                items-center
                gap-1
                mt-2
                ">
                    <MdArrowBack/>
                    <span>Começar a procurar</span>
                </Link>
            </div>
        </div>
        )
    }

    return ( <div>
        <Heading title="Lista de Desejos" center/>
        <div className="grid
        grid-cols-3
        text-xs
        gap-4
        pb-2
        items-center
        mt-8
        ">
            <div className="justify-self-start">Produto</div>
            {<div className="justify-self-center">Preço</div>}
            {/* <div className="justify-self-center">Quantidade</div>
            <div className="justify-self-end">Total</div> */}
        </div>
        <div>
            {wishListProducts && wishListProducts.map((item) => {
                return <ItemContent key={item.id} item={item}/>;
            })}
        </div>
        <div className="border-t[1.5px] border-slate-200 py-4 flex justify-between gap-4">
            <div className="w-[100px]">
                <Button label="Limpar Lista de Desejos" onClick={() =>{handleClearWishList()}} small outline/>
            </div>
        </div>
    </div> );

}
 
export default WishListClient;