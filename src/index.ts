import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import http from "http";
import compression from "compression";
import cookieParser from "cookie-parser";
import connectDB from "./libs/connect";
import user from "./routes/user";

const app = express();
app.use(
  cors({
    credentials: true,
  })
);
const server = http.createServer(app);
const PORT = 3000;

app.use(bodyParser.json());
app.use(cookieParser());
app.use(compression());
app.use("/", user);

const startServer = async () => {
  connectDB();
  server.listen(PORT, () => console.log(`server running at port ${PORT}`));
};

startServer();
