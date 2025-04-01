'use client'

import Avatar from "@/app/components/Avatar";
import Heading from "@/app/components/Heading";
import { Rating } from "@mui/material";
import moment from "moment";
import { FaBoltLightning } from "react-icons/fa6";

interface ListRatingProps{
    product: any
}

const ListRating:React.FC<ListRatingProps> = ({product}) => {

    if(product.reviews.length === 0) return null   

    return ( 
        <div>
            <Heading title="Avaliações"/>
            <div className="text-sm mt-2">
            {product.reviews && product.reviews.map((review: any) =>{
                return ( 
                <div key={review.id} className="max-w-[300px]">
                    <div className="flex gap-2 items-center">
                        <Avatar src={review?.user.image}/>
                        <div className="font-semibold">{review?.user.name}</div>
                        <div className="font-light">{moment(review.createdDate).fromNow()}</div>
                    </div>

                    <div className="mt-2">
                        <Rating value={review.rating} 
                        icon={<FaBoltLightning className="text-yellow-500 text-2xl"/>} 
                        emptyIcon = {<FaBoltLightning className="text-white text-2xl stroke-black stroke-[3px]"/>}
                        readOnly/>
                        <div className="ml-2">{review.comment}</div>
                        <hr className="mt-4 mb-4"/>
                    </div>
                </div>
                );
            })}
            </div>
        </div>
     );
}
 
export default ListRating;