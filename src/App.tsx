import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Home from './views/Home/Home';
import MenuComposer from './views/MenuComposer/MenuComposer';
import Shopping from './views/Shopping/Shopping';
import FoodAndPortions from './views/FoodAndPortions/FoodAndPortions';
import UploadProduct from './views/UploadProduct/UploadProduct';
import HeaderMenu from './components/HeaderMenu/HeaderMenu';
import './assets/styles/colors.css';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <Navigate to="/" />;
    }

    return <>{children}</>;
};

const App = () => {
    return (
        <AuthProvider>
            <BrowserRouter>
                <HeaderMenu />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/menu-composer" element={<MenuComposer />} />
                    <Route path="/food-and-portions" element={<FoodAndPortions />} />
                    <Route path="/shopping" element={<Shopping />} />
                    <Route
                        path="/upload-product"
                        element={
                            <ProtectedRoute>
                                <UploadProduct />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
};

export default App; 