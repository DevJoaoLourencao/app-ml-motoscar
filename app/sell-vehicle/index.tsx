import { CurrencyInput } from "@/components/CurrencyInput";
import { Header } from "@/components/Header";
import { formatCurrency } from "@/components/masks";
import { SuccessModal } from "@/components/SuccessModal";
import { useTheme } from "@/components/ThemeContext";
import { BrandColors } from "@/constants/BrandColors";
import { FontAwesome } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { z } from "zod";

// Schema de validação para a venda
const saleSchema = z.object({
  vehicleId: z.string().min(1, "Veículo é obrigatório"),
  buyerId: z.string().min(1, "Comprador é obrigatório"),
  saleValue: z.string().min(1, "Valor da venda é obrigatório"),
  saleType: z.string().min(1, "Tipo de venda é obrigatório"),
  notes: z.string().optional(),
});

type SaleFormData = z.infer<typeof saleSchema>;

// Tipos de venda disponíveis
const saleTypes = [
  { id: "cash", name: "À Vista" },
  { id: "trade", name: "Troca" },
  { id: "financing", name: "Financiamento" },
  { id: "partial", name: "Parte à Vista e Parte Financiado" },
  { id: "cash-promissory", name: "Parte em Dinheiro e Parte na Promissória" },
];

// Dados mockados de veículos disponíveis
const availableVehicles = [
  {
    id: "1",
    name: "Honda CB 650R",
    brand: "Honda",
    model: "CB 650R",
    year: "2024",
    salePrice: "52900",
    licensePlate: "FHZ8A60",
  },
  {
    id: "2",
    name: "Yamaha MT-07",
    brand: "Yamaha",
    model: "MT-07",
    year: "2023",
    salePrice: "45900",
    licensePlate: "ABC1D23",
  },
  {
    id: "3",
    name: "Toyota Corolla",
    brand: "Toyota",
    model: "Corolla",
    year: "2023",
    salePrice: "145800",
    licensePlate: "DEF4G56",
  },
];

// Dados mockados de compradores
const availableBuyers = [
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
];

