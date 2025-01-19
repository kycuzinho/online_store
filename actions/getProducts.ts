import prisma from '@/libs/prismadb'
import { MdDescription } from 'react-icons/md';

export interface IProductParams{
    category?: string | null;
    searchTerm?: string | null;
}

export default async function getProducts(params:IProductParams) {
    try{
        const {category, searchTerm} = params;
        let searchString = searchTerm;

        if(!searchString){
            searchString = ''
        }

        let query:any = {}

        if(category){
            query.category = category       
        }

        const products = await prisma.product.findMany({
            where:{
                ...query,
                OR: [
                    {
                        name: {
                            contains: searchString,
                            mode: 'insensitive'
                        },
                        description:{
                            contains: searchString,
                            mode: 'insensitive'
                        }
                    }
                ]
            },
            include: {
                reviews:{
                    include:{
                        user: true
                    },
                    orderBy:{
                        createdDate: 'desc'
                    }
                }
            }
        })     
        
        return products

    }catch (error: any){
        throw new Error(error)
    }
}