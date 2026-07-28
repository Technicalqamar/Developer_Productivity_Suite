import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import rateLimit from "express-rate-limit";

const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173", credentials: true }));
app.use(compression());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
  })
);

app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "Developer Productivity Suite API is running." });
});

app.use((req, res) => {
  res.status(404).json({ success: false, message: "Not Found" });
});

app.use((err, req, res, _next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ success: false, message: err.message || "Internal Server Error" });
});

export default app;
