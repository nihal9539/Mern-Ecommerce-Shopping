import dotenv from "dotenv"
import { v2 as cloudinary } from 'cloudinary';

dotenv.config()
cloudinary.config({
    cloud_name: "djwiw4h3n",
    api_key: "298818413986941",
    
    api_secret: process.env.CLODINARY_SECRET // Click 'View Credentials' below to copy your API secret
});

export default cloudinary