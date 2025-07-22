import { useTheme } from "@/components/ThemeContext";
import { BrandColors } from "@/constants/BrandColors";
import { fetchModels, Model } from "@/services/api";
import { FontAwesome } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  FlatList,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface ModelSearchInputProps {
  value: string;
  onSelect: (model: Model) => void;
  placeholder?: string;
  label?: string;
  brandId: number | null;
  disabled?: boolean;
  onFocus?: () => void;
}

export function ModelSearchInput({
  value,
  onSelect,
  placeholder = "Selecione uma marca primeiro...",
  label = "Modelo *",
  brandId,
  disabled = false,
  onFocus,
}: ModelSearchInputProps) {
  const { colors } = useTheme();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [models, setModels] = useState<Model[]>([]);
  const [filteredModels, setFilteredModels] = useState<Model[]>([]);
  const [loading, setLoading] = useState(false);

  // Carregar modelos da API baseado na marca
  const loadModels = async () => {
    if (!brandId) return;

    setLoading(true);
    try {
      const modelsData = await fetchModels(brandId);
      setModels(modelsData);
      setFilteredModels(modelsData);
    } catch (error) {
      console.error("Erro ao carregar modelos:", error);
    } finally {
      setLoading(false);
    }
  };

  // Filtrar modelos baseado no texto de busca
  const filterModels = (text: string) => {
    setSearchText(text);
    if (text.trim() === "") {
      setFilteredModels(models);
    } else {
      const filtered = models.filter((model) =>
        model.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredModels(filtered);
    }
  };

  // Selecionar modelo
  const handleSelectModel = (model: Model) => {
    onSelect(model);
    setIsModalVisible(false);
    setSearchText("");
  };

  // Abrir modal
  const handleOpenModal = () => {
    if (disabled || !brandId) return;
    onFocus?.();
    setIsModalVisible(true);
    loadModels();
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
        {label}
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
        onPress={handleOpenModal}
        disabled={disabled || !brandId}
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
          color={
            disabled ? colors.text.secondary + "80" : colors.text.secondary
          }
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
                Selecionar Modelo
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
                placeholder="Buscar modelo..."
                placeholderTextColor={colors.text.secondary}
                value={searchText}
                onChangeText={filterModels}
                autoFocus={false}
                blurOnSubmit={false}
              />
            </View>

            {/* Models List */}
            {loading ? (
              <View style={{ padding: 20, alignItems: "center" }}>
                <FontAwesome
                  name="spinner"
                  size={20}
                  color={colors.text.secondary}
                />
                <Text style={{ color: colors.text.secondary, marginTop: 8 }}>
                  Carregando modelos...
                </Text>
              </View>
            ) : (
              <FlatList
                data={filteredModels}
                keyExtractor={(item) => item.id.toString()}
                style={{
                  paddingHorizontal: 16,
                  paddingBottom: 50,
                  marginBottom: 35,
                }}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      padding: 16,
                      borderBottomWidth: 1,
                      borderBottomColor: colors.border.light,
                    }}
                    onPress={() => handleSelectModel(item)}
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
                ListEmptyComponent={
                  <View style={{ padding: 20, alignItems: "center" }}>
                    <Text style={{ color: colors.text.secondary }}>
                      Nenhum modelo encontrado
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
