import { BrandSearchInput } from "@/components/BrandSearchInput";
import { ClientSelect } from "@/components/ClientSelect";
import { ColorSelect } from "@/components/ColorSelect";
import { DisplacementSelect } from "@/components/DisplacementSelect";
import { FeaturesSelect } from "@/components/FeaturesSelect";
import { FipeButton } from "@/components/FipeButton";
import { FuelTypeSelect } from "@/components/FuelTypeSelect";
import { Header } from "@/components/Header";
import { LicensePlateInput } from "@/components/LicensePlateInput";
import { MinimumCashInput } from "@/components/MinimumCashInput";
import { ModelSearchInput } from "@/components/ModelSearchInput";
import { PurchasePriceInput } from "@/components/PurchasePriceInput";
import { RenavamInput } from "@/components/RenavamInput";
import { SalePriceInput } from "@/components/SalePriceInput";
import { SuccessModal } from "@/components/SuccessModal";
import { useTheme } from "@/components/ThemeContext";
import { useAutoScroll } from "@/components/useAutoScroll";
import { VehicleImagePicker } from "@/components/VehicleImagePicker";
import { VehicleTypeSelect } from "@/components/VehicleTypeSelect";
import { YearSelect } from "@/components/YearSelect";
import { BrandColors } from "@/constants/BrandColors";
import { VehicleFormData, vehicleSchema } from "@/schemas/vehicleSchema";
import { Model } from "@/services/api";
import { FontAwesome } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface VehicleType {
  id: string;
  name: string;
}

interface Client {
  id: string;
  name: string;
  email?: string;
  phone?: string;
}

