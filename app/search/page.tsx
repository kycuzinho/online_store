import getProducts, { IProductParams } from "@/actions/getProducts";
import Container from "../components/Container";
import NullData from "../components/NullData";
import ProductCard from "../components/products/ProductCard";
import ProductFilters from "./ProductFilters";


interface SearchPageProps {
  searchParams: IProductParams
}

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  
  const term = searchParams?.searchTerm || "";
  const products = await getProducts(searchParams)

  /* if(products.length === 0){
    return <NullData title="Nenhum produto encontrado"/>
  } */

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
        <h1 className="text-2xl font-bold mb-4">
          Resultados para: <span className="text-sky-600">{term}</span>
        </h1>
        <ProductFilters/>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl-grid-cols-7 2xl :grid-cols-6 gap-8">
          {shuffledProduct.map((product: any) =>{
            return <ProductCard data={product} key={product.id}/>
          })}
        </div>
      </Container>
    </div>
  );
};

export default SearchPage;
