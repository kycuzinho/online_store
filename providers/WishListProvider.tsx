'use client'

import { WishListContextProvider } from "@/hooks/useWishList";


interface WishListProviderProps{
    children: React.ReactNode
}

const WishListProvider: React.FC<WishListProviderProps> = ({children}) => {
    return ( 
        <WishListContextProvider>{children}</WishListContextProvider>
    );
}
 
export default WishListProvider;