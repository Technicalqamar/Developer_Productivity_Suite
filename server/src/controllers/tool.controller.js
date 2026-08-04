import ApiResponse from "../utils/ApiResponse.js";
import * as toolService from "../services/tool.service.js";

export const createTool = async (req, res, next) => {
  try {
    const tool = await toolService.createTool(req.body, req.user._id);
    ApiResponse.success(res, {
      message: "Tool created successfully.",
      data: tool,
      statusCode: 201,
    });
  } catch (error) {
    next(error);
  }
};

export const listTools = async (req, res, next) => {
  try {
    const tools = await toolService.listTools(req.query);
    ApiResponse.success(res, {
      message: "Tools fetched successfully.",
      data: tools,
      statusCode: 200,
    });
  } catch (error) {
    next(error);
  }
};

export const getToolById = async (req, res, next) => {
  try {
    const tool = await toolService.getToolById(req.params.id);
    ApiResponse.success(res, {
      message: "Tool fetched successfully.",
      data: tool,
      statusCode: 200,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTool = async (req, res, next) => {
  try {
    const tool = await toolService.updateTool(
      req.params.id,
      req.body,
      req.user._id
    );
    ApiResponse.success(res, {
      message: "Tool updated successfully.",
      data: tool,
      statusCode: 200,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTool = async (req, res, next) => {
  try {
    const result = await toolService.deleteTool(req.params.id);
    ApiResponse.success(res, {
      message: "Tool deleted successfully.",
      data: result,
      statusCode: 200,
    });
  } catch (error) {
    next(error);
  }
};

export const updateToolStatus = async (req, res, next) => {
  try {
    const tool = await toolService.updateToolStatus(
      req.params.id,
      req.body.status,
      req.user._id
    );
    ApiResponse.success(res, {
      message: "Tool status updated successfully.",
      data: tool,
      statusCode: 200,
    });
  } catch (error) {
    next(error);
  }
};

export const updateToolVisibility = async (req, res, next) => {
  try {
    const tool = await toolService.updateToolVisibility(
      req.params.id,
      req.body.developerVisible,
      req.user._id
    );
    ApiResponse.success(res, {
      message: "Tool visibility updated successfully.",
      data: tool,
      statusCode: 200,
    });
  } catch (error) {
    next(error);
  }
};

export const publishTool = async (req, res, next) => {
  try {
    const tool = await toolService.publishTool(req.params.id, req.user._id);
    ApiResponse.success(res, {
      message: "Tool published successfully.",
      data: tool,
      statusCode: 200,
    });
  } catch (error) {
    next(error);
  }
};

export const unpublishTool = async (req, res, next) => {
  try {
    const tool = await toolService.unpublishTool(req.params.id, req.user._id);
    ApiResponse.success(res, {
      message: "Tool unpublished successfully.",
      data: tool,
      statusCode: 200,
    });
  } catch (error) {
    next(error);
  }
};

export const deprecateTool = async (req, res, next) => {
  try {
    const tool = await toolService.deprecateTool(req.params.id, req.user._id);
    ApiResponse.success(res, {
      message: "Tool deprecated successfully.",
      data: tool,
      statusCode: 200,
    });
  } catch (error) {
    next(error);
  }
};

export const restoreTool = async (req, res, next) => {
  try {
    const tool = await toolService.restoreTool(req.params.id, req.user._id);
    ApiResponse.success(res, {
      message: "Tool restored successfully.",
      data: tool,
      statusCode: 200,
    });
  } catch (error) {
    next(error);
  }
};

export const listPublishedTools = async (req, res, next) => {
  try {
    const tools = await toolService.listPublishedTools();
    ApiResponse.success(res, {
      message: "Tools fetched successfully.",
      data: tools,
      statusCode: 200,
    });
  } catch (error) {
    next(error);
  }
};
