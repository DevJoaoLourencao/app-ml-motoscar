import { Header } from "@/components/Header";
import { useTheme } from "@/components/ThemeContext";
import { BrandColors } from "@/constants/BrandColors";
import { FontAwesome } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface SaleDetails {
  id: number;
  vehicle: {
    name: string;
    brand: string;
    model: string;
    year: number;
    color: string;
    mileage: number;
    licensePlate: string;
    displacement?: string;
    fuelType?: string;
    image?: string;
  };
  customer: {
    name: string;
    phone: string;
    cpf: string;
    email?: string;
    address: {
      street: string;
      number: string;
      complement?: string;
      neighborhood: string;
      city: string;
      state: string;
      cep: string;
    };
  };
  sale: {
    date: string;
    value: string;
    status: string;
    paymentMethod?: string;
    installments?: number;
    downPayment?: string;
    notes?: string;
  };
}

export default function SaleDetailsScreen() {
  const { colors } = useTheme();
  const { id } = useLocalSearchParams();
  const [saleDetails, setSaleDetails] = useState<SaleDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [cancelModalVisible, setCancelModalVisible] = useState(false);

  // Dados mockados para demonstração
  const mockSaleDetails: SaleDetails = {
    id: 1,
    vehicle: {
      name: "Honda Civic",
      brand: "Honda",
      model: "Civic",
      year: 2022,
      color: "Branco",
      mileage: 8500,
      licensePlate: "ABC-1234",
      displacement: "2.0L",
      fuelType: "Flex",
      image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800",
    },
    customer: {
      name: "João Silva",
      phone: "(11) 99999-9999",
      cpf: "123.456.789-00",
      email: "joao.silva@email.com",
      address: {
        street: "Rua das Flores",
        number: "123",
        complement: "Apto 45",
        neighborhood: "Centro",
        city: "São Paulo",
        state: "SP",
        cep: "01234-567",
      },
    },
    sale: {
      date: "15/12/2024",
      value: "R$ 125.900",
      status: "completed",
      paymentMethod: "Financiamento",
      installments: 48,
      downPayment: "R$ 25.180",
      notes:
        "Cliente muito satisfeito com a compra. Veículo em excelente estado.",
    },
  };

  useEffect(() => {
    const fetchSaleDetails = async () => {
      try {
        setLoading(true);
        // Simular delay da API
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setSaleDetails(mockSaleDetails);
      } catch (error) {
        console.error("Erro ao buscar detalhes da venda:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSaleDetails();
  }, [id]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return BrandColors.success;
      case "cancelled":
        return BrandColors.error;
      default:
        return BrandColors.gray600;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Concluído";
      case "cancelled":
        return "Cancelado";
      default:
        return "Desconhecido";
    }
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
        onPress={() => {
          // Implementar compartilhamento ou impressão
          console.log("Compartilhar detalhes da venda");
        }}
      >
        <FontAwesome name="share" size={20} color={colors.text.light} />
      </TouchableOpacity>
    </View>
  );

  const LeftContent = () => (
    <TouchableOpacity
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        borderRadius: 20,
        paddingVertical: 6,
        paddingHorizontal: 8,
        marginRight: 8,
      }}
      onPress={() => router.back()}
    >
      <FontAwesome name="arrow-left" size={20} color={colors.text.light} />
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background.secondary }}>
        <Header
          leftContent={{
            type: "text",
            title: "Detalhes da Venda",
          }}
          rightContent={<RightContent />}
        />
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color={BrandColors.primary} />
          <Text style={{ marginTop: 16, color: colors.text.secondary }}>
            Carregando detalhes da venda...
          </Text>
        </View>
      </View>
    );
  }

  if (!saleDetails) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background.secondary }}>
        <Header
          leftContent={{
            type: "text",
            title: "Detalhes da Venda",
          }}
          rightContent={<RightContent />}
        />
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ color: colors.text.secondary }}>
            Venda não encontrada
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background.secondary }}>
      <Header
        leftContent={{
          type: "back",
          title: "Detalhes da Venda",
        }}
        rightContent={<RightContent />}
      />

      <ScrollView style={{ flex: 1 }}>
        {/* Status da Venda */}
        <View style={{ paddingHorizontal: 16, paddingVertical: 16 }}>
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
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 8,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: colors.text.primary,
                }}
              >
                Venda #{saleDetails.id}
              </Text>
              <View
                style={{
                  backgroundColor:
                    getStatusColor(saleDetails.sale.status) + "20",
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: 16,
                }}
              >
                <Text
                  style={{
                    color: getStatusColor(saleDetails.sale.status),
                    fontSize: 14,
                    fontWeight: "600",
                  }}
                >
                  {getStatusText(saleDetails.sale.status)}
                </Text>
              </View>
            </View>
            <Text
              style={{
                fontSize: 24,
                fontWeight: "bold",
                color: BrandColors.primary,
              }}
            >
              {saleDetails.sale.value}
            </Text>
            <Text
              style={{
                color: colors.text.secondary,
                fontSize: 14,
              }}
            >
              {saleDetails.sale.date}
            </Text>
          </View>
        </View>

        {/* Detalhes do Veículo */}
        <View style={{ paddingHorizontal: 16, marginBottom: 24 }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: colors.text.primary,
              marginBottom: 12,
            }}
          >
            Detalhes do Veículo
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
            <View style={{ flexDirection: "row", marginBottom: 16 }}>
              <View
                style={{
                  borderRadius: 8,
                  width: 80,
                  height: 80,
                  marginRight: 16,
                  overflow: "hidden",
                }}
              >
                {saleDetails.vehicle.image ? (
                  <Image
                    source={{ uri: saleDetails.vehicle.image }}
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
                      backgroundColor: BrandColors.gray200,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <FontAwesome
                      name="car"
                      size={24}
                      color={BrandColors.gray600}
                    />
                  </View>
                )}
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    color: colors.text.primary,
                    marginBottom: 4,
                  }}
                >
                  {saleDetails.vehicle.name}
                </Text>
                <Text
                  style={{
                    color: colors.text.secondary,
                    fontSize: 14,
                    marginBottom: 2,
                  }}
                >
                  {saleDetails.vehicle.brand} {saleDetails.vehicle.model}
                </Text>
                <Text
                  style={{
                    color: colors.text.secondary,
                    fontSize: 14,
                  }}
                >
                  {saleDetails.vehicle.year} • {saleDetails.vehicle.color}
                </Text>
              </View>
            </View>

            <View style={{ gap: 8 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ color: colors.text.secondary, fontSize: 14 }}>
                  Placa
                </Text>
                <Text
                  style={{
                    color: colors.text.primary,
                    fontSize: 14,
                    fontWeight: "600",
                  }}
                >
                  {saleDetails.vehicle.licensePlate}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ color: colors.text.secondary, fontSize: 14 }}>
                  Quilometragem
                </Text>
                <Text
                  style={{
                    color: colors.text.primary,
                    fontSize: 14,
                    fontWeight: "600",
                  }}
                >
                  {saleDetails.vehicle.mileage.toLocaleString("pt-BR")} km
                </Text>
              </View>
              {saleDetails.vehicle.displacement && (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ color: colors.text.secondary, fontSize: 14 }}>
                    Cilindrada
                  </Text>
                  <Text
                    style={{
                      color: colors.text.primary,
                      fontSize: 14,
                      fontWeight: "600",
                    }}
                  >
                    {saleDetails.vehicle.displacement}
                  </Text>
                </View>
              )}
              {saleDetails.vehicle.fuelType && (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ color: colors.text.secondary, fontSize: 14 }}>
                    Combustível
                  </Text>
                  <Text
                    style={{
                      color: colors.text.primary,
                      fontSize: 14,
                      fontWeight: "600",
                    }}
                  >
                    {saleDetails.vehicle.fuelType}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>

        {/* Detalhes do Comprador */}
        <View style={{ paddingHorizontal: 16, marginBottom: 24 }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: colors.text.primary,
              marginBottom: 12,
            }}
          >
            Detalhes do Comprador
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
            <View style={{ gap: 8 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ color: colors.text.secondary, fontSize: 14 }}>
                  Nome
                </Text>
                <Text
                  style={{
                    color: colors.text.primary,
                    fontSize: 14,
                    fontWeight: "600",
                  }}
                >
                  {saleDetails.customer.name}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ color: colors.text.secondary, fontSize: 14 }}>
                  CPF
                </Text>
                <Text
                  style={{
                    color: colors.text.primary,
                    fontSize: 14,
                    fontWeight: "600",
                  }}
                >
                  {saleDetails.customer.cpf}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ color: colors.text.secondary, fontSize: 14 }}>
                  Telefone
                </Text>
                <Text
                  style={{
                    color: colors.text.primary,
                    fontSize: 14,
                    fontWeight: "600",
                  }}
                >
                  {saleDetails.customer.phone}
                </Text>
              </View>
              {saleDetails.customer.email && (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ color: colors.text.secondary, fontSize: 14 }}>
                    E-mail
                  </Text>
                  <Text
                    style={{
                      color: colors.text.primary,
                      fontSize: 14,
                      fontWeight: "600",
                    }}
                  >
                    {saleDetails.customer.email}
                  </Text>
                </View>
              )}
            </View>

            <View
              style={{
                marginTop: 16,
                paddingTop: 16,
                borderTopWidth: 1,
                borderTopColor: colors.card.border,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  color: colors.text.primary,
                  marginBottom: 8,
                }}
              >
                Endereço
              </Text>
              <Text
                style={{
                  color: colors.text.primary,
                  fontSize: 14,
                  lineHeight: 20,
                }}
              >
                {saleDetails.customer.address.street},{" "}
                {saleDetails.customer.address.number}
                {saleDetails.customer.address.complement &&
                  ` - ${saleDetails.customer.address.complement}`}
              </Text>
              <Text
                style={{
                  color: colors.text.primary,
                  fontSize: 14,
                  lineHeight: 20,
                }}
              >
                {saleDetails.customer.address.neighborhood}
              </Text>
              <Text
                style={{
                  color: colors.text.primary,
                  fontSize: 14,
                  lineHeight: 20,
                }}
              >
                {saleDetails.customer.address.city} -{" "}
                {saleDetails.customer.address.state}
              </Text>
              <Text
                style={{
                  color: colors.text.primary,
                  fontSize: 14,
                  lineHeight: 20,
                }}
              >
                CEP: {saleDetails.customer.address.cep}
              </Text>
            </View>
          </View>
        </View>

        {/* Detalhes da Venda */}
        <View style={{ paddingHorizontal: 16, marginBottom: 32 }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: colors.text.primary,
              marginBottom: 12,
            }}
          >
            Detalhes da Venda
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
            <View style={{ gap: 8 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ color: colors.text.secondary, fontSize: 14 }}>
                  Data da Venda
                </Text>
                <Text
                  style={{
                    color: colors.text.primary,
                    fontSize: 14,
                    fontWeight: "600",
                  }}
                >
                  {saleDetails.sale.date}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ color: colors.text.secondary, fontSize: 14 }}>
                  Valor Total
                </Text>
                <Text
                  style={{
                    color: BrandColors.primary,
                    fontSize: 14,
                    fontWeight: "600",
                  }}
                >
                  {saleDetails.sale.value}
                </Text>
              </View>
              {saleDetails.sale.paymentMethod && (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ color: colors.text.secondary, fontSize: 14 }}>
                    Forma de Pagamento
                  </Text>
                  <Text
                    style={{
                      color: colors.text.primary,
                      fontSize: 14,
                      fontWeight: "600",
                    }}
                  >
                    {saleDetails.sale.paymentMethod}
                  </Text>
                </View>
              )}
              {saleDetails.sale.downPayment && (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ color: colors.text.secondary, fontSize: 14 }}>
                    Entrada
                  </Text>
                  <Text
                    style={{
                      color: colors.text.primary,
                      fontSize: 14,
                      fontWeight: "600",
                    }}
                  >
                    {saleDetails.sale.downPayment}
                  </Text>
                </View>
              )}
              {saleDetails.sale.installments && (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ color: colors.text.secondary, fontSize: 14 }}>
                    Parcelas
                  </Text>
                  <Text
                    style={{
                      color: colors.text.primary,
                      fontSize: 14,
                      fontWeight: "600",
                    }}
                  >
                    {saleDetails.sale.installments}x
                  </Text>
                </View>
              )}
            </View>

            {saleDetails.sale.notes && (
              <View
                style={{
                  marginTop: 16,
                  paddingTop: 16,
                  borderTopWidth: 1,
                  borderTopColor: colors.card.border,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                    color: colors.text.primary,
                    marginBottom: 8,
                  }}
                >
                  Observações
                </Text>
                <Text
                  style={{
                    color: colors.text.primary,
                    fontSize: 14,
                    lineHeight: 20,
                  }}
                >
                  {saleDetails.sale.notes}
                </Text>
              </View>
            )}
          </View>
        </View>
        {/* Botão de cancelar venda ao final */}
        <View style={{ paddingHorizontal: 16, marginBottom: 32 }}>
          <TouchableOpacity
            style={{
              backgroundColor: "transparent",
              borderRadius: 8,
              paddingVertical: 14,
              alignItems: "center",
              borderWidth: 1,
              borderColor: colors.status.error,
            }}
            onPress={() => setCancelModalVisible(true)}
          >
            <Text
              style={{
                color: colors.status.error,
                fontSize: 16,
                fontWeight: "600",
              }}
            >
              Cancelar Venda
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Modal de confirmação de cancelamento */}
      {saleDetails && (
        <Modal
          visible={cancelModalVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setCancelModalVisible(false)}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                backgroundColor: colors.card.background,
                borderRadius: 12,
                padding: 24,
                marginHorizontal: 32,
                borderWidth: 1,
                borderColor: colors.card.border,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "600",
                  color: colors.text.primary,
                  marginBottom: 8,
                  textAlign: "center",
                }}
              >
                Cancelar Venda
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: colors.text.secondary,
                  marginBottom: 24,
                  textAlign: "center",
                  lineHeight: 20,
                }}
              >
                Tem certeza que deseja cancelar a venda do veículo{" "}
                {saleDetails.vehicle.name} para o cliente{" "}
                {saleDetails.customer.name}?{"\n"}Esta ação não pode ser
                desfeita.
              </Text>

              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  onPress={() => setCancelModalVisible(false)}
                  style={{
                    flex: 1,
                    backgroundColor: colors.card.background,
                    borderRadius: 8,
                    paddingVertical: 12,
                    alignItems: "center",
                    borderWidth: 1,
                    borderColor: colors.card.border,
                    marginRight: 12,
                  }}
                >
                  <Text
                    style={{
                      color: colors.text.primary,
                      fontWeight: "600",
                    }}
                  >
                    Fechar
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    // Aqui você pode implementar a lógica de cancelamento real
                    setCancelModalVisible(false);
                  }}
                  style={{
                    flex: 1,
                    backgroundColor: colors.status.error,
                    borderRadius: 8,
                    paddingVertical: 12,
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color: colors.text.light,
                      fontWeight: "600",
                    }}
                  >
                    Confirmar
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}
