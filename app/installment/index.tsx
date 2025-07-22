import { CurrencyInput } from "@/components/CurrencyInput";
import { Header } from "@/components/Header";
import { SuccessModal } from "@/components/SuccessModal";
import { useTheme } from "@/components/ThemeContext";
import { BrandColors } from "@/constants/BrandColors";
import { FontAwesome } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Alert,
  Modal,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { z } from "zod";

// Schema de validação para o parcelamento
const installmentSchema = z.object({
  numberOfInstallments: z.string().min(1, "Número de parcelas é obrigatório"),
  installmentValue: z.string().min(1, "Valor da parcela é obrigatório"),
  paymentDate: z.string().min(1, "Data de pagamento é obrigatória"),
  notes: z.string().optional(),
});

type InstallmentFormData = z.infer<typeof installmentSchema>;

// Opções de parcelamento
const installmentOptions = [
  { id: "2", name: "2x" },
  { id: "3", name: "3x" },
  { id: "4", name: "4x" },
  { id: "5", name: "5x" },
  { id: "6", name: "6x" },
  { id: "7", name: "7x" },
  { id: "8", name: "8x" },
  { id: "9", name: "9x" },
  { id: "10", name: "10x" },
  { id: "11", name: "11x" },
  { id: "12", name: "12x" },
];

// Dados mockados de clientes
const mockClients = [
  {
    id: "1",
    name: "João Silva",
    email: "joao@email.com",
    phone: "(11) 99999-9999",
  },
  {
    id: "2",
    name: "Maria Santos",
    email: "maria@email.com",
    phone: "(11) 88888-8888",
  },
  {
    id: "3",
    name: "Pedro Oliveira",
    email: "pedro@email.com",
    phone: "(11) 77777-7777",
  },
  {
    id: "4",
    name: "Ana Costa",
    email: "ana@email.com",
    phone: "(11) 66666-6666",
  },
  {
    id: "5",
    name: "Carlos Ferreira",
    email: "carlos@email.com",
    phone: "(11) 55555-5555",
  },
];

