import { config as conf } from "dotenv";

conf()


const config = {
    port: process.env.PORT || 3000,
    jwt_secret: process.env.JWT_SECRET,
    db_uri: process.env.DATABASE_URL,
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    cloud_api_key: process.env.CLOUDINARY_API_KEY,
    cloud_api_secret: process.env.CLOUDINARY_API_SECRET,
}

export default Object.freeze(config);