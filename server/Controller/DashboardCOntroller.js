import orderModel from "../model/OrderModel.js";
import ProductModel from "../model/ProductModel.js";

export const revenueDistribution = async (req, res) => {
    try {
        // Fetch all orders
        const orders = await orderModel.find();

        const categoryRevenue = {};

        // Iterate over orders to calculate revenue per category
        await Promise.all(orders.map(async (order) => {
            for (const item of order.orderItems) {
                const product = await ProductModel.findById(item.productId);
                const revenue = item.quantity * item.price;

                product.category.forEach(cat => {
                    if (!categoryRevenue[cat]) {
                        categoryRevenue[cat] = 0;
                    }
                    categoryRevenue[cat] += revenue;
                });
            }
        }));

        const response = Object.keys(categoryRevenue).map(category => ({
            name: category,
            revenue: categoryRevenue[category]
        }));


        res.json(response);
    } catch (error) {
        res.status(500).json( error.message );
    }
   
}

export const lastTwentyDaysOrder = async(req,res)=>{
    
    try {
        // Calculate the date 20 days ago from today
        const twentyDaysAgo = new Date();
        twentyDaysAgo.setDate(twentyDaysAgo.getDate() - 20);

        // Generate a list of dates for the last 20 days
        const dates = [];
        for (let i = 0; i < 20; i++) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            dates.push(date.toISOString().split('T')[0]); // Format as 'YYYY-MM-DD'
        }

        const result = await orderModel.aggregate([
            {
                // Filter to include only orders from the last 20 days
                $match: {
                    createdAt: { $gte: twentyDaysAgo }
                }
            },
            {
                // Add a new field `date` containing the date part only
                $addFields: {
                    date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }
                }
            },
            {
                // Group by the new `date` field and count the number of orders for each day
                $group: {
                    _id: "$date",
                    totalOrders: { $sum: 1 }
                }
            },
            {
                // Sort the result by date
                $sort: { _id: 1 }
            }
        ]);

        // Merge the results with the list of dates
        const mergedResults = dates.map(date => {
            const found = result.find(entry => entry._id === date);
            return found ? found : { _id: date, totalOrders: 0 };
        }).reverse(); // Reverse to maintain chronological order


        // return result;
        res.status(200).json(mergedResults)
    } catch (error) {
        console.error("Error getting order counts per day:", error);
        throw error;
    }
}