export default function InstallmentScreen() {
  const { colors } = useTheme();
  const params = useLocalSearchParams();
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [installmentModalVisible, setInstallmentModalVisible] = useState(false);
  const [dateModalVisible, setDateModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    watch,
  } = useForm<InstallmentFormData>({
    resolver: zodResolver(installmentSchema),
    defaultValues: {
      numberOfInstallments: "",
      installmentValue: "",
      paymentDate: "",
      notes: "",
    },
    mode: "onChange",
  });

  const watchedNumberOfInstallments = watch("numberOfInstallments");
  const watchedInstallmentValue = watch("installmentValue");

  const selectedInstallmentOption = installmentOptions.find(
    (option) => option.id === watchedNumberOfInstallments
  );

  // Buscar dados do cliente baseado no ID recebido
  const clientId = params.clientId as string;
  const selectedClient = mockClients.find((client) => client.id === clientId);

  const handleBackPress = () => {
    router.back();
  };

  const handleInstallmentSelect = (installmentId: string) => {
    setValue("numberOfInstallments", installmentId);
    setInstallmentModalVisible(false);
  };

  const handleDateSelect = (event: any, date?: Date) => {
    if (Platform.OS === "android") {
      setDateModalVisible(false);
    }

    if (date) {
      setSelectedDate(date);
      setValue("paymentDate", date.toISOString());
    }
  };

  const confirmDate = () => {
    setValue("paymentDate", selectedDate.toISOString());
    setDateModalVisible(false);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("pt-BR");
  };

  const getWatchedPaymentDate = () => {
    const paymentDateValue = watch("paymentDate");
    if (paymentDateValue) {
      return new Date(paymentDateValue);
    }
    return selectedDate;
  };

  const onSubmit = async (data: InstallmentFormData) => {
    setLoading(true);

    try {
      // TODO: Implementar chamada da API para salvar parcelamento
      console.log("Salvando parcelamento:", {
        clientId,
        client: selectedClient,
        ...data,
      });

      // Simular delay da API
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setSuccessMessage("Parcelamento registrado com sucesso!");
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Erro ao salvar parcelamento:", error);
      Alert.alert(
        "Erro",
        "Não foi possível registrar o parcelamento. Tente novamente."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    router.back();
  };

  // Verificar se o cliente foi encontrado
  if (!selectedClient) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background.secondary }}>
        <Header
          leftContent={{
            type: "back",
            title: "Parcelamento",
            onBackPress: handleBackPress,
          }}
          rightContent={null}
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
            Cliente não encontrado
          </Text>
          <Text
            style={{
              marginTop: 8,
              color: colors.text.secondary,
              textAlign: "center",
            }}
          >
            O cliente especificado não foi encontrado no sistema.
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
          type: "back",
          title: "Registrar Parcelamento",
          onBackPress: handleBackPress,
        }}
        rightContent={null}
      />

      <ScrollView style={{ flex: 1, padding: 16 }}>
        <View style={{ gap: 20 }}>
          {/* Informações do Cliente */}
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
                color: colors.text.primary,
                marginBottom: 12,
                fontWeight: "600",
                fontSize: 16,
              }}
            >
              Cliente
            </Text>
            <Text
              style={{
                color: colors.text.primary,
                fontSize: 18,
                fontWeight: "600",
                marginBottom: 4,
              }}
            >
              {selectedClient.name}
            </Text>
            <Text
              style={{
                color: colors.text.secondary,
                fontSize: 14,
                marginBottom: 2,
              }}
            >
              {selectedClient.email}
            </Text>
            <Text
              style={{
                color: colors.text.secondary,
                fontSize: 14,
              }}
            >
              {selectedClient.phone}
            </Text>
          </View>

          {/* Número de Parcelas */}
          <View>
            <Text
              style={{
                color: colors.text.primary,
                marginBottom: 8,
                fontWeight: "600",
              }}
            >
              Número de Parcelas *
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: colors.card.background,
                borderRadius: 12,
                padding: 16,
                borderWidth: 1,
                borderColor: errors.numberOfInstallments
                  ? colors.status.error
                  : colors.card.border,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
              onPress={() => setInstallmentModalVisible(true)}
            >
              <Text
                style={{
                  color: selectedInstallmentOption
                    ? colors.text.primary
                    : colors.text.secondary,
                  fontSize: 16,
                }}
              >
                {selectedInstallmentOption
                  ? selectedInstallmentOption.name
                  : "Selecionar parcelas..."}
              </Text>
              <FontAwesome
                name="chevron-down"
                size={16}
                color={colors.text.secondary}
              />
            </TouchableOpacity>
            {errors.numberOfInstallments && (
              <Text
                style={{
                  color: colors.status.error,
                  fontSize: 12,
                  marginTop: 4,
                }}
              >
                {errors.numberOfInstallments.message}
              </Text>
            )}
          </View>

          {/* Valor da Parcela */}
          <CurrencyInput
            control={control}
            name="installmentValue"
            label="Valor da Parcela"
            placeholder="R$ 0,00"
            error={errors.installmentValue}
            required
          />

          {/* Data de Pagamento */}
          <View>
            <Text
              style={{
                color: colors.text.primary,
                marginBottom: 8,
                fontWeight: "600",
              }}
            >
              Data de Pagamento *
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: colors.card.background,
                borderRadius: 12,
                padding: 16,
                borderWidth: 1,
                borderColor: errors.paymentDate
                  ? colors.status.error
                  : colors.card.border,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
              onPress={() => setDateModalVisible(true)}
            >
              <Text
                style={{
                  color: colors.text.primary,
                  fontSize: 16,
                }}
              >
                {formatDate(getWatchedPaymentDate())}
              </Text>
              <FontAwesome
                name="calendar"
                size={16}
                color={colors.text.secondary}
              />
            </TouchableOpacity>
            {errors.paymentDate && (
              <Text
                style={{
                  color: colors.status.error,
                  fontSize: 12,
                  marginTop: 4,
                }}
              >
                {errors.paymentDate.message}
              </Text>
            )}
          </View>

          {/* Observações */}
          <View>
            <Text
              style={{
                color: colors.text.primary,
                marginBottom: 8,
                fontWeight: "600",
              }}
            >
              Observações (Opcional)
            </Text>
            <Controller
              control={control}
              name="notes"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={{
                    backgroundColor: colors.card.background,
                    borderRadius: 12,
                    padding: 16,
                    color: colors.text.primary,
                    borderWidth: 1,
                    borderColor: colors.card.border,
                    fontSize: 16,
                    minHeight: 100,
                    textAlignVertical: "top",
                  }}
                  placeholder="Adicionar observações sobre o parcelamento..."
                  placeholderTextColor={colors.text.secondary}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  multiline
                  numberOfLines={4}
                />
              )}
            />
          </View>

          {/* Botão de Salvar */}
          <TouchableOpacity
            style={{
              backgroundColor: BrandColors.primary,
              opacity: isValid && !loading ? 1 : 0.4,
              borderRadius: 16,
              padding: 20,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
              marginTop: 20,
            }}
            onPress={handleSubmit(onSubmit)}
            disabled={!isValid || loading}
          >
            <FontAwesome
              name={loading ? "spinner" : "check"}
              size={20}
              color={colors.text.light}
            />
            <Text
              style={{
                color: colors.text.light,
                fontSize: 18,
                fontWeight: "600",
              }}
            >
              {loading ? "Salvando..." : "Registrar Parcelamento"}
            </Text>
          </TouchableOpacity>

          {/* Espaçamento final */}
          <View style={{ height: 20 }} />
        </View>
      </ScrollView>

      {/* Modal de Seleção de Parcelas */}
      <Modal
        visible={installmentModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setInstallmentModalVisible(false)}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            justifyContent: "flex-end",
          }}
          activeOpacity={1}
          onPress={() => setInstallmentModalVisible(false)}
        >
          <TouchableOpacity
            style={{
              backgroundColor: colors.background.primary,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              maxHeight: "90%",
              minHeight: 400,
            }}
            activeOpacity={1}
            onPress={() => {}}
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
                Número de Parcelas
              </Text>
              <TouchableOpacity
                onPress={() => setInstallmentModalVisible(false)}
                style={{ padding: 8 }}
              >
                <FontAwesome
                  name="times"
                  size={20}
                  color={colors.text.secondary}
                />
              </TouchableOpacity>
            </View>

            {/* Lista de Opções */}
            <ScrollView
              style={{
                flex: 1,
                paddingHorizontal: 16,
                paddingBottom: 20,
              }}
            >
              {installmentOptions.map((option) => (
                <TouchableOpacity
                  key={option.id}
                  style={{
                    backgroundColor: colors.card.background,
                    borderRadius: 12,
                    padding: 16,
                    marginBottom: 8,
                    borderWidth: 1,
                    borderColor: colors.card.border,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                  onPress={() => handleInstallmentSelect(option.id)}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      color: colors.text.primary,
                      flex: 1,
                    }}
                  >
                    {option.name}
                  </Text>
                  {watchedNumberOfInstallments === option.id && (
                    <FontAwesome
                      name="check"
                      size={16}
                      color={BrandColors.primary}
                      style={{ marginLeft: 8 }}
                    />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>

      {/* Modal de Seleção de Data */}
      <Modal
        visible={dateModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setDateModalVisible(false)}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            justifyContent: "center",
            alignItems: "center",
          }}
          activeOpacity={1}
          onPress={() => setDateModalVisible(false)}
        >
          <View
            style={{
              backgroundColor: colors.background.primary,
              borderRadius: 20,
              padding: 20,
              margin: 20,
              alignItems: "center",
              minWidth: 300,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: colors.text.primary,
                marginBottom: 20,
              }}
            >
              Selecionar Data de Pagamento
            </Text>

            <Text
              style={{
                fontSize: 16,
                color: colors.text.secondary,
                marginBottom: 20,
                textAlign: "center",
              }}
            >
              Funcionalidade de seleção de data será implementada em breve.
            </Text>

            <View style={{ flexDirection: "row", gap: 12 }}>
              <TouchableOpacity
                style={{
                  backgroundColor: colors.card.border,
                  borderRadius: 8,
                  paddingHorizontal: 8,
                  paddingVertical: 6,
                }}
                onPress={() => setDateModalVisible(false)}
              >
                <Text style={{ color: colors.text.primary }}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: BrandColors.primary,
                  borderRadius: 8,
                  paddingHorizontal: 8,
                  paddingVertical: 6,
                }}
                onPress={() => {
                  setValue("paymentDate", new Date().toISOString());
                  setDateModalVisible(false);
                }}
              >
                <Text style={{ color: colors.text.light }}>Usar Hoje</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>

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
