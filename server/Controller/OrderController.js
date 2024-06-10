import orderModel from "../model/OrderModel.js";

export const getOrder = async (req, res) => {
    const { userId } = req.params;

    try {

        const orders = await orderModel.find({
            userId
        })

        if (orders.length === 0) {
            return res.status(200).json([]);  // Return an empty array if no orders are found
        }
        

        return res.status(200).json(Array.isArray(orders) ? orders : [orders]);

    } catch (error) {
        res.status(500).json(error.message)
    }
}