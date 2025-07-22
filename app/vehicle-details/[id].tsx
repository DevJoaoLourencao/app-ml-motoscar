import { Header } from "@/components/Header";
import { formatCurrency } from "@/components/masks";
import { SuccessModal } from "@/components/SuccessModal";
import { useTheme } from "@/components/ThemeContext";
import { BrandColors } from "@/constants/BrandColors";
import { VehicleDetails, VehicleImage } from "@/services/api";
import { FontAwesome } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

// Dados mockados para desenvolvimento (remover quando API estiver pronta)
const mockVehicleDetails: Record<string, VehicleDetails> = {
  "1": {
    id: "1",
    name: "Honda CB 650R",
    vehicleType: "Moto",
    brand: "Honda",
    model: "CB 650R",
    year: "2024",
    displacement: "650cc",
    fuelType: "Gasolina",
    licensePlate: "FHZ8A60",
    renavam: "12345678901",
    color: "Preto",
    mileage: 8500,
    purchasePrice: "45000",
    salePrice: "52900",
    minimumCash: "40000",
    client: "João Silva",
    clientId: "1",
    description:
      "A Honda CB 650R representa o equilíbrio perfeito entre performance e estilo. Com motor de 649cc de 4 cilindros, oferece uma experiência de pilotagem emocionante com tecnologia de ponta e design neo-retrô que chama atenção.",
    features: [
      "ABS de duplo canal",
      "Sistema de injeção eletrônica PGM-FI",
      "Farol LED full",
      "Painel digital LCD",
      "Suspensão Showa SFF",
      "Freios a disco duplo",
      "Pneus radiais",
      "Sistema de partida elétrica",
      "Controle de tração",
      "Modos de condução",
      "Manual",
      "Chave Reserva",
      "Peças Originais",
      "IPVA Pago",
      "Licenciamento Pago",
    ],
    images: [
      {
        id: "1",
        url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
        alt: "Honda CB 650R - Vista frontal",
      },
      {
        id: "2",
        url: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800",
        alt: "Honda CB 650R - Vista lateral",
      },
      {
        id: "3",
        url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800",
        alt: "Honda CB 650R - Vista traseira",
      },
      {
        id: "4",
        url: "https://images.unsplash.com/photo-1582639510494-c80b5de9f148?w=800",
        alt: "Honda CB 650R - Detalhes",
      },
    ],
  },
  "2": {
    id: "2",
    name: "Yamaha MT-07",
    vehicleType: "Moto",
    brand: "Yamaha",
    model: "MT-07",
    year: "2023",
    displacement: "700cc",
    fuelType: "Gasolina",
    licensePlate: "ABC1D23",
    renavam: "98765432109",
    color: "Azul",
    mileage: 12500,
    purchasePrice: "40000",
    salePrice: "45900",
    minimumCash: "35000",
    description:
      "A Yamaha MT-07 é conhecida por sua versatilidade e facilidade de pilotagem. Com motor bicilíndrico de 689cc, oferece torque linear e excelente economia de combustível, sendo ideal tanto para o dia a dia quanto para viagens.",
    features: [
      "ABS de duplo canal",
      "Sistema de injeção eletrônica",
      "Farol LED",
      "Painel digital",
      "Suspensão dianteira invertida",
      "Freios a disco",
      "Pneus radiais",
      "Sistema de partida elétrica",
      "Design agressivo",
      "Peso reduzido",
      "Manual",
      "Chave Reserva",
      "Escape Original",
      "Rodas Originais",
      "IPVA Pago",
      "Seguro Pago",
    ],
    images: [
      {
        id: "5",
        url: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800",
        alt: "Yamaha MT-07 - Vista frontal",
      },
      {
        id: "6",
        url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800",
        alt: "Yamaha MT-07 - Vista lateral",
      },
    ],
  },
  // Adicione mais veículos conforme necessário...
};

