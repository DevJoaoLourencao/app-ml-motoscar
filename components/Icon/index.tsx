import { Image, ImageProps, View } from "react-native";
import { SvgXml } from "react-native-svg";

interface IIcon extends ImageProps {
  iconName?: string;
  fill?: string;
  withBg?: boolean;
  className?: string;
}

function Icon({ iconName, fill, withBg, className, ...props }: IIcon) {
  const replaceFillColor = (svgString: string, color: string | undefined) => {
    if (!color) return svgString;
    return svgString.replace(/fill="([^"]+)"/g, `fill="${color}"`);
  };

  const svgWithNewColor = iconName ? replaceFillColor(iconName, fill) : "";

  return (
    <View
      className={`rounded-full justify-center items-center ${
        withBg ? "bg-gray-100 dark:bg-gray-800" : "bg-transparent"
      } ${className || ""}`}
    >
      {iconName && iconName.length > 0 ? (
        <SvgXml xml={svgWithNewColor} />
      ) : (
        <Image {...props} />
      )}
    </View>
  );
}

export default Icon;
