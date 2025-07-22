import { Header } from "@/components/Header";
import { useTheme } from "@/components/ThemeContext";
import { BrandColors } from "@/constants/BrandColors";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  const { colors } = useTheme();
  const [fipeModalVisible, setFipeModalVisible] = useState(false);

  const handleNotificationPress = () => {
    // Lógica para notificações
    console.log("Notificações pressionadas");
  };

  const handleSettingsPress = () => {
    router.push("/settings");
  };

  const handleVehiclePress = (vehicleId: number) => {
    console.log("Navegando para veículo ID:", vehicleId);
    router.push(`/vehicle-details/${vehicleId}`);
  };

  const handleClientsPress = () => {
    router.push("/clients");
  };

  const handleSellVehiclePress = () => {
    router.push("/sell-vehicle");
  };

  const RightContent = () => (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
      <TouchableOpacity
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          borderRadius: 20,
          paddingVertical: 6,
          paddingHorizontal: 8,
        }}
        onPress={handleSettingsPress}
      >
        <FontAwesome name="cog" size={20} color={colors.text.light} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.background.secondary }}>
      {/* Header */}
      <Header
        leftContent={{
          type: "text",
          title: "ML Motoscar",
        }}
        rightContent={<RightContent />}
      />

      <ScrollView style={{ flex: 1 }}>
        {/* Hero Section */}
        <View style={{ paddingHorizontal: 16, paddingVertical: 24 }}>
          <View
            style={{
              backgroundColor: colors.background.header,
              borderRadius: 16,
              padding: 24,
              marginBottom: 24,
            }}
          >
            <Text
              style={{
                color: colors.text.light,
                fontSize: 28,
                fontWeight: "bold",
                marginBottom: 8,
              }}
            >
              Bem-vindo ao futuro das motos
            </Text>
            <Text
              style={{
                color: colors.text.light,
                opacity: 0.8,
                fontSize: 16,
                marginBottom: 16,
              }}
            >
              Descubra as melhores motos com tecnologia de ponta e inteligência
              artificial
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: colors.text.light,
                borderRadius: 8,
                paddingVertical: 12,
                paddingHorizontal: 24,
                alignSelf: "flex-start",
              }}
            >
              <Text
                style={{
                  color: colors.background.header,
                  fontWeight: "600",
                }}
              >
                Explorar
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={{ paddingHorizontal: 16, marginBottom: 24 }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: colors.text.primary,
              marginBottom: 16,
            }}
          >
            Ações Rápidas
          </Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12 }}>
            <TouchableOpacity
              style={{
                backgroundColor: colors.card.background,
                borderRadius: 12,
                padding: 16,
                shadowColor: colors.card.shadow,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                borderWidth: 1,
                borderColor: colors.card.border,
                flex: 1,
                minWidth: 150,
              }}
              onPress={() => router.push("/add-vehicle")}
            >
              <View
                style={{
                  backgroundColor: BrandColors.gray100,
                  borderRadius: 8,
                  padding: 12,
                  marginBottom: 12,
                  alignSelf: "flex-start",
                }}
              >
                <FontAwesome
                  name="plus"
                  size={20}
                  color={BrandColors.primary}
                />
              </View>
              <Text
                style={{
                  fontWeight: "600",
                  color: colors.text.primary,
                }}
              >
                Cadastrar
              </Text>
              <Text
                style={{
                  color: colors.text.secondary,
                  fontSize: 14,
                }}
              >
                Adicionar veículo
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                backgroundColor: colors.card.background,
                borderRadius: 12,
                padding: 16,
                shadowColor: colors.card.shadow,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                borderWidth: 1,
                borderColor: colors.card.border,
                flex: 1,
                minWidth: 150,
              }}
              onPress={handleSellVehiclePress}
            >
              <View
                style={{
                  backgroundColor: BrandColors.gray100,
                  borderRadius: 8,
                  padding: 12,
                  marginBottom: 12,
                  alignSelf: "flex-start",
                }}
              >
                <FontAwesome
                  name="money"
                  size={20}
                  color={BrandColors.primary}
                />
              </View>
              <Text
                style={{
                  fontWeight: "600",
                  color: colors.text.primary,
                }}
              >
                Vender Veículo
              </Text>
              <Text
                style={{
                  color: colors.text.secondary,
                  fontSize: 14,
                }}
              >
                Registrar venda
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                backgroundColor: colors.card.background,
                borderRadius: 12,
                padding: 16,
                shadowColor: colors.card.shadow,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                borderWidth: 1,
                borderColor: colors.card.border,
                flex: 1,
                minWidth: 150,
              }}
              onPress={handleClientsPress}
            >
              <View
                style={{
                  backgroundColor: BrandColors.gray100,
                  borderRadius: 8,
                  padding: 12,
                  marginBottom: 12,
                  alignSelf: "flex-start",
                }}
              >
                <FontAwesome
                  name="users"
                  size={20}
                  color={BrandColors.primary}
                />
              </View>
              <Text
                style={{
                  fontWeight: "600",
                  color: colors.text.primary,
                }}
              >
                Consultar Clientes
              </Text>
              <Text
                style={{
                  color: colors.text.secondary,
                  fontSize: 14,
                }}
              >
                Gerenciar clientes
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                backgroundColor: colors.card.background,
                borderRadius: 12,
                padding: 16,
                shadowColor: colors.card.shadow,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                borderWidth: 1,
                borderColor: colors.card.border,
                flex: 1,
                minWidth: 150,
              }}
              onPress={() => setFipeModalVisible(true)}
            >
              <View
                style={{
                  backgroundColor: BrandColors.gray100,
                  borderRadius: 8,
                  padding: 12,
                  marginBottom: 12,
                  alignSelf: "flex-start",
                }}
              >
                <FontAwesome
                  name="calculator"
                  size={20}
                  color={BrandColors.primary}
                />
              </View>
              <Text
                style={{
                  fontWeight: "600",
                  color: colors.text.primary,
                }}
              >
                Consultar FIPE
              </Text>
              <Text
                style={{
                  color: colors.text.secondary,
                  fontSize: 14,
                }}
              >
                Tabela de preços
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Featured Section */}
        <View style={{ paddingHorizontal: 16, marginBottom: 24 }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: colors.text.primary,
              marginBottom: 16,
            }}
          >
            Destaques
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ flexDirection: "row" }}
          >
            <TouchableOpacity
              onPress={() => handleVehiclePress(1)}
              style={{
                backgroundColor: colors.card.background,
                borderRadius: 12,
                padding: 16,
                shadowColor: colors.card.shadow,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                borderWidth: 1,
                borderColor: colors.card.border,
                marginRight: 16,
                width: 256,
              }}
            >
              <View
                style={{
                  backgroundColor: BrandColors.gray200,
                  borderRadius: 8,
                  height: 128,
                  marginBottom: 12,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FontAwesome
                  name="motorcycle"
                  size={40}
                  color={BrandColors.gray600}
                />
              </View>
              <Text
                style={{
                  fontWeight: "600",
                  color: colors.text.primary,
                  marginBottom: 4,
                }}
              >
                Honda CB 650R
              </Text>
              <Text
                style={{
                  color: colors.text.secondary,
                  fontSize: 14,
                  marginBottom: 8,
                }}
              >
                Sport Naked • 649cc
              </Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <FontAwesome name="star" size={14} color="#fbbf24" />
                <Text
                  style={{
                    color: colors.text.secondary,
                    fontSize: 14,
                    marginLeft: 4,
                  }}
                >
                  4.8 (120 avaliações)
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleVehiclePress(2)}
              style={{
                backgroundColor: colors.card.background,
                borderRadius: 12,
                padding: 16,
                shadowColor: colors.card.shadow,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                borderWidth: 1,
                borderColor: colors.card.border,
                marginRight: 16,
                width: 256,
              }}
            >
              <View
                style={{
                  backgroundColor: BrandColors.gray200,
                  borderRadius: 8,
                  height: 128,
                  marginBottom: 12,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FontAwesome
                  name="motorcycle"
                  size={40}
                  color={BrandColors.gray600}
                />
              </View>
              <Text
                style={{
                  fontWeight: "600",
                  color: colors.text.primary,
                  marginBottom: 4,
                }}
              >
                Yamaha MT-07
              </Text>
              <Text
                style={{
                  color: colors.text.secondary,
                  fontSize: 14,
                  marginBottom: 8,
                }}
              >
                Naked • 689cc
              </Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <FontAwesome name="star" size={14} color="#fbbf24" />
                <Text
                  style={{
                    color: colors.text.secondary,
                    fontSize: 14,
                    marginLeft: 4,
                  }}
                >
                  4.7 (95 avaliações)
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleVehiclePress(4)}
              style={{
                backgroundColor: colors.card.background,
                borderRadius: 12,
                padding: 16,
                shadowColor: colors.card.shadow,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                borderWidth: 1,
                borderColor: colors.card.border,
                width: 256,
              }}
            >
              <View
                style={{
                  backgroundColor: BrandColors.gray200,
                  borderRadius: 8,
                  height: 128,
                  marginBottom: 12,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FontAwesome
                  name="motorcycle"
                  size={40}
                  color={BrandColors.gray600}
                />
              </View>
              <Text
                style={{
                  fontWeight: "600",
                  color: colors.text.primary,
                  marginBottom: 4,
                }}
              >
                Kawasaki Z900
              </Text>
              <Text
                style={{
                  color: colors.text.secondary,
                  fontSize: 14,
                  marginBottom: 8,
                }}
              >
                Naked • 948cc
              </Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <FontAwesome name="star" size={14} color="#fbbf24" />
                <Text
                  style={{
                    color: colors.text.secondary,
                    fontSize: 14,
                    marginLeft: 4,
                  }}
                >
                  4.9 (78 avaliações)
                </Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Stats Section */}
        <View style={{ paddingHorizontal: 16, marginBottom: 24 }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: colors.text.primary,
              marginBottom: 16,
            }}
          >
            Estatísticas
          </Text>
          <View style={{ flexDirection: "row", gap: 12 }}>
            <View
              style={{
                backgroundColor: BrandColors.gray50,
                borderRadius: 12,
                padding: 16,
                flex: 1,
              }}
            >
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "bold",
                  color: BrandColors.primary,
                }}
              >
                1,247
              </Text>
              <Text
                style={{
                  color: colors.text.secondary,
                  fontSize: 14,
                }}
              >
                Motos disponíveis
              </Text>
            </View>
            <View
              style={{
                backgroundColor: BrandColors.gray50,
                borderRadius: 12,
                padding: 16,
                flex: 1,
              }}
            >
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "bold",
                  color: BrandColors.gray700,
                }}
              >
                89%
              </Text>
              <Text
                style={{
                  color: colors.text.secondary,
                  fontSize: 14,
                }}
              >
                Precisão ML
              </Text>
            </View>
            <View
              style={{
                backgroundColor: BrandColors.gray50,
                borderRadius: 12,
                padding: 16,
                flex: 1,
              }}
            >
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "bold",
                  color: BrandColors.primary,
                }}
              >
                15k+
              </Text>
              <Text
                style={{
                  color: colors.text.secondary,
                  fontSize: 14,
                }}
              >
                Usuários ativos
              </Text>
            </View>
          </View>
        </View>

        {/* Recent Activity */}
        <View style={{ paddingHorizontal: 16, marginBottom: 32 }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: colors.text.primary,
              marginBottom: 16,
            }}
          >
            Atividade Recente
          </Text>
          <View
            style={{
              backgroundColor: colors.card.background,
              borderRadius: 12,
              padding: 16,
              shadowColor: colors.card.shadow,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              borderWidth: 1,
              borderColor: colors.card.border,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 12,
              }}
            >
              <View
                style={{
                  backgroundColor: BrandColors.gray100,
                  borderRadius: 20,
                  padding: 8,
                  marginRight: 12,
                }}
              >
                <FontAwesome name="eye" size={16} color={BrandColors.primary} />
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontWeight: "600",
                    color: colors.text.primary,
                  }}
                >
                  Nova moto adicionada
                </Text>
                <Text
                  style={{
                    color: colors.text.secondary,
                    fontSize: 14,
                  }}
                >
                  Honda CB 1000R Black Edition
                </Text>
              </View>
              <Text
                style={{
                  color: colors.text.muted,
                  fontSize: 12,
                }}
              >
                2h atrás
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 12,
              }}
            >
              <View
                style={{
                  backgroundColor: BrandColors.gray100,
                  borderRadius: 20,
                  padding: 8,
                  marginRight: 12,
                }}
              >
                <FontAwesome
                  name="thumbs-up"
                  size={16}
                  color={BrandColors.gray600}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontWeight: "600",
                    color: colors.text.primary,
                  }}
                >
                  Comparação atualizada
                </Text>
                <Text
                  style={{
                    color: colors.text.secondary,
                    fontSize: 14,
                  }}
                >
                  Yamaha vs Kawasaki 600cc
                </Text>
              </View>
              <Text
                style={{
                  color: colors.text.muted,
                  fontSize: 12,
                }}
              >
                5h atrás
              </Text>
            </View>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View
                style={{
                  backgroundColor: BrandColors.gray100,
                  borderRadius: 20,
                  padding: 8,
                  marginRight: 12,
                }}
              >
                <FontAwesome
                  name="star"
                  size={16}
                  color={BrandColors.primary}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontWeight: "600",
                    color: colors.text.primary,
                  }}
                >
                  Novo favorito
                </Text>
                <Text
                  style={{
                    color: colors.text.secondary,
                    fontSize: 14,
                  }}
                >
                  BMW S1000RR adicionada
                </Text>
              </View>
              <Text
                style={{
                  color: colors.text.muted,
                  fontSize: 12,
                }}
              >
                1d atrás
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Modal FIPE */}
      <Modal
        visible={fipeModalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setFipeModalVisible(false)}
      >
        <View style={{ flex: 1, backgroundColor: colors.background.secondary }}>
          {/* Header */}
          <View
            style={{
              backgroundColor: colors.background.header,
              paddingTop: 60,
              paddingBottom: 16,
              paddingHorizontal: 16,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                color: colors.text.light,
                fontSize: 18,
                fontWeight: "600",
              }}
            >
              Consultar Tabela FIPE
            </Text>
            <TouchableOpacity
              onPress={() => setFipeModalVisible(false)}
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                borderRadius: 20,
                padding: 8,
              }}
            >
              <FontAwesome name="times" size={16} color={colors.text.light} />
            </TouchableOpacity>
          </View>

          <ScrollView style={{ flex: 1, padding: 16 }}>
            <Text
              style={{
                fontSize: 16,
                color: colors.text.primary,
                marginBottom: 20,
                lineHeight: 24,
              }}
            >
              Digite os dados do veículo para consultar o valor na tabela FIPE:
            </Text>

            {/* Formulário FIPE */}
            <View style={{ gap: 16 }}>
              <View>
                <Text
                  style={{
                    color: colors.text.primary,
                    marginBottom: 8,
                    fontWeight: "600",
                  }}
                >
                  Marca
                </Text>
                <TextInput
                  style={{
                    backgroundColor: colors.card.background,
                    borderRadius: 12,
                    padding: 16,
                    color: colors.text.primary,
                    borderWidth: 1,
                    borderColor: colors.card.border,
                  }}
                  placeholder="Ex: Honda"
                  placeholderTextColor={colors.text.secondary}
                />
              </View>

              <View>
                <Text
                  style={{
                    color: colors.text.primary,
                    marginBottom: 8,
                    fontWeight: "600",
                  }}
                >
                  Modelo
                </Text>
                <TextInput
                  style={{
                    backgroundColor: colors.card.background,
                    borderRadius: 12,
                    padding: 16,
                    color: colors.text.primary,
                    borderWidth: 1,
                    borderColor: colors.card.border,
                  }}
                  placeholder="Ex: CB 650R"
                  placeholderTextColor={colors.text.secondary}
                />
              </View>

              <View>
                <Text
                  style={{
                    color: colors.text.primary,
                    marginBottom: 8,
                    fontWeight: "600",
                  }}
                >
                  Ano
                </Text>
                <TextInput
                  style={{
                    backgroundColor: colors.card.background,
                    borderRadius: 12,
                    padding: 16,
                    color: colors.text.primary,
                    borderWidth: 1,
                    borderColor: colors.card.border,
                  }}
                  placeholder="Ex: 2024"
                  placeholderTextColor={colors.text.secondary}
                  keyboardType="numeric"
                />
              </View>

              <TouchableOpacity
                style={{
                  backgroundColor: BrandColors.primary,
                  borderRadius: 12,
                  paddingVertical: 16,
                  alignItems: "center",
                  marginTop: 20,
                }}
                onPress={() => {
                  // TODO: Implementar consulta FIPE
                  console.log("Consultando FIPE...");
                  setFipeModalVisible(false);
                }}
              >
                <Text
                  style={{
                    color: colors.text.light,
                    fontSize: 16,
                    fontWeight: "600",
                  }}
                >
                  Consultar Preço
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}
