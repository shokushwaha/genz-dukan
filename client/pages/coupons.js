"use client"
import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'

const coupons = () => {

    const [code, setCode] = useState('')
    const [imageurl, setImageurl] = useState('')

    const [prevCoups, setPrevCoups] = useState([]);

    const fetchCoupons = async () => {
        try {
            const response = await axios.get('/api/coupons');
            setPrevCoups(response.data);
        } catch (err) {
            console.error('Error fetching coupons:', err.message);
        }
    }

    useEffect(() => {
        fetchCoupons();
    }, [])

    const handlefileUpload = async (e) => {
        const files = e.target.files;
        const formData = new FormData();

        for (const file of files) {
            formData.append("file", file);
            formData.append("upload_preset", "ecomnext")
        }

        const data = await axios.post("https://api.cloudinary.com/v1_1/dt21djrjq/image/upload",
            formData
        ).then((response) => {
            setImageurl(response?.data?.secure_url)
        }).catch((error) => {
            console.error("Error: ", error);
        })
    }

    const handleCouponSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/addcoupon', {
                code: code,
                imageurl: imageurl
            });
            console.log('Coupon added successfully');
        } catch (err) {
            console.error('Error adding coupon:', err.message);
        }
    };


    return (
        <div className=''>
            <Navbar />
            <div className='flex flex-col h-[100vh] w-[100vw] items-center'>
                <form onSubmit={handleCouponSubmit} class="bg-white w-[35%] p-10 rounded-lg m-8 h-[22rem]">
                    <h1 class="text-gray-800 font-bold text-4xl mb-1">Have any Extra coupons?</h1>
                    <p class="text-xl font-normal text-gray-600 mb-7">Why not earn money by selling those..</p>
                    <div class="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
                            fill="currentColor">
                            <path fill-rule="evenodd"
                                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                clip-rule="evenodd" />
                        </svg>
                        <input class="pl-2 outline-none border-none" type="text" name="" id="" placeholder="Coupon Code" onChange={e => setCode(e.target.value)} />
                    </div>
                    <div class="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">

                        <label className='flex items-center justify-center bg-purple-700 text-white p-2 gap-2 rounded-lg cursor-pointer'>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                            </svg>
                            <input type="file" className='hidden' onChange={(e) => handlefileUpload(e)} />
                        </label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <span className='overflow-hidden'>
                            {imageurl === "" ? "No file selected" : imageurl}
                        </span>
                    </div>
                    <button type="submit" class="block w-full bg-indigo-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-4">Sell</button>
                </form>
                <div className='flex justify-around gap-3'>

                    {prevCoups.map((coupon, index) => {
                        return (

                            <div class="bg-white w-[12rem] p-3 rounded-lg m-4 flex justify-center items-center flex-col">
                                <img src={coupon.immg} class="w-[11rem] h-[100px]" />
                                <button class="text-white bg-blue-500 mt-3 w-[4rem] rounded-md">BUY</button>
                            </div>

                        )
                    }
                    )}
                </div>
            </div>



        </div>
    )
}

export default coupons