import Loader from "../../Components/Loader";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useLoginMutation } from "../../Redux/api/userSlice";
import { setCredentials } from "../../Redux/features/auth/authSlice";

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [login, { isLoading }] = useLoginMutation();
    const { userInfo } = useSelector(state => state.auth);

    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/';

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [navigate, redirect, userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await login({ email, password }).unwrap();
            console.log(res); // Check response for token details
            dispatch(setCredentials({ ...res }));
            toast.success('User successfully Logged In')
        } catch (error) {
            toast.error(error?.data?.message || error.message);
        }
    };

    return (
        <div className="flex justify-center items-center w-full h-screen">
            <section className="bg-white rounded-lg shadow-lg p-8 w-[400px]">
                <h1 className="text-2xl font-semibold text-center mb-6">Login</h1>
                <form onSubmit={submitHandler}>
                    <div className="my-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email Address
                        </label>
                        <input
                            type="text"
                            id="email"
                            className="mt-2 p-3 w-full border border-gray-300 rounded-md"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="my-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Enter your Password
                        </label>
                        <input
                            type="text"
                            id="password"
                            className="mt-2 p-3 w-full border border-gray-300 rounded-md"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        disabled={isLoading}
                        type="submit"
                        className="bg-pink-500 text-white w-full py-3 rounded-md hover:bg-pink-600 focus:outline-none"
                    >
                        {isLoading ? "Logging in..." : "Login"}
                    </button>
                    {isLoading && <Loader />}
                </form>
                <div className="mt-4 text-center">
                    <p className="text-gray-600">
                        Create Account?{" "}
                        <Link to={redirect ? `/register?redirect=${redirect}` : '/register'} className="text-pink-500 hover:underline">
                            Register
                        </Link>
                    </p>
                </div>
            </section>
        </div>
    );
}

export default Login;
