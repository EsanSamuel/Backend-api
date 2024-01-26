import jwt from "jsonwebtoken";

const secret = "mytokensecret";

const generateToken = (userId: string) => {
  const token = jwt.sign({ userId }, secret, { expiresIn: "1h" });
  return token;
};

export default generateToken
