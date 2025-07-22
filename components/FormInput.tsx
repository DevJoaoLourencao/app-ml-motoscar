import { useTheme } from "@/components/ThemeContext";
import React, { useRef } from "react";
import { Control, Controller, FieldError } from "react-hook-form";
import { Text, TextInput, View } from "react-native";

interface FormInputProps {
  control: Control<any>;
  name: string;
  label: string;
  placeholder?: string;
  error?: FieldError;
  required?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  keyboardType?: "default" | "numeric" | "email-address" | "phone-pad";
  maxLength?: number;
  onFocus?: () => void;
}

export function FormInput({
  control,
  name,
  label,
  placeholder,
  error,
  required = false,
  multiline = false,
  numberOfLines = 1,
  keyboardType = "default",
  maxLength,
  onFocus,
}: FormInputProps) {
  const { colors } = useTheme();
  const inputRef = useRef<TextInput>(null);

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
          <TextInput
            ref={inputRef}
            style={{
              backgroundColor: colors.card.background,
              borderRadius: 12,
              padding: 16,
              color: colors.text.primary,
              borderWidth: 1,
              borderColor: error ? colors.status.error : colors.card.border,
              minHeight: multiline ? numberOfLines * 20 + 32 : undefined,
              textAlignVertical: multiline ? "top" : "center",
            }}
            placeholder={placeholder}
            placeholderTextColor={colors.text.secondary}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            onFocus={onFocus}
            multiline={multiline}
            numberOfLines={numberOfLines}
            keyboardType={keyboardType}
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
