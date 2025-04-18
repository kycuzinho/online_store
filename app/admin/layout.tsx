import AdminNav from "../components/admin/AdminNav";

export const metadata = {
    title: 'Bit&Volt Admin',
    description: 'Online Store Admin Dashboard',
}

const AdminLayout = ({children}: {children: React.ReactNode}) => {
    return ( 
        <div>
            <AdminNav/>
            {children}
        </div>
    );
}
 
export default AdminLayout;