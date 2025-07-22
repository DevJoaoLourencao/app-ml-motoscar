import { FontAwesome } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import React, { useState } from "react";
import { Control, Controller, FieldError } from "react-hook-form";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { MaskedTextInput } from "react-native-mask-text";
import BrandColors from "../constants/BrandColors";

interface CepInputProps {
  control: Control<any>;
  name: string;
  label?: string;
  placeholder?: string;
  error?: FieldError;
  required?: boolean;
  onFocus?: () => void;
  onChange?: (cep: string) => void;
  onCepFound?: (address: {
    street: string;
    neighborhood: string;
    city: string;
    state: string;
  }) => void;
  onCepNotFound?: () => void;
}

export function CepInput({
  control,
  name,
  label = "CEP",
  placeholder = "00000-000",
  error,
  required = false,
  onFocus,
  onChange,
  onCepFound,
  onCepNotFound,
}: CepInputProps) {
  const { colors } = useTheme();
  const [loading, setLoading] = useState(false);

  const fetchAddressByCep = async (cep: string) => {
    if (!cep || cep.replace(/\D/g, "").length !== 8) return;

    setLoading(true);
    try {
      const cleanCep = cep.replace(/\D/g, "");

      const response = await fetch(
        `https://viacep.com.br/ws/${cleanCep}/json/`
      );
      const data = await response.json();

      if (!data.erro && onCepFound) {
        onCepFound({
          street: data.logradouro || "",
          neighborhood: data.bairro || "",
          city: data.localidade || "",
          state: data.uf || "",
        });
      } else {
        // CEP não encontrado
        onCepFound?.({
          street: "",
          neighborhood: "",
          city: "",
          state: "",
        });
        onCepNotFound?.();
      }
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
      // Em caso de erro, também notificar
      onCepFound?.({
        street: "",
        neighborhood: "",
        city: "",
        state: "",
      });
      onCepNotFound?.();
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      <Text
        style={{
          color: colors.text.primary,
          marginBottom: 8,
          fontWeight: "600",
        }}
      >
        {label} {required && "*"}
      </Text>
      <View style={{ position: "relative" }}>
        <Controller
          control={control}
          name={name}
          render={({ field: { onChange, onBlur, value } }) => (
            <MaskedTextInput
              style={{
                backgroundColor: colors.card.background,
                borderRadius: 12,
                padding: 16,
                paddingRight: 50, // Espaço para o ícone
                color: colors.text.primary,
                borderWidth: 1,
                borderColor: error ? colors.status.error : colors.card.border,
                fontSize: 16,
              }}
              placeholder={placeholder}
              placeholderTextColor={colors.text.secondary}
              value={value}
              onChangeText={(text) => {
                onChange(text);
                onChange?.(text);
                // Buscar endereço quando CEP estiver completo
                if (text.replace(/\D/g, "").length === 8) {
                  fetchAddressByCep(text);
                }
              }}
              onBlur={onBlur}
              onFocus={onFocus}
              keyboardType="numeric"
              mask="99999-999"
            />
          )}
        />
        {loading && (
          <View
            style={{
              position: "absolute",
              right: 16,
              top: 0,
              bottom: 0,
              justifyContent: "center",
            }}
          >
            <ActivityIndicator size="small" color={BrandColors.primary} />
          </View>
        )}
        {!loading && (
          <TouchableOpacity
            style={{
              position: "absolute",
              right: 16,
              top: 0,
              bottom: 0,
              justifyContent: "center",
            }}
            onPress={() => {
              const currentValue = control._formValues[name];
              if (currentValue) {
                fetchAddressByCep(currentValue);
              }
            }}
          >
            <FontAwesome
              name="search"
              size={16}
              color={colors.text.secondary}
            />
          </TouchableOpacity>
        )}
      </View>
      {error && (
        <Text
          style={{ color: colors.status.error, fontSize: 12, marginTop: 4 }}
        >
          {error.message}
        </Text>
      )}
    </View>
  );
}
