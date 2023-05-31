import dotenv from "dotenv";
import express, { urlencoded, json } from "express";
import cors from "cors";
 
import logins from "./routes/logins.js";
import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, 
  message: "You have exceeeded the maximum number of requests: 50, please try again later"
});
dotenv.config();

const app = express();
app.use(cors());

// Enable CORS for the /logins route
const BASE_URL = "api";

const PORT = process.env.PORT;
app.use(urlencoded({ extended: false }));
app.use(json());
app.use(limiter);

app.use(`/${BASE_URL}/logins`, logins);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});