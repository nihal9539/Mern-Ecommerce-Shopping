import UserModel from "../model/userModel.js"
import bcypt from "bcrypt"
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb"

// Register New User
export const registerUser = async (req, res) => {
    const { email, username, password } = req.body;
    try {
        const oldUser = await UserModel.findOne({ email })
        if (oldUser) {
            return res.status(400).json("User Already registered")
        }
        const salt = await bcypt.genSalt(10)
        const hashPassword = await bcypt.hash(password, salt)
        const userData = {
            username,
            email,
            password: hashPassword,
            phone: null,
            birthday: "",
            gender: ""
        }
        const newUser = new UserModel(userData)

        const user = await newUser.save()
        const token = jwt.sign({
            username: user.username,
            id: user._id

        }, process.env.JWT_SECRET, { expiresIn: '30d' })
        res.status(200).json({ user, token })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }

}

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email: email })
        if (user) {
            const validity = await bcypt.compare(password, user.password)
            if (!validity) {

                res.status(400).json("Wrong password")
            } else {
                const token = jwt.sign({
                    username: user.username,
                    id: user._id

                }, process.env.JWT_SECRET, { expiresIn: '30d' })
                res.status(200).json({ user, token })
            }
        } else {
            res.status(404).json('user Not found')

        }
    } catch (error) {
        res.status(500).json({ message: error.message })

    }
}

export const updateUserProfile = async (req, res) => {
    const { userId } = req.params;
    try {

        const id = new ObjectId(userId)
        const userCheck = await UserModel.findById(id);

        if (!userCheck) {
            return res.status(404).json("User Not found");
        }
        else {


            const user = await UserModel.findByIdAndUpdate({ _id: userId }, {
                $set: {
                    birthday: req.body?.birthday,
                    gender: req.body?.gender,
                    phone: req.body?.phone,
                    username: req.body?.username,
                },

            }, { new: true })
            if (!user) {
                return res.status(404).json("User Not found after update");
            }
            const token = jwt.sign({
                username: user.username,
                id: user._id

            }, process.env.JWT_SECRET, { expiresIn: '30d' })
            res.status(200).json({ user, token })
        }

    } catch (error) {
        res.status(500).json(error.message)

    }
}
export const AllUser = async (req, res) => {

    try {
        let users = await UserModel.find()
        users.map((user) => {
            const { password, ...otherDetails } = user._doc
            return otherDetails
        })
        if (!users.length == 0) {
            res.status(200).json(users)
        }
        else {
            res.status(404).json('No users')
        }
    } catch (error) {
        res.status(500).json({ message: error.message })

    }


}

export const MonthlyUserRegistraction = async (req, res) => {
    try {
        const userData = await UserModel.aggregate([
            {
                $group: {
                    _id: {
                        month: { $month: '$createdAt' },
                        year: { $year: '$createdAt' }
                    },
                    totalUsers: { $sum: 1 }
                }
            },
            {
                $sort: { '_id.year': 1, '_id.month': 1 }
            }
        ]);
        const formattedData = userData.map((data) => ({
            month: data._id.month,
            year: data._id.year,
            totalUsers: data.totalUsers,
        }));

        res.json(formattedData);
        // res.json(userData);
    } catch (error) {
        res.status(500).send('Server error');
    }
}