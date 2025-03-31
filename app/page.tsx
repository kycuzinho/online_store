export const revalidate = 0;

import Container from "./components/Container";
import HomeBanner from "./components/HomeBanner";
import ProductCard from "./components/products/ProductCard";
import getProducts, { IProductParams } from "@/actions/getProducts";
import NullData from "./components/NullData";

interface HomeProps {
  searchParams: IProductParams
}

export default async function Home({searchParams}: HomeProps) {

  const products = await getProducts(searchParams)

  if(products.length === 0){
    return <NullData title="Nenhum produto encontrado"/>
  }

  function shuffleArray(array: any){
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i+1));
      [array[i], array[j]] = [array[j], array[i]];
    }

    return array
  }

  const shuffledProduct = shuffleArray(products)

  return (
    <div className="p-8">
      <Container>
        <div>
          {/* <HomeBanner/> */}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl-grid-cols-7 2xl :grid-cols-6 gap-8">
          {shuffledProduct.map((product: any) =>{
            return <ProductCard data={product} key={product.id}/>
          })}
        </div>
      </Container>
    </div>
  )
}
