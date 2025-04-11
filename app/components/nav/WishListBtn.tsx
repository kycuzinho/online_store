'use client'

import { useCart } from "@/hooks/useCart";
import { useRouter } from "next/navigation";
import { FaListAlt } from "react-icons/fa";

const WishListBtn = () => {
    const {cartTotalQty} = useCart();

    const router = useRouter()

    return ( <div className="relative cursor-pointer" onClick={() => router.push('/wishlist')}>
        <div className="text-3xl">
        <FaListAlt />
        </div>
        <span className="
        absolute 
        top-[-10px] 
        right-[-10px]
        bg-slate-700
        text-white
        h-6
        w-6
        rounded-full
        flex
        items-center
        justify-center
        text-sm
        ">
            {cartTotalQty}
        </span>
    </div> );
}
 
export default WishListBtn;