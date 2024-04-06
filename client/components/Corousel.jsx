import React, { useState, useEffect } from 'react';
import Avatar, { genConfig } from 'react-nice-avatar';

const Carousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isRunning, setIsRunning] = useState(true);
    const reviews = [
        {
            name: 'John Doe',
            review: 'Great website! Love the user interface and the 3D try-on feature. The checkout process is smooth and hassle-free.'
        },
        {
            name: 'Jane Smith',
            review: 'This website has an amazing selection of products. I found exactly what I was looking for and more!'
        },
        {
            name: 'Alice Johnson',
            review: 'I had a fantastic experience shopping on this website. The customer service team was incredibly helpful and responsive.'
        },
        {
            name: 'Bob Brown',
            review: 'Highly recommend this website to anyone looking for quality products and excellent service. Will definitely be coming back!'
        },
        {
            name: 'Emma Davis',
            review: 'I absolutely love this website! The 3D try-on feature is a game-changer. It helped me visualize how clothes would look before purchasing.'
        },
        {
            name: 'Michael Wilson',
            review: 'The website offers a wide range of products at competitive prices. The checkout process was quick and easy. Overall, a great shopping experience!'
        },
        {
            name: 'Jennifer Garcia',
            review: 'I am impressed by the variety of products available on this website. The quality is excellent, and the prices are reasonable. Highly recommended!'
        },
        {
            name: 'David Martinez',
            review: 'I found everything I needed on this website. The user interface is intuitive, making it easy to navigate through different categories.'
        },
        {
            name: 'Maria Rodriguez',
            review: 'This website exceeded my expectations! The customer service team was extremely helpful in assisting me with my purchase.'
        },
        {
            name: 'James Brown',
            review: 'I had a wonderful shopping experience on this website. The 3D try-on feature made it easy for me to find clothes that fit perfectly.'
        },
        {
            name: 'Linda Thompson',
            review: 'Great selection of products and excellent customer service. I received my order promptly and am very satisfied with my purchase.'
        },
        {
            name: 'William White',
            review: 'I love shopping on this website! The interface is user-friendly, and the checkout process is seamless.'
        },
        {
            name: 'Patricia Clark',
            review: 'I highly recommend this website to anyone looking for quality products at affordable prices.'
        },
        {
            name: 'Richard Scott',
            review: 'The 3D try-on feature is amazing! It helped me find the perfect outfit without having to leave my home.'
        },
        {
            name: 'Karen Young',
            review: 'I am impressed by the level of customer service provided by this website. They went above and beyond to ensure my satisfaction.'
        },
        {
            name: 'Daniel Lee',
            review: 'Great website with a wide selection of products. The checkout process was quick and easy.'
        },
        {
            name: 'Susan Turner',
            review: 'This website is my go-to destination for online shopping. The prices are unbeatable, and the customer service is top-notch.'
        },
        {
            name: 'Joseph Harris',
            review: 'I had a fantastic experience shopping on this website. The 3D try-on feature made it easy for me to visualize how clothes would look before purchasing.'
        },
        {
            name: 'Nancy King',
            review: 'The customer service team was extremely helpful in assisting me with my purchase. I highly recommend this website to anyone looking for quality products and excellent service.'
        },
        {
            name: 'Paul Evans',
            review: 'This website exceeded my expectations! The user interface is intuitive, and the checkout process is seamless.'
        },
    ];
    useEffect(() => {
        let intervalId;
        if (isRunning) {
            intervalId = setInterval(() => {
                handleNext();
            }, 1000);
        }
        return () => clearInterval(intervalId);
    }, [isRunning, currentIndex]);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length);
    };

    const duplicatedReviews = [...reviews, ...reviews, ...reviews]; // Duplicated reviews array

    const handlePause = () => {
        setIsRunning(false);
    };

    const handlePlay = () => {
        setIsRunning(true);
    };

    return (
        <>
            <div className='flex flex-col item-center justify-center gap-4 bg-[#D8D9DA] pb-4 mb-[-24px] mt-20'>
                <div>
                    <h1 className="text-3xl font-bold text-center mt-10">Customer Reviews</h1>
                </div>

                <div className="mt-2 flex items-center justify-center">
                    <div className="w-11/12 ">
                        <div className="relative" onMouseEnter={handlePause} onMouseLeave={handlePlay}>
                            <div className="flex space-x-4">
                                {duplicatedReviews.slice(currentIndex, currentIndex + 3).map((review, index) => {
                                    const config = genConfig();
                                    return (
                                        <div className="flex gap-3 items-center justify-center w-1/3 p-4 bg-white rounded-lg shadow-md" key={index}>
                                            <div>
                                                <Avatar className="w-32 h-32" {...config} />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-bold">{review.name}</h3>
                                                <p className="text-gray-500">{review.review}</p>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="flex items-center justify-between mt-4 relative bottom-44">
                                <button className="w-6 h-6 rounded-full bg-gray-300  relative right-4 hidden" onClick={handlePrev}>&lt;</button>
                                <button className="w-6 h-6 rounded-full bg-gray-300 relative left-10 hidden" onClick={handleNext}>&gt;</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Carousel;