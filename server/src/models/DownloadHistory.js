import mongoose from "mongoose";

const downloadHistorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User reference is required"],
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "GeneratedProject",
      required: [true, "Project reference is required"],
    },
    downloadedAt: {
      type: Date,
      default: Date.now,
    },
    ipAddress: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: false,
  }
);

downloadHistorySchema.index({ user: 1, downloadedAt: -1 });

const DownloadHistory = mongoose.model("DownloadHistory", downloadHistorySchema);

export default DownloadHistory;
