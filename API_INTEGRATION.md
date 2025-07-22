# API Integration Guide

Este documento descreve como integrar o aplicativo ML Motoscar com a API backend.

## Formulários e Validação

### React Hook Form + Zod

O projeto utiliza React Hook Form com Zod para validação de formulários:

```typescript
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { vehicleSchema, VehicleFormData } from "@/schemas/vehicleSchema";

const {
  control,
  handleSubmit,
  formState: { errors, isValid },
  setValue,
  watch,
  reset,
} = useForm<VehicleFormData>({
  resolver: zodResolver(vehicleSchema),
  defaultValues: {
    name: "",
    brand: "",
    brandId: null,
    // ... outros campos
  },
  mode: "onChange",
});
```

### Schema de Validação

```typescript
// schemas/vehicleSchema.ts
export const vehicleSchema = z.object({
  name: z.string().min(1, "Nome do veículo é obrigatório"),
  brand: z.string().min(1, "Marca é obrigatória"),
  brandId: z.number().min(1, "Marca é obrigatória"),
  model: z.string().min(1, "Modelo é obrigatório"),
  modelId: z.number().min(1, "Modelo é obrigatório"),
  year: z.string()
    .min(4, "Ano deve ter pelo menos 4 dígitos")
    .refine((year) => {
      const numericYear = parseInt(year);
      const currentYear = new Date().getFullYear();
      return numericYear >= 1900 && numericYear <= currentYear + 1;
    }, "Ano deve estar entre 1900 e o próximo ano"),
  price: z.string()
    .min(1, "Preço é obrigatório")
    .refine((price) => {
      const numericPrice = parseFloat(price.replace(/[^\d]/g, ''));
      return numericPrice > 0 && numericPrice <= 999999;
    }, "Preço deve estar entre R$ 1 e R$ 999.999"),
  // ... outros campos
});
```

### Máscaras de Input

O projeto utiliza `react-native-mask-text` para aplicar máscaras nos campos:

#### Máscaras Disponíveis

```typescript
// components/masks.ts
export const Masks = {
  YEAR: "9999",                    // Ano: 2024
  PRICE: "999.999",               // Preço: 45.000
  PRICE_WITH_CENTS: "999.999,99", // Preço com centavos: 45.000,00
  PHONE: "(99) 99999-9999",       // Telefone: (11) 99999-9999
  CPF: "999.999.999-99",          // CPF: 123.456.789-00
  CNPJ: "99.999.999/9999-99",     // CNPJ: 12.345.678/0001-90
  CEP: "99999-999",               // CEP: 12345-678
  DATE: "99/99/9999",             // Data: 25/12/2024
  TIME: "99:99",                  // Hora: 14:30
  LICENSE_PLATE_OLD: "AAA-9999",  // Placa antiga: ABC-1234
  LICENSE_PLATE_MERCOSUL: "AAA9A99", // Placa Mercosul: ABC1D23
  CHASSIS: "SSSSSSSSSSSSSSSSS",   // Chassi: 17 caracteres
  ENGINE: "999cc",                // Motor: 649cc
  POWER: "999 cv",                // Potência: 95 cv
  TORQUE: "999 Nm",               // Torque: 64 Nm
  WEIGHT: "999 kg",               // Peso: 202 kg
  FUEL_CAPACITY: "99.9L",         // Tanque: 15.4L
} as const;
```

#### Componentes com Máscara

##### YearInput
```typescript
<YearInput
  control={control}
  name="year"
  label="Ano"
  placeholder="Ex: 2024"
  error={errors.year}
  required
/>
```

##### PriceInput
```typescript
<PriceInput
  control={control}
  name="price"
  label="Preço"
  placeholder="Ex: 45.000"
  error={errors.price}
  required
/>
```

##### MaskedInput (Genérico)
```typescript
<MaskedInput
  control={control}
  name="phone"
  label="Telefone"
  placeholder="(11) 99999-9999"
  mask={Masks.PHONE}
  keyboardType="numeric"
  maxLength={15}
/>
```

#### Funções Utilitárias

```typescript
// Remover máscara
const numericValue = removeMask("45.000"); // "45000"

// Formatar preço
const formattedPrice = formatPrice("45000"); // "45.000"

// Validar ano
const isValidYear = validateYear("2024"); // true

// Validar preço
const isValidPrice = validatePrice("45.000"); // true
```

### Componentes de Formulário

#### FormInput
Componente reutilizável para inputs de texto:

```typescript
<FormInput
  control={control}
  name="name"
  label="Nome do Veículo"
  placeholder="Ex: Honda CB 650R"
  error={errors.name}
  required
/>
```

#### BrandSearchInput
Componente para seleção de marca com busca:

```typescript
<Controller
  control={control}
  name="brand"
  render={({ field: { value } }) => (
    <BrandSearchInput
      value={value}
      onSelect={handleBrandSelect}
    />
  )}
/>
```

