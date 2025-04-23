'use client'

import Button from "@/app/components/Button";
import Heading from "@/app/components/Heading";
import Input from "@/app/components/inputs/Input";
import { SafeUser } from "@/types";
import { Rating } from "@mui/material";
import { Order, Product, Review } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaBoltLightning } from "react-icons/fa6";

/* interface AddRatingProps{
    product: Product & {
        reviews: Review[]
    };
    user:(SafeUser & {
        orders: Order[];
    }) | null
} */

    interface AddRatingProps {
        product: Product & {
            reviews: Review[];
        };
        user: (Omit<SafeUser, "createdAt" | "updatedAt" | "emailVerified"> & {
            createdAt: Date;
            updatedAt: Date;
            emailVerified: Date | null;
            orders: Order[];
        }) | null;
    }

const AddRating:React.FC<AddRatingProps> = ({product, user}) => {

    const [isLoandig, setIsLoading] = useState(false)
    const router = useRouter()

    const {register, handleSubmit, setValue, reset, formState: {errors}} = useForm<FieldValues>({
        defaultValues:{
            comment: '',
            rating: 0
        }
    })

    const setCustomValue = (id:string, value:any) => {
        setValue(id, value, {
            shouldTouch: true,
            shouldDirty: true,
            shouldValidate: true,
        })
    }

    const onSubmit:SubmitHandler<FieldValues> = async(data) => {
        setIsLoading(true);
        if(data.rating === 0) {
            setIsLoading(false)
            return toast.error('A nota não pode ser 0')}
        const ratingData = {...data, userId: user?.id, product:product}

        axios.post('/api/rating', ratingData).then(() => {
            toast.success('Avaliação submetida');
            router.refresh();
            reset();
        }).catch((error) => {
            toast.error('Ocorreu um erro')        
        }).finally(() => {
            setIsLoading(false);
        })
    }

    if (!user || !product) return null

    const deliveredOrder = user?.orders.some(order => order.products.find(item => item.id === product.id) 
    && order.deliveryStatus === 'delivered')

    const userReview = product?.reviews.find(((review: Review) => {
        return review.userId === user.id
    }))

    if(userReview || !deliveredOrder) return null

    return ( 
        <div className="flex flex-col gap-2 max-w-[500px]">
            <Heading title="Avalie este produto"/>
            <Rating icon={< FaBoltLightning className="text-yellow-500 text-2xl"/>} 
                    emptyIcon = {<FaBoltLightning className="text-white text-2xl stroke-black stroke-[3px]"/>}
                    onChange={(event, newValue) => {
                setCustomValue('rating', newValue)
            }}/>

            <Input
            id="comment"
            label="Escreva aqui a sua opinião..."
            disabled = {isLoandig}
            register={register}
            errors={errors}
            required
            />

            <Button label={isLoandig ? 'A adicionar o comentário' : 'Avaliar'} onClick={handleSubmit(onSubmit)}/>
        </div>
     );
}
 
export default AddRating;