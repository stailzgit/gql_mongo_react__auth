const { AuthenticationError } = require("apollo-server");

const jwt = require("jsonwebtoken");

// module.exports = (context) => {
//   const authHeader = context.req.headers.authorization;
//   if (authHeader) {
//     const token = authHeader.split("Bearer")[1];
//     if (token) {
//       try {
//         const user = jwt.verify(token, "UNSAFE_STRING");
//         return user;
//       } catch (e) {
//         throw new AuthenticationError("Invalid/Expired token");
//       }
//     }
//     throw new Error("Authentication token must be 'Bearer [token]' ");
//   }
//   throw new Error("Authentication header must be provided ");
// };

module.exports = (context) => {
  // const authHeader = context.req.headers.authorization;
  // if (!authHeader) throw new Error("Authentication header must be provided ");
  // const token = authHeader.split("Bearer")[1];
  // if (!token) throw new Error("Authentication token must be 'Bearer [token]' ");
  // try {
  //   return jwt.verify(token, "UNSAFE_STRING");
  // } catch (e) {
  //   throw new AuthenticationError("Invalid/Expired token");
  // }
};
