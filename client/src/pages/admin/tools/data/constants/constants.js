export const TOOL_STATUSES = ["Draft", "Testing", "Published", "Deprecated"];

export const ALLOWED_STATUS_TRANSITIONS = {
  Draft: ["Testing"],
  Testing: ["Published"],
  Published: ["Testing", "Deprecated"],
  Deprecated: ["Draft"],
};

export const TOOL_CATEGORIES = [
  "Code Generator",
  "UI Component",
  "CLI Tool",
  "API Service",
  "IDE Extension",
  "Utility",
];
