function validateToken(req, res, next) {
  const token = Number(req.headers.authorization);
  console.log(token);
  if (token % 7 === 0) {
    next();
    return;
  } else {
    return res.status(401).json({ message: "ACCESS DENIED" });
  }
}

export default validateToken;
