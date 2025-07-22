import { useTheme } from "@/components/ThemeContext";
import { formatCurrency } from "@/components/masks";
import React, { useState } from "react";
import { Control, Controller, FieldError } from "react-hook-form";
import { Text, TextInput, View } from "react-native";

interface CurrencyInputProps {
  control: Control<any>;
  name: string;
  label: string;
  placeholder?: string;
  error?: FieldError;
  required?: boolean;
  maxValue?: number;
}

export function CurrencyInput({
  control,
  name,
  label,
  placeholder = "R$ 0",
  error,
  required = false,
  maxValue = 999999999, // Limitado a 999 milhões
}: CurrencyInputProps) {
  const { colors } = useTheme();
  const [displayValue, setDisplayValue] = useState("");

  const handleChangeText = (
    text: string,
    onChange: (value: string) => void
  ) => {
    // Remover todos os caracteres não numéricos
    const numericValue = text.replace(/[^\d]/g, "");

    // Usar o valor digitado sem limitação automática
    const inputValue = parseInt(numericValue) || 0;

    // Formatar para exibição
    const formattedValue = formatCurrency(inputValue.toString());
    setDisplayValue(formattedValue);

    // Enviar valor numérico para o formulário
    onChange(inputValue.toString());
  };

  const handleBlur = (onBlur: () => void) => {
    // Garantir que o valor está formatado corretamente ao sair do campo
    if (displayValue && !displayValue.includes("R$")) {
      const numericValue = displayValue.replace(/[^\d]/g, "");
      const formattedValue = formatCurrency(numericValue);
      setDisplayValue(formattedValue);
    }
    onBlur();
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

      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => {
          // Sincronizar displayValue com o valor do formulário
          React.useEffect(() => {
            if (value && value !== displayValue.replace(/[^\d]/g, "")) {
              const formattedValue = formatCurrency(value);
              setDisplayValue(formattedValue);
            }
          }, [value]);

          return (
            <TextInput
              style={{
                backgroundColor: colors.card.background,
                borderRadius: 12,
                padding: 16,
                color: colors.text.primary,
                borderWidth: 1,
                borderColor: error ? colors.status.error : colors.card.border,
                fontSize: 16,
              }}
              placeholder={placeholder}
              placeholderTextColor={colors.text.secondary}
              value={displayValue}
              onChangeText={(text) => handleChangeText(text, onChange)}
              onBlur={() => handleBlur(onBlur)}
              keyboardType="numeric"
              maxLength={30}
            />
          );
        }}
      />

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