export default function SellVehicleScreen() {
  const { colors } = useTheme();
  const [loading, setLoading] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [vehicleModalVisible, setVehicleModalVisible] = useState(false);
  const [buyerModalVisible, setBuyerModalVisible] = useState(false);
  const [saleTypeModalVisible, setSaleTypeModalVisible] = useState(false);
  const [showInstallmentButton, setShowInstallmentButton] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    watch,
  } = useForm<SaleFormData>({
    resolver: zodResolver(saleSchema),
    defaultValues: {
      vehicleId: "",
      buyerId: "",
      saleValue: "",
      saleType: "",
      notes: "",
    },
    mode: "onChange",
  });

  const watchedVehicleId = watch("vehicleId");
  const watchedBuyerId = watch("buyerId");
  const watchedSaleType = watch("saleType");

  const selectedVehicle = availableVehicles.find(
    (v) => v.id === watchedVehicleId
  );
  const selectedBuyer = availableBuyers.find((b) => b.id === watchedBuyerId);
  const selectedSaleType = saleTypes.find((st) => st.id === watchedSaleType);

  // Atualizar visibilidade do botão de parcelamento baseado no tipo de venda
  React.useEffect(() => {
    setShowInstallmentButton(watchedSaleType === "cash-promissory");
  }, [watchedSaleType]);

  const handleBackPress = () => {
    router.back();
  };

  const handleVehicleSelect = (vehicleId: string) => {
    setValue("vehicleId", vehicleId);
    setVehicleModalVisible(false);
  };

  const handleBuyerSelect = (buyerId: string) => {
    setValue("buyerId", buyerId);
    setBuyerModalVisible(false);
  };

  const handleSaleTypeSelect = (saleTypeId: string) => {
    setValue("saleType", saleTypeId);
    setSaleTypeModalVisible(false);
  };

  const handleInstallmentPress = () => {
    if (!watchedBuyerId) {
      Alert.alert("Erro", "Selecione um comprador primeiro.");
      return;
    }

    router.push({
      pathname: "/installment",
      params: { clientId: watchedBuyerId },
    });
  };

  const onSubmit = async (data: SaleFormData) => {
    setLoading(true);

    try {
      // TODO: Implementar chamada da API para salvar venda
      console.log("Salvando venda:", data);

      // Simular delay da API
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setSuccessMessage("Venda registrada com sucesso!");
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Erro ao salvar venda:", error);
      Alert.alert(
        "Erro",
        "Não foi possível registrar a venda. Tente novamente."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    router.back();
  };

  const handleConfirm = () => {
    setShowConfirmModal(true);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.background.secondary }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      {/* Header */}
      <Header
        leftContent={{
          type: "back",
          title: "Registrar Venda",
          onBackPress: handleBackPress,
        }}
        rightContent={null}
      />

      <ScrollView style={{ flex: 1, padding: 16 }}>
        <View style={{ gap: 20 }}>
          {/* Seleção de Veículo */}
          <View>
            <Text
              style={{
                color: colors.text.primary,
                marginBottom: 8,
                fontWeight: "600",
              }}
            >
              Veículo *
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: colors.card.background,
                borderRadius: 12,
                padding: 16,
                borderWidth: 1,
                borderColor: errors.vehicleId
                  ? colors.status.error
                  : colors.card.border,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
              onPress={() => setVehicleModalVisible(true)}
            >
              <View style={{ flex: 1 }}>
                {selectedVehicle ? (
                  <View>
                    <Text
                      style={{
                        color: colors.text.primary,
                        fontSize: 16,
                        fontWeight: "500",
                      }}
                    >
                      {selectedVehicle.name}
                    </Text>
                    <Text
                      style={{
                        color: colors.text.secondary,
                        fontSize: 14,
                        marginTop: 2,
                      }}
                    >
                      {selectedVehicle.licensePlate} •{" "}
                      {formatCurrency(selectedVehicle.salePrice)}
                    </Text>
                  </View>
                ) : (
                  <Text style={{ color: colors.text.secondary, fontSize: 16 }}>
                    Selecionar veículo...
                  </Text>
                )}
              </View>
              <FontAwesome
                name="chevron-down"
                size={16}
                color={colors.text.secondary}
              />
            </TouchableOpacity>
            {errors.vehicleId && (
              <Text
                style={{
                  color: colors.status.error,
                  fontSize: 12,
                  marginTop: 4,
                }}
              >
                {errors.vehicleId.message}
              </Text>
            )}
          </View>

          {/* Seleção de Comprador */}
          <View>
            <Text
              style={{
                color: colors.text.primary,
                marginBottom: 8,
                fontWeight: "600",
              }}
            >
              Comprador *
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: colors.card.background,
                borderRadius: 12,
                padding: 16,
                borderWidth: 1,
                borderColor: errors.buyerId
                  ? colors.status.error
                  : colors.card.border,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
              onPress={() => setBuyerModalVisible(true)}
            >
              <View style={{ flex: 1 }}>
                {selectedBuyer ? (
                  <View>
                    <Text
                      style={{
                        color: colors.text.primary,
                        fontSize: 16,
                        fontWeight: "500",
                      }}
                    >
                      {selectedBuyer.name}
                    </Text>
                    <Text
                      style={{
                        color: colors.text.secondary,
                        fontSize: 14,
                        marginTop: 2,
                      }}
                    >
                      {selectedBuyer.email}
                    </Text>
                  </View>
                ) : (
                  <Text style={{ color: colors.text.secondary, fontSize: 16 }}>
                    Selecionar comprador...
                  </Text>
                )}
              </View>
              <FontAwesome
                name="chevron-down"
                size={16}
                color={colors.text.secondary}
              />
            </TouchableOpacity>
            {errors.buyerId && (
              <Text
                style={{
                  color: colors.status.error,
                  fontSize: 12,
                  marginTop: 4,
                }}
              >
                {errors.buyerId.message}
              </Text>
            )}
          </View>

          {/* Tipo de Venda */}
          <View>
            <Text
              style={{
                color: colors.text.primary,
                marginBottom: 8,
                fontWeight: "600",
              }}
            >
              Tipo de Venda *
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: colors.card.background,
                borderRadius: 12,
                padding: 16,
                borderWidth: 1,
                borderColor: errors.saleType
                  ? colors.status.error
                  : colors.card.border,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
              onPress={() => setSaleTypeModalVisible(true)}
            >
              <Text
                style={{
                  color: selectedSaleType
                    ? colors.text.primary
                    : colors.text.secondary,
                  fontSize: 16,
                }}
              >
                {selectedSaleType
                  ? selectedSaleType.name
                  : "Selecionar tipo de venda..."}
              </Text>
              <FontAwesome
                name="chevron-down"
                size={16}
                color={colors.text.secondary}
              />
            </TouchableOpacity>
            {errors.saleType && (
              <Text
                style={{
                  color: colors.status.error,
                  fontSize: 12,
                  marginTop: 4,
                }}
              >
                {errors.saleType.message}
              </Text>
            )}
          </View>

          {/* Valor da Venda */}
          <CurrencyInput
            control={control}
            name="saleValue"
            label="Valor da Venda"
            placeholder="R$ 0,00"
            error={errors.saleValue}
            required
          />

          {/* Botão de Parcelamento (condicional) */}
          {showInstallmentButton && (
            <TouchableOpacity
              style={{
                backgroundColor: BrandColors.info,
                borderRadius: 12,
                padding: 16,
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "center",
                gap: 8,
              }}
              onPress={handleInstallmentPress}
            >
              <FontAwesome
                name="credit-card"
                size={16}
                color={colors.text.light}
              />
              <Text
                style={{
                  color: colors.text.light,
                  fontSize: 16,
                  fontWeight: "600",
                }}
              >
                Registrar Parcelamento
              </Text>
            </TouchableOpacity>
          )}

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
                  placeholder="Adicionar observações sobre a venda..."
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
            onPress={handleConfirm}
            disabled={!isValid || loading}
          >
            <Text
              style={{
                color: colors.text.light,
                fontSize: 18,
                fontWeight: "600",
              }}
            >
              {loading ? "Salvando..." : "Confirmar"}
            </Text>
          </TouchableOpacity>

          {/* Espaçamento final */}
          <View style={{ height: 20 }} />
        </View>
      </ScrollView>

      {/* Modal de Seleção de Veículo */}
      <VehicleSelectModal
        visible={vehicleModalVisible}
        onClose={() => setVehicleModalVisible(false)}
        onSelect={handleVehicleSelect}
        vehicles={availableVehicles}
        selectedVehicleId={watchedVehicleId}
      />

      {/* Modal de Seleção de Comprador */}
      <BuyerSelectModal
        visible={buyerModalVisible}
        onClose={() => setBuyerModalVisible(false)}
        onSelect={handleBuyerSelect}
        buyers={availableBuyers}
        selectedBuyerId={watchedBuyerId}
      />

      {/* Modal de Seleção de Tipo de Venda */}
      <SaleTypeSelectModal
        visible={saleTypeModalVisible}
        onClose={() => setSaleTypeModalVisible(false)}
        onSelect={handleSaleTypeSelect}
        saleTypes={saleTypes}
        selectedSaleTypeId={watchedSaleType}
      />

      <Modal
        visible={showConfirmModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowConfirmModal(false)}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: colors.card.background,
              borderRadius: 16,
              padding: 32,
              alignItems: "center",
              width: 320,
            }}
          >
            <FontAwesome
              name="question-circle"
              size={48}
              color={BrandColors.primary}
              style={{ marginBottom: 16 }}
            />
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: colors.text.primary,
                marginBottom: 12,
                textAlign: "center",
              }}
            >
              Confirmar venda?
            </Text>
            <Text
              style={{
                color: colors.text.secondary,
                fontSize: 16,
                textAlign: "center",
                marginBottom: 24,
              }}
            >
              Deseja realizar a venda do veículo{" "}
              {selectedVehicle?.name ? `"${selectedVehicle.name}"` : ""} para{" "}
              {selectedBuyer?.name ? `"${selectedBuyer.name}"` : ""}?
            </Text>
            <View style={{ flexDirection: "row", gap: 16 }}>
              <TouchableOpacity
                style={{
                  backgroundColor: colors.card.border,
                  borderRadius: 8,
                  paddingHorizontal: 24,
                  paddingVertical: 12,
                  marginRight: 8,
                }}
                onPress={() => setShowConfirmModal(false)}
              >
                <Text style={{ color: colors.text.primary, fontWeight: "600" }}>
                  Cancelar
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: BrandColors.primary,
                  borderRadius: 8,
                  paddingHorizontal: 24,
                  paddingVertical: 12,
                }}
                onPress={() => {
                  setShowConfirmModal(false);
                  handleSubmit(onSubmit)();
                }}
              >
                <Text style={{ color: colors.text.light, fontWeight: "600" }}>
                  Confirmar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal de Sucesso */}
      <SuccessModal
        visible={showSuccessModal}
        onClose={handleSuccessModalClose}
        title="Sucesso!"
        message={successMessage}
      />
    </KeyboardAvoidingView>
  );
}

