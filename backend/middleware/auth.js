const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "No token provided, authorization denied",
      });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Log the decoded user information
    console.log("Decoded user:", decoded);

    req.user = decoded;
    next();
  } catch (error) {
    console.error("Authorization error:", error); // Log the error
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: "Token verification failed, authorization denied",
    });
  }
};

module.exports = { authMiddleware };
