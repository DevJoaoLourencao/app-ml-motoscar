import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { BrandColors } from "./BrandColors";

// Exemplo de uso das cores da marca em componentes
export const ColorUsageExample = () => {
  return (
    <View style={styles.container}>
      {/* Exemplo de uso das cores primárias */}
      <View
        style={[
          styles.section,
          { backgroundColor: BrandColors.background.primary },
        ]}
      >
        <Text style={[styles.title, { color: BrandColors.text.primary }]}>
          Cores Primárias
        </Text>
        <View style={styles.colorRow}>
          <View
            style={[styles.colorBox, { backgroundColor: BrandColors.primary }]}
          >
            <Text style={styles.colorText}>Primary</Text>
            <Text style={styles.colorCode}>#CC0000</Text>
          </View>
          <View
            style={[
              styles.colorBox,
              { backgroundColor: BrandColors.primaryLight },
            ]}
          >
            <Text style={styles.colorText}>Light</Text>
            <Text style={styles.colorCode}>#FF3333</Text>
          </View>
          <View
            style={[
              styles.colorBox,
              { backgroundColor: BrandColors.primaryDark },
            ]}
          >
            <Text style={styles.colorText}>Dark</Text>
            <Text style={styles.colorCode}>#990000</Text>
          </View>
        </View>
      </View>

      {/* Exemplo de uso das cores neutras */}
      <View
        style={[
          styles.section,
          { backgroundColor: BrandColors.background.secondary },
        ]}
      >
        <Text style={[styles.title, { color: BrandColors.text.primary }]}>
          Cores Neutras
        </Text>
        <View style={styles.colorRow}>
          <View
            style={[
              styles.colorBox,
              {
                backgroundColor: BrandColors.white,
                borderWidth: 1,
                borderColor: BrandColors.border.light,
              },
            ]}
          >
            <Text
              style={[styles.colorText, { color: BrandColors.text.primary }]}
            >
              White
            </Text>
            <Text
              style={[styles.colorCode, { color: BrandColors.text.primary }]}
            >
              #FFFFFF
            </Text>
          </View>
          <View
            style={[styles.colorBox, { backgroundColor: BrandColors.black }]}
          >
            <Text style={styles.colorText}>Black</Text>
            <Text style={styles.colorCode}>#000000</Text>
          </View>
          <View
            style={[styles.colorBox, { backgroundColor: BrandColors.gray500 }]}
          >
            <Text style={styles.colorText}>Gray</Text>
            <Text style={styles.colorCode}>#9E9E9E</Text>
          </View>
        </View>
      </View>

      {/* Exemplo de uso das cores semânticas */}
      <View
        style={[
          styles.section,
          { backgroundColor: BrandColors.background.primary },
        ]}
      >
        <Text style={[styles.title, { color: BrandColors.text.primary }]}>
          Cores Semânticas
        </Text>
        <View style={styles.colorRow}>
          <View
            style={[styles.colorBox, { backgroundColor: BrandColors.success }]}
          >
            <Text style={styles.colorText}>Success</Text>
            <Text style={styles.colorCode}>#4CAF50</Text>
          </View>
          <View
            style={[styles.colorBox, { backgroundColor: BrandColors.warning }]}
          >
            <Text style={styles.colorText}>Warning</Text>
            <Text style={styles.colorCode}>#FF9800</Text>
          </View>
          <View
            style={[styles.colorBox, { backgroundColor: BrandColors.error }]}
          >
            <Text style={styles.colorText}>Error</Text>
            <Text style={styles.colorCode}>#F44336</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  section: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  colorRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  colorBox: {
    flex: 1,
    padding: 12,
    borderRadius: 6,
    marginHorizontal: 4,
    alignItems: "center",
  },
  colorText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
  },
  colorCode: {
    color: "white",
    fontSize: 10,
    marginTop: 4,
  },
});

// Exemplo de como usar em componentes reais
export const ButtonExample = ({
  title,
  variant = "primary",
  onPress,
}: {
  title: string;
  variant?: "primary" | "secondary" | "outline";
  onPress: () => void;
}) => {
  const getButtonStyle = () => {
    switch (variant) {
      case "primary":
        return { backgroundColor: BrandColors.primary };
      case "secondary":
        return { backgroundColor: BrandColors.gray500 };
      case "outline":
        return {
          backgroundColor: "transparent",
          borderWidth: 1,
          borderColor: BrandColors.primary,
        };
      default:
        return { backgroundColor: BrandColors.primary };
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case "outline":
        return { color: BrandColors.primary };
      default:
        return { color: BrandColors.white };
    }
  };

  return (
    <View style={[buttonStyles.button, getButtonStyle()]}>
      <Text style={[buttonStyles.buttonText, getTextStyle()]}>{title}</Text>
    </View>
  );
};

// Estilos adicionais para o exemplo do botão
const buttonStyles = StyleSheet.create({
  button: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
});
