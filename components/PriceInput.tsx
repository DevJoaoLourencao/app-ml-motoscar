import { MaskedInput } from "@/components/MaskedInput";
import { Masks } from "@/components/masks";
import React from "react";
import { Control, FieldError } from "react-hook-form";

interface PriceInputProps {
  control: Control<any>;
  name: string;
  label?: string;
  placeholder?: string;
  error?: FieldError;
  required?: boolean;
}

export function PriceInput({
  control,
  name,
  label = "Preço",
  placeholder = "Ex: 45.000",
  error,
  required = false,
}: PriceInputProps) {
  return (
    <MaskedInput
      control={control}
      name={name}
      label={label}
      placeholder={placeholder}
      error={error}
      required={required}
      mask={Masks.PRICE}
      keyboardType="numeric"
      maxLength={7}
    />
  );
}
