'use client'

import { Order, User } from "@prisma/client";
import {DataGrid, GridColDef } from '@mui/x-data-grid'
import { ptPT } from '@mui/x-data-grid/locales';
import { formatPrice } from "@/utils/formatPrice";
import Heading from "@/app/components/Heading";
import Status from "@/app/components/Status";
import { MdAccessTimeFilled, MdDeliveryDining, MdDone, MdRemove, MdRemoveRedEye } from "react-icons/md";
import ActionBtn from "@/app/components/ActionBtn";
import { useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import moment from "moment";
import "moment/locale/pt"; 


interface ManageOrdersClientProps{
    orders: ExtendedOrder[]
}

type ExtendedOrder = Order & {
    user: User
}

const ManageOrdersClient:React.FC<ManageOrdersClientProps> = ({orders}) => {

    moment.locale("pt"); 
    const router = useRouter();
    let rows: any = []

    if(orders){   
        rows = orders.map((order) => {
            return {
                id: order.id,
                customer: order.user.name,
                amount: formatPrice(order.amount / 100),
                paymentStatus: order.status,
                date: moment(order.createdAt).fromNow(),
                deliveryStatus: order.deliveryStatus,
            }
        })
    }

    const columns: GridColDef[] = [
        {field: 'id', headerName: 'ID', width: 220},
        {field: 'customer', headerName: 'Cliente', width: 130},
        {field: 'amount', headerName: 'Total(EUR)', width: 130, 
            renderCell: (params) => {
            return(
            <div className="font-bold text-slate-800">{params.row.amount}</div>
            )
        },},

        {field: 'paymentStatus', headerName: 'Estado de Pagamentp', width: 130, 
            renderCell: (params) => {
                return(
                <div>
                    {params.row.paymentStatus === 'pending' ? (
                        <Status 
                            text="Pendente" 
                            icon={MdAccessTimeFilled} 
                            bg="bg-slate-200"
                            color="text-slate-700"
                        /> 
                        )    : params.row.paymentStatus === 'complete' ?  (
                        <Status 
                            text="Pago" 
                            icon={MdDone} 
                            bg="bg-green-200"
                            color="text-green-700"
                        /> 
                        ) : <></>}
                </div>
                )
            }
        },

        {field: 'deliveryStatus', headerName: 'Estado de Entrega', width: 130, 
            renderCell: (params) => {
                return(
                <div>
                    {params.row.deliveryStatus === 'pending' ? (
                        <Status 
                            text="Pendente" 
                            icon={MdAccessTimeFilled} 
                            bg="bg-slate-200"
                            color="text-slate-700"
                        /> 
                        )    : params.row.deliveryStatus === 'dispatched' ?  (
                        <Status 
                            text="Despachado" 
                            icon={MdDeliveryDining} 
                            bg="bg-purple-200"
                            color="text-purple-700"
                        /> 
                ) : params.row.deliveryStatus === 'delivered' ? (
                    <Status 
                            text="Entregue" 
                            icon={MdDone} 
                            bg="bg-green-200"
                            color="text-green-700"
                        /> 
                ) : <></>}
                </div>
                )
            }
        },

        {
            field: 'date',
            headerName: 'Data',
            width: 130,
        },
        
        {field: 'action', headerName: 'Açoes', width: 200,
            renderCell: (params) => {
                return(
                <div className="flex justify-between w-full mt-1">
                    <ActionBtn icon={MdDeliveryDining} onClick={() => {
                        handleDispactch(params.row.id)
                    
                    }}/>
                    <ActionBtn icon={MdDone} onClick={() => {
                        handleDeliver(params.row.id)
                    }}/>
                    <ActionBtn icon={MdRemoveRedEye} onClick={() => {
                        router.push(`/order/${params.row.id}`);
                    }}/>
                </div>
                )
            }
        },
    ];

    const handleDispactch = useCallback((id: string,) => {
        axios.put('/api/order',{
            id,
            deliveryStatus: 'dispatched'
        }).then((res) =>{
            toast.success('Enviado')
            router.refresh()
        }).catch((err) => {
            toast.error('Ocorreu um erro')
            console.log(err)
        })
    },[router]);

    const handleDeliver = useCallback((id: string,) => {
        axios.put('/api/order',{
            id,
            deliveryStatus: 'delivered'
        }).then((res) =>{
            toast.success('Entregue')
            router.refresh()
        }).catch((err) => {
            toast.error('Ocorreu um erro')
            console.log(err)
        })
    },[router])


   
    return ( 
        <div className="max-w-[1150px] m-auto text-xl">
            <div className="mb-4 mt-8" >
                <Heading title="Gerir Pedidos" center/>
            </div>

            <div style={{height: 600, width:'100%'}}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{ 
                        pagination: { 
                            paginationModel: {page: 0, pageSize: 10},
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
 
export default ManageOrdersClient;