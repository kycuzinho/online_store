'use client'

import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/utils/formatPrice";
import { AddressElement, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Heading from "../components/Heading";
import Button from "../components/Button";

interface CheckoutFormProps{
    clientSecret: string,
    handleSetPaymentSuccess: (value: boolean) => void
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({clientSecret, handleSetPaymentSuccess}) => {

    const {cartTotalAmount, handleClearCart, handleSetPaymentIntent} = useCart()
    const stripe = useStripe()
    const elements = useElements()
    const [isLoading, setIsLoading] = useState(false)
    const formatedPrice = formatPrice(cartTotalAmount);

    useEffect(() => {
        if (!stripe){
            return
        }

        if (!clientSecret){
            return
        }
        handleSetPaymentSuccess(false)

    },[stripe]);

    const handleSubmit = async(e: React.FormEvent)=> {
        e.preventDefault();

        if(!stripe || !elements){
            return
        }

        setIsLoading(true)

        stripe.confirmPayment({
            elements,  redirect: 'if_required'
        }).then(result => {
            if(!result.error){
                toast.success('Checkout Success')

                handleClearCart()
                handleSetPaymentSuccess(true)
                handleSetPaymentIntent(null)
            }

            setIsLoading(false)
        })
    }

    return ( 
    <form onSubmit={handleSubmit} id="payment-form">
        <div className="mb-6">
            <Heading title="Insira as suas informações para completar a compra"/>
        </div>
        <h2 className="font-semibold mb-2">
            Morada
        </h2>
        <AddressElement options={{
            mode: 'shipping',
            allowedCountries:['PT']
        }}/>
        <h2 className="font-semibold mt-4 mb-2">Informação de pagamento</h2>
        <PaymentElement id="payment-element" options={{layout: "tabs"}}/>
        <div className="py-3 text-center text-slate-700 text-2xl font-bold">
            Total: {formatedPrice}
        </div>
        <Button label={isLoading ? 'A processar' : 'Pagar'} 
        disabled={isLoading || !stripe || !elements} 
        onClick={() => {}}/>
    </form>
    );
}
 
export default CheckoutForm;