'use client'

import { Product } from "@prisma/client";
import {DataGrid, GridColDef } from '@mui/x-data-grid'
import { ptPT } from '@mui/x-data-grid/locales';
import { formatPrice } from "@/utils/formatPrice";
import Heading from "@/app/components/Heading";
import Status from "@/app/components/Status";
import { MdCached, MdClose, MdDelete, MdDone, MdRemove, MdRemoveRedEye } from "react-icons/md";
import ActionBtn from "@/app/components/ActionBtn";
import { useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { deleteObject, getStorage, ref } from "firebase/storage";
import firebaseApp from "@/libs/firebase";


interface ManageProductsClientProps{
    products: Product[]
}

const ManageProductsClient:React.FC<ManageProductsClientProps> = ({products}) => {

    const router = useRouter();
    const storage = getStorage(firebaseApp);
    let rows: any = []

    if(products){   
        rows = products.map((product) => {
            return {
                id: product.id,
                name: product.name,
                price: formatPrice(product.price),
                category: product.category,
                brand: product.brand,
                inStock: product.inStock,
                images: product.images,
            }
        })
    }

    const columns: GridColDef[] = [
        {field: 'id', headerName: 'ID', width: 220},
        {field: 'name', headerName: 'Name', width: 200},
        {field: 'price', headerName: 'Preço(EUR)', width: 100, 
            renderCell: (params) => {
            return(
            <div className="font-bold text-slate-800">{params.row.price}</div>
            )
        },},
        {field: 'category', headerName: 'Categoria', width: 100},
        {field: 'brand', headerName: 'Marca', width: 100},
        {field: 'inStock', headerName: 'Stock', width: 120, 
            renderCell: (params) => {
                return(
                <div className="">
                    {params.row.inStock === true ? (
                        <Status 
                            text="Em Stock" 
                            icon={MdDone} 
                            bg="bg-teal-200"
                            color="text-teal-700"
                            
                        /> 
                        )    :  (
                        <Status 
                            text="Fora de Stock" 
                            icon={MdClose} 
                            bg="bg-rose-200"
                            color="text-teal-700"
                        /> 
                )}</div>
                )
            }
        },
        {field: 'action', headerName: 'Açoes', width: 200,
            renderCell: (params) => {
                return(
                <div className="flex justify-between w-full mt-1">
                    <ActionBtn icon={MdCached}  onClick={() => {
                        handleToggleStock(params.row.id, params.row.inStock)
                    
                    }}/>
                    <ActionBtn icon={MdDelete} onClick={() => {
                        handleDelete(params.row.id, params.row.images)
                    }}/>
                    <ActionBtn icon={MdRemoveRedEye} onClick={() => {
                        router.push(`/product/${params.row.id}`);
                    }}/>
                </div>
                )
            }
        },
    ];

    const handleToggleStock = useCallback((id: string, inStock: boolean) => {
        axios.put('/api/product',{
            id,
            inStock: !inStock,
        }).then((res) =>{
            toast.success('Estado do produto atualizado')
            router.refresh()
        }).catch((err) => {
            toast.error('Ocorreu um erro')
            console.log(err)
        })
    },[router])

    const handleDelete = useCallback(async(id: string, images: any[]) => {
        toast('A apagar o produto, por favor espere...')      
        
        const handleImageDelete = async () => {
            try {
                for(const item of images){
                    if(item.image){
                        const imageRef = ref(storage, item.image)
                        await deleteObject(imageRef)
                        console.log('Imagem apagada', item.image)
                    }
                }
                
            } catch (error) {
                return console.log('Deleting image error', error)
            }
        };

        await handleImageDelete()

        axios.delete(`/api/product/${id}`)
        .then((res) =>{
            toast.success('Produto apagado')
            router.refresh();
        }).catch((err) => {
            console.log(err)
        });

    },[router, storage])

    return ( 
        <div className="max-w-[1150px] m-auto text-xl">
            <div className="mb-4 mt-8" >
                <Heading title="Gerir Produtos" center/>
            </div>

            <div style={{height: 600, width:'100%'}}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{ 
                        pagination: { 
                            paginationModel: {page: 0, pageSize: 5},
                        } 
                    }}
                    pageSizeOptions={[5, 20]}
                    checkboxSelection
                    disableRowSelectionOnClick
                    localeText={ptPT.components.MuiDataGrid.defaultProps.localeText}
                    sx={{ border: 0, 
                        backgroundColor: 'white'
                    }}
                />
            </div>
        </div>
    );
}
 
export default ManageProductsClient;