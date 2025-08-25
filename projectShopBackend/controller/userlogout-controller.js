


const UserlogOut = (req, res) => {
  res.clearCookie("token", {
    httpOnly: false,
    secure: true, // true if using HTTPS
    sameSite: "None", // important for frontend usage
  });
  res.status(200).json({ message: "Logged out successfully" });
};

module.exports = UserlogOut;
