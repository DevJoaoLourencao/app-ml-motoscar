import { useTheme } from "@/components/ThemeContext";
import { BrandColors } from "@/constants/BrandColors";
import { FontAwesome } from "@expo/vector-icons";
import React, { useState } from "react";
import { Control, Controller, FieldError } from "react-hook-form";
import { FlatList, Modal, Text, TouchableOpacity, View } from "react-native";

interface DisplacementSelectProps {
  control: Control<any>;
  name: string;
  label?: string;
  placeholder?: string;
  error?: FieldError;
  required?: boolean;
  onFocus?: () => void;
}

const displacements = [
  "50cc",
  "100cc",
  "125cc",
  "150cc",
  "200cc",
  "250cc",
  "300cc",
  "400cc",
  "500cc",
  "600cc",
  "650cc",
  "700cc",
  "750cc",
  "800cc",
  "900cc",
  "1000cc",
  "1100cc",
  "1200cc",
  "1300cc",
  "1400cc",
  "1500cc",
  "1600cc",
  "1800cc",
  "2000cc",
];

export function DisplacementSelect({
  control,
  name,
  label = "Cilindradas",
  placeholder = "Selecione as cilindradas...",
  error,
  required = false,
  onFocus,
}: DisplacementSelectProps) {
  const { colors } = useTheme();
  const [isModalVisible, setIsModalVisible] = useState(false);

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
        render={({ field: { value } }) => (
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
              onFocus?.();
              setIsModalVisible(true);
            }}
          >
            <Text
              style={{
                color: value ? colors.text.primary : colors.text.secondary,
                flex: 1,
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

      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            justifyContent: "flex-end",
          }}
          activeOpacity={1}
          onPress={() => setIsModalVisible(false)}
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
                Selecionar Cilindradas
              </Text>
              <TouchableOpacity
                onPress={() => setIsModalVisible(false)}
                style={{ padding: 8 }}
              >
                <FontAwesome
                  name="times"
                  size={20}
                  color={colors.text.secondary}
                />
              </TouchableOpacity>
            </View>

            {/* Displacements List */}
            <FlatList
              data={displacements}
              keyExtractor={(item) => item}
              style={{
                paddingHorizontal: 16,
                paddingBottom: 50,
                marginBottom: 35,
              }}
              renderItem={({ item }) => (
                <Controller
                  control={control}
                  name={name}
                  render={({ field: { onChange, value } }) => (
                    <TouchableOpacity
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        padding: 16,
                        borderBottomWidth: 1,
                        borderBottomColor: colors.border.light,
                      }}
                      onPress={() => {
                        onChange(item);
                        setIsModalVisible(false);
                      }}
                    >
                      <Text
                        style={{
                          color: colors.text.primary,
                          fontSize: 16,
                          flex: 1,
                        }}
                      >
                        {item}
                      </Text>
                      {value === item && (
                        <FontAwesome
                          name="check"
                          size={16}
                          color={BrandColors.primary}
                        />
                      )}
                    </TouchableOpacity>
                  )}
                />
              )}
            />
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>

      {error && (
        <Text
          style={{ color: colors.status.error, fontSize: 12, marginTop: 4 }}
        >
          {error.message}
        </Text>
      )}
    </View>
  );
}
