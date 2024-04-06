import { CartContext } from '@/components/CartContext';
import Center from '@/components/Center';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react'
import { Toaster, toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import Head from 'next/head';
import login from "@/public/login.png"
import Image from 'next/image';

export default function Login() {

    const { setLoggedInUser } = useContext(CartContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const { setLoggedIn } = useContext(CartContext);

    const ls = typeof window !== 'undefined' ? window.localStorage : null;

    useEffect(() => {

        if (ls) {
            const user = JSON.parse(ls.getItem('loggedInUser'))
            if (user) {
                setLoggedInUser(user);
                router.push("/");
            }
        }
    }, []);

    const handleLogin = async (e) => {

        try {
            e.preventDefault();
            if (!email || !password) {
                toast.error("Fill all the fields")
                return;
            }

            const res = await axios.post('/api/login', { email, password });
            if (res) {
                toast.success("Logged In")
                setLoggedIn(true);
                localStorage.setItem('loggedIn', JSON.stringify('true'));
                localStorage.setItem('loggedInUser', JSON.stringify(res))
                setLoggedInUser(res);
                router.push('/');

            }

        } catch (error) {

            toast.error("Invalid credentials")
        }

    }
    return (
        // <div className='overflow-hidden'>
        //     <Head>
        //         <title>NextZone - Login</title>

        //     </Head>
        //     <Center>
        //         <Toaster
        //             position="top-right"
        //             reverseOrder={false}
        //         />
        //         <div

        //             className="flex flex-col items-center justify-center sm:flex md:flex-row h-[100vh]"

        //         >

        //             <motion.div
        //                 className="text-center md:ml-[-150px]"
        //                 initial={{ opacity: 0, y: "-2000px" }}
        //                 animate={{ opacity: 1, y: "0px" }}
        //                 exit={{ opacity: 0, y: "-2000px" }}
        //                 transition={{ duration: 1 }}
        //             >
        //                 <Image src="/login.png" alt="login-image" width={1000} height={1000} />
        //             </motion.div>

        //             <motion.div
        //                 className="text-center mt-[70px]"
        //                 initial={{ opacity: 0, scale: 0.5 }}
        //                 animate={{ opacity: 1, scale: 1 }}
        //                 exit={{ opacity: 0, scale: 0.5 }}
        //                 transition={{ duration: 1 }}
        //             >
        //                 <div className='flex flex-col gap-8 items-center'>

        //                     <form onSubmit={handleLogin} className='flex flex-col px-8 items-center gap-2'>
        //                         <h1 className='text-blue-950 font-extrabold text-3xl mb-7'>NextZone Login</h1>
        //                         <div className='flex flex-col gap-1 mb-2 items-center' >

        //                             <span className='flex gap-3 ml-1 mr-auto' >
        //                                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        //                                     <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 9v.906a2.25 2.25 0 01-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 001.183 1.981l6.478 3.488m8.839 2.51l-4.66-2.51m0 0l-1.023-.55a2.25 2.25 0 00-2.134 0l-1.022.55m0 0l-4.661 2.51m16.5 1.615a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V8.844a2.25 2.25 0 011.183-1.98l7.5-4.04a2.25 2.25 0 012.134 0l7.5 4.04a2.25 2.25 0 011.183 1.98V19.5z" />
        //                                 </svg>
        //                                 E-mail
        //                             </span>
        //                             <input type="text" placeholder='Enter Your Email' value={email} onChange={e => setEmail(e.target.value)}
        //                                 className=' pl-6 min-w-[300px] w-[30%] h-[2.5rem] rounded-md focus:outline-none border-2 border-gray-300 mt-1'
        //                             />
        //                         </div>

        //                         <div className='flex flex-col gap-1 mb-2 items-center'>

        //                             <span className='flex gap-3 ml-1 mr-auto'>
        //                                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        //                                     <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
        //                                 </svg>

        //                                 Password
        //                             </span>
        //                             <input type="password" placeholder='Enter Your Password' value={password} onChange={e => setPassword(e.target.value)} className=' pl-6 min-w-[300px] w-[30%] h-[2.5rem] rounded-md focus:outline-none border-2 border-gray-300 mt-1' />
        //                         </div>
        //                         <button type='submit' className="w-[100%] md:w-[100%] bg-neutral-800 text-white font-bold h-[2.5rem] rounded-md hover:border   hover:border-blue-950 hover:text-gray-200 hover:bg-neutral-600 ease-in-out duration-300 flex justify-center items-center gap-4 hover:gap-7">
        //                             <span>
        //                                 Login
        //                             </span>
        //                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 hidden">
        //                                 <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
        //                             </svg>

        //                         </button>
        //                         <Link href={'https://ecom-admin-panel.vercel.app/'} className="w-[100%] md:w-[100%] bg-neutral-800 text-white font-bold h-[2.5rem] rounded-md hover:border  hover:border-blue-950 hover:text-gray-200 hover:bg-neutral-600 ease-in-out duration-300 flex justify-center items-center gap-4 hover:gap-7">
        //                             <span>
        //                                 Admin Login
        //                             </span>
        //                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 hidden">
        //                                 <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
        //                             </svg>

        //                         </Link>
        //                     </form>
        //                     <span className='font-bold text-gray-500 mt-[-20px]'>New Here? <span className='text-blue-600 cursor-pointer' onClick={() => router.push("/register")}>Register</span></span>
        //                 </div>
        //             </motion.div>
        //         </div>
        //     </Center>


        // </div>
        <>

            <div class="h-screen md:flex">
                <motion.div

                    initial={{ opacity: 0, x: "-200px" }}
                    animate={{ opacity: 1, x: "0px" }}
                    exit={{ opacity: 0, x: "-200px" }}
                    transition={{ duration: 1 }}

                    class="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-gray-500 to-zinc-900 i justify-around items-center hidden">
                    <div>
                        <h1 class="text-white font-bold text-8xl mb-4 font-sans">NextZone</h1>
                        <p class="text-white mt-1 text-4xl">The Next Gen Marketplace</p>
                    </div>
                    <div class="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
                    <div class="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
                    <div class="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
                    <div class="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
                </motion.div>
                <motion.div 
                
                initial={{ opacity: 0, x: "200px" }}
                    animate={{ opacity: 1, x: "0px" }}
                    exit={{ opacity: 0, x: "200px" }}
                    transition={{ duration: 1 }}

                class="flex md:w-1/2 justify-center py-10 items-center bg-white">
                    <form onSubmit={handleLogin} class="bg-white w-[55%]">
                        <h1 class="text-gray-800 font-bold text-4xl mb-1">Hello Again!</h1>
                        <p class="text-xl font-normal text-gray-600 mb-7">Welcome Back</p>
                        <div class="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                            </svg>
                            <input class="pl-2 outline-none border-none" type="text" name="" id="" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} />
                        </div>
                        <div class="flex items-center border-2 py-2 px-3 rounded-2xl">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
                                fill="currentColor">
                                <path fill-rule="evenodd"
                                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                    clip-rule="evenodd" />
                            </svg>
                            <input class="pl-2 outline-none border-none" type="text" name="" id="" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                        </div>
                        <button type="submit" class="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-4">Login</button>
                        <Link href={'https://ecom-admin-panel.vercel.app/'} className="flex items-center justify-center w-full bg-indigo-600 mt-[-10px] py-2 rounded-2xl text-white font-semibold mb-4">Admin Portal</Link>
                        <span class="text-md bg-white rounded-md p-2 ml-[36%]  text-blue-600 cursor-pointer" onClick={() => router.push("/register")}>New Here ? Register Now</span>
                    </form>
                </motion.div>
            </div>
        </>
    )
}
