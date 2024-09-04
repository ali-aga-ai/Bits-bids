"use client";

import Navbar from "@/components/Navbar";
import useLogin from "@/hooks/useLogin";
import React, { useState } from "react";

const LoginPage: React.FC = () => {
    const { handleLogin } = useLogin();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Handle login
    const login = async () => {
        if (!email || !password) {
            alert("Please enter both email and password");
            return;
        }

        await handleLogin(email, password);
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-3xl font-bold mb-8">Login Page</h1>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mb-4 p-2 border border-gray-300 rounded"
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mb-4 p-2 border border-gray-300 rounded"
            />
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={login}
            >
                Log in
            </button>
        </div>
    );
};

export default LoginPage;
