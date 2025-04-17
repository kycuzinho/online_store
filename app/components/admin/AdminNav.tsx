'use client'

import Link from "next/link";
import Container from "../Container";
import AdminNavItem from "./AdminNavItem";
import { MdDashboard, MdDns, MdFormatListBulleted, MdLibraryAdd } from "react-icons/md";
import { usePathname } from "next/navigation";

const AdminNav = () => {

    const pathname = usePathname();

    return ( 
        <div className=" sticky w-full shadow-sm top-20 pt-4 bg-sky-100">
            <Container>
                <div className="
                sticky
                flex 
                flex-row
                items-start 
                justify-between
                md:justify-center
                gap-8
                md:gap-12
                overflow-x-auto
                flex-nowrap
                ">
                    <Link href='/admin'>
                        <AdminNavItem icon={MdDashboard} label="Sumário" selected={pathname === '/admin'}/>
                    </Link>

                    <Link href='/admin/add-products'>
                        <AdminNavItem icon={MdLibraryAdd} label="Adicionar Produto" selected={pathname === '/admin/add-products'}/>
                    </Link>
                    
                    <Link href='/admin/manage-products'>
                        <AdminNavItem icon={MdDns} label="Gerir Produtos" selected={pathname === '/admin/manage-products'}/>
                    </Link>
                    
                    <Link href='/admin/manage-orders'>
                        <AdminNavItem icon={MdFormatListBulleted} label="Gerir Pedidos" selected={pathname === '/admin/manage-orders'}/>
                    </Link>
                </div>
            </Container>
        </div>
    );
}
 
export default AdminNav;