import { useTheme } from "@/components/ThemeContext";
import { fetchBrandsByType } from "@/services/api";
import { FontAwesome } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface Brand {
  id: number;
  name: string;
}

interface BrandSearchInputProps {
  placeholder?: string;
  value?: string;
  vehicleType?: string;
  disabled?: boolean;
  onSelect: (brand: Brand) => void;
  onFocus?: () => void;
}

export function BrandSearchInput({
  placeholder = "Buscar marca...",
  value = "",
  vehicleType,
  disabled = false,
  onSelect,
  onFocus,
}: BrandSearchInputProps) {
  const { colors } = useTheme();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [brands, setBrands] = useState<Brand[]>([]);
  const [filteredBrands, setFilteredBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("useEffect vehicleType mudou para:", vehicleType);
    if (vehicleType) {
      loadBrands();
    }
  }, [vehicleType]);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredBrands(brands);
    } else {
      const filtered = brands.filter((brand) =>
        brand.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredBrands(filtered);
    }
  }, [searchTerm, brands]);

  const loadBrands = async () => {
    if (!vehicleType) {
      console.log("vehicleType não fornecido");
      return;
    }

    console.log("Carregando marcas para vehicleType:", vehicleType);
    setLoading(true);
    try {
      const brandsData = await fetchBrandsByType(vehicleType);
      console.log("Marcas carregadas:", brandsData);
      setBrands(brandsData);
      setFilteredBrands(brandsData);
    } catch (error) {
      console.error("Erro ao carregar marcas:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (brand: Brand) => {
    onSelect(brand);
    setIsModalVisible(false);
    setSearchTerm("");
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
        Marca *
      </Text>

      <TouchableOpacity
        style={{
          backgroundColor: disabled
            ? colors.card.border
            : colors.card.background,
          borderRadius: 12,
          padding: 16,
          borderWidth: 1,
          borderColor: colors.card.border,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          opacity: disabled ? 0.6 : 1,
        }}
        onPress={() => {
          if (!disabled) {
            onFocus?.();
            setIsModalVisible(true);
          }
        }}
        disabled={disabled}
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
                Selecionar Marca
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

            {/* Search Input */}
            <View
              style={{
                padding: 16,
                borderBottomWidth: 1,
                borderBottomColor: colors.border.light,
              }}
            >
              <TextInput
                style={{
                  backgroundColor: colors.card.background,
                  borderRadius: 8,
                  padding: 12,
                  color: colors.text.primary,
                  borderWidth: 1,
                  borderColor: colors.card.border,
                }}
                placeholder="Buscar marca..."
                placeholderTextColor={colors.text.secondary}
                value={searchTerm}
                onChangeText={setSearchTerm}
              />
            </View>

            {/* Brands List */}
            {loading ? (
              <View style={{ padding: 20, alignItems: "center" }}>
                <FontAwesome
                  name="spinner"
                  size={20}
                  color={colors.text.secondary}
                />
                <Text style={{ color: colors.text.secondary, marginTop: 8 }}>
                  Carregando marcas...
                </Text>
              </View>
            ) : (
              <FlatList
                data={filteredBrands}
                keyExtractor={(item) => item.id.toString()}
                style={{
                  paddingHorizontal: 16,
                  paddingBottom: 50,
                  marginBottom: 35,
                }}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={{
                      padding: 16,
                      borderBottomWidth: 1,
                      borderBottomColor: colors.border.light,
                    }}
                    onPress={() => handleSelect(item)}
                  >
                    <Text
                      style={{
                        color: colors.text.primary,
                        fontSize: 16,
                      }}
                    >
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                )}
                ListEmptyComponent={
                  <View style={{ padding: 20, alignItems: "center" }}>
                    <Text style={{ color: colors.text.secondary }}>
                      {searchTerm
                        ? "Nenhuma marca encontrada"
                        : "Nenhuma marca disponível"}
                    </Text>
                  </View>
                }
              />
            )}
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}
