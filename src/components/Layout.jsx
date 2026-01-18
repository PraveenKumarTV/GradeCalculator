import React from 'react';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
                <h1 className="text-2xl font-bold text-center mb-6">Grade Calculator</h1>
                {children}
            </div>
        </div>
    );
};

export default Layout;