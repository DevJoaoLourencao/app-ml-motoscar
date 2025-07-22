import {
  removeMask,
  validateCurrency,
  validateLicensePlate,
  validateRenavam,
} from "@/components/masks";
import { z } from "zod";

export const vehicleSchema = z
  .object({
    vehicleType: z.string().min(1, "Tipo do veículo é obrigatório"),
    brand: z.string().min(1, "Marca é obrigatória"),
    brandId: z.number().min(1, "Marca é obrigatória"),
    model: z.string().min(1, "Modelo é obrigatório"),
    modelId: z.number().min(1, "Modelo é obrigatório"),
    year: z.string().min(1, "Ano é obrigatório"),
    displacement: z.string().min(1, "Cilindradas são obrigatórias"),
    fuelType: z.string().optional(),
    licensePlate: z
      .string()
      .min(1, "Placa é obrigatória")
      .refine((plate) => validateLicensePlate(plate), "Placa inválida"),
    renavam: z
      .string()
      .min(1, "RENAVAM é obrigatório")
      .refine(
        (renavam) => validateRenavam(renavam),
        "RENAVAM deve ter 11 dígitos"
      ),
    color: z.string().min(1, "Cor é obrigatória"),
    purchasePrice: z
      .string()
      .min(1, "Preço de compra é obrigatório")
      .refine(
        (price) => validateCurrency(price),
        "Preço de compra deve estar entre R$ 1 e R$ 999.999.999"
      ),
    salePrice: z
      .string()
      .min(1, "Preço de venda é obrigatório")
      .refine(
        (price) => validateCurrency(price),
        "Preço de venda deve estar entre R$ 1 e R$ 999.999.999"
      ),
    minimumCash: z
      .string()
      .min(1, "Mínimo à vista é obrigatório")
      .refine(
        (price) => validateCurrency(price),
        "Mínimo à vista deve estar entre R$ 1 e R$ 999.999.999"
      ),
    client: z.string().optional(),
    clientId: z.string().optional(),
    description: z.string().optional(),
    features: z.array(z.string()).optional(),
    images: z.array(z.string()).optional(),
  })
  .refine(
    (data) => {
      const purchasePrice = parseInt(removeMask(data.purchasePrice));
      const salePrice = parseInt(removeMask(data.salePrice));
      return salePrice >= purchasePrice;
    },
    {
      message: "Preço de venda deve ser maior ou igual ao preço de compra",
      path: ["salePrice"],
    }
  )
  .refine(
    (data) => {
      const salePrice = parseInt(removeMask(data.salePrice));
      const minimumCash = parseInt(removeMask(data.minimumCash));
      return minimumCash <= salePrice;
    },
    {
      message: "Mínimo à vista deve ser menor ou igual ao preço de venda",
      path: ["minimumCash"],
    }
  );

export type VehicleFormData = z.infer<typeof vehicleSchema>;
