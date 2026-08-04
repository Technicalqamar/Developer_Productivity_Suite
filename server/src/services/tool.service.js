import mongoose from "mongoose";
import Tool from "../models/Tool.js";
import AppError from "../utils/AppError.js";

const assertValidId = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError("Invalid tool id.", 400);
  }
};

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const ALLOWED_STATUS_TRANSITIONS = Object.freeze({
  draft: ["testing"],
  testing: ["published"],
  published: ["testing", "deprecated"],
  deprecated: ["draft"],
});

const assertValidTransition = (from, to) => {
  if (from === to) {
    return;
  }

  const allowed = ALLOWED_STATUS_TRANSITIONS[from] ?? [];

  if (!allowed.includes(to)) {
    throw new AppError(
      `Status cannot transition from "${from}" to "${to}".`,
      400
    );
  }
};

const assertCanEnableDeveloperVisible = (status) => {
  if (status !== "published") {
    throw new AppError(
      "Only published tools can be made visible to developers.",
      400
    );
  }
};

const assertCanEnableComingSoon = (status) => {
  if (status !== "published") {
    throw new AppError(
      "Coming soon can only be enabled on published tools.",
      400
    );
  }
};

const assertSlugAvailable = async (slug, excludeId = null) => {
  const filter = { slug };

  if (excludeId) {
    filter._id = { $ne: excludeId };
  }

  const existing = await Tool.findOne(filter).select("_id");

  if (existing) {
    throw new AppError("Slug already exists.", 409);
  }
};

export const createTool = async (data, userId) => {
  await assertSlugAvailable(data.slug);

  return Tool.create({
    ...data,
    status: "draft",
    developerVisible: false,
    comingSoon: false,
    createdBy: userId,
    updatedBy: userId,
  });
};

export const listTools = async ({
  search,
  status,
  category,
  developerVisible,
  isActive,
} = {}) => {
  const query = {};

  if (search) {
    const escaped = escapeRegex(search);
    query.$or = [
      { name: { $regex: escaped, $options: "i" } },
      { slug: { $regex: escaped, $options: "i" } },
      { category: { $regex: escaped, $options: "i" } },
    ];
  }

  if (status) {
    query.status = status;
  }

  if (category) {
    query.category = category;
  }

  if (typeof developerVisible === "boolean") {
    query.developerVisible = developerVisible;
  }

  if (typeof isActive === "boolean") {
    query.isActive = isActive;
  }

  return Tool.find(query).sort({ displayOrder: 1, createdAt: -1 });
};

export const getToolById = async (id) => {
  assertValidId(id);

  const tool = await Tool.findById(id);

  if (!tool) {
    throw new AppError("Tool not found.", 404);
  }

  return tool;
};

export const updateTool = async (id, data, userId) => {
  assertValidId(id);

  const tool = await Tool.findById(id);

  if (!tool) {
    throw new AppError("Tool not found.", 404);
  }

  if (data.slug && data.slug !== tool.slug) {
    await assertSlugAvailable(data.slug, tool._id);
  }

  const nextStatus = data.status ?? tool.status;

  if (data.status && data.status !== tool.status) {
    assertValidTransition(tool.status, data.status);
  }

  const developerVisible =
    data.developerVisible === undefined
      ? tool.developerVisible
      : data.developerVisible;

  if (developerVisible) {
    assertCanEnableDeveloperVisible(nextStatus);
  }

  const comingSoon =
    data.comingSoon === undefined ? tool.comingSoon : data.comingSoon;

  if (comingSoon) {
    assertCanEnableComingSoon(nextStatus);
  }

  Object.assign(tool, data, {
    status: nextStatus,
    developerVisible: nextStatus === "published" ? developerVisible : false,
    comingSoon: nextStatus === "published" ? comingSoon : false,
    updatedBy: userId,
  });
  await tool.save();

  return tool;
};

export const deleteTool = async (id) => {
  assertValidId(id);

  const tool = await Tool.findByIdAndDelete(id);

  if (!tool) {
    throw new AppError("Tool not found.", 404);
  }

  return { id };
};

const applyStatusChange = async (
  id,
  toStatus,
  userId,
  { clearVisibility = false, requiredSource = null } = {}
) => {
  assertValidId(id);

  const tool = await Tool.findById(id);

  if (!tool) {
    throw new AppError("Tool not found.", 404);
  }

  if (requiredSource) {
    if (tool.status !== requiredSource) {
      throw new AppError(
        `Only "${requiredSource}" tools can transition to "${toStatus}".`,
        400
      );
    }
  } else {
    assertValidTransition(tool.status, toStatus);
  }

  tool.status = toStatus;
  tool.updatedBy = userId;

  if (clearVisibility) {
    tool.developerVisible = false;
    tool.comingSoon = false;
  }

  await tool.save();

  return tool;
};

export const updateToolStatus = (id, status, userId) =>
  applyStatusChange(id, status, userId, {
    clearVisibility: status !== "published",
  });

export const publishTool = (id, userId) =>
  applyStatusChange(id, "published", userId);

export const unpublishTool = (id, userId) =>
  applyStatusChange(id, "testing", userId, { clearVisibility: true });

export const deprecateTool = (id, userId) =>
  applyStatusChange(id, "deprecated", userId, { clearVisibility: true });

export const restoreTool = (id, userId) =>
  applyStatusChange(id, "draft", userId, {
    requiredSource: "deprecated",
    clearVisibility: true,
  });

export const updateToolVisibility = async (id, developerVisible, userId) => {
  assertValidId(id);

  const tool = await Tool.findById(id);

  if (!tool) {
    throw new AppError("Tool not found.", 404);
  }

  if (developerVisible) {
    assertCanEnableDeveloperVisible(tool.status);
  }

  tool.developerVisible = developerVisible;
  tool.updatedBy = userId;
  await tool.save();

  return tool;
};

export const listPublishedTools = async () => {
  return Tool.find({
    status: "published",
    developerVisible: true,
    isActive: true,
  }).sort({ displayOrder: 1, createdAt: -1 });
};
