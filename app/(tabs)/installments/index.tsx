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

// Definir tipo para Installment
interface Installment {
  id: number;
  vehicle: string;
  customer: string;
  totalValue: string;
  installmentValue: string;
  totalInstallments: number;
  paidInstallments: number;
  nextDueDate: string;
  status: string;
  bank: string;
}

export default function InstallmentsScreen() {
  const { colors } = useTheme();
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
          router.push({
            pathname: "/installment",
          });
        }}
      >
        <FontAwesome name="plus" size={20} color={colors.text.light} />
      </TouchableOpacity>
    </View>
  );

  const installments = [
    {
      id: 1,
      vehicle: "Honda Civic",
      customer: "João Silva",
      totalValue: "R$ 125.900",
      installmentValue: "R$ 2.098",
      totalInstallments: 60,
      paidInstallments: 12,
      nextDueDate: "15/01/2025",
      status: "up_to_date",
      bank: "Banco do Brasil",
    },
    {
      id: 2,
      vehicle: "Yamaha MT-07",
      customer: "Maria Santos",
      totalValue: "R$ 42.500",
      installmentValue: "R$ 708",
      totalInstallments: 60,
      paidInstallments: 8,
      nextDueDate: "20/01/2025",
      status: "up_to_date",
      bank: "Itaú",
    },
    {
      id: 3,
      vehicle: "Toyota Corolla",
      customer: "Pedro Costa",
      totalValue: "R$ 145.800",
      installmentValue: "R$ 2.430",
      totalInstallments: 60,
      paidInstallments: 3,
      nextDueDate: "10/01/2025",
      status: "overdue",
      bank: "Santander",
    },
    {
      id: 4,
      vehicle: "BMW S1000RR",
      customer: "Ana Oliveira",
      totalValue: "R$ 89.900",
      installmentValue: "R$ 1.498",
      totalInstallments: 60,
      paidInstallments: 18,
      nextDueDate: "25/01/2025",
      status: "up_to_date",
      bank: "Bradesco",
    },
    {
      id: 5,
      vehicle: "Volkswagen Golf GTI",
      customer: "Carlos Ferreira",
      totalValue: "R$ 189.900",
      installmentValue: "R$ 3.165",
      totalInstallments: 60,
      paidInstallments: 0,
      nextDueDate: "05/01/2025",
      status: "overdue",
      bank: "Caixa Econômica",
    },
    {
      id: 6,
      vehicle: "Jeep Renegade",
      customer: "Lucia Martins",
      totalValue: "R$ 165.400",
      installmentValue: "R$ 2.757",
      totalInstallments: 60,
      paidInstallments: 24,
      nextDueDate: "30/01/2025",
      status: "up_to_date",
      bank: "Banco do Brasil",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "up_to_date":
        return BrandColors.success;
      case "overdue":
        return BrandColors.error;
      case "due_soon":
        return BrandColors.warning;
      default:
        return BrandColors.gray600;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "up_to_date":
        return "Em Dia";
      case "overdue":
        return "Atrasada";
      case "due_soon":
        return "Vence Logo";
      default:
        return "Desconhecido";
    }
  };

  const getProgressPercentage = (paid: number, total: number) => {
    return (paid / total) * 100;
  };

  const totalPending = installments.reduce((sum, inst) => {
    return (
      sum +
      parseFloat(
        inst.installmentValue
          .replace("R$ ", "")
          .replace(".", "")
          .replace(",", ".")
      )
    );
  }, 0);

  const overdueInstallments = installments.filter(
    (inst) => inst.status === "overdue"
  ).length;

  const [selectedFilter, setSelectedFilter] = useState("all");
  const [quitModalVisible, setQuitModalVisible] = useState(false);
  const [installmentToQuit, setInstallmentToQuit] =
    useState<Installment | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const filters = [
    { id: "all", label: "Todas" },
    { id: "up_to_date", label: "Em Dia" },
    { id: "overdue", label: "Atrasadas" },
    { id: "due_soon", label: "Vencem Logo" },
  ];

  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background.secondary }}>
        <Header
          leftContent={{
            type: "text",
            title: "Pagamentos",
          }}
          rightContent={<RightContent />}
        />
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color={BrandColors.primary} />
          <Text style={{ marginTop: 16, color: colors.text.secondary }}>
            Carregando pagamentos...
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
          title: "Pagamentos",
        }}
        rightContent={<RightContent />}
      />

      <ScrollView style={{ flex: 1 }}>
        {/* Stats Cards */}
        <View style={{ paddingHorizontal: 16, paddingVertical: 16 }}>
          <View style={{ flexDirection: "row", gap: 12, marginBottom: 12 }}>
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
                  name="credit-card"
                  size={16}
                  color={BrandColors.primary}
                />
              </View>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: colors.text.primary,
                }}
              >
                R$ {totalPending.toLocaleString("pt-BR")}
              </Text>
              <Text
                style={{
                  color: colors.text.secondary,
                  fontSize: 14,
                }}
              >
                Total Pendente
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
                  backgroundColor: BrandColors.error + "20",
                  borderRadius: 8,
                  padding: 8,
                  marginBottom: 8,
                  alignSelf: "flex-start",
                }}
              >
                <FontAwesome
                  name="exclamation-triangle"
                  size={16}
                  color={BrandColors.error}
                />
              </View>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: colors.text.primary,
                }}
              >
                {overdueInstallments}
              </Text>
              <Text
                style={{
                  color: colors.text.secondary,
                  fontSize: 14,
                }}
              >
                Atrasadas
              </Text>
            </View>
          </View>
        </View>

        {/* Filters */}
        <View style={{ paddingHorizontal: 16, marginBottom: 16 }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: colors.text.primary,
              marginBottom: 12,
            }}
          >
            Filtros
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ flexDirection: "row" }}
          >
            {filters.map((filter) => (
              <TouchableOpacity
                key={filter.id}
                onPress={() => setSelectedFilter(filter.id)}
                style={{
                  backgroundColor:
                    selectedFilter === filter.id
                      ? colors.background.header
                      : colors.card.background,
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  borderRadius: 20,
                  marginRight: 8,
                  borderWidth: 1,
                  borderColor:
                    selectedFilter === filter.id
                      ? colors.background.header
                      : colors.card.border,
                }}
              >
                <Text
                  style={{
                    color:
                      selectedFilter === filter.id
                        ? colors.text.light
                        : colors.text.primary,
                    fontWeight: selectedFilter === filter.id ? "600" : "400",
                  }}
                >
                  {filter.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Installments List */}
        <View style={{ paddingHorizontal: 16, paddingBottom: 32 }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: colors.text.primary,
              marginBottom: 16,
            }}
          >
            Parcelamentos
          </Text>

          {installments
            .filter((installment) =>
              selectedFilter === "all"
                ? true
                : installment.status === selectedFilter
            )
            .map((installment) => (
              <View
                key={installment.id}
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
                      {installment.vehicle}{" "}
                      {installment.vehicle.match(/\d{4}$/)
                        ? ""
                        : installment.nextDueDate.slice(-4)}
                    </Text>
                    <Text
                      style={{
                        color: colors.text.secondary,
                        fontSize: 14,
                      }}
                    >
                      Cliente: {installment.customer}
                    </Text>
                  </View>
                  <View
                    style={{
                      backgroundColor:
                        getStatusColor(installment.status) + "20",
                      paddingHorizontal: 8,
                      paddingVertical: 4,
                      borderRadius: 12,
                    }}
                  >
                    <Text
                      style={{
                        color: getStatusColor(installment.status),
                        fontSize: 12,
                        fontWeight: "600",
                      }}
                    >
                      {getStatusText(installment.status)}
                    </Text>
                  </View>
                </View>

                {/* Progress Bar */}
                <View style={{ marginBottom: 12 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginBottom: 4,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 12,
                        color: colors.text.secondary,
                      }}
                    >
                      Progresso: {installment.paidInstallments}/
                      {installment.totalInstallments}
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        color: colors.text.secondary,
                      }}
                    >
                      {getProgressPercentage(
                        installment.paidInstallments,
                        installment.totalInstallments
                      ).toFixed(0)}
                      %
                    </Text>
                  </View>
                  <View
                    style={{
                      backgroundColor: colors.border.light,
                      height: 6,
                      borderRadius: 3,
                      overflow: "hidden",
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: BrandColors.primary,
                        height: "100%",
                        width: `${getProgressPercentage(
                          installment.paidInstallments,
                          installment.totalInstallments
                        )}%`,
                      }}
                    />
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
                      Próximo vencimento: {installment.nextDueDate}
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "bold",
                        color: BrandColors.primary,
                      }}
                    >
                      {installment.installmentValue}
                    </Text>
                  </View>
                  <View style={{ alignItems: "flex-end" }}>
                    <Text
                      style={{
                        fontSize: 12,
                        color: colors.text.muted,
                      }}
                    >
                      Total
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "600",
                        color: colors.text.primary,
                      }}
                    >
                      {installment.totalValue}
                    </Text>
                  </View>
                </View>

                {/* Botões de ação */}
                <View style={{ flexDirection: "row", marginTop: 12 }}>
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      backgroundColor: "transparent",
                      borderRadius: 8,
                      paddingVertical: 10,
                      alignItems: "center",
                      borderWidth: 1,
                      borderColor: BrandColors.success,
                      marginRight: 12,
                    }}
                    onPress={() => {
                      setInstallmentToQuit(installment);
                      setQuitModalVisible(true);
                    }}
                  >
                    <Text
                      style={{
                        color: BrandColors.success,
                        fontSize: 14,
                        fontWeight: "600",
                      }}
                    >
                      Quitar
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      backgroundColor: BrandColors.primary,
                      borderRadius: 8,
                      paddingVertical: 10,
                      alignItems: "center",
                    }}
                    onPress={() => {
                      // Navegação futura para detalhes
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

      {/* Modal de confirmação de quitação */}
      {installmentToQuit && (
        <Modal
          visible={quitModalVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setQuitModalVisible(false)}
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
                Quitar Parcelamento
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
                Tem certeza que deseja quitar o parcelamento de{" "}
                {installmentToQuit.vehicle} para o cliente{" "}
                {installmentToQuit.customer}?\nEsta ação não pode ser desfeita.
              </Text>

              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  onPress={() => setQuitModalVisible(false)}
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
                    // Aqui você pode implementar a lógica de quitação real
                    setQuitModalVisible(false);
                    setInstallmentToQuit(null);
                  }}
                  style={{
                    flex: 1,
                    backgroundColor: BrandColors.success,
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
