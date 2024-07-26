import orderModel from "../model/OrderModel.js";
export const getUserOrder = async (req, res) => {
    const { userId } = req.params;

    try {

        const orders = await orderModel.find({
            userId
        }).sort({ createdAt: -1 })

        if (orders.length === 0) {
            return res.status(200).json([]);  // Return an empty array if no orders are found
        }


        return res.status(200).json(Array.isArray(orders) ? orders : [orders]);

    } catch (error) {
        res.status(500).json(error.message)
    }
}
export const getAllOrder = async (req, res) => {
    try {

        // const orders = await orderModel.find()
        const orders = await orderModel.find().populate('userId', 'username email').sort({ createdAt: -1 }).exec();

        if (orders.length === 0) {
            return res.status(200).json([]);  // Return an empty array if no orders are found
        }


        return res.status(200).json(orders);

    } catch (error) {
        res.status(500).json(error.message)
    }
}
export const deleteOrder = async (req, res) => {
    const { id } = req.params;
    try {


        const orders = await orderModel.findByIdAndDelete(id)
        if (!orders) {
            return res.status(404).json({ message: "Order not found" });
        }

        return res.status(200).json("Order Delete Successfully");

    } catch (error) {
        res.status(500).json(error.message)
    }
}
export const getOderById = async (req, res) => {
    const { id } = req.params;
    try {


        const orders = await orderModel.findById(id).populate(
            "shippingAddressId"
        ).populate(
            "userId"
        ).exec()
        if (!orders) {
            return res.status(404).json({ message: "Order not found" });
        }

        return res.status(200).json(orders);

    } catch (error) {
        res.status(500).json(error.message)
    }
}
export const changingOrderStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;


    try {
        const orders = await orderModel.findByIdAndUpdate(id, {
            orderStatus: status
        }, { new: true });

        if (!orders) {
            return res.status(404).json({ message: "Order Status change" });
        }
        return res.status(200).json(orders);

    } catch (error) {
        res.status(500).json(error.message)
    }
}
export const revenueByMonth = async (req, res) => {
    try {
        const revenueData = await orderModel.aggregate([
            {
                $unwind: '$orderItems'
            },
            {
                $group: {
                    _id: {
                        month: { $month: '$createdAt' },
                        year: { $year: '$createdAt' }
                    },
                    totalAmount: { $sum: { $multiply: ['$orderItems.quantity', '$orderItems.price'] } },
                }
            },
            {
                $sort: { '_id.year': 1, '_id.month': 1 }
            }
        ]);

        const formattedData = revenueData.map((data) => ({
            dateAndYear: data._id,
            totalAmount: data.totalAmount,
            totalOrders: data.totalOrders,
        }));

        res.json(formattedData);
    } catch (error) {
        res.status(500).send('Server error');
    }
}
export const orderByMonth = async (req, res) => {
    try {

        const orderData = await orderModel.aggregate([

            {
                $group: {
                    _id: {
                        month: { $month: "$createdAt", },
                        year: { $year: "$createdAt", }
                    },
                    totalOrders: { $sum: 1 }
                }
            },
            {
                $sort: { '_id.year': 1, '_id.month': 1 }
            }
        ]);

        const formattedData = orderData.map((data) => ({
            date: data._id,
            totalOrders: data.totalOrders,
        }));

        res.json(formattedData);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
}
export const getTopSellingProducts = async (req, res) => {
    try {
        const topSellingProducts = await orderModel.aggregate([
            { $unwind: "$orderItems" },
            {
                $group: {
                    _id: {
                        productname: "$orderItems.productname",
                        imageUrl: "$orderItems.imageUrl"
                        
                    },
                    totalQuantity: { $sum: "$orderItems.quantity" }
                }
            },
            {
                $project: {
                    _id: 0,
                    productname: "$_id.productname",
                    imageUrl: "$_id.imageUrl",
                    totalQuantity: 1
                }
            },
            { $sort: { totalQuantity: -1 } },
            { $limit: 5 }
        ]);

        res.json(topSellingProducts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const getLastSevenDayOrder = async (req, res) => {
    try {
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 7);

        const orders = await orderModel.aggregate([
            {
                $match: {
                    createdAt: { $gte: startDate }
                }
            },
            {
                $group: {
                    _id: {
                        $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
                    },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { _id: 1 }
            }
        ]);


        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};