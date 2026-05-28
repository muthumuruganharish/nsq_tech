import React from 'react'
import { useState } from "react";
import api from "../Service/api";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "General User"
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
        if (error) setError("");
    }

    const handleSignup = async (e) => {
        e.preventDefault();

        // Standard Client Validations
        if (!form.username.trim() || !form.email.trim() || !form.password.trim() || !form.confirmPassword.trim()) {
            setError("Please fill in all fields.");
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(form.email)) {
            setError("Please enter a valid email address.");
            return;
        }

        if (form.password !== form.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        if (form.password.length < 6) {
            setError("Password must be at least 6 characters long.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            // Call registration endpoint on Backend
            await api.post("/signup", {
                username: form.username,
                email: form.email,
                password: form.password,
                role: form.role
            });

            setSuccess(true);
            setTimeout(() => {
                navigate("/");
            }, 2000);
        }
        catch (err) {
            console.error(err);
            const msg = err.response?.data?.message || "Registration failed. Username or email might be taken.";
            setError(msg);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center bg-[#080c14] overflow-hidden px-4 py-8">
            
            {/* Animated Mesh Gradient Background Orbs */}
            <div className="absolute top-[-20%] left-[-15%] w-[60%] h-[60%] rounded-full bg-violet-600/10 blur-[130px] pointer-events-none animate-pulse duration-4000"></div>
            <div className="absolute bottom-[-20%] right-[-15%] w-[60%] h-[60%] rounded-full bg-blue-600/10 blur-[130px] pointer-events-none animate-pulse duration-6000"></div>
            <div className="absolute top-[30%] left-[10%] w-[30%] h-[30%] rounded-full bg-indigo-500/5 blur-[100px] pointer-events-none"></div>

            {/* Main Signup Card Container */}
            <div className="w-full max-w-md z-10">
                <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-8 md:p-10 shadow-2xl shadow-slate-950/50 transition-all duration-300">
                    
                    {/* Header Logo & Branding */}
                    <div className="flex flex-col items-center mb-8 text-center">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-violet-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-violet-500/20 mb-4 transform hover:rotate-6 transition-transform duration-300">
                            {/* Futuristic Tech Emblem (Plus/Hexagon) */}
                            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold font-['Plus_Jakarta_Sans'] tracking-tight text-white mb-1 bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text">
                            Create Account
                        </h2>
                        <p className="text-sm text-slate-400">
                            Sign up for an NSQ Secure Portal account
                        </p>
                    </div>

                    {/* Success Alert */}
                    {success && (
                        <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-start gap-3 animate-fadeIn">
                            <svg className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-sm text-emerald-200 font-medium">Account created successfully! Redirecting to login...</span>
                        </div>
                    )}

                    {/* Error Alert */}
                    {error && (
                        <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-3 animate-fadeIn">
                            <svg className="w-5 h-5 text-red-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            <span className="text-sm text-red-200 font-medium">{error}</span>
                        </div>
                    )}

                    {/* Signup Form */}
                    <form onSubmit={handleSignup} className="space-y-5">
                        
                        {/* Username Input Field */}
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                                Username
                            </label>
                            <div className="relative group">
                                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-violet-500 transition-colors duration-200">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </span>
                                <input
                                    type="text"
                                    name="username"
                                    placeholder="yourusername"
                                    value={form.username}
                                    onChange={handleChange}
                                    className="w-full pl-11 pr-4 py-2.5 bg-slate-950/60 border border-slate-800/80 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-violet-500/80 focus:ring-2 focus:ring-violet-500/10 transition-all duration-200"
                                />
                            </div>
                        </div>

                        {/* Email Input Field */}
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                                Email Address
                            </label>
                            <div className="relative group">
                                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-violet-500 transition-colors duration-200">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </span>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="you@example.com"
                                    value={form.email}
                                    onChange={handleChange}
                                    className="w-full pl-11 pr-4 py-2.5 bg-slate-950/60 border border-slate-800/80 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-violet-500/80 focus:ring-2 focus:ring-violet-500/10 transition-all duration-200"
                                />
                            </div>
                        </div>

                        {/* Role Select Input */}
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                                Portal Role
                            </label>
                            <div className="relative group">
                                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-violet-500 transition-colors duration-200">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 009 11V7a4 4 0 00-8 0v4c0 2.748.796 5.28 2.176 7.428m11.975-9.428c.197 1.108.3 2.254.3 3.428v4c0 2.748-.796 5.28-2.176 7.428m-11.975-9.428C2.197 9.07 3 7.82 4.176 6.847m6.98 12c-1.3-.372-2.532-1.026-3.6-1.9M6.696 6.847A13.963 13.963 0 0110 4V4H6.696z" />
                                    </svg>
                                </span>
                                <select
                                    name="role"
                                    value={form.role}
                                    onChange={handleChange}
                                    className="w-full pl-11 pr-10 py-2.5 bg-slate-950/60 border border-slate-800/80 rounded-xl text-slate-300 focus:outline-none focus:border-violet-500/80 focus:ring-2 focus:ring-violet-500/10 transition-all duration-200 appearance-none cursor-pointer"
                                >
                                    <option value="General User" className="bg-slate-950 text-slate-100">General User</option>
                                    <option value="Admin" className="bg-slate-950 text-slate-100">Admin</option>
                                </select>
                                <span className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </span>
                            </div>
                        </div>

                        {/* Password Input Field */}
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                                Password
                            </label>
                            <div className="relative group">
                                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-violet-500 transition-colors duration-200">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </span>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="••••••••"
                                    value={form.password}
                                    onChange={handleChange}
                                    className="w-full pl-11 pr-11 py-2.5 bg-slate-950/60 border border-slate-800/80 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-violet-500/80 focus:ring-2 focus:ring-violet-500/10 transition-all duration-200"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-200 transition-colors duration-200"
                                >
                                    {showPassword ? (
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                                        </svg>
                                    ) : (
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password Input Field */}
                        <div className="space-y-1">
                            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block">
                                Confirm Password
                            </label>
                            <div className="relative group">
                                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-violet-500 transition-colors duration-200">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                </span>
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    placeholder="••••••••"
                                    value={form.confirmPassword}
                                    onChange={handleChange}
                                    className="w-full pl-11 pr-11 py-2.5 bg-slate-950/60 border border-slate-800/80 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-violet-500/80 focus:ring-2 focus:ring-violet-500/10 transition-all duration-200"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-200 transition-colors duration-200"
                                >
                                    {showConfirmPassword ? (
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                                        </svg>
                                    ) : (
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Submit Signup Button */}
                        <button
                            type="submit"
                            disabled={loading || success}
                            className="w-full flex items-center justify-center py-3 px-4 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 focus:outline-none focus:ring-2 focus:ring-violet-500/30 active:scale-[0.99] disabled:opacity-50 disabled:active:scale-100 disabled:pointer-events-none transition-all duration-200 cursor-pointer shadow-lg shadow-violet-600/15"
                        >
                            {loading ? (
                                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : (
                                "Sign Up"
                            )}
                        </button>
                    </form>

                    {/* Link back to Login */}
                    <div className="mt-6 text-center text-sm">
                        <span className="text-slate-400">Already have an account? </span>
                        <button
                            onClick={() => navigate("/")}
                            className="text-violet-400 hover:text-violet-300 font-semibold hover:underline transition-colors duration-200 bg-transparent border-0 cursor-pointer"
                        >
                            Sign In
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Signup
