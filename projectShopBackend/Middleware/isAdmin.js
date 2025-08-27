// const isAdminMiddleWare = async (req, res, next) => {
//   try {
//     console.log("the user is ----", req.users);
//     const roleAdmin = req.users.isAdmin;
//     if (!roleAdmin) {
//       return res.status(403).json({ message: "is admin_ is found" });
//     }
//     next();
//   } catch (error) {
//     next(error);
//   }
// };

// module.exports = isAdminMiddleWare;
