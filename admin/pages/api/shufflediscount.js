import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { isAdmin } from "./isAdmin";

// Function to generate random percentage between -5 and 5
function getRandomDiscount() {
    return (Math.random() * 10) - 5; // Random number between -5 and 5
}

// Function to shuffle discounts of products
// Function to shuffle discounts of products
async function shuffleDiscounts() {
    try {
        await mongooseConnect();
        const products = await Product.find(); // Retrieve all products

        // Iterate over each product and update its discount
        for (const product of products) {
            const randomDiscount = getRandomDiscount(); // Generate random discount
            let discount = Math.round(randomDiscount); // Round off discount to nearest integer

            // Ensure discount is not less than 0 or greater than 100
            discount = Math.max(discount, 0);
            discount = Math.min(discount, 100);

            // Update the product with the new discount
            await Product.findByIdAndUpdate(product._id, { discount });
        }

        console.log('Discounts shuffled successfully!');
    } catch (error) {
        console.error('Error shuffling discounts:', error);
    }
}


// Handler function
const handler = async (req, res) => {
    const { method } = req;

    if (method === "GET") {
        shuffleDiscounts(); // Shuffle discounts when a GET request is made
        res.json({ message: 'Discounts shuffled successfully!' });
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
};

export default isAdmin(handler);
