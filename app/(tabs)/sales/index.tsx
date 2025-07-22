import { Header } from "@/components/Header";
import { useTheme } from "@/components/ThemeContext";
import { BrandColors } from "@/constants/BrandColors";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface Sale {
  id: number;
  vehicle: string;
  customer: string;
  date: string;
  value: string;
  status: string;
}

export default function SalesScreen() {
  const { colors } = useTheme();
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  // Novo estado para modal de confirmação de cancelamento
  const [cancelModalVisible, setCancelModalVisible] = useState(false);
  const [saleToCancel, setSaleToCancel] = useState<Sale | null>(null);
  // Loader
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleFilterPress = () => {
    // Lógica para filtros
    console.log("Filtros pressionados");
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
        onPress={() => router.push("/sell-vehicle")}
      >
        <FontAwesome name="plus" size={20} color={colors.text.light} />
      </TouchableOpacity>
    </View>
  );

  const sales = [
    {
      id: 1,
      vehicle: "Honda Civic",
      customer: "João Silva",
      date: "15/12/2024",
      value: "R$ 125.900",
      status: "completed",
    },
    {
      id: 2,
      vehicle: "Yamaha MT-07",
      customer: "Maria Santos",
      date: "14/12/2024",
      value: "R$ 42.500",
      status: "completed",
    },
    {
      id: 3,
      vehicle: "Toyota Corolla",
      customer: "Pedro Costa",
      date: "13/12/2024",
      value: "R$ 145.800",
      status: "completed",
    },
    {
      id: 4,
      vehicle: "BMW S1000RR",
      customer: "Ana Oliveira",
      date: "12/12/2024",
      value: "R$ 89.900",
      status: "completed",
    },
    {
      id: 5,
      vehicle: "Volkswagen Golf GTI",
      customer: "Carlos Ferreira",
      date: "11/12/2024",
      value: "R$ 189.900",
      status: "cancelled",
    },
    {
      id: 6,
      vehicle: "Jeep Renegade",
      customer: "Lucia Martins",
      date: "10/12/2024",
      value: "R$ 165.400",
      status: "completed",
    },
  ];

  const periods = [
    { id: "week", label: "Semana" },
    { id: "month", label: "Mês" },
    { id: "quarter", label: "Trimestre" },
    { id: "year", label: "Ano" },
    { id: "all", label: "Todos" },
  ];

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

  const getPeriodTitle = (period: string) => {
    switch (period) {
      case "week":
        return "Vendas na Semana";
      case "month":
        return "Vendas no Mês";
      case "quarter":
        return "Vendas no Trimestre";
      case "year":
        return "Vendas no Ano";
      case "all":
        return "Vendas - Total";
      default:
        return "Vendas Recentes";
    }
  };

  const totalSales = sales
    .filter((s) => s.status === "completed")
    .reduce((sum, sale) => {
      return (
        sum +
        parseFloat(
          sale.value.replace("R$ ", "").replace(".", "").replace(",", ".")
        )
      );
    }, 0);

  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background.secondary }}>
        <Header
          leftContent={{
            type: "text",
            title: "Vendas",
          }}
          rightContent={<RightContent />}
        />
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color={BrandColors.primary} />
          <Text style={{ marginTop: 16, color: colors.text.secondary }}>
            Carregando vendas...
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background.secondary }}>
      {/* Header */}
      <Header
        leftContent={{
          type: "text",
          title: "Vendas",
        }}
        rightContent={<RightContent />}
      />

      <ScrollView style={{ flex: 1 }}>
        {/* Period Filter */}
        <View style={{ paddingHorizontal: 16, paddingVertical: 16 }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: colors.text.primary,
              marginBottom: 12,
            }}
          >
            Período
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ flexDirection: "row" }}
          >
            {periods.map((period) => (
              <TouchableOpacity
                key={period.id}
                onPress={() => setSelectedPeriod(period.id)}
                style={{
                  backgroundColor:
                    selectedPeriod === period.id
                      ? colors.background.header
                      : colors.card.background,
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  borderRadius: 20,
                  marginRight: 8,
                  borderWidth: 1,
                  borderColor:
                    selectedPeriod === period.id
                      ? colors.background.header
                      : colors.card.border,
                }}
              >
                <Text
                  style={{
                    color:
                      selectedPeriod === period.id
                        ? colors.text.light
                        : colors.text.primary,
                    fontWeight: selectedPeriod === period.id ? "600" : "400",
                  }}
                >
                  {period.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Stats Cards */}
        <View style={{ paddingHorizontal: 16, marginBottom: 24 }}>
          <View style={{ flexDirection: "row", gap: 12 }}>
            <View
              style={{
                backgroundColor: colors.card.background,
                borderRadius: 12,
                padding: 16,
                flex: 1,
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
                  backgroundColor: BrandColors.success + "20",
                  borderRadius: 8,
                  padding: 8,
                  marginBottom: 8,
                  alignSelf: "flex-start",
                }}
              >
                <FontAwesome
                  name="dollar"
                  size={16}
                  color={BrandColors.success}
                />
              </View>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: colors.text.primary,
                }}
              >
                R$ {totalSales.toLocaleString("pt-BR")}
              </Text>
              <Text
                style={{
                  color: colors.text.secondary,
                  fontSize: 14,
                }}
              >
                Vendas Totais
              </Text>
            </View>

            <View
              style={{
                backgroundColor: colors.card.background,
                borderRadius: 12,
                padding: 16,
                flex: 1,
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
                  backgroundColor: BrandColors.info + "20",
                  borderRadius: 8,
                  padding: 8,
                  marginBottom: 8,
                  alignSelf: "flex-start",
                }}
              >
                <FontAwesome name="car" size={16} color={BrandColors.info} />
              </View>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: colors.text.primary,
                }}
              >
                {sales.filter((s) => s.status === "completed").length}
              </Text>
              <Text
                style={{
                  color: colors.text.secondary,
                  fontSize: 14,
                }}
              >
                Veículos Vendidos
              </Text>
            </View>
          </View>
        </View>

        {/* Sales List */}
        <View style={{ paddingHorizontal: 16, marginBottom: 32 }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: colors.text.primary,
              marginBottom: 16,
            }}
          >
            {getPeriodTitle(selectedPeriod)}
          </Text>

          {sales.map((sale) => (
            <View
              key={sale.id}
              style={{
                backgroundColor: colors.card.background,
                borderRadius: 12,
                padding: 16,
                marginBottom: 12,
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
                  alignItems: "flex-start",
                  marginBottom: 12,
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "bold",
                      color: colors.text.primary,
                      marginBottom: 4,
                    }}
                  >
                    {sale.vehicle}
                  </Text>
                  <Text
                    style={{
                      color: colors.text.secondary,
                      fontSize: 14,
                    }}
                  >
                    Cliente: {sale.customer}
                  </Text>
                </View>
                <View
                  style={{
                    backgroundColor: getStatusColor(sale.status) + "20",
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                    borderRadius: 12,
                  }}
                >
                  <Text
                    style={{
                      color: getStatusColor(sale.status),
                      fontSize: 12,
                      fontWeight: "600",
                    }}
                  >
                    {getStatusText(sale.status)}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 12,
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    color: colors.text.secondary,
                  }}
                >
                  {sale.date}
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    color: BrandColors.primary,
                  }}
                >
                  {sale.value}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  gap: 8,
                }}
              >
                {sale.status === "completed" && (
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      backgroundColor: "transparent",
                      borderRadius: 8,
                      paddingVertical: 10,
                      alignItems: "center",
                      borderWidth: 1,
                      borderColor: colors.status.error,
                    }}
                    onPress={() => {
                      setSaleToCancel(sale);
                      setCancelModalVisible(true);
                    }}
                  >
                    <Text
                      style={{
                        color: colors.status.error,
                        fontSize: 14,
                        fontWeight: "600",
                      }}
                    >
                      Cancelar Venda
                    </Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  style={{
                    flex: 1,
                    backgroundColor: BrandColors.primary,
                    borderRadius: 8,
                    paddingVertical: 10,
                    alignItems: "center",
                  }}
                  onPress={() => {
                    // Navegar para detalhes da venda
                    router.push(`/sale-details/${sale.id}`);
                  }}
                >
                  <Text
                    style={{
                      color: colors.text.light,
                      fontSize: 14,
                      fontWeight: "600",
                    }}
                  >
                    Detalhes
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Modal de confirmação de cancelamento */}
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
              {saleToCancel?.vehicle} para o cliente {saleToCancel?.customer}?
              Esta ação não pode ser desfeita.
            </Text>

            <View style={{ flexDirection: "row", gap: 12 }}>
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
                  setSaleToCancel(null);
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
    </View>
  );
}
