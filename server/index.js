import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(cors());
app.use("/posts", postRoutes);
app.use("/users", userRoutes);

const CONNECTION_URL =
  "mongodb+srv://axitthummar4:axitthu147@cluster0.qiirm9r.mongodb.net/?retryWrites=true&w=majority";
const PORT = https://moments-iota.vercel.app;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log("server is running")))
  .catch((err) => console.log(err.message));

// mongoose.set("useFindAndModify", false);