// Componente Modal de Seleção de Veículo
interface VehicleSelectModalProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (vehicleId: string) => void;
  vehicles: any[];
  selectedVehicleId: string;
}

function VehicleSelectModal({
  visible,
  onClose,
  onSelect,
  vehicles,
  selectedVehicleId,
}: VehicleSelectModalProps) {
  const { colors } = useTheme();
  const [searchText, setSearchText] = useState("");

  const filteredVehicles = vehicles.filter(
    (vehicle) =>
      vehicle.name.toLowerCase().includes(searchText.toLowerCase()) ||
      vehicle.licensePlate.toLowerCase().includes(searchText.toLowerCase()) ||
      vehicle.brand.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={{
          flex: 1,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          justifyContent: "flex-end",
        }}
        activeOpacity={1}
        onPress={onClose}
      >
        <TouchableOpacity
          style={{
            backgroundColor: colors.background.primary,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            maxHeight: "90%",
            minHeight: 700,
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
              Selecionar Veículo
            </Text>
            <TouchableOpacity onPress={onClose} style={{ padding: 8 }}>
              <FontAwesome
                name="times"
                size={20}
                color={colors.text.secondary}
              />
            </TouchableOpacity>
          </View>

          {/* Search */}
          <View style={{ padding: 16 }}>
            <TextInput
              style={{
                backgroundColor: colors.card.background,
                borderRadius: 12,
                padding: 16,
                color: colors.text.primary,
                borderWidth: 1,
                borderColor: colors.card.border,
                fontSize: 16,
              }}
              placeholder="Buscar veículo..."
              placeholderTextColor={colors.text.secondary}
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>

          {/* Lista de Veículos */}
          <ScrollView
            style={{
              flex: 1,
              paddingHorizontal: 16,
              paddingBottom: 20,
            }}
          >
            {filteredVehicles.length > 0 ? (
              filteredVehicles.map((vehicle) => (
                <TouchableOpacity
                  key={vehicle.id}
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
                  onPress={() => onSelect(vehicle.id)}
                >
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "600",
                        color: colors.text.primary,
                        marginBottom: 4,
                      }}
                    >
                      {vehicle.name}
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        color: colors.text.secondary,
                        marginBottom: 2,
                      }}
                    >
                      {vehicle.licensePlate}
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        color: BrandColors.primary,
                        fontWeight: "600",
                      }}
                    >
                      {formatCurrency(vehicle.salePrice)}
                    </Text>
                  </View>
                  {selectedVehicleId === vehicle.id && (
                    <FontAwesome
                      name="check"
                      size={16}
                      color={BrandColors.primary}
                      style={{ marginLeft: 8 }}
                    />
                  )}
                </TouchableOpacity>
              ))
            ) : (
              <View style={{ alignItems: "center", paddingVertical: 40 }}>
                <FontAwesome
                  name="search"
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
                  Nenhum veículo encontrado
                </Text>
              </View>
            )}
          </ScrollView>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}

