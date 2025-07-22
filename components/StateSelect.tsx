import { useTheme } from "@/components/ThemeContext";
import { BrandColors } from "@/constants/BrandColors";
import { FontAwesome } from "@expo/vector-icons";
import React, { useState } from "react";
import { Control, Controller, FieldError } from "react-hook-form";
import { FlatList, Modal, Text, TouchableOpacity, View } from "react-native";

interface StateSelectProps {
  control: Control<any>;
  name: string;
  label?: string;
  placeholder?: string;
  error?: FieldError;
  required?: boolean;
  onFocus?: () => void;
}

const states = [
  { id: "AC", name: "Acre" },
  { id: "AL", name: "Alagoas" },
  { id: "AP", name: "Amapá" },
  { id: "AM", name: "Amazonas" },
  { id: "BA", name: "Bahia" },
  { id: "CE", name: "Ceará" },
  { id: "DF", name: "Distrito Federal" },
  { id: "ES", name: "Espírito Santo" },
  { id: "GO", name: "Goiás" },
  { id: "MA", name: "Maranhão" },
  { id: "MT", name: "Mato Grosso" },
  { id: "MS", name: "Mato Grosso do Sul" },
  { id: "MG", name: "Minas Gerais" },
  { id: "PA", name: "Pará" },
  { id: "PB", name: "Paraíba" },
  { id: "PR", name: "Paraná" },
  { id: "PE", name: "Pernambuco" },
  { id: "PI", name: "Piauí" },
  { id: "RJ", name: "Rio de Janeiro" },
  { id: "RN", name: "Rio Grande do Norte" },
  { id: "RS", name: "Rio Grande do Sul" },
  { id: "RO", name: "Rondônia" },
  { id: "RR", name: "Roraima" },
  { id: "SC", name: "Santa Catarina" },
  { id: "SP", name: "São Paulo" },
  { id: "SE", name: "Sergipe" },
  { id: "TO", name: "Tocantins" },
];

export function StateSelect({
  control,
  name,
  label = "Estado",
  placeholder = "Selecione o estado...",
  error,
  required = false,
  onFocus,
}: StateSelectProps) {
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
        render={({ field: { onChange, value } }) => (
          <>
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
                    maxHeight: "80%",
                  }}
                  activeOpacity={1}
                  onPress={() => {}}
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
                      Selecionar Estado
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

                  {/* States List */}
                  <FlatList
                    data={states}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={{
                          padding: 16,
                          borderBottomWidth: 1,
                          borderBottomColor: colors.border.light,
                          backgroundColor:
                            value === item.name
                              ? BrandColors.primary + "20"
                              : "transparent",
                        }}
                        onPress={() => {
                          onChange(item.name);
                          setIsModalVisible(false);
                        }}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 16,
                              color: colors.text.primary,
                            }}
                          >
                            {item.name}
                          </Text>
                          {value === item.name && (
                            <FontAwesome
                              name="check"
                              size={16}
                              color={BrandColors.primary}
                            />
                          )}
                        </View>
                      </TouchableOpacity>
                    )}
                  />
                </TouchableOpacity>
              </TouchableOpacity>
            </Modal>
          </>
        )}
      />

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
