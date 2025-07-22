import { useTheme } from "@/components/ThemeContext";
import { BrandColors } from "@/constants/BrandColors";
import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";

interface SuccessModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  message: string;
  buttonText?: string;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({
  visible,
  onClose,
  title,
  message,
  buttonText = "OK",
}) => {
  const { colors } = useTheme();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.5)",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            backgroundColor: colors.card.background,
            borderRadius: 16,
            padding: 32,
            alignItems: "center",
            width: 320,
          }}
        >
          <FontAwesome
            name="check-circle"
            size={48}
            color={BrandColors.success}
            style={{ marginBottom: 16 }}
          />
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: colors.text.primary,
              marginBottom: 12,
              textAlign: "center",
            }}
          >
            {title}
          </Text>
          <Text
            style={{
              color: colors.text.secondary,
              fontSize: 16,
              textAlign: "center",
              marginBottom: 24,
            }}
          >
            {message}
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: BrandColors.success,
              borderRadius: 8,
              paddingHorizontal: 32,
              paddingVertical: 12,
            }}
            onPress={onClose}
          >
            <Text style={{ color: colors.text.light, fontWeight: "600" }}>
              {buttonText}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
