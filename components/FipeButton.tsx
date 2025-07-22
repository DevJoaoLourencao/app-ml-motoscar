import { useTheme } from "@/components/ThemeContext";
import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Alert, Text, TouchableOpacity } from "react-native";

interface FipeButtonProps {
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
}

export function FipeButton({
  onPress,
  loading = false,
  disabled = false,
}: FipeButtonProps) {
  const { colors } = useTheme();

  const handlePress = () => {
    if (loading || disabled) return;

    Alert.alert(
      "Consulta FIPE",
      "Deseja consultar a tabela FIPE para este veículo?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Consultar",
          onPress: onPress,
        },
      ]
    );
  };

  return (
    <TouchableOpacity
      style={{
        backgroundColor: disabled
          ? colors.card.border
          : loading
          ? colors.status.warning
          : colors.status.info,
        borderRadius: 12,
        padding: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        opacity: disabled ? 0.6 : 1,
      }}
      onPress={handlePress}
      disabled={disabled || loading}
    >
      <FontAwesome
        name={loading ? "spinner" : "search"}
        size={16}
        color={colors.text.light}
      />
      <Text
        style={{
          color: colors.text.light,
          fontWeight: "600",
          fontSize: 16,
        }}
      >
        {loading ? "Consultando..." : "Consultar FIPE"}
      </Text>
    </TouchableOpacity>
  );
}
