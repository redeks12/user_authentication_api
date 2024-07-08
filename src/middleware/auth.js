import tok from "../utilities/tokens.js";
const { verifyToken } = tok;
const authenticate = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const decoded = verifyToken(token);
    if (decoded == null) {
      throw new Error("invalid token");
    }

    req.userData = decoded.body;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(403).json({
        message: "Token expired!",
      });
    } else {
      return res.status(401).json({
        message: "Authentication failed!",
      });
    }
  }
};

export default authenticate;
