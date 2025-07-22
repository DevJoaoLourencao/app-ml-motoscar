import { useTheme } from "@/components/ThemeContext";
import { validateLicensePlate } from "@/components/masks";
import React, { useEffect, useState } from "react";
import { Control, Controller, FieldError } from "react-hook-form";
import { Text, TextInput, View } from "react-native";

interface LicensePlateInputProps {
  control: Control<any>;
  name: string;
  label: string;
  placeholder?: string;
  error?: FieldError;
  required?: boolean;
  onFocus?: () => void;
}

export function LicensePlateInput({
  control,
  name,
  label,
  placeholder = "Ex: ABC-1234",
  error,
  required = false,
  onFocus,
}: LicensePlateInputProps) {
  const { colors } = useTheme();
  const [plateFormat, setPlateFormat] = useState<"old" | "mercosul">("old");

  const formatLicensePlate = (text: string): string => {
    // Remover todos os caracteres não alfanuméricos e converter para maiúsculas
    const cleanText = text.replace(/[^A-Za-z0-9]/g, "").toUpperCase();

    if (cleanText.length === 0) return "";

    // Detectar formato baseado no conteúdo
    let format: "old" | "mercosul" = "old";

    // Para formato Mercosul: AAA9A99 (3 letras + 1 número + 1 letra + 2 números)
    // Para formato antigo: AAA-9999 (3 letras + 4 números)

    if (cleanText.length >= 4) {
      const fourthChar = cleanText.charAt(3);
      const fifthChar = cleanText.charAt(4);

      // Se o 4º é número e o 5º é letra, é formato Mercosul
      if (/[0-9]/.test(fourthChar) && fifthChar && /[A-Z]/.test(fifthChar)) {
        format = "mercosul";
      }
      // Se o 4º é número e o 5º é número, é formato antigo
      else if (
        /[0-9]/.test(fourthChar) &&
        fifthChar &&
        /[0-9]/.test(fifthChar)
      ) {
        format = "old";
      }
      // Se o 4º é letra, é formato Mercosul
      else if (/[A-Z]/.test(fourthChar)) {
        format = "mercosul";
      }
    }

    setPlateFormat(format);

    // Aplicar formatação baseada no formato detectado
    if (format === "old") {
      // Formato antigo: AAA-9999
      if (cleanText.length <= 3) {
        return cleanText;
      }
      return cleanText.slice(0, 3) + "-" + cleanText.slice(3, 7);
    } else {
      // Formato Mercosul: AAA9A99
      if (cleanText.length <= 3) {
        return cleanText;
      }
      if (cleanText.length <= 4) {
        return cleanText.slice(0, 4);
      }
      if (cleanText.length <= 5) {
        return cleanText.slice(0, 4) + cleanText.slice(4, 5);
      }
      return (
        cleanText.slice(0, 4) + cleanText.slice(4, 5) + cleanText.slice(5, 7)
      );
    }
  };

  const getPlaceholder = () => {
    return plateFormat === "old" ? "Ex: ABC-1234" : "Ex: ABC1D23";
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
        rules={{
          validate: (value) => {
            if (required && !value) {
              return "Placa é obrigatória";
            }
            if (value && !validateLicensePlate(value)) {
              return "Placa inválida";
            }
            return true;
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => {
          // Detectar formato quando o valor muda externamente
          useEffect(() => {
            if (value) {
              const cleanText = value
                .replace(/[^A-Za-z0-9]/g, "")
                .toUpperCase();
              if (cleanText.length >= 4) {
                const fourthChar = cleanText.charAt(3);
                const fifthChar = cleanText.charAt(4);
                if (
                  /[0-9]/.test(fourthChar) &&
                  fifthChar &&
                  /[A-Z]/.test(fifthChar)
                ) {
                  setPlateFormat("mercosul");
                } else if (
                  /[0-9]/.test(fourthChar) &&
                  fifthChar &&
                  /[0-9]/.test(fifthChar)
                ) {
                  setPlateFormat("old");
                } else if (/[A-Z]/.test(fourthChar)) {
                  setPlateFormat("mercosul");
                }
              }
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
              }}
              placeholder={getPlaceholder()}
              placeholderTextColor={colors.text.secondary}
              value={value}
              onChangeText={(text) => {
                const formatted = formatLicensePlate(text);
                onChange(formatted);
              }}
              onBlur={onBlur}
              onFocus={onFocus}
              keyboardType="default"
              autoCapitalize="characters"
              maxLength={plateFormat === "old" ? 8 : 7} // AAA-9999 = 8 chars, AAA9A99 = 7 chars
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
