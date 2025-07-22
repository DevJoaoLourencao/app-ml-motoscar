import { useTheme } from "@/components/ThemeContext";
import { BrandColors } from "@/constants/BrandColors";
import { fetchVehicleTypes } from "@/services/api";
import { FontAwesome } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Control, Controller, FieldError } from "react-hook-form";
import { FlatList, Modal, Text, TouchableOpacity, View } from "react-native";

interface VehicleType {
  id: string;
  name: string;
}

interface VehicleTypeSelectProps {
  control: Control<any>;
  name: string;
  label?: string;
  placeholder?: string;
  error?: FieldError;
  required?: boolean;
  onSelect?: (vehicleType: VehicleType) => void;
  onFocus?: () => void;
}

export function VehicleTypeSelect({
  control,
  name,
  label = "Tipo do Veículo",
  placeholder = "Selecione o tipo...",
  error,
  required = false,
  onSelect,
  onFocus,
}: VehicleTypeSelectProps) {
  const { colors } = useTheme();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [vehicleTypes, setVehicleTypes] = useState<VehicleType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadVehicleTypes();
  }, []);

  const loadVehicleTypes = async () => {
    setLoading(true);
    try {
      const types = await fetchVehicleTypes();
      setVehicleTypes(types);
    } catch (error) {
      console.error("Erro ao carregar tipos de veículos:", error);
    } finally {
      setLoading(false);
    }
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
                Selecionar Tipo
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

            {/* Types List */}
            {loading ? (
              <View style={{ padding: 20, alignItems: "center" }}>
                <FontAwesome
                  name="spinner"
                  size={20}
                  color={colors.text.secondary}
                />
                <Text style={{ color: colors.text.secondary, marginTop: 8 }}>
                  Carregando tipos...
                </Text>
              </View>
            ) : (
              <FlatList
                data={vehicleTypes}
                keyExtractor={(item) => item.id}
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
                          onChange(item.name);
                          onSelect?.(item);
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
                          {item.name}
                        </Text>
                        {value === item.name && (
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
            )}
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
