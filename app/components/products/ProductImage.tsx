'use client';

import { CartProductType, SelectedImgType } from "@/app/product/[productId]/ProductDetails";
import Image from "next/image";

interface ProductImageProps{
    cartProduct: CartProductType,
    product: any, // pra mudar mais tarde
    handleColorSelect: (value: SelectedImgType) => void
}

const ProductImage: React.FC<ProductImageProps> = ({
    cartProduct, 
    product,
    handleColorSelect,
    }
) => {
    return (
        <div className="
          grid
          sm:grid-cols-6
          grid-rows-1
          sm:grid-rows-1
          gap-2
          h-full
          max-h-[500px]
          min-h-[300px]
          sm:min-h-[400px]
        ">
          {/* Image Selector */}
          <div className="
            flex
            sm:flex-col
            flex-row
            items-center
            justify-start
            gap-4
            cursor-pointer
            border
            h-full
            max-h-full
            overflow-x-auto
            sm:overflow-x-hidden
            sm:overflow-y-auto
            sm:col-span-1
            row-span-1
            sm:row-span-full
            order-2
            sm:order-1
            p-2
            scroll-smooth
          ">
            {product.images.map((image: SelectedImgType) => (
              <div
                key={image.color}
                onClick={() => handleColorSelect(image)}
                className={`
                  relative
                  object-contain
                  w-[80px]
                  aspect-square
                  rounded
                  border-sky-900
                  shrink-0
                  ${cartProduct.selectedImg.color === image.color ? 'border-[1.5px]' : 'border-none'}
                `}
              >
                <Image src={image.image} alt={image.color} fill className="object-contain" />
              </div>
            ))}
          </div>

      
          {/* Main Image */}
          <div className="
            sm:col-span-5
            col-span-full
            row-span-1
            sm:row-span-full
            relative
            aspect-square
            order-1
            sm:order-2
          ">
            <Image
              fill
              src={cartProduct.selectedImg.image}
              alt={cartProduct.name}
              className="
                w-full
                h-full
                object-contain
                max-h-[500px]
                min-h-[300px]
                sm:min-h-[400px]
              "
            />
          </div>
        </div>
      );
      
}
 
export default ProductImage;