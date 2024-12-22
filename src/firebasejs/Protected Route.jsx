import React from "react";
import { useUserAuth } from "../../src/firebasejs/UserAuthContext";
import { Navigate } from "react-router-dom"; 

function ProtectedRoute({ children }) {
    const { user } = useUserAuth(); 

    if (user) {
        return <Navigate to="/" replace />; 
    }

    return children; 
}

export default ProtectedRoute;
