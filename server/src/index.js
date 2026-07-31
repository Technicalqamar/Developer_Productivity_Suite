import "dotenv/config";
import app from "./app.js";
import env from "./config/env.js";
import connectDB from "./config/db.js";
import seedAdmin from "./seeds/adminSeeder.js";

const startServer = async () => {
  try {
    await connectDB();
    await seedAdmin();

    app.listen(env.PORT, () => {
      console.log(`Server running on port ${env.PORT}`);
      console.log(`Environment: ${env.NODE_ENV}`);
    });
  } catch (error) {
    console.error(`Failed to start server: ${error.message}`);
    process.exit(1);
  }
};

startServer();
