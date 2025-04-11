import { WishListProdutType } from "@/app/product/[productId]/ProductDetails";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";


type WishListContextType = {
    wishListProducts: WishListProdutType[] | null;
    handleAddProductToWishList: (product: WishListProdutType) => void;
    handleRemoveProductFromWishList: (product: WishListProdutType) => void;
    handleClearWishList: () => void;
}

export const WishListContext = createContext<WishListContextType | null>(null)

interface Props{
    [propName: string]: any;
}

export const WishListContextProvider = (props: Props) => {
    const [wishListProducts, setWishListProducts] = useState<WishListProdutType[] | null>(null)

    useEffect(() => {
        const wishListItems: any = localStorage.getItem('eShopWishListItems')
        const wProducts: WishListProdutType[] | null = JSON.parse(wishListItems)

        setWishListProducts(wProducts);
    },[]);

    const handleAddProductToWishList = useCallback((product: WishListProdutType) => {
        setWishListProducts((prev) => {
            let updatedWishList;

            if(prev){
                updatedWishList = [...prev, product]
            }else{
                updatedWishList = [product]
            }

            toast.success('Adicionado a lista de desejos');

            localStorage.setItem('eShopWishListItems', JSON.stringify(updatedWishList))

            return updatedWishList
        })
    }, [])

    const handleRemoveProductFromWishList = useCallback((
        product: WishListProdutType
    ) => {
        if(wishListProducts){
            const filteredProducts = wishListProducts.filter((item) =>{
                return item.id !== product.id
            })

            setWishListProducts(filteredProducts)
            toast.error('Removido Da Lista de Desejos');

            localStorage.setItem('eShopWishListItems', JSON.stringify(filteredProducts))
        }

    }, [wishListProducts])

    const handleClearWishList = useCallback(() => {
        setWishListProducts(null)
        /* setCartTotalQty(0) */
        localStorage.setItem('eShopWishListItems', JSON.stringify(null))
    },[])

    const value = {
        wishListProducts,
        handleAddProductToWishList,
        handleRemoveProductFromWishList,
        handleClearWishList,
    }

    return <WishListContext.Provider value={value} {...props}/>
};

export const useWishList = () => {
    const context = useContext(WishListContext)

    if(context === null) {
        throw new Error("useWishList must be used within a CartContextProvider")
    }

    return context
};