#### ModelSearchInput
Componente para seleção de modelo dependente da marca:

```typescript
<Controller
  control={control}
  name="model"
  render={({ field: { value } }) => (
    <ModelSearchInput
      value={value}
      brandId={watchedBrandId}
      disabled={!watchedBrandId}
      onSelect={handleModelSelect}
    />
  )}
/>
```

### Validação em Tempo Real

```typescript
// Validação automática
const { isValid } = formState;

// Botão habilitado/desabilitado baseado na validação
<TouchableOpacity
  disabled={!isValid}
  onPress={handleSubmit(onSubmit)}
>
  <Text>Salvar</Text>
</TouchableOpacity>
```

### Tratamento de Erros

```typescript
// Exibição de erros
{errors.name && (
  <Text style={{ color: colors.status.error, fontSize: 12 }}>
    {errors.name.message}
  </Text>
)}

// Estilo de input com erro
borderColor: errors.name ? colors.status.error : colors.card.border
```

## Endpoints Disponíveis

### 1. Listagem de Veículos
- **URL**: `GET /vehicles`
- **Descrição**: Retorna a lista de todos os veículos disponíveis
- **Resposta**:
```json
[
  {
    "id": 1,
    "name": "Honda CB 650R",
    "brand": "Honda",
    "model": "CB 650R",
    "year": 2024,
    "price": 45000,
    "image": "https://example.com/honda-cb650r.jpg",
    "category": "Sport Naked",
    "engine": "649cc",
    "power": "95 cv",
    "torque": "64 Nm",
    "transmission": "6 velocidades",
    "fuelType": "Gasolina",
    "fuelCapacity": "15.4L",
    "weight": "202 kg",
    "description": "Moto esportiva naked com design moderno...",
    "features": "ABS, Traction Control, LED Lighting"
  }
]
```

### 2. Detalhes do Veículo
- **URL**: `GET /vehicles/{id}`
- **Descrição**: Retorna os detalhes completos de um veículo específico
- **Parâmetros**: `id` - ID do veículo
- **Resposta**: Mesmo formato da listagem, mas com dados completos

### 3. Listagem de Marcas
- **URL**: `GET /brands`
- **Descrição**: Retorna a lista de todas as marcas disponíveis
- **Resposta**:
```json
[
  {
    "id": 1,
    "name": "Honda"
  },
  {
    "id": 2,
    "name": "Yamaha"
  },
  {
    "id": 3,
    "name": "Kawasaki"
  }
]
```

### 4. Listagem de Modelos por Marca
- **URL**: `GET /brands/{brandId}/models`
- **Descrição**: Retorna a lista de modelos de uma marca específica
- **Parâmetros**: `brandId` - ID da marca
- **Resposta**:
```json
[
  {
    "id": 1,
    "name": "CB 650R",
    "brandId": 1
  },
  {
    "id": 2,
    "name": "CB 1000R",
    "brandId": 1
  },
  {
    "id": 3,
    "name": "CBR 650R",
    "brandId": 1
  }
]
```

### 5. Cadastro de Veículo
- **URL**: `POST /vehicles`
- **Descrição**: Cadastra um novo veículo
- **Corpo da requisição**:
```json
{
  "name": "Honda CB 650R",
  "brandId": 1,
  "brand": "Honda",
  "modelId": 1,
  "model": "CB 650R",
  "year": 2024,
  "category": "Sport Naked",
  "engine": "649cc",
  "power": "95 cv",
  "torque": "64 Nm",
  "transmission": "6 velocidades",
  "fuelType": "Gasolina",
  "fuelCapacity": "15.4L",
  "weight": "202 kg",
  "price": 45000,
  "description": "Moto esportiva naked com design moderno...",
  "features": "ABS, Traction Control, LED Lighting"
}
```

## Configuração

### 1. URL Base da API
Configure a URL base da API no arquivo `services/api.ts`:

```typescript
const API_BASE_URL = 'https://sua-api.com/api';
```

### 2. Headers de Autenticação
Se necessário, adicione headers de autenticação:

```typescript
const headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer seu-token-aqui'
};
```

## Migração de Mock Data

### 1. Veículos
- Substitua as chamadas mock em `fetchVehicles()` e `fetchVehicleDetails()`
- Atualize os tipos de dados conforme necessário
- Implemente tratamento de erros adequado

### 2. Marcas
- Substitua as chamadas mock em `fetchBrands()`
- Implemente cache local se necessário para melhor performance

### 3. Modelos
- Substitua as chamadas mock em `fetchModels(brandId)`
- Implemente cache local por marca para melhor performance
- Considere implementar busca com debounce para melhor UX

## Tratamento de Erros

### 1. Erro de Rede
```typescript
try {
  const data = await fetchVehicles();
} catch (error) {
  if (error instanceof TypeError) {
    // Erro de rede
    console.error('Erro de conexão:', error);
  } else {
    // Outros erros
    console.error('Erro desconhecido:', error);
  }
}
```

