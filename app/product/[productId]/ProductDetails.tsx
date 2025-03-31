'use client';

import getProducts from "@/actions/getProducts";
import Button from "@/app/components/Button";
import ProductImage from "@/app/components/products/ProductImage";
import SetColor from "@/app/components/products/SetColor";
import SetQuantity from "@/app/components/products/SetQuantity";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/utils/formatPrice";
import { Rating } from "@mui/material";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { MdCheckCircle } from "react-icons/md";
import Container from "@/app/components/Container";
import ProductCard from "@/app/components/products/ProductCard";

interface ProductDetailsProps{
    product: any
    suggestedProducts?: any[];
}

export type CartProductType = {
    id: string,
    name: string,
    description: string,
    category: string,
    brand: string,
    selectedImg: SelectedImgType,
    quantity: number,
    price: number
}

export type SelectedImgType = {
    color: string,
    colorCode: string,
    image: string,
}

const Horizontal = () => {
    return <hr className="w-[30%] my-2"/>
}

const ProductDetails: React.FC<ProductDetailsProps> = ({product}) => {

    const {handleAddProductToCart, cartProducts} = useCart();

    const [isProductInCart, setIsProductInCart] = useState(false);
    
    const [cartProduct, setCardProduct] = useState<CartProductType>({
        id: product.id,
        name: product.name,
        description: product.description,
        category: product.category,
        brand: product.brand,
        selectedImg: {...product.images[0]},
        quantity: 1,
        price: product.price,
    });

    const router = useRouter();

    useEffect(() => {
        setIsProductInCart(false)

        if(cartProducts){
            const existingIndex = cartProducts.findIndex((item) => item.id === product.id) 
            
            if(existingIndex > -1){
                setIsProductInCart(true);
            }
        }
    }, [product.id, cartProducts])

    const productRating = product.reviews.reduce((acc: number, item: any) =>
        item.rating + acc, 0 ) / product.reviews.length
 
    const handleColorSelect = useCallback((value: SelectedImgType) => {
        setCardProduct((prev) => {
            return {...prev, selectedImg: value}
        })
    },[])

    const handleQtyIncrease = useCallback(() => {
        if(cartProduct.quantity === 99){
            return;
        }
        setCardProduct((prev) => {
            return { ...prev, quantity: prev.quantity + 1};
        });

    }, [cartProduct.quantity])
    
    const handleQtyDecrease = useCallback(() => {
        if(cartProduct.quantity === 1){
            return;
        }

        setCardProduct((prev) => {
            return { ...prev, quantity: prev.quantity - 1};
        });

    }, [cartProduct.quantity])

    const [suggestedProducts, setSuggestedProducts] = useState<any[]>([]);

    useEffect(() => {
        const fetchSuggestedProducts = async () => {
          try {
            const res = await fetch(
              `/api/suggested-products?category=${product.category}&excludeId=${product.id}`
            );
            const data = await res.json();
            setSuggestedProducts(data);
          } catch (error) {
            console.error("Error:", error);
          }
        };
      
        fetchSuggestedProducts();
      }, [product.category, product.id]);

    function shuffleArray(array: any[]) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    return ( 
        <div className="grid grid-cols-1  md:grid-cols-2 gap-12">
            <ProductImage cartProduct={cartProduct} product={product} handleColorSelect={handleColorSelect}/>
            <div className="flex flex-col gap-1 text-slate-500 text-sm">
                <h2 className="text-3xl font-medium text-slate-700">{product.name}</h2>
                <div className="flex items-center gap-2">
                    <Rating value={productRating} readOnly/>
                    <div>{product.reviews.length} reviews</div>
                </div>
                <Horizontal/>
                <div className="text-justify">{product.description}</div>
                <Horizontal/>

                <div>
                    <span className="font-semibold">Preço:</span> {formatPrice(product.price)}
                </div>
                <Horizontal/>

                <div>
                    <span className="font-semibold">Categoria:</span> {product.category}
                </div>
                <div>
                    <span className="font-semibold">Marca:</span> {product.brand}
                </div>
                <div className={product.inStock ? 'text-teal-400' : 'text-rose-600'}>
                    {product.inStock ? 'Disponível' : 'Indisponível'}
                </div>
                <Horizontal/>
                
                {isProductInCart ? <>

                    <p className="mb-2 text-slate-500 flex items-center gap-1">
                        <MdCheckCircle className="text-teal-400" size={20}/>
                        <span>Adicionado ao Carrinho</span>
                    </p>

                    <div className="max-w-[300px]">
                        <Button label="Ver o Carrinho" outline onClick={() => router.push("/cart")}/>
                    </div>

                    </> : <>
                    <SetColor 
                    cartProduct = {cartProduct} 
                    images = {product.images}
                    handleColorSelect={handleColorSelect}
                    />
                    <Horizontal/>
                    <SetQuantity 
                    cartProduct={cartProduct}
                    handleQtyIncrease={handleQtyIncrease}
                    handleQtyDecrease={handleQtyDecrease}
                    />
                    <Horizontal/>
                    <div className="max-w-[300px]">
                        <Button 
                        label="Adicionar ao Carrinho"
                        onClick={()=> handleAddProductToCart(cartProduct)}
                        />
                    </div>
                </>}
            </div>
            <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-6">Você também pode gostar</h2>
                <div className="relative">
                    <div className="flex space-x-4 overflow-x-auto pb-4 -mx-4 px-4">
                    {suggestedProducts.map((product) => (
                        <div key={product.id} className="flex-none w-[45%] sm:w-[30%] lg:w-[15%]">
                        <ProductCard data={product}/>
                        </div>
                    ))}
                    </div>
                </div>
            </div>
        </div>
        
     );
};
 
export default ProductDetails;
