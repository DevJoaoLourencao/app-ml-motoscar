import { CurrencyInput } from "@/components/CurrencyInput";
import React from "react";
import { Control, FieldError } from "react-hook-form";

interface MinimumCashInputProps {
  control: Control<any>;
  name: string;
  label?: string;
  placeholder?: string;
  error?: FieldError;
  required?: boolean;
  onFocus?: () => void;
}

export function MinimumCashInput({
  control,
  name,
  label = "Mínimo à Vista",
  placeholder = "R$ 0",
  error,
  required = false,
  onFocus,
}: MinimumCashInputProps) {
  return (
    <CurrencyInput
      control={control}
      name={name}
      label={label}
      placeholder={placeholder}
      error={error}
      required={required}
      maxValue={999999.99}
    />
  );
}
