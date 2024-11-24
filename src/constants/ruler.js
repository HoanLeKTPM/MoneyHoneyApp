import { Dimensions } from "react-native";

export const windowWidth = Dimensions.get("window").width;
export const windowHeight = Dimensions.get("window").height;
export const sizeFactor = windowWidth / 25.7;

export const managerCategoryWidth = (windowWidth - 5 * sizeFactor) / 4;
export const managerCategoryHeight = (windowWidth - 5 * sizeFactor) / 4;

export const managerCategorySize = (windowWidth - 5 * sizeFactor) / 4;
export const categorySize = ((windowWidth - 5 * sizeFactor) / 4) * 0.75;
export const iconCategorySize = (windowWidth - sizeFactor * 9) / 4;
export const iconCategoryImageSize = sizeFactor * 2.5;
export const smallCategorySize = (windowWidth - 8 * sizeFactor) / 4.5;
