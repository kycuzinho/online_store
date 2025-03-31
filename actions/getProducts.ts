import prisma from '@/libs/prismadb'
import { MdDescription } from 'react-icons/md';

export interface IProductParams{
    category?: string | null;
    searchTerm?: string | null;
}

const removeAccents = (str: string) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};


export default async function getProducts(params: IProductParams) {
    try {
        const { category, searchTerm } = params;
        let query: any = {}

        if (category) {
            query.category = category;
        }

        // Busca os produtos sem filtrar pelo searchTerm ainda
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

        if (!searchTerm) return products;

        // Normaliza o termo de pesquisa
        const normalizedSearchTerm = removeAccents(searchTerm.toLowerCase());

        // Filtra os produtos no backend
        return products.filter(product =>
            removeAccents(product.name.toLowerCase()).includes(normalizedSearchTerm) ||
            removeAccents(product.description.toLowerCase()).includes(normalizedSearchTerm) ||
            removeAccents(product.category.toLowerCase()).includes(normalizedSearchTerm)
        );
    } catch (error: any) {
        throw new Error(error);
    }
}
