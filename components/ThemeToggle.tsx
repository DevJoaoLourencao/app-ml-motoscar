import { BrandColors } from "@/constants/BrandColors";
import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "./ThemeContext";

interface ThemeToggleProps {
  size?: "small" | "medium" | "large";
  variant?: "icon" | "button" | "full";
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  size = "medium",
  variant = "icon",
}) => {
  const { theme, toggleTheme } = useTheme();

  const getSize = () => {
    switch (size) {
      case "small":
        return { icon: 16, padding: 8 };
      case "large":
        return { icon: 24, padding: 12 };
      default:
        return { icon: 20, padding: 10 };
    }
  };

  const { icon, padding } = getSize();

  if (variant === "icon") {
    return (
      <TouchableOpacity
        onPress={toggleTheme}
        style={{
          backgroundColor:
            theme === "light" ? BrandColors.gray100 : BrandColors.gray800,
          padding,
          borderRadius: 20,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <FontAwesome
          name={theme === "light" ? "moon-o" : "sun-o"}
          size={icon}
          color={theme === "light" ? BrandColors.gray600 : BrandColors.white}
        />
      </TouchableOpacity>
    );
  }

  if (variant === "button") {
    return (
      <TouchableOpacity
        onPress={toggleTheme}
        style={{
          backgroundColor:
            theme === "light" ? BrandColors.primary : BrandColors.gray800,
          paddingHorizontal: 16,
          paddingVertical: 8,
          borderRadius: 20,
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
        }}
      >
        <FontAwesome
          name={theme === "light" ? "moon-o" : "sun-o"}
          size={16}
          color={BrandColors.white}
        />
        <Text
          style={{ color: BrandColors.white, fontWeight: "600", fontSize: 14 }}
        >
          {theme === "light" ? "Modo Escuro" : "Modo Claro"}
        </Text>
      </TouchableOpacity>
    );
  }

  // Full variant
  return (
    <TouchableOpacity
      onPress={toggleTheme}
      style={{
        backgroundColor:
          theme === "light" ? BrandColors.white : BrandColors.gray800,
        borderWidth: 1,
        borderColor:
          theme === "light"
            ? BrandColors.border.light
            : BrandColors.border.dark,
        padding: 16,
        borderRadius: 12,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
        <View
          style={{
            backgroundColor:
              theme === "light" ? BrandColors.gray100 : BrandColors.gray700,
            padding: 8,
            borderRadius: 8,
          }}
        >
          <FontAwesome
            name={theme === "light" ? "moon-o" : "sun-o"}
            size={20}
            color={theme === "light" ? BrandColors.primary : BrandColors.white}
          />
        </View>
        <View>
          <Text
            style={{
              color:
                theme === "light"
                  ? BrandColors.text.primary
                  : BrandColors.text.light,
              fontWeight: "600",
              fontSize: 16,
            }}
          >
            {theme === "light" ? "Modo Escuro" : "Modo Claro"}
          </Text>
          <Text
            style={{
              color:
                theme === "light"
                  ? BrandColors.text.secondary
                  : BrandColors.text.muted,
              fontSize: 12,
            }}
          >
            {theme === "light" ? "Ativar tema escuro" : "Ativar tema claro"}
          </Text>
        </View>
      </View>
      <FontAwesome
        name="chevron-right"
        size={16}
        color={theme === "light" ? BrandColors.gray400 : BrandColors.gray500}
      />
    </TouchableOpacity>
  );
};
