import { useTheme } from "@/components/ThemeContext";
import React from "react";
import { Control, Controller, FieldError } from "react-hook-form";
import { Text, View } from "react-native";
import { MaskedTextInput } from "react-native-mask-text";

interface MaskedInputProps {
  control: Control<any>;
  name: string;
  label: string;
  placeholder?: string;
  error?: FieldError;
  required?: boolean;
  mask: string;
  keyboardType?: "default" | "numeric" | "email-address" | "phone-pad";
  maxLength?: number;
}

export function MaskedInput({
  control,
  name,
  label,
  placeholder,
  error,
  required = false,
  mask,
  keyboardType = "default",
  maxLength,
}: MaskedInputProps) {
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
            keyboardType={keyboardType}
            mask={mask}
            maxLength={maxLength}
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
