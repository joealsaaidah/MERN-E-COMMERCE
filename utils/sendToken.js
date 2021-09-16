/* exports.sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken();
  const { password, ...currentUser } = user._doc;
  res.status(statusCode).json({
    success: true,
    ...currentUser,
    token,
  });
}; */