// Componente Modal de Seleção de Comprador
interface BuyerSelectModalProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (buyerId: string) => void;
  buyers: any[];
  selectedBuyerId: string;
}

function BuyerSelectModal({
  visible,
  onClose,
  onSelect,
  buyers,
  selectedBuyerId,
}: BuyerSelectModalProps) {
  const { colors } = useTheme();
  const [searchText, setSearchText] = useState("");

  const filteredBuyers = buyers.filter(
    (buyer) =>
      buyer.name.toLowerCase().includes(searchText.toLowerCase()) ||
      buyer.email?.toLowerCase().includes(searchText.toLowerCase()) ||
      buyer.phone?.includes(searchText)
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={{
          flex: 1,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          justifyContent: "flex-end",
        }}
        activeOpacity={1}
        onPress={onClose}
      >
        <TouchableOpacity
          style={{
            backgroundColor: colors.background.primary,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            maxHeight: "90%",
            minHeight: 700,
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
              Selecionar Comprador
            </Text>
            <TouchableOpacity onPress={onClose} style={{ padding: 8 }}>
              <FontAwesome
                name="times"
                size={20}
                color={colors.text.secondary}
              />
            </TouchableOpacity>
          </View>

          {/* Option to add new buyer */}
          <View
            style={{
              padding: 16,
              borderBottomWidth: 1,
              borderBottomColor: colors.card.border,
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: BrandColors.primary,
                borderRadius: 12,
                padding: 16,
                alignItems: "center",
              }}
              onPress={() => {
                onClose();
                // TODO: Implementar navegação para adicionar novo comprador
                console.log("Adicionar novo comprador");
              }}
            >
              <Text
                style={{
                  color: colors.text.light,
                  fontSize: 16,
                  fontWeight: "600",
                }}
              >
                Adicionar Novo Comprador
              </Text>
            </TouchableOpacity>
          </View>

          {/* Search */}
          <View style={{ padding: 16 }}>
            <TextInput
              style={{
                backgroundColor: colors.card.background,
                borderRadius: 12,
                padding: 16,
                color: colors.text.primary,
                borderWidth: 1,
                borderColor: colors.card.border,
                fontSize: 16,
              }}
              placeholder="Buscar comprador..."
              placeholderTextColor={colors.text.secondary}
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>

          {/* Lista de Compradores */}
          <ScrollView
            style={{
              flex: 1,
              paddingHorizontal: 16,
              paddingBottom: 20,
            }}
          >
            {filteredBuyers.length > 0 ? (
              filteredBuyers.map((buyer) => (
                <TouchableOpacity
                  key={buyer.id}
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
                  onPress={() => onSelect(buyer.id)}
                >
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "600",
                        color: colors.text.primary,
                        marginBottom: 4,
                      }}
                    >
                      {buyer.name}
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        color: colors.text.secondary,
                        marginBottom: 2,
                      }}
                    >
                      {buyer.email}
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        color: colors.text.secondary,
                      }}
                    >
                      {buyer.phone}
                    </Text>
                  </View>
                  {selectedBuyerId === buyer.id && (
                    <FontAwesome
                      name="check"
                      size={16}
                      color={BrandColors.primary}
                      style={{ marginLeft: 8 }}
                    />
                  )}
                </TouchableOpacity>
              ))
            ) : (
              <View style={{ alignItems: "center", paddingVertical: 40 }}>
                <FontAwesome
                  name="search"
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
                  Nenhum comprador encontrado
                </Text>
              </View>
            )}
          </ScrollView>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}

