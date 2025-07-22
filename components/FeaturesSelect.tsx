import { BrandColors } from "@/constants/BrandColors";
import { FontAwesome } from "@expo/vector-icons";
import React, { useState } from "react";
import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "./ThemeContext";

interface Feature {
  id: string;
  name: string;
  category: string;
}

interface FeaturesSelectProps {
  selectedFeatures: string[];
  onFeaturesChange: (features: string[]) => void;
  placeholder?: string;
  onFocus?: () => void;
}

const availableFeatures: Feature[] = [
  // Documentação
  { id: "manual", name: "Manual", category: "Documentação" },
  { id: "spare-key", name: "Chave Reserva", category: "Documentação" },
  { id: "ipva-paid", name: "IPVA Pago", category: "Documentação" },
  {
    id: "licensing-paid",
    name: "Licenciamento Pago",
    category: "Documentação",
  },
];

export const FeaturesSelect: React.FC<FeaturesSelectProps> = ({
  selectedFeatures,
  onFeaturesChange,
  placeholder = "Selecionar recursos...",
  onFocus,
}) => {
  const { colors } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);

  const handleFeatureToggle = (featureId: string) => {
    const newFeatures = selectedFeatures.includes(featureId)
      ? selectedFeatures.filter((id) => id !== featureId)
      : [...selectedFeatures, featureId];
    onFeaturesChange(newFeatures);
  };

  const getFeatureName = (featureId: string) => {
    const feature = availableFeatures.find((f) => f.id === featureId);
    return feature ? feature.name : featureId;
  };

  const groupedFeatures = availableFeatures.reduce((acc, feature) => {
    if (!acc[feature.category]) {
      acc[feature.category] = [];
    }
    acc[feature.category].push(feature);
    return acc;
  }, {} as Record<string, Feature[]>);

  const handleOpenModal = () => {
    setModalVisible(true);
    onFocus?.();
  };

  return (
    <>
      <TouchableOpacity
        style={{
          backgroundColor: colors.card.background,
          borderRadius: 12,
          padding: 16,
          borderWidth: 1,
          borderColor: colors.card.border,
          minHeight: 60,
        }}
        onPress={handleOpenModal}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flex: 1 }}>
            {selectedFeatures.length === 0 ? (
              <Text style={{ color: colors.text.secondary, fontSize: 16 }}>
                {placeholder}
              </Text>
            ) : (
              <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
                {selectedFeatures.slice(0, 3).map((featureId) => (
                  <View
                    key={featureId}
                    style={{
                      backgroundColor: BrandColors.primary + "20",
                      borderRadius: 16,
                      paddingHorizontal: 8,
                      paddingVertical: 4,
                    }}
                  >
                    <Text
                      style={{
                        color: BrandColors.primary,
                        fontSize: 12,
                        fontWeight: "600",
                      }}
                    >
                      {getFeatureName(featureId)}
                    </Text>
                  </View>
                ))}
                {selectedFeatures.length > 3 && (
                  <View
                    style={{
                      backgroundColor: colors.text.secondary + "20",
                      borderRadius: 16,
                      paddingHorizontal: 8,
                      paddingVertical: 4,
                    }}
                  >
                    <Text
                      style={{
                        color: colors.text.secondary,
                        fontSize: 12,
                        fontWeight: "600",
                      }}
                    >
                      +{selectedFeatures.length - 3}
                    </Text>
                  </View>
                )}
              </View>
            )}
          </View>
          <FontAwesome
            name="chevron-down"
            size={16}
            color={colors.text.secondary}
          />
        </View>
      </TouchableOpacity>

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
              maxHeight: "80%",
              minHeight: 400,
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
                Selecionar Recursos
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

            <ScrollView
              style={{
                flex: 1,
                paddingHorizontal: 16,
                paddingBottom: 20,
              }}
            >
              {Object.entries(groupedFeatures).map(([category, features]) => (
                <View key={category} style={{ marginBottom: 24 }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "600",
                      color: colors.text.primary,
                      marginBottom: 12,
                      marginTop: 16,
                    }}
                  >
                    {category}
                  </Text>
                  <View
                    style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}
                  >
                    {features.map((feature) => (
                      <TouchableOpacity
                        key={feature.id}
                        onPress={() => handleFeatureToggle(feature.id)}
                        style={{
                          backgroundColor: selectedFeatures.includes(feature.id)
                            ? BrandColors.primary
                            : colors.card.background,
                          borderRadius: 20,
                          paddingHorizontal: 12,
                          paddingVertical: 8,
                          borderWidth: 1,
                          borderColor: selectedFeatures.includes(feature.id)
                            ? BrandColors.primary
                            : colors.card.border,
                        }}
                      >
                        <Text
                          style={{
                            color: selectedFeatures.includes(feature.id)
                              ? colors.text.light
                              : colors.text.primary,
                            fontSize: 14,
                            fontWeight: "500",
                          }}
                        >
                          {feature.name}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              ))}
            </ScrollView>

            {/* Footer */}
            <View
              style={{
                backgroundColor: colors.card.background,
                padding: 16,
                borderTopWidth: 1,
                borderTopColor: colors.card.border,
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: BrandColors.primary,
                  borderRadius: 12,
                  paddingVertical: 16,
                  alignItems: "center",
                  marginBottom: 16,
                }}
                onPress={() => setModalVisible(false)}
              >
                <Text
                  style={{
                    color: colors.text.light,
                    fontSize: 16,
                    fontWeight: "600",
                  }}
                >
                  Confirmar ({selectedFeatures.length} selecionados)
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </>
  );
};
