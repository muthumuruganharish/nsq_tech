import { useEffect, useState } from "react";
import api from "../Service/api";
import { useNavigate } from "react-router-dom";

function Dashboard() {

    const navigate = useNavigate();

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    const [records, setRecords] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchRecords = async () => {

            try {

                const res =
                await api.get("/records");

                setRecords(res.data);

            } catch (error) {

                console.log(error);

            } finally {

                setLoading(false);

            }

        };

        fetchRecords();

    }, []);

    const handleLogout = () => {

        localStorage.removeItem("user");

        navigate("/");

    };

    return (

        <div className="relative min-h-screen bg-[#050816] overflow-hidden text-white">

            {/* Background Glow */}
            <div className="absolute top-[-20%] left-[-10%] w-[45%] h-[45%] bg-purple-600/10 rounded-full blur-[120px]"></div>

            <div className="absolute bottom-[-20%] right-[-10%] w-[45%] h-[45%] bg-violet-600/10 rounded-full blur-[120px]"></div>

            {/* Main Content */}
            <div className="relative z-10 p-6 md:p-10">

                {/* Top Navbar */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-10">

                    <div>

                        <h1 className="text-4xl font-bold mb-2">
                            Welcome Back 👋
                        </h1>

                        <p className="text-slate-400">
                            Manage your secure portal records
                        </p>

                    </div>

                    <button
                        onClick={handleLogout}
                        className="px-5 py-3 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 hover:opacity-90 transition-all duration-200 font-semibold shadow-lg shadow-red-500/20"
                    >
                        Logout
                    </button>

                </div>

                {/* User Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

                    {/* Username */}
                    <div className="bg-[#0B1120]/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 shadow-xl">

                        <p className="text-slate-400 text-sm mb-2">
                            Username
                        </p>

                        <h2 className="text-2xl font-bold">
                            {user?.username}
                        </h2>

                    </div>

                    {/* Email */}
                    <div className="bg-[#0B1120]/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 shadow-xl">

                        <p className="text-slate-400 text-sm mb-2">
                            Email
                        </p>

                        <h2 className="text-lg font-semibold break-all">
                            {user?.email}
                        </h2>

                    </div>

                    {/* Role */}
                    <div className="bg-[#0B1120]/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 shadow-xl">

                        <p className="text-slate-400 text-sm mb-2">
                            Access Role
                        </p>

                        <span className="inline-block px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-violet-500 text-white font-semibold">

                            {user?.role}

                        </span>

                    </div>

                </div>

                {/* Records Table */}
                <div className="bg-[#0B1120]/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 shadow-xl">

                    <div className="flex items-center justify-between mb-6">

                        <div>

                            <h2 className="text-2xl font-bold mb-1">
                                User Records
                            </h2>

                            <p className="text-slate-400 text-sm">
                                Secure access records and permissions
                            </p>

                        </div>

                    </div>

                    {
                        loading ? (

                            <div className="flex justify-center py-14">

                                <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>

                            </div>

                        ) : (

                            <div className="overflow-x-auto">

                                <table className="w-full border-collapse">

                                    <thead>

                                        <tr className="border-b border-slate-800 text-slate-400 text-left">

                                            <th className="pb-4">
                                                ID
                                            </th>

                                            <th className="pb-4">
                                                Record Title
                                            </th>

                                            <th className="pb-4">
                                                Access Level
                                            </th>

                                        </tr>

                                    </thead>

                                    <tbody>

                                        {
                                            records.map((record) => (

                                                <tr
                                                    key={record.id}
                                                    className="border-b border-slate-900 hover:bg-slate-900/40 transition-all duration-200"
                                                >

                                                    <td className="py-5 font-medium">
                                                        #{record.id}
                                                    </td>

                                                    <td className="py-5">
                                                        {record.title}
                                                    </td>

                                                    <td className="py-5">

                                                        <span className="px-4 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-purple-600/20 to-violet-500/20 border border-purple-500/20 text-purple-300">

                                                            {record.access}

                                                        </span>

                                                    </td>

                                                </tr>

                                            ))
                                        }

                                    </tbody>

                                </table>

                            </div>

                        )
                    }

                </div>

            </div>

        </div>

    );
}

export default Dashboard;