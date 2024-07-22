import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Preloader from './Preloader';

const NotFound = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/');
        }, 3000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="not-found">
            <h1 className="not-found__title">404 - Page Not Found</h1>
            <p className="not-found__message">You will be redirected to the home page shortly.</p>
            <Preloader />
        </div>
    );
};

export default NotFound;
