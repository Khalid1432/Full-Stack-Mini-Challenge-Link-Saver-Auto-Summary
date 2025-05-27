const jwt = require('jsonwebtoken');

exports.authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is missing"
      });
    }

    // Verify token
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decode;
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Token is invalid"
      });
    }

    next();
  } catch (error) {
    console.error("Inavlid token :", error);
    res.status(500).json({
      success: false,
      message: "Somethogn went to wrong",
    });
  }
}