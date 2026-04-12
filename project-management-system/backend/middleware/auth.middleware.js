
import jwt from "jsonwebtoken";

export const protect = (roles = []) => {
  return (req, res, next) => {
    try {
    

const token = req.headers.authorization;

if (!token) return res.status(401).json({ msg: "No token" });


const actualToken = token.startsWith("Bearer ")
  ? token.split(" ")[1]
  : token;

const decoded = jwt.verify(actualToken, process.env.JWT_SECRET);

      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ msg: "Access denied" });
      }

      req.user = decoded;
      next();

    } catch (err) {
      return res.status(401).json({ msg: "Invalid token" });
    }
  };
};