export default function AddVehicleScreen() {
  const { colors } = useTheme();
  const params = useLocalSearchParams();
  const [loading, setLoading] = useState(false);
  const [fipeLoading, setFipeLoading] = useState(false);
  const [selectedVehicleType, setSelectedVehicleType] =
    useState<VehicleType | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editVehicleId, setEditVehicleId] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [vehicleImages, setVehicleImages] = useState<string[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  // Hook para auto-scroll
  const { scrollViewRef, registerInput, handleInputFocus } = useAutoScroll();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    setValue,
    watch,
    reset,
  } = useForm<VehicleFormData>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: {
      vehicleType: "",
      brand: "",
      brandId: null as any,
      model: "",
      modelId: null as any,
      year: "",
      displacement: "",
      fuelType: "",
      licensePlate: "",
      renavam: "",
      color: "",
      purchasePrice: "",
      salePrice: "",
      minimumCash: "",
      client: "",
      clientId: "",
      description: "",
      features: [],
      images: [],
    },
    mode: "onChange",
  });

  // Verificar se está em modo de edição
  useEffect(() => {
    const editId = params.editId as string;
    if (editId) {
      setIsEditMode(true);
      setEditVehicleId(editId);
      loadVehicleForEdit(editId);
    }
  }, [params.editId]);

  // Função para carregar dados do veículo para edição
  const loadVehicleForEdit = async (vehicleId: string) => {
    try {
      setLoading(true);

      // TODO: Implementar chamada da API para buscar dados do veículo
      // Por enquanto, vamos simular com dados mock
      console.log("Carregando veículo para edição:", vehicleId);

      // Simular delay da API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Dados mock para edição (substituir por chamada real da API)
      const mockVehicleData = {
        vehicleType: "Moto",
        brand: "Honda",
        brandId: "1",
        model: "CB 650R",
        modelId: "1",
        year: "2022",
        displacement: "650cc",
        fuelType: "Gasolina",
        licensePlate: "ABC-1234",
        renavam: "12345678901",
        color: "Preto",
        purchasePrice: "45000", // R$ 45.000
        salePrice: "52900", // R$ 52.900
        minimumCash: "40000", // R$ 40.000
        client: "João Silva",
        clientId: "1",
        description: "Moto em excelente estado, revisada recentemente.",
        features: [
          "abs",
          "led-lights",
          "manual",
          "spare-key",
          "original-parts",
          "ipva-paid",
          "licensing-paid",
        ],
        images: [
          "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
          "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800",
        ],
      };

      // Preencher o formulário com os dados
      Object.entries(mockVehicleData).forEach(([key, value]) => {
        setValue(key as keyof VehicleFormData, value);
      });

      // Configurar tipo de veículo selecionado
      setSelectedVehicleType({ id: "1", name: "Moto" });

      // Configurar imagens
      setVehicleImages(mockVehicleData.images);

      // Configurar features selecionadas
      setSelectedFeatures(mockVehicleData.features);
    } catch (error) {
      console.error("Erro ao carregar veículo para edição:", error);
      Alert.alert("Erro", "Não foi possível carregar os dados do veículo.");
    } finally {
      setLoading(false);
    }
  };

  const watchedVehicleType = watch("vehicleType");
  const watchedBrandId = watch("brandId");
  const watchedBrand = watch("brand");
  const watchedModel = watch("model");
  const watchedYear = watch("year");
  const watchedClient = watch("client");

  const handleBackPress = () => {
    router.back();
  };

  const handleVehicleTypeSelect = (vehicleType: VehicleType) => {
    console.log("Tipo selecionado:", vehicleType);
    setValue("vehicleType", vehicleType.name);
    setSelectedVehicleType(vehicleType);
    // Limpar marca e modelo quando tipo for alterado
    setValue("brand", "");
    setValue("brandId", null as any);
    setValue("model", "");
    setValue("modelId", null as any);
  };

  const handleFipeConsult = async () => {
    if (!watchedBrand || !watchedModel || !watchedYear) {
      Alert.alert(
        "Dados Insuficientes",
        "Para consultar a FIPE, é necessário preencher marca, modelo e ano."
      );
      return;
    }

    setFipeLoading(true);

    try {
      // TODO: Implementar chamada da API FIPE
      console.log("Consultando FIPE para:", {
        brand: watchedBrand,
        model: watchedModel,
        year: watchedYear,
      });

      // Simular delay da API
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Simular resposta da FIPE
      const fipePrice = Math.floor(Math.random() * 50000) + 20000; // Preço aleatório entre 20k e 70k

      Alert.alert(
        "Consulta FIPE",
        `Valor de referência: R$ ${fipePrice.toLocaleString("pt-BR")}`,
        [
          {
            text: "Usar como Preço de Venda",
            onPress: () => {
              // Usar o valor direto da FIPE
              setValue("salePrice", fipePrice.toString());
            },
          },
          {
            text: "OK",
          },
        ]
      );
    } catch (error) {
      console.error("Erro ao consultar FIPE:", error);
      Alert.alert(
        "Erro",
        "Não foi possível consultar a tabela FIPE. Tente novamente."
      );
    } finally {
      setFipeLoading(false);
    }
  };

  const onSubmit = async (data: VehicleFormData) => {
    setLoading(true);

    try {
      if (isEditMode) {
        // TODO: Implementar chamada da API para atualizar veículo
        console.log("Atualizando veículo:", { id: editVehicleId, ...data });

        // Simular delay da API
        await new Promise((resolve) => setTimeout(resolve, 2000));

        setSuccessMessage("Veículo atualizado com sucesso!");
        setShowSuccessModal(true);
      } else {
        // TODO: Implementar chamada da API para salvar veículo
        console.log("Salvando veículo:", data);

        // Simular delay da API
        await new Promise((resolve) => setTimeout(resolve, 2000));

        setSuccessMessage("Veículo cadastrado com sucesso!");
        setShowSuccessModal(true);
      }
    } catch (error) {
      console.error("Erro ao salvar veículo:", error);
      Alert.alert(
        "Erro",
        `Não foi possível ${
          isEditMode ? "atualizar" : "cadastrar"
        } o veículo. Tente novamente.`
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    if (isEditMode) {
      router.back();
    } else {
      reset();
      router.back();
    }
  };

  const handleBrandSelect = (selectedBrand: any) => {
    setValue("brand", selectedBrand.name);
    setValue("brandId", selectedBrand.id);
    // Limpar modelo quando marca for alterada
    setValue("model", "");
    setValue("modelId", null as any);
  };

  const handleModelSelect = (selectedModel: Model) => {
    setValue("model", selectedModel.name);
    setValue("modelId", selectedModel.id);
  };

  const handleClientSelect = (selectedClient: Client | null) => {
    if (selectedClient) {
      setValue("client", selectedClient.name);
      setValue("clientId", selectedClient.id);
    } else {
      setValue("client", "");
      setValue("clientId", "");
    }
  };

  const handleImagesChange = (images: string[]) => {
    setVehicleImages(images);
    setValue("images", images);
  };

  const handleFeaturesChange = (features: string[]) => {
    setSelectedFeatures(features);
    setValue("features", features);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.background.secondary }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <Header
        leftContent={{
          type: "back",
          title: isEditMode ? "Editar Veículo" : "Cadastrar Veículo",
          onBackPress: handleBackPress,
        }}
      />

      <ScrollView
        ref={scrollViewRef}
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <View style={{ padding: 16 }}>
          <View style={{ marginBottom: 16 }}>
            <View style={{ gap: 20 }}>
              <VehicleImagePicker
                images={vehicleImages}
                onImagesChange={handleImagesChange}
                maxImages={10}
                label="Imagens do Veículo"
                required={false}
                error={errors.images?.message}
                onFocus={() => handleInputFocus("images")}
              />
              <VehicleTypeSelect
                control={control}
                name="vehicleType"
                label="Tipo do Veículo"
                placeholder="Ex: Moto"
                error={errors.vehicleType}
                required
                onSelect={handleVehicleTypeSelect}
                onFocus={() => handleInputFocus("vehicleType")}
              />

              <View style={{ flexDirection: "row", gap: 12 }}>
                <View style={{ flex: 1 }}>
                  <BrandSearchInput
                    placeholder="Ex: Honda"
                    value={watchedBrand}
                    vehicleType={selectedVehicleType?.id}
                    disabled={!selectedVehicleType}
                    onSelect={handleBrandSelect}
                    onFocus={() => handleInputFocus("brand")}
                  />
                  {errors.brand && (
                    <Text
                      style={{
                        color: colors.status.error,
                        fontSize: 12,
                        marginTop: 4,
                      }}
                    >
                      {errors.brand.message}
                    </Text>
                  )}
                </View>
                <View style={{ flex: 1 }}>
                  <ModelSearchInput
                    placeholder="Ex: CB 650R"
                    value={watchedModel}
                    brandId={watchedBrandId}
                    disabled={!watchedBrandId}
                    onSelect={handleModelSelect}
                    onFocus={() => handleInputFocus("model")}
                  />
                  {errors.model && (
                    <Text
                      style={{
                        color: colors.status.error,
                        fontSize: 12,
                        marginTop: 4,
                      }}
                    >
                      {errors.model.message}
                    </Text>
                  )}
                </View>
              </View>

              <View style={{ flexDirection: "row", gap: 12 }}>
                <View style={{ flex: 1 }}>
                  <YearSelect
                    control={control}
                    name="year"
                    label="Ano"
                    placeholder="Ex: 2025"
                    error={errors.year}
                    required
                    onFocus={() => handleInputFocus("year")}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <DisplacementSelect
                    control={control}
                    name="displacement"
                    label="Cilindradas"
                    placeholder="Ex: 650cc"
                    error={errors.displacement}
                    required
                    onFocus={() => handleInputFocus("displacement")}
                  />
                </View>
              </View>
              <FuelTypeSelect
                control={control}
                name="fuelType"
                label="Tipo de Combustível"
                placeholder="Ex: Gasolina"
                error={errors.fuelType}
                onFocus={() => handleInputFocus("fuelType")}
              />

              <View style={{ flexDirection: "row", gap: 12 }}>
                <View style={{ flex: 1 }}>
                  <LicensePlateInput
                    control={control}
                    name="licensePlate"
                    label="Placa"
                    error={errors.licensePlate}
                    required
                    onFocus={() => handleInputFocus("licensePlate")}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <RenavamInput
                    control={control}
                    name="renavam"
                    label="RENAVAM"
                    error={errors.renavam}
                    required
                    onFocus={() => handleInputFocus("renavam")}
                  />
                </View>
              </View>

              <ColorSelect
                control={control}
                name="color"
                label="Cor"
                error={errors.color}
                required
                onFocus={() => handleInputFocus("color")}
              />

              <FipeButton
                onPress={handleFipeConsult}
                loading={fipeLoading}
                disabled={!watchedBrand || !watchedModel || !watchedYear}
              />
              <View style={{ flexDirection: "row", gap: 12 }}>
                <View style={{ flex: 1 }}>
                  <PurchasePriceInput
                    control={control}
                    name="purchasePrice"
                    label="Preço de Compra"
                    placeholder="R$ 0,00"
                    error={errors.purchasePrice}
                    required
                    onFocus={() => handleInputFocus("purchasePrice")}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <SalePriceInput
                    control={control}
                    name="salePrice"
                    label="Preço de Venda"
                    placeholder="R$ 0,00"
                    error={errors.salePrice}
                    required
                    onFocus={() => handleInputFocus("salePrice")}
                  />
                </View>
              </View>

              <MinimumCashInput
                control={control}
                name="minimumCash"
                label="Mínimo à Vista"
                placeholder="R$ 0,00"
                error={errors.minimumCash}
                required
                onFocus={() => handleInputFocus("minimumCash")}
              />

              {/* Campo de Cliente */}
              <View>
                <Text
                  style={{
                    color: colors.text.primary,
                    marginBottom: 8,
                    fontWeight: "600",
                  }}
                >
                  Vendedor (Opcional)
                </Text>
                <ClientSelect
                  value={watchedClient}
                  onSelect={handleClientSelect}
                  placeholder="Selecionar cliente..."
                  onFocus={() => handleInputFocus("client")}
                />
              </View>

              {/* Campo de Recursos */}
              <View>
                <Text
                  style={{
                    color: colors.text.primary,
                    marginBottom: 8,
                    fontWeight: "600",
                  }}
                >
                  Recursos (Opcional)
                </Text>
                <FeaturesSelect
                  selectedFeatures={selectedFeatures}
                  onFeaturesChange={handleFeaturesChange}
                  placeholder="Selecionar recursos..."
                  onFocus={() => handleInputFocus("features")}
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
                  Descrição
                </Text>
                <Controller
                  control={control}
                  name="description"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={{
                        backgroundColor: colors.card.background,
                        borderRadius: 12,
                        padding: 16,
                        color: colors.text.primary,
                        borderWidth: 1,
                        borderColor: colors.card.border,
                        minHeight: 100,
                        textAlignVertical: "top",
                      }}
                      placeholder="Descreva as características do veículo..."
                      placeholderTextColor={colors.text.secondary}
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      onFocus={() => handleInputFocus("description")}
                      multiline
                      numberOfLines={4}
                    />
                  )}
                />
              </View>
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
                }}
                onPress={handleSubmit(onSubmit)}
                disabled={!isValid || loading}
              >
                {loading ? <FontAwesome name="spinner" size={20} /> : null}
                <Text
                  style={{
                    color: colors.text.light,
                    fontWeight: "bold",
                    fontSize: 18,
                  }}
                >
                  {loading
                    ? isEditMode
                      ? "Atualizando..."
                      : "Salvando..."
                    : isEditMode
                    ? "Atualizar"
                    : "Salvar"}
                </Text>
              </TouchableOpacity>

              {!isValid && (
                <Text
                  style={{
                    color: colors.text.secondary,
                    fontSize: 14,
                    textAlign: "center",
                    marginTop: 12,
                  }}
                >
                  Preencha todos os campos obrigatórios para continuar
                </Text>
              )}
            </View>
          </View>
        </View>
      </ScrollView>

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
