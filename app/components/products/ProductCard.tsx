'use client';
import { formatPrice } from "@/utils/formatPrice";
import { truncateText } from "@/utils/truncateText";
import { Rating } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaBoltLightning } from "react-icons/fa6";

interface ProductCardProp{
    data: any
    compact?: boolean;
}

const ProductCard: React.FC<ProductCardProp> = ({data, compact = false}) => {

    const router = useRouter();

    const productRating = data.reviews.reduce((acc: number, item: any) =>
        item.rating + acc, 0 ) / data.reviews.length

    return ( 
    <div 
    
    onClick={() => router.push(`/product/${data.id}`)}

    className="col-span-1 
    cursor-pointer
    border-[2px]
    border-slate-200 
    bg-slate-50
    rounded-xl
    p-2
    transition
    hover:scale-105
    text-center
    text-sm
    ">
        <div className="
        flex
        flex-col
        items-center
        w-full
        gap-1
        ">
            <div className="aspect-square 
            overflow-hidden 
            relative w-full
            ">
                <Image
                fill
                src={data.images[0].image}
                alt={data.name}
                className="w-full h-full object-contain"
                />

            </div>
            <div className="mt-4">
                {truncateText(data.name)}
            </div>
            <div>
                <Rating value={productRating}
                    icon={<FaBoltLightning className="text-yellow-500 text-2xl"/>} 
                    emptyIcon = {<FaBoltLightning className="text-white text-2xl stroke-black stroke-[3px]"/>} 
                    readOnly/>
            </div>
            <div>
                {data.reviews.length} Avaliações
            </div>
            <div className="font-semibold">
                {formatPrice(data.price)}
            </div>
        </div>
    </div> 
    );
}
    
export default ProductCard;