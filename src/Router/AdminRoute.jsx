import useAuth from "../Hooks/useAuth";
import useRole from "../Hooks/useRole";


const AdminRoute = ({children}) => {
    const { loading} = useAuth();
    const {role, roleLoading} = useRole();


    if(loading || roleLoading){
        return <div>
            <p>Forbidden access from adminRoute...................</p>
        </div>
    }

    if(role.role !== 'admin'){
        return <div>
            <p>Forbidden access from admin route ......................</p>
        </div>
    }


    return children
};

export default AdminRoute;