export default function VehicleDetailsScreen() {
  const { colors } = useTheme();
  const params = useLocalSearchParams();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [vehicle, setVehicle] = useState<VehicleDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Debug logs
  console.log("=== VEHICLE DETAILS DEBUG ===");
  console.log("Params received:", params);
  console.log("Params.id:", params.id);
  console.log("Params type:", typeof params.id);
  console.log("All params keys:", Object.keys(params));
  console.log("Header should be hidden - using custom Header component");

  // Função para buscar dados do veículo
  const loadVehicleDetails = async (vehicleId: string) => {
    try {
      setLoading(true);
      setError(null);

      console.log("Buscando detalhes do veículo ID:", vehicleId);

      // TODO: Descomentar quando API estiver pronta
      // const vehicleData = await vehicleService.getVehicleDetails(vehicleId);

      // Dados mockados para desenvolvimento
      const vehicleData = mockVehicleDetails[vehicleId];

      if (!vehicleData) {
        setError("Veículo não encontrado");
        return;
      }

      setVehicle(vehicleData);
    } catch (error) {
      console.error("Erro ao buscar detalhes do veículo:", error);
      setError("Erro ao carregar detalhes do veículo");
    } finally {
      setLoading(false);
    }
  };

  // Carregar dados quando o componente montar ou ID mudar
  useEffect(() => {
    const vehicleId = params.id as string;
    if (vehicleId) {
      loadVehicleDetails(vehicleId);
    }
  }, [params.id]);

  const handleBackPress = () => {
    router.back();
  };

  const handleEditPress = () => {
    router.push({
      pathname: "/add-vehicle",
      params: { editId: params.id },
    });
  };

  const handleDeletePress = () => {
    Alert.alert(
      "Excluir Veículo",
      "Tem certeza que deseja excluir este veículo? Esta ação não pode ser desfeita.",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            try {
              setLoading(true);
              // TODO: Implementar chamada da API para excluir veículo
              console.log("Excluindo veículo:", params.id);

              // Simular delay da API
              await new Promise((resolve) => setTimeout(resolve, 1000));

              setSuccessMessage("Veículo excluído com sucesso!");
              setShowSuccessModal(true);
            } catch (error) {
              console.error("Erro ao excluir veículo:", error);
              Alert.alert("Erro", "Não foi possível excluir o veículo.");
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    router.back();
  };

  const handleCallClient = () => {
    if (!vehicle) return;

    if (vehicle.client) {
      Alert.alert(
        "Ligar para Vendedor",
        `Deseja ligar para ${vehicle.client}?`,
        [
          { text: "Cancelar", style: "cancel" },
          {
            text: "Ligar",
            onPress: () =>
              Alert.alert("Ligando", `Ligando para ${vehicle.client}...`),
          },
        ]
      );
    } else {
      Alert.alert(
        "Vendedor não informado",
        "Este veículo não possui vendedor associado."
      );
    }
  };

  const handleWhatsAppClient = () => {
    if (!vehicle) return;

    if (vehicle.client) {
      Alert.alert(
        "WhatsApp do vendedor",
        `Deseja abrir o WhatsApp para ${vehicle.client}?`,
        [
          { text: "Cancelar", style: "cancel" },
          {
            text: "Abrir WhatsApp",
            onPress: () =>
              Alert.alert(
                "WhatsApp",
                `Abrindo WhatsApp para ${vehicle.client}...`
              ),
          },
        ]
      );
    } else {
      Alert.alert(
        "Vendedor não informado",
        "Este veículo não possui vendedor associado."
      );
    }
  };

  const handleFipeConsult = () => {
    if (!vehicle) return;

    Alert.alert(
      "Consulta FIPE",
      `Consultar preço FIPE para ${vehicle.brand} ${vehicle.model} ${vehicle.year}?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Consultar",
          onPress: async () => {
            try {
              setLoading(true);
              // TODO: Implementar chamada da API FIPE
              console.log("Consultando FIPE para:", {
                brand: vehicle.brand,
                model: vehicle.model,
                year: vehicle.year,
              });

              // Simular delay da API
              await new Promise((resolve) => setTimeout(resolve, 2000));

              // Simular resposta da FIPE
              const fipePrice = Math.floor(Math.random() * 50000) + 20000; // Preço aleatório entre 20k e 70k

              Alert.alert(
                "Consulta FIPE",
                `Preço FIPE: R$ ${fipePrice.toLocaleString(
                  "pt-BR"
                )}\n\nPreço de Venda: ${vehicle.salePrice}\n\nDiferença: R$ ${(
                  fipePrice -
                  parseFloat(
                    vehicle.salePrice.replace(/[^\d,]/g, "").replace(",", ".")
                  )
                ).toLocaleString("pt-BR")}`,
                [{ text: "OK" }]
              );
            } catch (error) {
              console.error("Erro ao consultar FIPE:", error);
              Alert.alert("Erro", "Não foi possível consultar a tabela FIPE.");
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  };

  const handleShareAnnouncement = () => {
    if (!vehicle) return;

    const announcementText = `🏍️ ${vehicle.name}

💰 Preço: ${vehicle.salePrice}
📅 Ano: ${vehicle.year}
🏁 Quilometragem: ${vehicle.mileage?.toLocaleString("pt-BR") || "N/A"} km
🎨 Cor: ${vehicle.color}
📱 Entre em contato para mais informações!

#MLMotoscar #Motos #Veículos`;

    Alert.alert("Compartilhar Anúncio", "Deseja compartilhar este anúncio?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Compartilhar",
        onPress: () => {
          // TODO: Implementar compartilhamento real
          Alert.alert("Compartilhando", "Anúncio compartilhado com sucesso!");
        },
      },
    ]);
  };

  const handleSellVehicle = () => {
    if (!vehicle) return;

    Alert.alert(
      "Vender Veículo",
      `Confirmar venda do ${vehicle.name} por ${vehicle.salePrice}?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Confirmar Venda",
          onPress: async () => {
            try {
              setLoading(true);
              // TODO: Implementar chamada da API para marcar como vendido
              console.log("Vendendo veículo:", params.id);

              // Simular delay da API
              await new Promise((resolve) => setTimeout(resolve, 1000));

              setSuccessMessage("Veículo vendido com sucesso!");
              setShowSuccessModal(true);
            } catch (error) {
              console.error("Erro ao vender veículo:", error);
              Alert.alert("Erro", "Não foi possível confirmar a venda.");
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  };

  // Loading state
  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background.secondary }}>
        <Header
          leftContent={{
            type: "back",
            onBackPress: handleBackPress,
            title: "Detalhes do Veículo",
          }}
        />
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color={BrandColors.primary} />
          <Text style={{ marginTop: 16, color: colors.text.secondary }}>
            Carregando detalhes do veículo...
          </Text>
        </View>
      </View>
    );
  }

  // Error state
  if (error || !vehicle) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background.secondary }}>
        <Header
          leftContent={{
            type: "back",
            onBackPress: handleBackPress,
          }}
          rightContent={
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 12 }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  borderRadius: 20,
                  padding: 8,
                }}
                onPress={() => router.push("/settings")}
              >
                <FontAwesome name="user" size={20} color={colors.text.light} />
              </TouchableOpacity>
            </View>
          }
        />
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
          }}
        >
          <FontAwesome
            name="exclamation-triangle"
            size={48}
            color={colors.status.error}
          />
          <Text
            style={{
              marginTop: 16,
              color: colors.text.primary,
              fontSize: 18,
              fontWeight: "600",
            }}
          >
            {error || "Veículo não encontrado"}
          </Text>
          <Text
            style={{
              marginTop: 8,
              color: colors.text.secondary,
              textAlign: "center",
            }}
          >
            Tente novamente ou volte para a listagem
          </Text>
          <TouchableOpacity
            style={{
              marginTop: 20,
              backgroundColor: BrandColors.primary,
              paddingHorizontal: 20,
              paddingVertical: 12,
              borderRadius: 8,
            }}
            onPress={() => loadVehicleDetails(params.id as string)}
          >
            <Text style={{ color: colors.text.light, fontWeight: "600" }}>
              Tentar Novamente
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const RightContent = () => (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
      <TouchableOpacity
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          borderRadius: 20,
          padding: 8,
        }}
        onPress={handleDeletePress}
      >
        <FontAwesome name="trash" size={20} color={colors.text.light} />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          borderRadius: 20,
          padding: 8,
        }}
        onPress={handleEditPress}
      >
        <FontAwesome name="edit" size={20} color={colors.text.light} />
      </TouchableOpacity>
    </View>
  );

  const renderImage = ({
    item,
    index,
  }: {
    item: VehicleImage;
    index: number;
  }) => (
    <Image
      source={{ uri: item.url }}
      style={{
        width: width,
        height: 300,
        resizeMode: "cover",
      }}
    />
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.background.secondary }}>
      {/* Header */}
      <Header
        leftContent={{
          type: "back",
          title: "Detalhes do Veículo",
          onBackPress: handleBackPress,
        }}
        rightContent={<RightContent />}
      />

      <ScrollView style={{ flex: 1 }}>
        {/* Image Gallery */}
        {vehicle.images && vehicle.images.length > 0 && (
          <View style={{ height: 300 }}>
            <FlatList
              data={vehicle.images}
              renderItem={renderImage}
              keyExtractor={(item) => item.id}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onMomentumScrollEnd={(event) => {
                const index = Math.round(
                  event.nativeEvent.contentOffset.x / width
                );
                setSelectedImageIndex(index);
              }}
            />
            {/* Image Indicators */}
            <View
              style={{
                position: "absolute",
                bottom: 16,
                left: 0,
                right: 0,
                flexDirection: "row",
                justifyContent: "center",
                gap: 8,
              }}
            >
              {vehicle.images.map((_, index) => (
                <View
                  key={index}
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor:
                      index === selectedImageIndex
                        ? colors.text.light
                        : "rgba(255, 255, 255, 0.5)",
                  }}
                />
              ))}
            </View>
          </View>
        )}

        {/* Vehicle Info */}
        <View style={{ paddingHorizontal: 16, paddingVertical: 24 }}>
          {/* Title and Price */}
          <View style={{ marginBottom: 16 }}>
            <Text
              style={{
                fontSize: 28,
                fontWeight: "bold",
                color: colors.text.primary,
                marginBottom: 8,
              }}
            >
              {vehicle.name}
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "bold",
                  color: BrandColors.primary,
                }}
              >
                {formatCurrency(vehicle.salePrice)}
              </Text>
            </View>
          </View>

          {/* Informações do Veículo */}
          <View
            style={{
              backgroundColor: colors.card.background,
              borderRadius: 16,
              padding: 20,
              marginBottom: 24,
              borderWidth: 1,
              borderColor: colors.card.border,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: colors.text.primary,
                marginBottom: 16,
              }}
            >
              Informações do Veículo
            </Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 16 }}>
              <View style={{ flex: 1, minWidth: 120 }}>
                <Text style={{ color: colors.text.secondary, fontSize: 12 }}>
                  Tipo
                </Text>
                <Text style={{ color: colors.text.primary, fontWeight: "600" }}>
                  {vehicle.vehicleType}
                </Text>
              </View>
              <View style={{ flex: 1, minWidth: 120 }}>
                <Text style={{ color: colors.text.secondary, fontSize: 12 }}>
                  Marca
                </Text>
                <Text style={{ color: colors.text.primary, fontWeight: "600" }}>
                  {vehicle.brand}
                </Text>
              </View>
              <View style={{ flex: 1, minWidth: 120 }}>
                <Text style={{ color: colors.text.secondary, fontSize: 12 }}>
                  Modelo
                </Text>
                <Text style={{ color: colors.text.primary, fontWeight: "600" }}>
                  {vehicle.model}
                </Text>
              </View>
              <View style={{ flex: 1, minWidth: 120 }}>
                <Text style={{ color: colors.text.secondary, fontSize: 12 }}>
                  Ano
                </Text>
                <Text style={{ color: colors.text.primary, fontWeight: "600" }}>
                  {vehicle.year}
                </Text>
              </View>
              <View style={{ flex: 1, minWidth: 120 }}>
                <Text style={{ color: colors.text.secondary, fontSize: 12 }}>
                  Cilindradas
                </Text>
                <Text style={{ color: colors.text.primary, fontWeight: "600" }}>
                  {vehicle.displacement}
                </Text>
              </View>
              {vehicle.fuelType && (
                <View style={{ flex: 1, minWidth: 120 }}>
                  <Text style={{ color: colors.text.secondary, fontSize: 12 }}>
                    Combustível
                  </Text>
                  <Text
                    style={{ color: colors.text.primary, fontWeight: "600" }}
                  >
                    {vehicle.fuelType}
                  </Text>
                </View>
              )}
              <View style={{ flex: 1, minWidth: 120 }}>
                <Text style={{ color: colors.text.secondary, fontSize: 12 }}>
                  Placa
                </Text>
                <Text style={{ color: colors.text.primary, fontWeight: "600" }}>
                  {vehicle.licensePlate}
                </Text>
              </View>
              <View style={{ flex: 1, minWidth: 120 }}>
                <Text style={{ color: colors.text.secondary, fontSize: 12 }}>
                  RENAVAM
                </Text>
                <Text style={{ color: colors.text.primary, fontWeight: "600" }}>
                  {vehicle.renavam}
                </Text>
              </View>
              <View style={{ flex: 1, minWidth: 120 }}>
                <Text style={{ color: colors.text.secondary, fontSize: 12 }}>
                  Cor
                </Text>
                <Text style={{ color: colors.text.primary, fontWeight: "600" }}>
                  {vehicle.color}
                </Text>
              </View>
              <View style={{ flex: 1, minWidth: 120 }}>
                <Text style={{ color: colors.text.secondary, fontSize: 12 }}>
                  Quilometragem
                </Text>
                <Text style={{ color: colors.text.primary, fontWeight: "600" }}>
                  {vehicle.mileage.toLocaleString("pt-BR")} km
                </Text>
              </View>
            </View>
          </View>

          {/* Informações Financeiras */}
          <View
            style={{
              backgroundColor: colors.card.background,
              borderRadius: 16,
              padding: 20,
              marginBottom: 24,
              borderWidth: 1,
              borderColor: colors.card.border,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: colors.text.primary,
                marginBottom: 16,
              }}
            >
              Informações Financeiras
            </Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 16 }}>
              <View style={{ flex: 1, minWidth: 120 }}>
                <Text style={{ color: colors.text.secondary, fontSize: 12 }}>
                  Preço de Compra
                </Text>
                <Text style={{ color: colors.text.primary, fontWeight: "600" }}>
                  {formatCurrency(vehicle.purchasePrice)}
                </Text>
              </View>
              <View style={{ flex: 1, minWidth: 120 }}>
                <Text style={{ color: colors.text.secondary, fontSize: 12 }}>
                  Preço de Venda
                </Text>
                <Text style={{ color: BrandColors.primary, fontWeight: "600" }}>
                  {formatCurrency(vehicle.salePrice)}
                </Text>
              </View>
              <View style={{ flex: 1, minWidth: 120 }}>
                <Text style={{ color: colors.text.secondary, fontSize: 12 }}>
                  Mínimo à Vista
                </Text>
                <Text style={{ color: BrandColors.success, fontWeight: "600" }}>
                  {formatCurrency(vehicle.minimumCash)}
                </Text>
              </View>
              {vehicle.client && (
                <View style={{ flex: 1, minWidth: 120 }}>
                  <Text style={{ color: colors.text.secondary, fontSize: 12 }}>
                    Vendedor
                  </Text>
                  <Text
                    style={{ color: colors.text.primary, fontWeight: "600" }}
                  >
                    {vehicle.client}
                  </Text>
                </View>
              )}
            </View>

            {/* Botões de contato com cliente */}
            {vehicle.client && (
              <View style={{ marginTop: 16, flexDirection: "row", gap: 12 }}>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    backgroundColor: colors.card.background,
                    borderRadius: 8,
                    paddingVertical: 6,
                    alignItems: "center",
                    borderWidth: 1,
                    borderColor: BrandColors.primary,
                  }}
                  onPress={handleCallClient}
                >
                  <FontAwesome
                    name="phone"
                    size={14}
                    color={BrandColors.primary}
                  />
                  <Text
                    style={{
                      color: BrandColors.primary,
                      marginTop: 4,
                      fontSize: 11,
                      fontWeight: "600",
                    }}
                  >
                    Ligar
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    backgroundColor: colors.card.background,
                    borderRadius: 8,
                    paddingVertical: 6,
                    alignItems: "center",
                    borderWidth: 1,
                    borderColor: "#25D366",
                  }}
                  onPress={handleWhatsAppClient}
                >
                  <FontAwesome name="whatsapp" size={14} color="#25D366" />
                  <Text
                    style={{
                      color: "#25D366",
                      marginTop: 4,
                      fontSize: 11,
                      fontWeight: "600",
                    }}
                  >
                    WhatsApp
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* Description */}
          {vehicle.description && (
            <View style={{ marginBottom: 24 }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: colors.text.primary,
                  marginBottom: 12,
                }}
              >
                Descrição
              </Text>
              <Text
                style={{
                  color: colors.text.secondary,
                  lineHeight: 24,
                  fontSize: 16,
                }}
              >
                {vehicle.description}
              </Text>
            </View>
          )}

          {/* Features */}
          {vehicle.features && vehicle.features.length > 0 && (
            <View style={{ marginBottom: 24 }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: colors.text.primary,
                  marginBottom: 16,
                }}
              >
                Opcionais
              </Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
                {vehicle.features.map((feature: string, index: number) => (
                  <View
                    key={index}
                    style={{
                      backgroundColor: colors.card.background,
                      borderRadius: 20,
                      paddingHorizontal: 12,
                      paddingVertical: 6,
                      borderWidth: 1,
                      borderColor: colors.card.border,
                    }}
                  >
                    <Text style={{ color: colors.text.primary, fontSize: 14 }}>
                      {feature}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View
        style={{
          backgroundColor: colors.card.background,
          paddingHorizontal: 16,
          paddingTop: 16,
          paddingBottom: 34,
          borderTopWidth: 1,
          borderTopColor: colors.card.border,
        }}
      >
        {/* Primeira linha - Consulta FIPE e Compartilhar */}
        <View style={{ flexDirection: "row", gap: 12 }}>
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: colors.card.background,
              borderRadius: 12,
              paddingVertical: 12,
              alignItems: "center",
              borderWidth: 1,
              borderColor: colors.card.border,
            }}
            onPress={handleFipeConsult}
          >
            <FontAwesome
              name="calculator"
              size={16}
              color={BrandColors.primary}
            />
            <Text
              style={{ color: colors.text.primary, marginTop: 4, fontSize: 12 }}
            >
              Consultar FIPE
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: colors.card.background,
              borderRadius: 12,
              paddingVertical: 12,
              alignItems: "center",
              borderWidth: 1,
              borderColor: colors.card.border,
            }}
            onPress={handleShareAnnouncement}
          >
            <FontAwesome name="share" size={16} color="#25D366" />
            <Text
              style={{ color: colors.text.primary, marginTop: 4, fontSize: 12 }}
            >
              Compartilhar Anúncio
            </Text>
          </TouchableOpacity>
        </View>

        {/* Segunda linha - Botão Vender */}
        <View style={{ marginTop: 12 }}>
          <TouchableOpacity
            style={{
              backgroundColor: BrandColors.primary,
              borderRadius: 12,
              paddingVertical: 16,
              alignItems: "center",
            }}
            onPress={handleSellVehicle}
          >
            <Text
              style={{
                color: colors.text.light,
                fontWeight: "600",
                fontSize: 16,
              }}
            >
              Vender
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Modal de Sucesso */}
      <SuccessModal
        visible={showSuccessModal}
        onClose={handleSuccessModalClose}
        title="Sucesso!"
        message={successMessage}
      />
    </View>
  );
}
