import "dotenv/config";
import app from "./app.js";
import env from "./config/env.js";
import connectDB from "./config/db.js";

const startServer = async () => {
  await connectDB();

  app.listen(env.PORT, () => {
    console.log(`Server running on port ${env.PORT}`);
    console.log(`Environment: ${env.NODE_ENV}`);
  });
};

startServer();
