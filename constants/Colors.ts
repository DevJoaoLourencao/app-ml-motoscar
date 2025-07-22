import { BrandColors } from "./BrandColors";

const tintColorLight = BrandColors.primary;
const tintColorDark = BrandColors.white;

export default {
  light: {
    text: BrandColors.text.primary,
    background: BrandColors.background.primary,
    tint: tintColorLight,
    tabIconDefault: BrandColors.gray400,
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: BrandColors.text.light,
    background: BrandColors.background.dark,
    tint: tintColorDark,
    tabIconDefault: BrandColors.gray600,
    tabIconSelected: tintColorDark,
  },
};
