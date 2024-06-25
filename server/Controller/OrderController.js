import orderModel from "../model/OrderModel.js";

export const getUserOrder = async (req, res) => {
    const { userId } = req.params;

    try {

        const orders = await orderModel.findById({
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