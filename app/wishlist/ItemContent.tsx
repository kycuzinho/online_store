'use client'

import { formatPrice } from "@/utils/formatPrice";
import Link from "next/link";
import { truncateText } from "@/utils/truncateText";
import Image from "next/image";
import { CartProductType, WishListProdutType } from "../product/[productId]/ProductDetails";
import { useWishList } from "@/hooks/useWishList";
import Button from "../components/Button";
import { useCart } from "@/hooks/useCart";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface ItemContentProps{
    item: WishListProdutType
}

const ItemContent: React.FC<ItemContentProps> = ({item}) => {

    const router = useRouter()

    const {handleAddProductToCart, cartProducts} = useCart();
    const {handleRemoveProductFromWishList} = useWishList();

    const [isProductInCart, setIsProductInCart] = useState(false);

    const [cartProduct, setCartProduct] = useState<CartProductType>({
        id: item.id,
        name: item.name,
        description: item.description,
        category: item.category,
        brand: item.brand,
        selectedImg: { ...item.selectedImg },
        quantity: 1,
        price: item.price,
    });

    useEffect(() => {
        setIsProductInCart(false)

        if(cartProducts){
            const existingIndex = cartProducts.findIndex((p) => p.id === item.id) 
            
            if(existingIndex > -1){
                setIsProductInCart(true);
            }
        }
    }, [item.id, cartProducts])

    return ( 
    <div className="
    grid
    grid-cols-3
    text-xs
    md:text-sm
    gap-4
    border-t-[1.5px]
    border-slate-200
    py-4
    items-center
    ">
        <div className="
        justify-self-start
        flex
        gap-2
        md:gap-4
        ">
            <Link href={`/product/${item.id}`}>
                <div className="relative w-[70px] aspect-square"> 
                    <Image src={item.selectedImg.image} alt={item.name} fill className="object-contain"/>
                </div>
            </Link>
            <div className="flex flex-col justify-between">
                <Link href={`/product/${item.id}`}>
                {truncateText(item.name)}
                </Link>
                <div>{item.selectedImg.color}</div>
                <div className="w-[70px]">
                    <button className="text-slate-500 underline" onClick={() => handleRemoveProductFromWishList(item)}>
                        Remover
                    </button>
                </div>
            </div>
        </div>
        <div className="justify-self-center">{formatPrice(item.price)}</div>

        {isProductInCart ? 
        <div className="max-w-[200px] justify-self-end">
            <Button 
            label="Ver o carrinho" 
            outline 
            onClick={() => router.push("/cart")}/>
        </div>
        :
        <div className="max-w-[200px] justify-self-end">
            <Button 
                label="Adicionar ao Carrinho"
                onClick={()=> handleAddProductToCart(cartProduct)}
            />
        </div>
        }

        {/* <div className="justify-self-center max-w-[150px]">
            <Button 
            onClick={() => handleAddProductToCart(cartProduct)}
            label= "Adicionar ao Carrinho"/>
        </div> */}
        {/* <div className="justify-self-end font-semibold">
            {formatPrice(item.price * item.quantity)}
        </div> */}
    </div> 
);
}
 
export default ItemContent;