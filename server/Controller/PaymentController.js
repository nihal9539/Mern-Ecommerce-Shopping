
import Razorpay from 'razorpay';
import crypto from 'crypto';
import paymentModel from '../model/PaymentModel.js';
import CartModel from '../model/CartModel.js';
import orderModel from '../model/OrderModel.js';
import ProductModel from '../model/ProductModel.js';
var razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});
export const order = async (req, res) => {
    const { amount } = req.body;

    try {
        const options = {
            amount: Number(amount * 100),
            currency: "INR",
            receipt: crypto.randomBytes(10).toString("hex"),
        }

        razorpayInstance.orders.create(options, (error, order) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ message: "Something Went Wrong!" });
            }
            res.status(200).json(order);
            console.log(order)
        });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error!" });
        console.log(error);
    }
}
export const verify = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, userId, addressId } = req.body;
    try {
        // Create Sign
        const sign = razorpay_order_id + "|" + razorpay_payment_id;

        // Create ExpectedSign
        const expectedSign = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(sign.toString())
            .digest("hex");

        // console.log(razorpay_signature === expectedSign);

        // Create isAuthentic
        const isAuthentic = expectedSign === razorpay_signature;

        // Condition 
        if (isAuthentic) {
            const payment = new paymentModel({
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature
            });

            // Save Payment 
            await payment.save();
            const cart = await CartModel.aggregate([
                {
                    '$match': {
                        'userId': userId
                    }
                }, {
                    '$unwind': '$products'
                }, {
                    '$project': {
                        'quantity': '$products.quantity',
                        'size': '$products.size',
                        'price': '$products.price',
                        'productId': '$products.productId',
                    }
                }, {
                    '$lookup': {
                        'from': 'products',
                        'localField': 'productId',
                        'foreignField': '_id',
                        'as': 'productData'
                    }
                }, {
                    '$project': {
                        'size': 1,
                        "productId": 1,
                        'quantity': 1,
                        'price': 1,
                        'productname': {
                            '$arrayElemAt': [
                                '$productData.productname', 0
                            ]
                        },
                        'imagrUrl': {
                            '$arrayElemAt': [
                                '$productData.images.url', 0
                            ]
                        }
                    }
                }
            ]);
            const newOrder = new orderModel({
                userId: userId,
                orderItems: cart,
                shippingAddressId: addressId,
                isDelivered: false,
                paymentResultId: payment
            })
            await newOrder.save()
            console.log(newOrder);
            if (newOrder) {
                await CartModel.deleteOne({
                    userId: userId
                })
                for (const updateData of cart) {
                    console.log(updateData);
                    const { productId, size, quantity } = updateData;

                    await ProductModel.updateOne(
                        { _id: productId, 'sizes.size': size },
                        { $inc: { 'sizes.$.quantity': -quantity } }
                    );
                }
               return res.status(200).json({
                    message: "Payement Successfully"
                });
            }
            return res.status(400).json({
                 message: "Payement Incomplete"
             });



        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error!" });
        console.log(error);
    }
}

