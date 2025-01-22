import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import cookieParser from "cookie-parser";
import compression from "compression";
import fileUpload from "express-fileupload";
import cors from "cors";
import createHttpError from "http-errors";
import router from "./routes/index.js";
import bodyParser from "body-parser";

dotenv.config();

const app = express();

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.use(helmet());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(mongoSanitize());
app.use(cookieParser());
app.use(compression());

app.use(
  fileUpload({
    useTempFiles: true,
  })
);

app.use(
  cors({
    // origin: "http://localhost:3000",
  })
);

// app.get("/", (req, res) => {
//   res.send("hello from server");
// });

// app.post("/test", (req, res) => {
//   // res.status(409).json({ message: "there is conflite" });
//   throw createHttpError.BadRequest("this route has an error");
// });

// add swagger

// add api v1 routes
app.use("/api/v1", router);

app.use((err, req, res, next) => {
  // next(createHttpError.NotFound("This route dose not exist."));
  next(err);
});

app.use(async (err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

export default app;
