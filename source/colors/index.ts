import colors from "./colors.json"

const _COL = colors;

const _GRADIANTS_COLORS = [{
    primary: ["#FF416C", "#FF4B2B", "#FF0000"], // Vibrant red to orange-red
    secondary: ["#FF6B6B", "#FF8E8E", "#FFA5A5"],
    background: ["#FFFFFF", "#FFF5F5", "#FFE8E8"], // White to soft pink
    cardGradient: ["#FFFFFF", "#FDFDFD", "#FAFAFA"],
    cardSelectedGradient: ["#FF416C", "#FF4B2B", "#FF0000"],
    buttonGradient: ["#FF416C", "#FF4B2B", "#FF0000"],
    textPrimary: "#1F2937",
    textSecondary: "#6B7280",
    textLight: "#FFFFFF",
    border: "#F3F4F6",
    shadow: "rgba(255, 65, 108, 0.15)"
}, {
    primary: ["#FF416C", "#FF4B2B", "#FF0000"], // Vibrant red to orange-red (kept vibrant for dark mode)
    secondary: ["#FF6B6B", "#FF8E8E", "#FFA5A5"], // Slightly muted for better dark mode contrast
    background: ["#0F1419", "#1A1F2E", "#1F2937"], // Deep dark grays with slight blue tint
    cardGradient: ["#1F2937", "#1A1F2E", "#171B26"],
    cardSelectedGradient: ["#FF416C", "#FF4B2B", "#FF0000"], // Same vibrant gradient for emphasis
    buttonGradient: ["#FF416C", "#FF4B2B", "#FF0000"], // Kept vibrant for CTAs
    textPrimary: "#F9FAFB",
    textSecondary: "#9CA3AF",
    textLight: "#FFFFFF",
    border: "#374151",
    shadow: "rgba(255, 65, 108, 0.25)" // Slightly stronger for visibility on dark
}];

export { _COL, _GRADIANTS_COLORS };