### 2. Erro de API
```typescript
if (!response.ok) {
  throw new Error(`HTTP error! status: ${response.status}`);
}
```

## Estados de Loading

Implemente estados de loading para melhor UX:

```typescript
const [loading, setLoading] = useState(false);
const [error, setError] = useState<string | null>(null);

const loadData = async () => {
  setLoading(true);
  setError(null);
  
  try {
    const data = await fetchVehicles();
    setVehicles(data);
  } catch (error) {
    setError('Erro ao carregar dados');
  } finally {
    setLoading(false);
  }
};
```

## Cache e Performance

### 1. Cache Local
Considere implementar cache local para dados que não mudam frequentemente:

```typescript
import AsyncStorage from '@react-native-async-storage/async-storage';

const CACHE_KEY = 'vehicles_cache';
const CACHE_EXPIRY = 5 * 60 * 1000; // 5 minutos

const getCachedVehicles = async () => {
  try {
    const cached = await AsyncStorage.getItem(CACHE_KEY);
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_EXPIRY) {
        return data;
      }
    }
  } catch (error) {
    console.error('Erro ao ler cache:', error);
  }
  return null;
};
```

### 2. Cache de Modelos por Marca
```typescript
const MODELS_CACHE_KEY = (brandId: number) => `models_${brandId}_cache`;

const getCachedModels = async (brandId: number) => {
  try {
    const cached = await AsyncStorage.getItem(MODELS_CACHE_KEY(brandId));
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_EXPIRY) {
        return data;
      }
    }
  } catch (error) {
    console.error('Erro ao ler cache de modelos:', error);
  }
  return null;
};
```

### 3. Paginação
Para listas grandes, implemente paginação:

```typescript
const fetchVehicles = async (page = 1, limit = 20) => {
  const response = await fetch(`${API_BASE_URL}/vehicles?page=${page}&limit=${limit}`);
  return response.json();
};
```

## Testes

### 1. Teste de Conectividade
```typescript
const testConnection = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    return response.ok;
  } catch (error) {
    return false;
  }
};
```

### 2. Teste de Endpoints
```typescript
const testEndpoints = async () => {
  const endpoints = ['/vehicles', '/brands', '/brands/1/models'];
  
  for (const endpoint of endpoints) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`);
      console.log(`${endpoint}: ${response.status}`);
    } catch (error) {
      console.error(`${endpoint}: Erro`, error);
    }
  }
};
```

## Monitoramento

### 1. Logs de Performance
```typescript
const fetchWithTiming = async (url: string) => {
  const start = Date.now();
  try {
    const response = await fetch(url);
    const end = Date.now();
    console.log(`API call to ${url} took ${end - start}ms`);
    return response;
  } catch (error) {
    const end = Date.now();
    console.error(`API call to ${url} failed after ${end - start}ms`, error);
    throw error;
  }
};
```

### 2. Métricas de Erro
```typescript
const trackApiError = (endpoint: string, error: any) => {
  // Enviar para serviço de monitoramento
  console.error(`API Error - ${endpoint}:`, error);
};
```

## Fluxo de Dados Dependentes

### 1. Marca → Modelo
```typescript
const handleBrandSelect = async (brand: Brand) => {
  setSelectedBrand(brand);
  setSelectedModel(null); // Limpar modelo anterior
  setModels([]); // Limpar lista de modelos
  
  try {
    const modelsData = await fetchModels(brand.id);
    setModels(modelsData);
  } catch (error) {
    console.error('Erro ao carregar modelos:', error);
  }
};
```

### 2. Validação em Cascata
```typescript
const validateForm = () => {
  if (!selectedBrand) {
    return 'Selecione uma marca';
  }
  
  if (!selectedModel) {
    return 'Selecione um modelo';
  }
  
  return null; // Formulário válido
};
```

## Melhores Práticas

### 1. Validação de Formulários
- Use Zod para schemas de validação
- Implemente validação em tempo real
- Exiba mensagens de erro claras
- Desabilite botões quando formulário inválido
- Use máscaras para formatar dados de entrada

### 2. Máscaras de Input
- Aplique máscaras apropriadas para cada tipo de dado
- Valide dados após remoção da máscara
- Use componentes reutilizáveis para máscaras comuns
- Mantenha consistência visual nos inputs

### 3. Gerenciamento de Estado
- Use React Hook Form para formulários complexos
- Implemente reset automático após sucesso
- Mantenha estado de loading consistente
- Trate erros de forma amigável

### 4. Performance
- Implemente cache local para dados estáticos
- Use debounce para buscas
- Lazy load para listas grandes
- Otimize re-renders com useMemo/useCallback

### 5. UX
- Feedback visual imediato
- Estados de loading claros
- Mensagens de erro específicas
- Validação progressiva
- Formatação automática de dados 
