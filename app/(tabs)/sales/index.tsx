import { Header } from "@/components/Header";
import { useTheme } from "@/components/ThemeContext";
import { BrandColors } from "@/constants/BrandColors";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function SalesScreen() {
  const { colors } = useTheme();
  const [selectedPeriod, setSelectedPeriod] = useState("month");

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
        onPress={handleFilterPress}
      >
        <FontAwesome name="filter" size={20} color={colors.text.light} />
      </TouchableOpacity>
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
      commission: "R$ 6.295",
    },
    {
      id: 2,
      vehicle: "Yamaha MT-07",
      customer: "Maria Santos",
      date: "14/12/2024",
      value: "R$ 42.500",
      status: "completed",
      commission: "R$ 2.125",
    },
    {
      id: 3,
      vehicle: "Toyota Corolla",
      customer: "Pedro Costa",
      date: "13/12/2024",
      value: "R$ 145.800",
      status: "pending",
      commission: "R$ 7.290",
    },
    {
      id: 4,
      vehicle: "BMW S1000RR",
      customer: "Ana Oliveira",
      date: "12/12/2024",
      value: "R$ 89.900",
      status: "completed",
      commission: "R$ 4.495",
    },
    {
      id: 5,
      vehicle: "Volkswagen Golf GTI",
      customer: "Carlos Ferreira",
      date: "11/12/2024",
      value: "R$ 189.900",
      status: "cancelled",
      commission: "R$ 0",
    },
    {
      id: 6,
      vehicle: "Jeep Renegade",
      customer: "Lucia Martins",
      date: "10/12/2024",
      value: "R$ 165.400",
      status: "completed",
      commission: "R$ 8.270",
    },
  ];

  const periods = [
    { id: "week", label: "Semana" },
    { id: "month", label: "Mês" },
    { id: "quarter", label: "Trimestre" },
    { id: "year", label: "Ano" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return BrandColors.success;
      case "pending":
        return BrandColors.warning;
      case "cancelled":
        return BrandColors.error;
      default:
        return BrandColors.gray600;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Concluída";
      case "pending":
        return "Pendente";
      case "cancelled":
        return "Cancelada";
      default:
        return "Desconhecido";
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

  const totalCommission = sales
    .filter((s) => s.status === "completed")
    .reduce((sum, sale) => {
      return (
        sum +
        parseFloat(
          sale.commission.replace("R$ ", "").replace(".", "").replace(",", ".")
        )
      );
    }, 0);

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
                  backgroundColor: BrandColors.primary + "20",
                  borderRadius: 8,
                  padding: 8,
                  marginBottom: 8,
                  alignSelf: "flex-start",
                }}
              >
                <FontAwesome
                  name="percent"
                  size={16}
                  color={BrandColors.primary}
                />
              </View>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: colors.text.primary,
                }}
              >
                R$ {totalCommission.toLocaleString("pt-BR")}
              </Text>
              <Text
                style={{
                  color: colors.text.secondary,
                  fontSize: 14,
                }}
              >
                Comissões
              </Text>
            </View>
          </View>

          <View
            style={{
              backgroundColor: colors.card.background,
              borderRadius: 12,
              padding: 16,
              marginTop: 12,
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
            Vendas Recentes
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
                  marginBottom: 8,
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
                }}
              >
                <View>
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
                <View style={{ alignItems: "flex-end" }}>
                  <Text
                    style={{
                      fontSize: 12,
                      color: colors.text.muted,
                    }}
                  >
                    Comissão
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "600",
                      color: colors.text.primary,
                    }}
                  >
                    {sale.commission}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
