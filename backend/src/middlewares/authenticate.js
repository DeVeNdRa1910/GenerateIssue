import jwt from "jsonwebtoken";
import conf from "../utils/conf.js";

async function authenticate(req, res, next) {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const tokenParts = token.split(" ");
        if(tokenParts.length !== 2 || tokenParts[0] !== "Bearer"){
            return res.status(401).json({ message: "Invalid authorized problem" });
        }

        const passedToken = tokenParts[1];

        try {
            const decoded = jwt.verify(passedToken, conf.jwt_secret);
            console.log(decoded);
            let role = decoded.role;
            if(role=="Employee"){
                return res.status(401).json({ message: "Employee can't do that" });
            }
        } catch (error) {
            console.log(error);
            return res.status(401).json({ message: "Unauthorized" });
        }
        next();

    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: "Unauthorized" });
    }
}

export default authenticate;