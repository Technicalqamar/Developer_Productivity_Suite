import mongoose from "mongoose";

const templateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Template name is required"],
      trim: true,
      maxlength: [100, "Template name must be at most 100 characters"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: {
        values: ["bootstrap", "admin", "auth", "schema", "api-builder", "email", "config"],
        message: "{VALUE} is not a supported category",
      },
    },
    version: {
      type: String,
      required: [true, "Version is required"],
      default: "1.0.0",
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, "Description must be at most 500 characters"],
      default: "",
    },
    path: {
      type: String,
      required: [true, "Template file path is required"],
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

templateSchema.index({ category: 1, isActive: 1 });

const Template = mongoose.model("Template", templateSchema);

export default Template;
