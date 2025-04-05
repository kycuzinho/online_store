import prisma from '@/libs/prismadb'
import { MdDescription } from 'react-icons/md';

export interface IProductParams{
    category?: string | null;
    searchTerm?: string | null;
    minPrice?: number;
    maxPrice?: number;
}

const removeAccents = (str: string) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};


export default async function getProducts(params: IProductParams) {
    try {
      const { category, searchTerm, minPrice, maxPrice } = params;
      let query: any = {}
  
      if (category) {
        query.category = category;
      }
  
      const products = await prisma.product.findMany({
        where: { ...query },
        include: {
          reviews: {
            include: {
              user: true
            },
            orderBy: {
              createdDate: 'desc'
            }
          }
        }
      });
  
      let filteredProducts = products;
  
      if (minPrice !== undefined) {
        filteredProducts = filteredProducts.filter(p => p.price >= minPrice);
      }
  
      if (maxPrice !== undefined) {
        filteredProducts = filteredProducts.filter(p => p.price <= maxPrice);
      }
  
      if (!searchTerm) return filteredProducts;
  
      const normalizedSearchTerm = removeAccents(searchTerm.toLowerCase());
  
      return filteredProducts.filter(product =>
        removeAccents(product.name.toLowerCase()).includes(normalizedSearchTerm) ||
        removeAccents(product.description.toLowerCase()).includes(normalizedSearchTerm) ||
        removeAccents(product.category.toLowerCase()).includes(normalizedSearchTerm)
      );
    } catch (error: any) {
      throw new Error(error);
    }
  }
  