// Componente Modal de Seleção de Tipo de Venda
interface SaleTypeSelectModalProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (saleTypeId: string) => void;
  saleTypes: any[];
  selectedSaleTypeId: string;
}

function SaleTypeSelectModal({
  visible,
  onClose,
  onSelect,
  saleTypes,
  selectedSaleTypeId,
}: SaleTypeSelectModalProps) {
  const { colors } = useTheme();
  const [searchText, setSearchText] = useState("");

  const filteredSaleTypes = saleTypes.filter((saleType) =>
    saleType.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={{
          flex: 1,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          justifyContent: "flex-end",
        }}
        activeOpacity={1}
        onPress={onClose}
      >
        <TouchableOpacity
          style={{
            backgroundColor: colors.background.primary,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            maxHeight: "90%",
            minHeight: 700,
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
              Tipo de Venda
            </Text>
            <TouchableOpacity onPress={onClose} style={{ padding: 8 }}>
              <FontAwesome
                name="times"
                size={20}
                color={colors.text.secondary}
              />
            </TouchableOpacity>
          </View>

          {/* Lista de Tipos de Venda */}
          <ScrollView
            style={{
              flex: 1,
              paddingHorizontal: 16,
              paddingVertical: 20,
            }}
          >
            {filteredSaleTypes.length > 0 ? (
              filteredSaleTypes.map((saleType) => (
                <TouchableOpacity
                  key={saleType.id}
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
                  onPress={() => onSelect(saleType.id)}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      color: colors.text.primary,
                      flex: 1,
                    }}
                  >
                    {saleType.name}
                  </Text>
                  {selectedSaleTypeId === saleType.id && (
                    <FontAwesome
                      name="check"
                      size={16}
                      color={BrandColors.primary}
                      style={{ marginLeft: 8 }}
                    />
                  )}
                </TouchableOpacity>
              ))
            ) : (
              <View style={{ alignItems: "center", paddingVertical: 40 }}>
                <FontAwesome
                  name="search"
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
                  Nenhum tipo de venda encontrado
                </Text>
              </View>
            )}
          </ScrollView>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}
