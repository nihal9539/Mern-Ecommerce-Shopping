import UserModel from "../Model/userModel.js";
import bcypt from "bcrypt"
import jwt from "jsonwebtoken";


// Register New User
export const registerUser = async (req, res) => {
    console.log(req.body);
    const { username } = req.body;
    const oldUser = await UserModel.findOne({ username })
    if (oldUser) {
        res.status(400).json("User Already registered")
    }
    else{
        const salt = await bcypt.genSalt(10)
    const hashPassword = await bcypt.hash(req.body.password, salt)
    req.body.password = hashPassword
    const newUser = new UserModel(req.body)
    try {
        const user = await newUser.save()
        const token = jwt.sign({
            username: user.username,
            
            id: user._id

        }, process.env.JWT_SECRET, { expiresIn: '10h' })
        res.status(200).json({ user, token })

    } catch (error) {
        res.status(500).json({ message: error.message })
        console.log(error);
    }
    }

}

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email: email })
        if (user) {
            const validity = await bcypt.compare(password, user.password)
            console.log(validity);
            if (!validity) {
                
                res.status(400).json("Wrong password")
            } else {
                const token = jwt.sign({
                    username: user.username,
                    id: user._id
        
                }, process.env.JWT_SECRET, { expiresIn: '10h' })
                res.status(200).json({ user, token })
            }
        } else {
            res.status(404).json('user Not found')
           
        }
    } catch (error) {
        res.status(500).json({ message: error.message })

    }
}