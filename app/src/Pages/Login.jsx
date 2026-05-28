import React, { useState } from "react";
import api from "../Service/api";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });

    };

    const handleLogin = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            const res = await api.post(
                "/login",
                form
            );

            localStorage.setItem(
                "user",
                JSON.stringify(res.data)
            );

            navigate("/dashboard");

        } catch (err) {

            console.log(err);

            setError(
                err.response?.data?.message ||
                "Invalid Credentials"
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="relative min-h-screen w-full flex items-center justify-center bg-[#050816] overflow-hidden px-4">

            {/* Background Glow */}
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[120px]"></div>

            <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-violet-600/10 rounded-full blur-[120px]"></div>

            {/* Login Card */}
            <div className="w-full max-w-md z-10">

                <div className="bg-[#0B1120]/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl">

                    {/* Logo */}
                    <div className="flex flex-col items-center text-center mb-8">

                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-purple-600 to-violet-500 flex items-center justify-center mb-5 shadow-lg shadow-purple-500/20">

                            <svg
                                className="w-8 h-8 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 11c0 1.657-1.343 3-3 3S6 12.657 6 11s1.343-3 3-3 3 1.343 3 3zm0 0V9a3 3 0 116 0v2m-6 0h6m-6 0H9"
                                />
                            </svg>

                        </div>

                        <h1 className="text-3xl font-bold text-white mb-2">
                            Welcome Back
                        </h1>

                        <p className="text-slate-400 text-sm">
                            Login to access your secure portal
                        </p>

                    </div>

                    {/* Error */}
                    {
                        error && (

                            <div className="mb-5 bg-red-500/10 border border-red-500/20 text-red-300 text-sm rounded-xl px-4 py-3">

                                {error}

                            </div>

                        )
                    }

                    {/* Form */}
                    <form
                        onSubmit={handleLogin}
                        className="space-y-5"
                    >

                        {/* Email */}
                        <div>

                            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                                Email Address
                            </label>

                            <div className="relative">

                                <input
                                    type="email"
                                    name="email"
                                    placeholder="you@example.com"
                                    value={form.email}
                                    onChange={handleChange}
                                    className="w-full bg-[#050816] border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                                />

                            </div>

                        </div>

                        {/* Password */}
                        <div>

                            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                                Password
                            </label>

                            <div className="relative">

                                <input
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    name="password"
                                    placeholder="••••••••"
                                    value={form.password}
                                    onChange={handleChange}
                                    className="w-full bg-[#050816] border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(
                                            !showPassword
                                        )
                                    }
                                    className="absolute right-4 top-3 text-slate-400 hover:text-white"
                                >

                                    {
                                        showPassword
                                            ? "Hide"
                                            : "Show"
                                    }

                                </button>

                            </div>

                        </div>

                        {/* Remember */}
                        <div className="flex items-center justify-between text-sm">

                            <label className="flex items-center gap-2 text-slate-400">

                                <input
                                    type="checkbox"
                                    className="accent-purple-600"
                                />

                                Remember Me

                            </label>

                            <button
                                type="button"
                                className="text-purple-400 hover:text-purple-300"
                            >
                                Forgot Password?
                            </button>

                        </div>

                        {/* Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-violet-500 hover:from-purple-500 hover:to-violet-400 text-white font-semibold transition-all duration-200 shadow-lg shadow-purple-500/20"
                        >

                            {
                                loading
                                    ? "Signing In..."
                                    : "Sign In"
                            }

                        </button>

                    </form>

                    {/* Signup */}
                    <div className="mt-6 text-center text-sm text-slate-400">

                        Don’t have an account?

                        <button
                            onClick={() =>
                                navigate("/signup")
                            }
                            className="ml-2 text-purple-400 hover:text-purple-300 font-semibold"
                        >
                            Register
                        </button>

                    </div>

                </div>

            </div>

        </div>

    );
};

export default Login;