import { useTheme } from "@/components/ThemeContext";
import { Masks, validateRenavam } from "@/components/masks";
import React from "react";
import { Control, Controller, FieldError } from "react-hook-form";
import { Text, View } from "react-native";
import { MaskedTextInput } from "react-native-mask-text";

interface RenavamInputProps {
  control: Control<any>;
  name: string;
  label: string;
  placeholder?: string;
  error?: FieldError;
  required?: boolean;
  onFocus?: () => void;
}

export function RenavamInput({
  control,
  name,
  label,
  placeholder = "Ex: 12345678901",
  error,
  required = false,
  onFocus,
}: RenavamInputProps) {
  const { colors } = useTheme();

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
        rules={{
          validate: (value) => {
            if (required && !value) {
              return "RENAVAM é obrigatório";
            }
            if (value && !validateRenavam(value)) {
              return "RENAVAM deve ter 11 dígitos";
            }
            return true;
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <MaskedTextInput
            style={{
              backgroundColor: colors.card.background,
              borderRadius: 12,
              padding: 16,
              color: colors.text.primary,
              borderWidth: 1,
              borderColor: error ? colors.status.error : colors.card.border,
            }}
            placeholder={placeholder}
            placeholderTextColor={colors.text.secondary}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            onFocus={onFocus}
            keyboardType="numeric"
            mask={Masks.RENAVAM}
            maxLength={11}
          />
        )}
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
