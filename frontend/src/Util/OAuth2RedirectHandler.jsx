import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OAuth2RedirectHandler = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const jwt = params.get("jwt");
        const role = params.get("role");

        if (jwt && role) {
            localStorage.setItem("jwt", jwt);
            localStorage.setItem("role", role);
            // console.log("JWT stored:", jwt);
            // console.log("Role stored:", role);
            navigate("/"); // redirect to home
        } else {
            console.error("JWT or role missing in redirect");
        }
    }, [navigate]);

    return <p>Redirecting...</p>;
};

export default OAuth2RedirectHandler;
