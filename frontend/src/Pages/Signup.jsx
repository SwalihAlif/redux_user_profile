import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useDispatch } from "react-redux";
import { signupSuccess } from "../redux/authSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        password2: "",
    });
    const [error, setError] = useState("");

    useEffect(() => {
        const user = localStorage.getItem("token");
        if (user) {
            navigate("/");
        }
    }, [navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value});
    };

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
        return passwordRegex.test(password);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const { email, username, password, password2 } = formData;

        if (!formData.username.trim()) {
            setError("Username is required");
            toast.error("Username cannot be empty.");
            return;
        }
        if (!formData.email.trim()) {
            setError("Email is required");
            toast.error("Email cannot be empty.");
            return;
        }
        if (!validatePassword(password)) {
            setError("Password must be 6+ chars with A-Z, a-z, 0-9, & symbol.");
            toast.error("Weak password! Use A-Z, a-z, 0-9, & symbols.");
            return;
        }
        if (password != password2) {
            setError("Passwords do not match.");
            toast.error("Password do not match.");
            return;
        }
        try {
            const response = await axios.post("http://127.0.0.1:8000/api/signup/", formData);
            localStorage.setItem("token", response.data.token);
            dispatch(signupSuccess(response.data.user));

            toast.success("Account created successfully!");

            setTimeout(() => {
                navigate("/");
            }, 2000);

        } catch (error) {
            const errorMessage = error.response?.data?.error || "An error occurred";
            setError(errorMessage);
            toast.error(errorMessage);
        }
    };

    return (
        <>
            <Navbar />

            <div className="flex justify-center items-center min-h-screen bg-gray-100">
                <div className="w-full max-w-md bg-white shadow-lg rounded-3xl p-6">
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                        Sign Up
                    </h2>
                    {error && <p className="text-red-500 text-center">{error}</p>}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="relative">
                            <label htmlFor="username" className="text-gray-600">Username</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                                placeholder="Enter your username"
                                required
                            />
                        </div>
                        <div className="relative">
                            <label htmlFor="email" className="text-gray-600">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                        <div className="relative">
                            <label htmlFor="password" className="text-gray-600">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                                placeholder="Enter your password"
                                required
                            />
                        </div>
                        <div className="relative">
                            <label htmlFor="password2" className="text-gray-600">Confirm Password</label>
                            <input
                                type="password"
                                id="password2"
                                name="password2"
                                value={formData.password2}
                                onChange={handleChange}
                                className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                                placeholder="Confirm your password"
                                required
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="mt-4">
                            <button
                                type="submit"
                                className="w-full p-2 bg-[#0A1931] text-white font-semibold rounded-md shadow-md hover:bg-blue-950 transition"
                            >
                                Sign Up
                            </button>
                        </div>
                    </form>

                    <div className="mt-4 text-center">
                        <p className="text-gray-600">
                            Already have an account?{" "}
                            <Link to="/login" className="text-blue-950">
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />

        </>
    )
}

export default Signup;