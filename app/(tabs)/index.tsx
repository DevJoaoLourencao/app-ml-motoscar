import { Header } from "@/components/Header";
import { useTheme } from "@/components/ThemeContext";
import { BrandColors } from "@/constants/BrandColors";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Image,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// Interface para veículos em destaque
interface FeaturedVehicle {
  id: number;
  brand: string;
  model: string;
  year: number;
  color: string;
  mileage: number;
  daysInStock: number;
  image?: string;
  displacement?: string;
  price?: string;
}

export default function HomeScreen() {
  const { colors } = useTheme();
  const [fipeModalVisible, setFipeModalVisible] = useState(false);
  const [greeting, setGreeting] = useState("");
  const [motivationalMessage, setMotivationalMessage] = useState("");

  // Dados mockados para estatísticas detalhadas
  const statisticsData = {
    vehiclesInStock: 24,
    installmentsToExpireCount: 12,
    monthlySalesValue: 67500,
    overdueInstallmentsCount: 3,
    monthlySalesCount: 8,
    totalSalesCount: 156,
  };

  // Dados mockados para o resumo
  const summaryData = {
    vehiclesInStock: 12,
    monthlySales: 45000,
    pendingInstallments: 8,
    overdueInstallments: statisticsData.overdueInstallmentsCount,
  };

  // Dados mockados para veículos há mais de 30 dias no estoque
  const featuredVehicles: FeaturedVehicle[] = [
    {
      id: 1,
      brand: "Honda",
      model: "CB 650R",
      year: 2022,
      color: "Vermelho",
      mileage: 8500,
      daysInStock: 45,
      displacement: "649cc",
      price: "R$ 35.900",
      image:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    },
    {
      id: 2,
      brand: "Yamaha",
      model: "MT-07",
      year: 2021,
      color: "Azul",
      mileage: 12000,
      daysInStock: 52,
      displacement: "689cc",
      price: "R$ 32.500",
      image:
        "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=400&h=300&fit=crop",
    },
    {
      id: 3,
      brand: "Kawasaki",
      model: "Z900",
      year: 2020,
      color: "Verde",
      mileage: 18500,
      daysInStock: 38,
      displacement: "948cc",
      price: "R$ 28.900",
      image:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    },
    {
      id: 4,
      brand: "Suzuki",
      model: "GSX-R750",
      year: 2021,
      color: "Branco",
      mileage: 9500,
      daysInStock: 41,
      displacement: "750cc",
      price: "R$ 42.300",
      image:
        "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=400&h=300&fit=crop",
    },
    {
      id: 5,
      brand: "BMW",
      model: "S1000RR",
      year: 2022,
      color: "Preto",
      mileage: 6800,
      daysInStock: 47,
      displacement: "999cc",
      price: "R$ 65.800",
      image:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    },
  ];

  // Função para obter saudação baseada na hora
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 0 && hour < 6) return "Boa madrugada 🌙";
    if (hour >= 6 && hour < 12) return "Bom dia 🌅";
    if (hour >= 12 && hour < 18) return "Boa tarde ☀️";
    return "Boa noite 🌆";
  };

  // Função para obter mensagem motivacional
  const getMotivationalMessage = () => {
    const messages = [
      "Que tal começar o dia com uma nova venda? 🚀",
      "O sucesso está nos detalhes. Foque no que importa! 💪",
      "Cada cliente é uma oportunidade de crescimento! 🌟",
      "Mantenha o foco e os resultados virão! 🎯",
      "Hoje é um novo dia para conquistar seus objetivos! ✨",
      "A persistência é o caminho para o sucesso! 🔥",
      "Transforme desafios em oportunidades! 💎",
      "Seu esforço hoje é seu sucesso amanhã! 🌅",
      "Cada moto vendida é uma conquista a mais. 🏆",
      "Controle, agilidade e resultado. Seu negócio na palma da mão. 📱",
      "Organização é o primeiro passo para crescer. 📈",
      "Quem domina o estoque, acelera nas vendas! ⚡",
      "Foco no controle, rumo ao sucesso! 🎯",
    ];
    const randomIndex = Math.floor(Math.random() * messages.length);
    return messages[randomIndex];
  };

  useEffect(() => {
    setGreeting(getGreeting());
    setMotivationalMessage(getMotivationalMessage());
  }, []);

  const handleSettingsPress = () => {
    router.push("/settings");
  };

  const handleVehiclePress = (vehicleId: number) => {
    console.log("Navegando para veículo ID:", vehicleId);
    router.push(`/vehicle-details/${vehicleId}`);
  };

  const handleClientsPress = () => {
    router.push("/add-client");
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
          type: "custom",
          customComponent: (
            <Image
              source={require("@assets/images/logo.png")}
              style={{
                height: 31,
                width: 130,
                resizeMode: "contain",
              }}
            />
          ),
        }}
        rightContent={<RightContent />}
      />

      <ScrollView style={{ flex: 1 }}>
        {/* Resumo do Dia */}
        <View style={{ paddingHorizontal: 16, paddingVertical: 24 }}>
          <View
            style={{
              backgroundColor: colors.background.header,
              borderRadius: 16,
              padding: 24,
              marginBottom: 24,
            }}
          >
            {/* Saudação e Mensagem Motivacional */}
            <View style={{ marginBottom: 24 }}>
              <Text
                style={{
                  color: colors.text.light,
                  fontSize: 24,
                  fontWeight: "bold",
                  marginBottom: 8,
                }}
              >
                {greeting}
              </Text>
              <Text
                style={{
                  color: colors.text.light,
                  opacity: 0.9,
                  fontSize: 16,
                  lineHeight: 22,
                }}
              >
                {motivationalMessage}
              </Text>
            </View>

            {/* Cards de Resumo */}
            <View style={{ gap: 12 }}>
              {/* Veículos no Estoque */}
              <View
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                  borderRadius: 12,
                  padding: 16,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                    borderRadius: 8,
                    padding: 10,
                    marginRight: 12,
                  }}
                >
                  <FontAwesome name="car" size={20} color={colors.text.light} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      color: colors.text.light,
                      fontSize: 14,
                      opacity: 0.8,
                    }}
                  >
                    Veículos no Estoque
                  </Text>
                  <Text
                    style={{
                      color: colors.text.light,
                      fontSize: 20,
                      fontWeight: "bold",
                    }}
                  >
                    {summaryData.vehiclesInStock}
                  </Text>
                </View>
              </View>

              {/* Vendas do Mês */}
              <View
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                  borderRadius: 12,
                  padding: 16,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                    borderRadius: 8,
                    padding: 10,
                    marginRight: 12,
                  }}
                >
                  <FontAwesome
                    name="bar-chart"
                    size={20}
                    color={colors.text.light}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      color: colors.text.light,
                      fontSize: 14,
                      opacity: 0.8,
                    }}
                  >
                    Vendas do Mês
                  </Text>
                  <Text
                    style={{
                      color: colors.text.light,
                      fontSize: 20,
                      fontWeight: "bold",
                    }}
                  >
                    R$ {summaryData.monthlySales.toLocaleString("pt-BR")}
                  </Text>
                </View>
              </View>

              {/* Parcelas Pendentes ou Atrasadas */}
              <View
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                  borderRadius: 12,
                  padding: 16,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                    borderRadius: 8,
                    padding: 10,
                    marginRight: 12,
                  }}
                >
                  <FontAwesome
                    name="credit-card"
                    size={20}
                    color={colors.text.light}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      color: colors.text.light,
                      fontSize: 14,
                      opacity: 0.8,
                    }}
                  >
                    {summaryData.overdueInstallments > 0
                      ? `Parcelas Vencidas`
                      : `Parcelas Pendentes`}
                  </Text>
                  <Text
                    style={{
                      color: colors.text.light,
                      fontSize: 20,
                      fontWeight: "bold",
                    }}
                  >
                    {summaryData.overdueInstallments > 0
                      ? summaryData.overdueInstallments
                      : summaryData.pendingInstallments}
                  </Text>
                </View>
              </View>
            </View>
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
                Registrar Compra
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
                Registrar Venda
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
                  name="user"
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
                Cadastrar Cliente
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
                  name="file-text"
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
                Contrato de Venda
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ paddingHorizontal: 16, marginBottom: 24 }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: colors.text.primary,
              marginBottom: 16,
            }}
          >
            Pagamentos
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
              onPress={() => router.push("/installments")}
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
                  name="credit-card"
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
                Ver Parcelas
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
                  name="credit-card"
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
                Registrar Pagamento
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
                  name="credit-card"
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
                Parcelas Vencidas
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ paddingHorizontal: 16, marginBottom: 24 }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: colors.text.primary,
              marginBottom: 16,
            }}
          >
            Consultas
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
              onPress={() => router.push("/vehicles")}
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
                  name="motorcycle"
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
                Ver Estoque
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
              onPress={() => router.push("/clients")}
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
                Clientes
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
                Tabela FIPE
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
              onPress={() => router.push("/sales")}
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
                Minhas Vendas
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Featured Section - Veículos há mais de 30 dias */}
        <View style={{ paddingHorizontal: 16, marginBottom: 24 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <FontAwesome
              name="calendar"
              size={20}
              color={colors.status.warning}
            />
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: colors.text.primary,
                marginLeft: 8,
              }}
            >
              Há mais de 30 dias
            </Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ flexDirection: "row" }}
          >
            {featuredVehicles.map((vehicle) => (
              <TouchableOpacity
                key={vehicle.id}
                onPress={() => handleVehiclePress(vehicle.id)}
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
                  width: 280,
                }}
              >
                {/* Imagem da moto */}
                <View
                  style={{
                    backgroundColor: BrandColors.gray200,
                    borderRadius: 8,
                    height: 140,
                    marginBottom: 12,
                    overflow: "hidden",
                  }}
                >
                  {vehicle.image ? (
                    <Image
                      source={{ uri: vehicle.image }}
                      style={{
                        width: "100%",
                        height: "100%",
                        resizeMode: "cover",
                      }}
                    />
                  ) : (
                    <View
                      style={{
                        flex: 1,
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
                  )}
                </View>

                {/* Informações do veículo */}
                <View style={{ marginBottom: 8 }}>
                  <Text
                    style={{
                      fontWeight: "600",
                      color: colors.text.primary,
                      fontSize: 16,
                      marginBottom: 4,
                    }}
                  >
                    {vehicle.brand} {vehicle.model}
                  </Text>
                  <Text
                    style={{
                      color: colors.text.secondary,
                      fontSize: 14,
                      marginBottom: 4,
                    }}
                  >
                    {vehicle.year} • {vehicle.displacement}
                  </Text>
                </View>

                {/* Detalhes adicionais */}
                <View style={{ gap: 4, marginBottom: 8 }}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <FontAwesome
                      name="paint-brush"
                      size={12}
                      color={colors.text.secondary}
                    />
                    <Text
                      style={{
                        color: colors.text.secondary,
                        fontSize: 12,
                        marginLeft: 4,
                      }}
                    >
                      {vehicle.color}
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <FontAwesome
                      name="tachometer"
                      size={12}
                      color={colors.text.secondary}
                    />
                    <Text
                      style={{
                        color: colors.text.secondary,
                        fontSize: 12,
                        marginLeft: 4,
                      }}
                    >
                      {vehicle.mileage.toLocaleString("pt-BR")} km
                    </Text>
                  </View>
                </View>

                {/* Dias no estoque e preço */}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingTop: 8,
                    borderTopWidth: 1,
                    borderTopColor: colors.card.border,
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <FontAwesome
                      name="clock-o"
                      size={12}
                      color={colors.status.warning}
                    />
                    <Text
                      style={{
                        color: colors.status.warning,
                        fontSize: 12,
                        fontWeight: "600",
                        marginLeft: 4,
                      }}
                    >
                      {vehicle.daysInStock} dias no estoque
                    </Text>
                  </View>
                  {vehicle.price && (
                    <Text
                      style={{
                        color: colors.text.primary,
                        fontSize: 14,
                        fontWeight: "600",
                      }}
                    >
                      {vehicle.price}
                    </Text>
                  )}
                </View>
              </TouchableOpacity>
            ))}
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

          {/* Primeira linha de estatísticas */}
          <View style={{ flexDirection: "row", gap: 12, marginBottom: 12 }}>
            <View
              style={{
                backgroundColor: colors.card.background,
                borderRadius: 12,
                padding: 16,
                flex: 1,
                borderWidth: 1,
                borderColor: colors.card.border,
                shadowColor: colors.card.shadow,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 8,
                }}
              >
                <FontAwesome
                  name="motorcycle"
                  size={16}
                  color={BrandColors.primary}
                />
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    color: colors.text.primary,
                    marginLeft: 8,
                  }}
                >
                  {statisticsData.vehiclesInStock}
                </Text>
              </View>
              <Text
                style={{
                  color: colors.text.secondary,
                  fontSize: 12,
                }}
              >
                Veículos em Estoque
              </Text>
            </View>

            <View
              style={{
                backgroundColor: colors.card.background,
                borderRadius: 12,
                padding: 16,
                flex: 1,
                borderWidth: 1,
                borderColor: colors.card.border,
                shadowColor: colors.card.shadow,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 8,
                }}
              >
                <FontAwesome
                  name="money"
                  size={16}
                  color={BrandColors.success}
                />
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    color: colors.text.primary,
                    marginLeft: 8,
                  }}
                >
                  R$ {statisticsData.monthlySalesValue.toLocaleString("pt-BR")}
                </Text>
              </View>
              <Text
                style={{
                  color: colors.text.secondary,
                  fontSize: 12,
                }}
              >
                Valor Vendido (Mês)
              </Text>
            </View>
          </View>

          {/* Segunda linha de estatísticas */}
          <View style={{ flexDirection: "row", gap: 12, marginBottom: 12 }}>
            <View
              style={{
                backgroundColor: colors.card.background,
                borderRadius: 12,
                padding: 16,
                flex: 1,
                borderWidth: 1,
                borderColor: colors.card.border,
                shadowColor: colors.card.shadow,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 8,
                }}
              >
                <FontAwesome
                  name="credit-card"
                  size={16}
                  color={BrandColors.success}
                />
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    color: colors.text.primary,
                    marginLeft: 8,
                  }}
                >
                  {statisticsData.installmentsToExpireCount}
                </Text>
              </View>
              <Text
                style={{
                  color: colors.text.secondary,
                  fontSize: 12,
                }}
              >
                Parcelas a Vencer (Mês)
              </Text>
            </View>

            <View
              style={{
                backgroundColor: colors.card.background,
                borderRadius: 12,
                padding: 16,
                flex: 1,
                borderWidth: 1,
                borderColor: colors.card.border,
                shadowColor: colors.card.shadow,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 8,
                }}
              >
                <FontAwesome
                  name="exclamation-triangle"
                  size={16}
                  color={colors.status.warning}
                />
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    color: colors.text.primary,
                    marginLeft: 8,
                  }}
                >
                  {statisticsData.overdueInstallmentsCount}
                </Text>
              </View>
              <Text
                style={{
                  color: colors.text.secondary,
                  fontSize: 12,
                }}
              >
                Parcelas Vencidas (Mês)
              </Text>
            </View>
          </View>

          {/* Terceira linha de estatísticas */}
          <View style={{ flexDirection: "row", gap: 12 }}>
            <View
              style={{
                backgroundColor: colors.card.background,
                borderRadius: 12,
                padding: 16,
                flex: 1,
                borderWidth: 1,
                borderColor: colors.card.border,
                shadowColor: colors.card.shadow,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 8,
                }}
              >
                <FontAwesome
                  name="bar-chart"
                  size={16}
                  color={BrandColors.primary}
                />
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    color: colors.text.primary,
                    marginLeft: 8,
                  }}
                >
                  {statisticsData.monthlySalesCount}
                </Text>
              </View>
              <Text
                style={{
                  color: colors.text.secondary,
                  fontSize: 12,
                }}
              >
                Vendas (Mês)
              </Text>
            </View>

            <View
              style={{
                backgroundColor: colors.card.background,
                borderRadius: 12,
                padding: 16,
                flex: 1,
                borderWidth: 1,
                borderColor: colors.card.border,
                shadowColor: colors.card.shadow,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 8,
                }}
              >
                <FontAwesome
                  name="trophy"
                  size={16}
                  color={BrandColors.primary}
                />
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    color: colors.text.primary,
                    marginLeft: 8,
                  }}
                >
                  {statisticsData.totalSalesCount}
                </Text>
              </View>
              <Text
                style={{
                  color: colors.text.secondary,
                  fontSize: 12,
                }}
              >
                Vendas (Total)
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
