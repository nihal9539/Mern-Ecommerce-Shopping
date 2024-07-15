import bcypt from "bcrypt"
import jwt from "jsonwebtoken";
import AdminModel from "../Model/AdminModel.js";

// Register New User
export const registerAdmin = async (req, res) => {
    const { email, username, password } = req.body;
    try {
        const oldUser = await AdminModel.findOne({ email })
        if (oldUser) {
            return res.status(400).json("Admin Already registered")
        }
        const salt = await bcypt.genSalt(10)
        const hashPassword = await bcypt.hash(password, salt)
        const userData = {
            username,
            email,
            password: hashPassword,
           
        }
        const newAdmin = new AdminModel(userData)

        const admin = await newAdmin.save()
        const token = jwt.sign({
            username: admin.username,
            id: admin._id

        }, process.env.JWT_SECRET, { expiresIn: '30d' })
        res.status(200).json({ admin, token })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }

}

export const loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await AdminModel.findOne({ email: email })
        if (admin) {
            const validity = await bcypt.compare(password, admin.password)
            if (!validity) {

                res.status(400).json("Wrong password")
            } else {
                const token = jwt.sign({
                    username: admin.username,
                    id: admin._id

                }, process.env.JWT_SECRET, { expiresIn: '30d' })
                res.status(200).json({ admin, token })
            }
        } else {
            res.status(404).json('Admin Not found')

        }
    } catch (error) {
        res.status(500).json({ message: error.message })

    }
}

