import { useTheme } from "@/components/ThemeContext";
import { BrandColors } from "@/constants/BrandColors";
import { FontAwesome } from "@expo/vector-icons";
import React, { useState } from "react";
import { Control, Controller, FieldError } from "react-hook-form";
import { Modal, Text, TouchableOpacity, View } from "react-native";

interface ColorSelectProps {
  control: Control<any>;
  name: string;
  label: string;
  placeholder?: string;
  error?: FieldError;
  required?: boolean;
  onFocus?: () => void;
}

interface ColorOption {
  id: string;
  name: string;
  value: string;
}

const colorOptions: ColorOption[] = [
  { id: "1", name: "Preto", value: "Preto" },
  { id: "2", name: "Branco", value: "Branco" },
  { id: "3", name: "Prata", value: "Prata" },
  { id: "4", name: "Cinza", value: "Cinza" },
  { id: "5", name: "Azul", value: "Azul" },
  { id: "6", name: "Vermelho", value: "Vermelho" },
  { id: "7", name: "Verde", value: "Verde" },
  { id: "8", name: "Amarelo", value: "Amarelo" },
  { id: "9", name: "Laranja", value: "Laranja" },
  { id: "10", name: "Rosa", value: "Rosa" },
  { id: "11", name: "Roxo", value: "Roxo" },
  { id: "12", name: "Marrom", value: "Marrom" },
  { id: "13", name: "Bege", value: "Bege" },
  { id: "14", name: "Dourado", value: "Dourado" },
  { id: "15", name: "Champagne", value: "Champagne" },
];

export function ColorSelect({
  control,
  name,
  label,
  placeholder = "Selecionar cor...",
  error,
  required = false,
  onFocus,
}: ColorSelectProps) {
  const { colors } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);

  const handleColorSelect = (
    selectedColor: ColorOption,
    onChange: (value: string) => void
  ) => {
    onChange(selectedColor.value);
    setModalVisible(false);
  };

  return (
    <View>
      <Text
        style={{
          color: colors.text.primary,
          marginBottom: 8,
          fontWeight: "600",
        }}
      >
        {label} {required && "*"}
      </Text>
      <Controller
        control={control}
        name={name}
        rules={{
          validate: (value) => {
            if (required && !value) {
              return "Cor é obrigatória";
            }
            return true;
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TouchableOpacity
            style={{
              backgroundColor: colors.card.background,
              borderRadius: 12,
              padding: 16,
              borderWidth: 1,
              borderColor: error ? colors.status.error : colors.card.border,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
            onPress={() => {
              setModalVisible(true);
              onFocus?.();
            }}
            onBlur={onBlur}
          >
            <Text
              style={{
                color: value ? colors.text.primary : colors.text.secondary,
                fontSize: 16,
              }}
            >
              {value || placeholder}
            </Text>
            <FontAwesome
              name="chevron-down"
              size={16}
              color={colors.text.secondary}
            />
          </TouchableOpacity>
        )}
      />
      {error && (
        <Text
          style={{ color: colors.status.error, fontSize: 12, marginTop: 4 }}
        >
          {error.message}
        </Text>
      )}

      {/* Modal de seleção de cor */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            justifyContent: "flex-end",
          }}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
        >
          <TouchableOpacity
            style={{
              backgroundColor: colors.background.primary,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              maxHeight: "70%",
            }}
            activeOpacity={1}
            onPress={() => {}} // Previne que o clique no conteúdo feche o modal
          >
            {/* Header */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                padding: 16,
                borderBottomWidth: 1,
                borderBottomColor: colors.border.light,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: colors.text.primary,
                }}
              >
                Selecionar Cor
              </Text>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={{ padding: 8 }}
              >
                <FontAwesome
                  name="times"
                  size={20}
                  color={colors.text.secondary}
                />
              </TouchableOpacity>
            </View>

            {/* Colors List */}
            <Controller
              control={control}
              name={name}
              render={({ field: { onChange, value } }) => (
                <View
                  style={{
                    paddingHorizontal: 16,
                    paddingBottom: 50,
                    marginBottom: 35,
                  }}
                >
                  {colorOptions.map((color) => (
                    <TouchableOpacity
                      key={color.id}
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        padding: 16,
                        borderBottomWidth: 1,
                        borderBottomColor: colors.border.light,
                      }}
                      onPress={() => handleColorSelect(color, onChange)}
                    >
                      <View
                        style={{
                          width: 20,
                          height: 20,
                          borderRadius: 10,
                          backgroundColor: getColorHex(color.value),
                          marginRight: 12,
                          borderWidth: 1,
                          borderColor: colors.card.border,
                        }}
                      />
                      <Text
                        style={{
                          color: colors.text.primary,
                          fontSize: 16,
                        }}
                      >
                        {color.name}
                      </Text>
                      {value === color.value && (
                        <FontAwesome
                          name="check"
                          size={16}
                          color={BrandColors.primary}
                          style={{ marginLeft: "auto" }}
                        />
                      )}
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            />
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

// Função para obter o código hexadecimal da cor
function getColorHex(colorName: string): string {
  const colorMap: { [key: string]: string } = {
    Preto: "#000000",
    Branco: "#FFFFFF",
    Prata: "#C0C0C0",
    Cinza: "#808080",
    Azul: "#0000FF",
    Vermelho: "#FF0000",
    Verde: "#008000",
    Amarelo: "#FFFF00",
    Laranja: "#FFA500",
    Rosa: "#FFC0CB",
    Roxo: "#800080",
    Marrom: "#A52A2A",
    Bege: "#F5F5DC",
    Dourado: "#FFD700",
    Champagne: "#F7E7CE",
  };

  return colorMap[colorName] || "#CCCCCC";
}
