import { Header } from "@/components/Header";
import { useTheme } from "@/components/ThemeContext";
import { BrandColors } from "@/constants/BrandColors";
import { FontAwesome } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface Client {
  id: number;
  name: string;
  phone: string;
  cpf: string;
  cep: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  createdAt: string;
}

interface Vehicle {
  id: number;
  brand: string;
  model: string;
  year: string;
  color: string;
  licensePlate: string;
  price: string;
  status: "purchased" | "sold" | "searching";
  date: string;
}

export default function ClientDetailsScreen() {
  const { colors } = useTheme();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [client, setClient] = useState<Client | null>(null);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  // Simular dados da API
  const mockClient: Client = {
    id: 1,
    name: "João Silva",
    phone: "(11) 99999-9999",
    cpf: "123.456.789-00",
    cep: "01234-567",
    street: "Rua das Flores",
    number: "123",
    complement: "Apto 45",
    neighborhood: "Centro",
    city: "São Paulo",
    state: "SP",
    createdAt: "15/12/2024",
  };

  const mockVehicles: Vehicle[] = [
    {
      id: 1,
      brand: "Honda",
      model: "CG 160",
      year: "2022",
      color: "Vermelho",
      licensePlate: "ABC-1234",
      price: "R$ 12.500",
      status: "purchased",
      date: "15/12/2024",
    },
    {
      id: 2,
      brand: "Yamaha",
      model: "Fazer 250",
      year: "2021",
      color: "Azul",
      licensePlate: "XYZ-5678",
      price: "R$ 18.900",
      status: "sold",
      date: "10/12/2024",
    },
    {
      id: 3,
      brand: "Honda",
      model: "CB 300R",
      year: "2023",
      color: "Preto",
      licensePlate: "",
      price: "R$ 25.000",
      status: "searching",
      date: "20/12/2024",
    },
  ];

  useEffect(() => {
    const loadClientDetails = async () => {
      setLoading(true);
      try {
        // Simular chamada da API
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setClient(mockClient);
        setVehicles(mockVehicles);
      } catch (error) {
        console.error("Erro ao carregar detalhes do cliente:", error);
        Alert.alert("Erro", "Não foi possível carregar os detalhes do cliente");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadClientDetails();
    }
  }, [id]);

  const handleBackPress = () => {
    router.back();
  };

  const handleEditPress = () => {
    // TODO: Implementar tela de edição
    Alert.alert(
      "Editar",
      "Funcionalidade de edição será implementada em breve"
    );
  };

  const handleDeletePress = () => {
    Alert.alert(
      "Excluir Cliente",
      `Tem certeza que deseja excluir o cliente ${client?.name}?`,
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Excluir",
          style: "destructive",
          onPress: () => {
            // TODO: Implementar exclusão
            Alert.alert("Sucesso", "Cliente excluído com sucesso");
            router.back();
          },
        },
      ]
    );
  };

  const handleCallPress = () => {
    // Implementar chamada telefônica
    Alert.alert("Ligar", `Ligando para ${client?.phone}`);
  };

  const handleWhatsAppPress = () => {
    // Implementar WhatsApp
    Alert.alert("WhatsApp", `Abrindo WhatsApp para ${client?.phone}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "purchased":
        return BrandColors.success;
      case "sold":
        return BrandColors.warning;
      case "searching":
        return BrandColors.info;
      default:
        return colors.text.secondary;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "purchased":
        return "Comprou";
      case "sold":
        return "Vendeu";
      case "searching":
        return "Buscando";
      default:
        return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "purchased":
        return "check-circle";
      case "sold":
        return "money";
      case "searching":
        return "search";
      default:
        return "question-circle";
    }
  };

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

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.background.secondary,
        }}
      >
        <Header
          leftContent={{
            type: "back",
            title: "Detalhes do Cliente",
          }}
          rightContent={<RightContent />}
        />
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color={BrandColors.primary} />
          <Text style={{ marginTop: 16, color: colors.text.primary }}>
            Carregando detalhes do cliente...
          </Text>
        </View>
      </View>
    );
  }

  if (!client) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.background.secondary,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color: colors.text.primary, fontSize: 16 }}>
          Cliente não encontrado
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background.secondary }}>
      {/* Header */}
      <Header
        leftContent={{
          type: "back",
          title: "Detalhes do Cliente",
        }}
        rightContent={<RightContent />}
      />

      <ScrollView style={{ flex: 1 }}>
        {/* Client Info Card */}
        <View style={{ padding: 16 }}>
          <View
            style={{
              backgroundColor: colors.card.background,
              borderRadius: 12,
              padding: 16,
              marginBottom: 16,
              borderWidth: 1,
              borderColor: colors.card.border,
            }}
          >
            {/* Avatar and Name */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <View
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 30,
                  backgroundColor: BrandColors.primary + "20",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 16,
                }}
              >
                <FontAwesome
                  name="user"
                  size={28}
                  color={BrandColors.primary}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    color: colors.text.primary,
                    marginBottom: 4,
                  }}
                >
                  {client.name}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: colors.text.secondary,
                  }}
                >
                  Cliente desde {client.createdAt}
                </Text>
              </View>
            </View>

            {/* Contact Info */}
            <View style={{ marginBottom: 16 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  color: colors.text.primary,
                  marginBottom: 12,
                }}
              >
                Informações de Contato
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 8,
                }}
              >
                <FontAwesome
                  name="phone"
                  size={16}
                  color={colors.text.secondary}
                  style={{ marginRight: 12, width: 20 }}
                />
                <Text style={{ fontSize: 16, color: colors.text.primary }}>
                  {client.phone}
                </Text>
              </View>

              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <FontAwesome
                  name="id-card"
                  size={16}
                  color={colors.text.secondary}
                  style={{ marginRight: 12, width: 20 }}
                />
                <Text style={{ fontSize: 16, color: colors.text.primary }}>
                  {client.cpf}
                </Text>
              </View>
            </View>

            {/* Address Info */}
            <View>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  color: colors.text.primary,
                  marginBottom: 12,
                }}
              >
                Endereço
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "flex-start",
                  marginBottom: 8,
                }}
              >
                <FontAwesome
                  name="map-marker"
                  size={16}
                  color={colors.text.secondary}
                  style={{ marginRight: 12, width: 20, marginTop: 2 }}
                />
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 16, color: colors.text.primary }}>
                    {client.street}, {client.number}
                  </Text>
                  {client.complement && (
                    <Text
                      style={{ fontSize: 14, color: colors.text.secondary }}
                    >
                      {client.complement}
                    </Text>
                  )}
                  <Text style={{ fontSize: 14, color: colors.text.secondary }}>
                    {client.neighborhood}
                  </Text>
                  <Text style={{ fontSize: 14, color: colors.text.secondary }}>
                    {client.city} - {client.state}
                  </Text>
                  <Text style={{ fontSize: 14, color: colors.text.secondary }}>
                    CEP: {client.cep}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Contact Actions */}
          <View
            style={{
              backgroundColor: colors.card.background,
              borderRadius: 12,
              padding: 16,
              marginBottom: 16,
              borderWidth: 1,
              borderColor: colors.card.border,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                color: colors.text.primary,
                marginBottom: 16,
              }}
            >
              Contatar Cliente
            </Text>

            <View style={{ flexDirection: "row", gap: 12 }}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  backgroundColor: BrandColors.primary + "20",
                  borderRadius: 8,
                  paddingVertical: 12,
                  alignItems: "center",
                  borderWidth: 1,
                  borderColor: BrandColors.primary,
                }}
                onPress={handleCallPress}
              >
                <FontAwesome
                  name="phone"
                  size={16}
                  color={BrandColors.primary}
                />
                <Text
                  style={{
                    color: BrandColors.primary,
                    marginTop: 4,
                    fontSize: 12,
                    fontWeight: "600",
                  }}
                >
                  Ligar
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  flex: 1,
                  backgroundColor: "#25D366" + "20",
                  borderRadius: 8,
                  paddingVertical: 12,
                  alignItems: "center",
                  borderWidth: 1,
                  borderColor: "#25D366",
                }}
                onPress={handleWhatsAppPress}
              >
                <FontAwesome name="whatsapp" size={16} color="#25D366" />
                <Text
                  style={{
                    color: "#25D366",
                    marginTop: 4,
                    fontSize: 12,
                    fontWeight: "600",
                  }}
                >
                  WhatsApp
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Vehicles History */}
          <View
            style={{
              backgroundColor: colors.card.background,
              borderRadius: 12,
              padding: 16,
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
              Histórico de Motos
            </Text>

            {vehicles.length === 0 ? (
              <View style={{ alignItems: "center", paddingVertical: 20 }}>
                <FontAwesome
                  name="motorcycle"
                  size={48}
                  color={colors.text.secondary}
                  style={{ marginBottom: 16 }}
                />
                <Text
                  style={{
                    fontSize: 16,
                    color: colors.text.secondary,
                    textAlign: "center",
                  }}
                >
                  Nenhuma moto registrada
                </Text>
              </View>
            ) : (
              vehicles.map((vehicle) => (
                <View
                  key={vehicle.id}
                  style={{
                    backgroundColor: colors.background.secondary,
                    borderRadius: 8,
                    padding: 12,
                    marginBottom: 12,
                    borderWidth: 1,
                    borderColor: colors.card.border,
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
                      color={colors.text.secondary}
                      style={{ marginRight: 8 }}
                    />
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "600",
                        color: colors.text.primary,
                        flex: 1,
                      }}
                    >
                      {vehicle.brand} {vehicle.model}
                    </Text>
                    <View
                      style={{
                        backgroundColor: getStatusColor(vehicle.status) + "20",
                        paddingHorizontal: 8,
                        paddingVertical: 4,
                        borderRadius: 12,
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <FontAwesome
                        name={getStatusIcon(vehicle.status)}
                        size={12}
                        color={getStatusColor(vehicle.status)}
                        style={{ marginRight: 4 }}
                      />
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: "500",
                          color: getStatusColor(vehicle.status),
                        }}
                      >
                        {getStatusLabel(vehicle.status)}
                      </Text>
                    </View>
                  </View>

                  <View
                    style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}
                  >
                    <Text
                      style={{ fontSize: 14, color: colors.text.secondary }}
                    >
                      {vehicle.year} • {vehicle.color}
                    </Text>
                    {vehicle.licensePlate && (
                      <Text
                        style={{ fontSize: 14, color: colors.text.secondary }}
                      >
                        • {vehicle.licensePlate}
                      </Text>
                    )}
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: 8,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "600",
                        color: colors.text.primary,
                      }}
                    >
                      {vehicle.price}
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        color: colors.text.secondary,
                      }}
                    >
                      {vehicle.date}
                    </Text>
                  </View>
                </View>
              ))
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
