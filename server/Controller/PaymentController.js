
import Razorpay from 'razorpay';
import Stripe from "stripe";

import crypto from 'crypto';
import paymentModel from '../model/PaymentModel.js';
import CartModel from '../model/CartModel.js';
import orderModel from '../model/OrderModel.js';
import ProductModel from '../model/ProductModel.js';
const stripe = new Stripe('sk_test_51Pf0AJSF7wgZupPaiT5C85aGwKFQ2Kfv7btIcTXPvZhlcYD5DB14sgqXKEgfFcoIAIs0NwhH6poSqwazpGqQKb3W00MDN6QmVW');

var razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});
export const ordering = async (req, res) => {
    const { amount } = req.body;

    try {
        const options = {
            amount: Number(amount * 100),
            currency: "INR",
            receipt: crypto.randomBytes(10).toString("hex"),
        }

        razorpayInstance.orders.create(options, (error, order) => {
            if (error) {
                
                return res.status(500).json({ message: "Something Went Wrong!" });
            }
            res.status(200).json(order);
            console.log(order);
        });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error!" });
    }
}
export const verify = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, cartData,userId, addressId } = req.body;
    try {
        // Create Sign
        const sign = razorpay_order_id + "|" + razorpay_payment_id;

        // Create ExpectedSign
        const expectedSign = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(sign.toString())
            .digest("hex");


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

            const orderItems = cartData.map(item => ({
                productname: item.productname,
                productId: item.productId,
                imageUrl: item.image,
                quantity: item.quantity,
                size: item.size,
                price: item.price
            }));
            const newOrder = new orderModel({
                userId: userId,
                orderItems,
                shippingAddressId: addressId,
                isDelivered: false,
                paymentResultId: payment
            })
            console.log(newOrder);
            await newOrder.save()
            
            if (newOrder) {
                await CartModel.deleteOne({
                    userId: userId
                })
                for (const updateData of orderItems) {
                    
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
    }
}