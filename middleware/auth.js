const jwt = require("jsonwebtoken");


// const jwt = require('jsonwebtoken');

// module.exports = function (req, res, next) {
//   // Get token from header
//   const token = req.header('x-auth-token');

//   // Check if no token
//   if (!token) {
//     return res.status(401).json({ msg: 'No token, authorization denied' });
//   }

//   // Verify token
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded.user;
//     next();
//   } catch (err) {
//     res.status(401).json({ msg: 'Token is not valid' });
//   }
// };

const auth = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).send({ message: "Unauthorized - Token missing" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).send({ message: "Unauthorized - Token missing" });
  }

  try {
    const decoded = jwt.verify(token, "secretkey");
    req.user = decoded; // Attach decoded user information to the request
    next();
  } catch (err) {
    console.error("JWT Error:", err); // Log JWT errors
    return res.status(401).json({ message: "Unauthorized - Invalid token" });
  }
};

module.exports = auth;

