import { CepInput } from "@/components/CepInput";
import { FormInput } from "@/components/FormInput";
import { Header } from "@/components/Header";
import { MaskedInput } from "@/components/MaskedInput";
import { Masks } from "@/components/masks";
import { PhoneInput } from "@/components/PhoneInput";
import { StateSelect } from "@/components/StateSelect";
import { SuccessModal } from "@/components/SuccessModal";
import { useTheme } from "@/components/ThemeContext";
import { BrandColors } from "@/constants/BrandColors";
import { FontAwesome } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { z } from "zod";

interface ClientFormData {
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
}

const clientSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  phone: z.string().min(1, "Celular é obrigatório"),
  cpf: z.string().min(1, "CPF é obrigatório"),
  cep: z.string().min(1, "CEP é obrigatório"),
  street: z.string().min(1, "Rua é obrigatória"),
  number: z.string().min(1, "Número é obrigatório"),
  complement: z.string().optional(),
  neighborhood: z.string().min(1, "Bairro é obrigatório"),
  city: z.string().min(1, "Cidade é obrigatória"),
  state: z.string().min(1, "Estado é obrigatório"),
});

export default function AddClientScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [selectedState, setSelectedState] = useState("");
  const [cepFound, setCepFound] = useState(false);
  const [cepError, setCepError] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    setValue,
    watch,
  } = useForm<ClientFormData>({
    resolver: zodResolver(clientSchema),
    mode: "onChange",
  });

  const handleBackPress = () => {
    router.back();
  };

  const handleCepFound = (address: {
    street: string;
    neighborhood: string;
    city: string;
    state: string;
  }) => {
    setValue("street", address.street);
    setValue("neighborhood", address.neighborhood);
    setValue("city", address.city);
    setValue("state", address.state);
    setSelectedState(address.state);

    // Verificar se o CEP foi encontrado (se tem pelo menos a cidade)
    if (address.city) {
      setCepFound(true);
      setCepError(false);
    } else {
      setCepFound(false);
      setCepError(true);
    }
  };

  const handleCepChange = (cep: string) => {
    if (!cep || cep.replace(/\D/g, "").length < 8) {
      setCepFound(false);
      setCepError(false);
      setValue("street", "");
      setValue("neighborhood", "");
      setValue("city", "");
      setValue("state", "");
      setValue("complement", "");
      setSelectedState("");
    }
  };

  const handleCepNotFound = () => {
    setCepFound(false);
    setCepError(true);
    setValue("street", "");
    setValue("neighborhood", "");
    setValue("city", "");
    setValue("state", "");
    setValue("complement", "");
    setSelectedState("");
  };

  const onSubmit = async (data: ClientFormData) => {
    setLoading(true);

    try {
      // Simular chamada da API
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Aqui você faria a chamada real para a API
      console.log("Dados do cliente:", data);

      // Mostrar modal de sucesso
      setSuccessModalVisible(true);

      // Resetar formulário
      reset();
      setSelectedState("");
      setCepFound(false);
      setCepError(false);
    } catch (error) {
      Alert.alert(
        "Erro",
        "Não foi possível cadastrar o cliente. Tente novamente."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSuccessModalClose = () => {
    setSuccessModalVisible(false);
    router.back();
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background.secondary }}>
      {/* Header */}
      <Header
        leftContent={{
          type: "back",
          title: "Adicionar Cliente",
          onBackPress: handleBackPress,
        }}
      />

      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <View style={{ padding: 16 }}>
          <View style={{ gap: 20 }}>
            {/* Título Informações Pessoais */}
            <Text
              style={{
                color: colors.text.primary,
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              Informações Pessoais
            </Text>

            <FormInput
              control={control}
              name="name"
              label="Nome Completo"
              placeholder="Digite o nome completo"
              error={errors.name}
              required
            />

            <MaskedInput
              control={control}
              name="cpf"
              label="CPF"
              placeholder="000.000.000-00"
              error={errors.cpf}
              required
              mask={Masks.CPF}
              keyboardType="numeric"
            />

            <View style={{ flex: 1 }}>
              <PhoneInput
                control={control}
                name="phone"
                label="Celular"
                placeholder="(00) 00000-0000"
                error={errors.phone}
                required
              />
            </View>

            {/* Título Endereço */}
            <Text
              style={{
                color: colors.text.primary,
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              Endereço
            </Text>

            <CepInput
              control={control}
              name="cep"
              label="CEP"
              placeholder="00000-000"
              error={
                cepError
                  ? { message: "CEP não encontrado", type: "cep_not_found" }
                  : errors.cep
              }
              required
              onCepFound={handleCepFound}
              onChange={handleCepChange}
              onCepNotFound={handleCepNotFound}
            />

            {cepFound && !cepError && (
              <>
                <View style={{ flexDirection: "row", gap: 12 }}>
                  <View style={{ flex: 2 }}>
                    <FormInput
                      control={control}
                      name="street"
                      label="Rua"
                      placeholder="Digite a rua"
                      error={errors.street}
                      required
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <FormInput
                      control={control}
                      name="number"
                      label="Número"
                      placeholder="123"
                      error={errors.number}
                      required
                      keyboardType="numeric"
                    />
                  </View>
                </View>

                <FormInput
                  control={control}
                  name="neighborhood"
                  label="Bairro"
                  placeholder="Digite o bairro"
                  error={errors.neighborhood}
                  required
                />

                <View style={{ flexDirection: "row", gap: 12 }}>
                  <View style={{ flex: 1 }}>
                    <FormInput
                      control={control}
                      name="city"
                      label="Cidade"
                      placeholder="Digite a cidade"
                      error={errors.city}
                      required
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <StateSelect
                      control={control}
                      name="state"
                      label="Estado"
                      placeholder="Selecione o estado"
                      error={errors.state}
                      required
                    />
                  </View>
                </View>
                <FormInput
                  control={control}
                  name="complement"
                  label="Complemento"
                  placeholder="Apartamento, sala, etc. (opcional)"
                  error={errors.complement}
                />
              </>
            )}

            {cepError && (
              <View
                style={{
                  backgroundColor: colors.status.error + "10",
                  borderWidth: 1,
                  borderColor: colors.status.error,
                  borderRadius: 12,
                  padding: 16,
                  marginTop: 8,
                }}
              >
                <Text
                  style={{
                    color: colors.status.error,
                    fontSize: 14,
                    textAlign: "center",
                  }}
                >
                  CEP não encontrado. Verifique o CEP digitado e tente
                  novamente.
                </Text>
              </View>
            )}

            {/* Botão de Salvar */}
            <TouchableOpacity
              style={{
                backgroundColor: BrandColors.primary,
                opacity: isValid && !loading && !cepError ? 1 : 0.4,
                borderRadius: 16,
                padding: 20,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: 12,
              }}
              onPress={handleSubmit(onSubmit)}
              disabled={!isValid || loading || cepError}
            >
              {loading ? (
                <ActivityIndicator size="small" color={colors.text.light} />
              ) : (
                <FontAwesome name="save" size={20} color={colors.text.light} />
              )}
              <Text
                style={{
                  color: colors.text.light,
                  fontWeight: "bold",
                  fontSize: 18,
                }}
              >
                {loading ? "Salvando..." : "Salvar Cliente"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Modal de Sucesso */}
      <SuccessModal
        visible={successModalVisible}
        title="Cliente Cadastrado!"
        message="O cliente foi cadastrado com sucesso."
        onClose={handleSuccessModalClose}
      />
    </View>
  );
}
