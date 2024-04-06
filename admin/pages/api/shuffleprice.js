import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { isAdmin } from "./isAdmin";

// Function to generate random percentage between -20 and 30
function getRandomPercentage() {
    return (Math.random() * 50) - 20; // Random number between -20 and 30
}

// Function to shuffle prices of products
async function shufflePrices() {
    try {
        await mongooseConnect();
        const products = await Product.find(); // Retrieve all products

        // Iterate over each product and update its price
        for (const product of products) {
            const randomPercentage = getRandomPercentage(); // Generate random percentage
            const price = Math.round(product.price * (1 + randomPercentage / 100)); // Calculate new price

            // Update the product with the new price
            await Product.findByIdAndUpdate(product._id, { price });
        }

        console.log('Prices shuffled successfully!');
    } catch (error) {
        console.error('Error shuffling prices:', error);
    }
}

const handler = async (req, res) => {
    const { method } = req;

    await mongooseConnect();

    if (method === "GET") {
        shufflePrices();
        res.json({ message: 'Prices shuffled successfully!' });
    }
    else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
};

export default isAdmin(handler);
