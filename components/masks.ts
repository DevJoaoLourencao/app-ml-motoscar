/**
 * Padrões de máscaras para inputs
 *
 * Caracteres especiais:
 * - 9: Apenas números
 * - A: Apenas letras
 * - S: Letras e números
 * - *: Qualquer caractere
 */

export const Masks = {
  // Ano (4 dígitos)
  YEAR: "9999",

  // Preço (formato brasileiro)
  PRICE: "999.999",

  // Preço com centavos
  PRICE_WITH_CENTS: "999.999,99",

  // Máscara monetária completa (R$ 999.999,99)
  CURRENCY: "R$ 999.999,99",

  // Telefone brasileiro (celular)
  PHONE: "(99) 99999-9999",

  // Telefone fixo brasileiro
  PHONE_LANDLINE: "(99) 9999-9999",

  // CPF
  CPF: "999.999.999-99",

  // CNPJ
  CNPJ: "99.999.999/9999-99",

  // CEP
  CEP: "99999-999",

  // Data (DD/MM/AAAA)
  DATE: "99/99/9999",

  // Hora (HH:MM)
  TIME: "99:99",

  // Placa de veículo (formato antigo)
  LICENSE_PLATE_OLD: "AAA-9999",

  // Placa de veículo (formato Mercosul)
  LICENSE_PLATE_MERCOSUL: "AAA9A99",

  // RENAVAM (11 dígitos)
  RENAVAM: "99999999999",

  // Chassi (17 caracteres)
  CHASSIS: "SSSSSSSSSSSSSSSSS",

  // Motor (formato: 999cc)
  ENGINE: "999cc",

  // Potência (formato: 999 cv)
  POWER: "999 cv",

  // Torque (formato: 999 Nm)
  TORQUE: "999 Nm",

  // Peso (formato: 999 kg)
  WEIGHT: "999 kg",

  // Capacidade do tanque (formato: 99.9L)
  FUEL_CAPACITY: "99.9L",
} as const;

/**
 * Função para remover máscara de um valor
 */
export function removeMask(value: string): string {
  return value.replace(/[^\d]/g, "");
}

/**
 * Função para aplicar máscara de preço
 */
export function formatPrice(value: string): string {
  const numericValue = removeMask(value);
  const formatted = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return formatted;
}

/**
 * Função para aplicar máscara monetária
 */
export function formatCurrency(value: string): string {
  const numericValue = removeMask(value);

  if (numericValue === "") return "";

  // Verificar se o valor é muito grande
  if (numericValue.length > 12) {
    return `R$ ${numericValue}`; // Não formatar se for muito grande
  }

  // Formatar apenas com pontos para milhares (sem centavos)
  const formattedValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return `R$ ${formattedValue}`;
}

/**
 * Função para aplicar máscara de ano
 */
export function formatYear(value: string): string {
  const numericValue = removeMask(value);
  return numericValue.slice(0, 4);
}

/**
 * Função para validar ano
 */
export function validateYear(year: string): boolean {
  const numericYear = parseInt(year);
  const currentYear = new Date().getFullYear();
  return numericYear >= 1900 && numericYear <= currentYear + 1;
}

/**
 * Função para validar preço
 */
export function validatePrice(price: string): boolean {
  const numericValue = removeMask(price);
  const numericPrice = parseInt(numericValue);

  // Verificar se é um número válido
  if (isNaN(numericPrice)) return false;

  return numericPrice > 0 && numericPrice <= 999999999; // Limitado a 999 milhões
}

/**
 * Função para validar preço monetário
 */
export function validateCurrency(price: string): boolean {
  const numericValue = removeMask(price);
  const numericPrice = parseInt(numericValue);

  // Verificar se é um número válido
  if (isNaN(numericPrice)) return false;

  return numericPrice > 0 && numericPrice <= 999999999; // Limitado a R$ 999 milhões
}

/**
 * Função para validar placa de veículo (formato antigo ou Mercosul)
 */
export function validateLicensePlate(plate: string): boolean {
  // Remover hífen e espaços
  const cleanPlate = plate.replace(/[-\s]/g, "").toUpperCase();

  // Verificar formato antigo (AAA-9999)
  const oldFormat = /^[A-Z]{3}[0-9]{4}$/;

  // Verificar formato Mercosul (AAA9A99)
  const mercosulFormat = /^[A-Z]{3}[0-9][A-Z][0-9]{2}$/;

  const isValidOld = oldFormat.test(cleanPlate);
  const isValidMercosul = mercosulFormat.test(cleanPlate);

  // Log para debug (remover em produção)
  console.log("Validando placa:", cleanPlate);
  console.log("Formato antigo válido:", isValidOld);
  console.log("Formato Mercosul válido:", isValidMercosul);

  return isValidOld || isValidMercosul;
}

/**
 * Função para validar RENAVAM (11 dígitos)
 */
export function validateRenavam(renavam: string): boolean {
  const numericValue = removeMask(renavam);

  // RENAVAM deve ter exatamente 11 dígitos
  if (numericValue.length !== 11) return false;

  // Verificar se todos os caracteres são números
  return /^\d{11}$/.test(numericValue);
}

/**
 * Função para formatar placa de veículo
 */
export function formatLicensePlate(value: string): string {
  // Remover todos os caracteres não alfanuméricos
  const cleanValue = value.replace(/[^A-Za-z0-9]/g, "").toUpperCase();

  if (cleanValue.length <= 3) {
    return cleanValue;
  }

  // Verificar se é formato Mercosul (AAA9A99)
  if (cleanValue.length >= 4 && /^[A-Z]{3}[0-9]/.test(cleanValue)) {
    if (cleanValue.length <= 4) {
      return cleanValue;
    }
    if (cleanValue.length <= 5) {
      return cleanValue.slice(0, 4) + cleanValue.slice(4);
    }
    if (cleanValue.length <= 7) {
      return (
        cleanValue.slice(0, 4) + cleanValue.slice(4, 5) + cleanValue.slice(5)
      );
    }
    return (
      cleanValue.slice(0, 4) + cleanValue.slice(4, 5) + cleanValue.slice(5, 7)
    );
  }

  // Formato antigo (AAA-9999)
  if (cleanValue.length <= 3) {
    return cleanValue;
  }
  return cleanValue.slice(0, 3) + "-" + cleanValue.slice(3, 7);
}

/**
 * Função para detectar e aplicar máscara de telefone automaticamente
 * Aceita tanto telefone fixo (10 dígitos) quanto celular (11 dígitos)
 */
export function getPhoneMask(value: string): string {
  const cleanValue = removeMask(value);

  // Se tem 10 dígitos ou menos, é telefone fixo
  if (cleanValue.length <= 10) {
    return Masks.PHONE_LANDLINE;
  }

  // Se tem 11 dígitos ou mais, é celular
  return Masks.PHONE;
}

/**
 * Função para validar telefone (fixo ou celular)
 */
export function validatePhone(phone: string): boolean {
  const cleanValue = removeMask(phone);

  // Telefone deve ter 10 dígitos (fixo) ou 11 dígitos (celular)
  return cleanValue.length === 10 || cleanValue.length === 11;
}
