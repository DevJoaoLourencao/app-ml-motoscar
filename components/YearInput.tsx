import { MaskedInput } from "@/components/MaskedInput";
import { Masks } from "@/components/masks";
import React from "react";
import { Control, FieldError } from "react-hook-form";

interface YearInputProps {
  control: Control<any>;
  name: string;
  label?: string;
  placeholder?: string;
  error?: FieldError;
  required?: boolean;
}

export function YearInput({
  control,
  name,
  label = "Ano",
  placeholder = "Ex: 2024",
  error,
  required = false,
}: YearInputProps) {
  return (
    <MaskedInput
      control={control}
      name={name}
      label={label}
      placeholder={placeholder}
      error={error}
      required={required}
      mask={Masks.YEAR}
      keyboardType="numeric"
      maxLength={4}
    />
  );
}
