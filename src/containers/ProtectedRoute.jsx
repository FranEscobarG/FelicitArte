import {Outlet, Navigate} from 'react-router-dom';

function ProtectedRoute({session}) {
    return (session) ? <Outlet /> : <Navigate to="/login" />
}

export default ProtectedRoute;