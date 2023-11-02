import React from 'react';
import {useNavigate} from 'react-router-dom';
function Home() {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-3xl mb-6">Welcome to Our Application</h1>
            <button
                onClick={() => navigate("/admin")}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mb-4 w-40"
            >
                Get Started as Admin
            </button>
            <button
                onClick={() => navigate("/customer")}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full w-40"
            >
                Get Started as Customer
            </button>
        </div>
    );
}

export default Home;
