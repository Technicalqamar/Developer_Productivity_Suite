import mongoose from "mongoose";

const toolSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Tool name is required"],
      trim: true,
      minlength: [3, "Tool name must be at least 3 characters"],
      maxlength: [100, "Tool name must be at most 100 characters"],
    },
    slug: {
      type: String,
      required: [true, "Slug is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
        "Slug must be lowercase letters, numbers and hyphens only",
      ],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
      minlength: [1, "Category is required"],
      maxlength: [50, "Category must be at most 50 characters"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [1000, "Description must be at most 1000 characters"],
      default: "",
    },
    icon: {
      type: String,
      trim: true,
      maxlength: [200, "Icon must be at most 200 characters"],
      default: "",
    },
    version: {
      type: String,
      trim: true,
      maxlength: [50, "Version must be at most 50 characters"],
      default: "",
    },
    status: {
      type: String,
      enum: {
        values: ["draft", "testing", "published", "deprecated"],
        message: "{VALUE} is not a supported status",
      },
      default: "draft",
    },
    developerVisible: {
      type: Boolean,
      default: true,
    },
    comingSoon: {
      type: Boolean,
      default: false,
    },
    displayOrder: {
      type: Number,
      default: 0,
      min: [0, "Display order must be 0 or greater"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

toolSchema.index({ status: 1, developerVisible: 1, isActive: 1 });
toolSchema.index({ displayOrder: 1, createdAt: -1 });

const Tool = mongoose.model("Tool", toolSchema);

export default Tool;
