import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Platform, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "./ThemeContext";

interface HeaderProps {
  // Opções para o lado esquerdo
  leftContent?: {
    type: "text" | "back";
    title?: string;
    onBackPress?: () => void;
  };

  // Componente React para o lado direito
  rightContent?: React.ReactNode;

  // Estilos
  backgroundColor?: string;
  textColor?: string;
  elevation?: number;
}

export const Header: React.FC<HeaderProps> = ({
  leftContent,
  rightContent,
  backgroundColor,
  textColor,
  elevation = 2,
}) => {
  const { colors } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleBackPress = () => {
    if (leftContent?.onBackPress) {
      leftContent.onBackPress();
    } else {
      router.back();
    }
  };

  const headerBackground = backgroundColor || colors.background.header;
  const headerTextColor = textColor || colors.text.light;

  const renderLeftContent = () => {
    if (!leftContent) return null;

    if (leftContent.type === "back") {
      return (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
          <TouchableOpacity
            onPress={handleBackPress}
            className="py-2 px-[9px] rounded-full bg-white/20"
          >
            <FontAwesome name="arrow-left" size={20} color={headerTextColor} />
          </TouchableOpacity>
          {leftContent.title && (
            <Text
              className="text-lg font-semibold"
              style={{ color: headerTextColor }}
            >
              {leftContent.title}
            </Text>
          )}
        </View>
      );
    }

    if (leftContent.type === "text") {
      return (
        <View className="flex-1 items-center">
          {leftContent.title && (
            <Text
              className="text-xl font-bold text-left"
              style={{ color: headerTextColor }}
            >
              {leftContent.title}
            </Text>
          )}
        </View>
      );
    }

    return null;
  };

  return (
    <View
      className="shadow-md"
      style={{
        backgroundColor: headerBackground,
        paddingTop: Platform.OS === "ios" ? insets.top + 8 : 48,
        paddingBottom: 16,
        paddingHorizontal: 16,
        shadowColor: colors.card.shadow,
        shadowOffset: { width: 0, height: elevation },
        shadowOpacity: 0.1,
        shadowRadius: elevation,
        elevation: elevation,
      }}
    >
      <View className="flex-row items-center justify-between">
        {/* Left Section */}
        <View className="flex-1 items-start">{renderLeftContent()}</View>

        {/* Right Section */}
        <View className="flex-1 items-end">{rightContent}</View>
      </View>
    </View>
  );
};

// Variantes pré-definidas para facilitar o uso
export const HeaderVariants = {
  // Header com texto à esquerda
  withText: (title: string, rightComponent?: React.ReactNode) => ({
    leftContent: {
      type: "text" as const,
      title,
    },
    rightContent: rightComponent,
  }),

  // Header com botão de voltar
  withBack: (rightComponent?: React.ReactNode) => ({
    leftContent: {
      type: "back" as const,
    },
    rightContent: rightComponent,
  }),

  // Header com botão de voltar e texto
  withBackAndText: (title: string, rightComponent?: React.ReactNode) => ({
    leftContent: {
      type: "back" as const,
      title,
    },
    rightContent: rightComponent,
  }),

  // Header simples (apenas componente direito)
  simple: (rightComponent?: React.ReactNode) => ({
    rightContent: rightComponent,
  }),

  // Header transparente (para gradientes)
  gradient: (
    leftContent?: HeaderProps["leftContent"],
    rightComponent?: React.ReactNode
  ) => ({
    leftContent,
    rightContent: rightComponent,
    backgroundColor: "transparent",
  }),
};
