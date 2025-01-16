import Loader from "./../../Components/Loader";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSignupMutation } from "../../Redux/api/userSlice";
import { setCredentials } from "../../Redux/features/auth/authSlice";

const Signup = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [signup, {isLoading}] = useSignupMutation()
    const {userInfo} = useSelector((state) => state.auth)
    const {search} = useLocation()
    const sp = new URLSearchParams(search)
    const redirect = sp.get('redirect') || '/'

    useEffect(() => {
        if(userInfo) {
            navigate(redirect)
        }
    }, [navigate, redirect, userInfo])
    const submitHandler = async (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            toast.error("passwords do not  match")
            return
        }
        try {
            const res =  await signup({name, email, password}).unwrap()
            dispatch(setCredentials({...res})) 
            navigate(redirect)
            toast.success('User successfully registered')
        } catch (error) {
            console.log(error)
            toast.error(error.data.meessage)
        }
    }
  return (
    <div className="flex justify-center items-center w-full h-screen">
            <section className="bg-white rounded-lg shadow-lg p-8 w-[400px]">
                <h1 className="text-2xl font-semibold text-center mb-6">Sign up</h1>
                <form onSubmit={submitHandler}>
                <div className="my-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Enter Your Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Enter Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-2 p-3 w-full border border-gray-300 rounded-md"
                            
                        />
                    </div>
                    <div className="my-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email Address
                        </label>
                        <input
                            type="text"
                            id="email"
                            placeholder="Enter Email"
                            value={email}
                            onChange= {(e) => setEmail(e.target.value)}
                            className="mt-2 p-3 w-full border border-gray-300 rounded-md"
                            
                        />
                    </div>

                    <div className="my-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Enter your Password
                        </label>
                        <input
                            type="text"
                            id="password"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-2 p-3 w-full border border-gray-300 rounded-md"
                          
                          
                        />
                    </div>
                    <div className="my-4">
                        <label htmlFor="confirm password" className="block text-sm font-medium text-gray-700">
                            Confirm your Password
                        </label>
                        <input
                            type="text"
                            id="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="mt-2 p-3 w-full border border-gray-300 rounded-md"
                          
                          
                        />
                    </div>
                    <button
                        disabled={isLoading}
                        type="submit"
                        className="bg-pink-500 text-white w-full py-3 rounded-md hover:bg-pink-600 focus:outline-none"
                    >
                    {isLoading ? "Registering..." : "Registered"}
                    </button>
                      {isLoading && <Loader/>}
                </form>
                <div className="mt-4 text-center">
                    <p className="text-gray-600">
                        Already have an Account?{" "}
                        <Link to={redirect ? `/login?redirect=${redirect}` : '/login' } className="text-pink-500 hover:underline">
                            Login
                        </Link>
                    </p>
                </div>
            </section>
        </div>
  )
}

export default Signup
