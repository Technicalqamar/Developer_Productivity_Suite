import mongoose from "mongoose";

const generatedProjectSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User reference is required"],
    },
    projectName: {
      type: String,
      required: [true, "Project name is required"],
      trim: true,
      maxlength: [200, "Project name must be at most 200 characters"],
    },
    tool: {
      type: String,
      required: [true, "Tool identifier is required"],
      enum: {
        values: ["bootstrap", "admin", "auth", "schema", "api-builder"],
        message: "{VALUE} is not a supported tool",
      },
    },
    configuration: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    status: {
      type: String,
      enum: {
        values: ["pending", "processing", "completed", "failed"],
        message: "{VALUE} is not a supported status",
      },
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

generatedProjectSchema.index({ user: 1, createdAt: -1 });
generatedProjectSchema.index({ status: 1 });

const GeneratedProject = mongoose.model("GeneratedProject", generatedProjectSchema);

export default GeneratedProject;
