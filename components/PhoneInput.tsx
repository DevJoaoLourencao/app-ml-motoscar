import { useTheme } from "@/components/ThemeContext";
import React from "react";
import { Control, Controller, FieldError } from "react-hook-form";
import { Text, View } from "react-native";
import { MaskedTextInput } from "react-native-mask-text";

interface PhoneInputProps {
  control: Control<any>;
  name: string;
  label?: string;
  placeholder?: string;
  error?: FieldError;
  required?: boolean;
  onFocus?: () => void;
  onChange?: (phone: string) => void;
}

export function PhoneInput({
  control,
  name,
  label = "Celular",
  placeholder = "(00) 00000-0000",
  error,
  required = false,
  onFocus,
  onChange,
}: PhoneInputProps) {
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
        render={({ field: { onChange: fieldOnChange, onBlur, value } }) => (
          <MaskedTextInput
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
            value={value}
            onChangeText={(text) => {
              fieldOnChange(text);
              onChange?.(text);
            }}
            onBlur={onBlur}
            onFocus={onFocus}
            keyboardType="phone-pad"
            mask="(99) 99999-9999"
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
