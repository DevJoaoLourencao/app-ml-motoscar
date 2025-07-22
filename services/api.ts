// Configuração da API
const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL || "https://api.mlmotoscar.com";

// Interfaces para tipagem
export interface VehicleColor {
  name: string;
  code: string;
}

export interface VehicleImage {
  id: string;
  url: string;
  alt: string;
}

export interface VehicleSpecification {
  category: string;
  value: string;
  unit?: string;
}

export interface VehicleReview {
  id: number;
  user: string;
  rating: number;
  date: string;
  comment: string;
}

export interface VehicleDealer {
  name: string;
  address: string;
  phone: string;
  rating: number;
  reviews: number;
}

export interface VehicleDetails {
  id: string;
  name: string;
  vehicleType: string;
  brand: string;
  model: string;
  year: string;
  displacement: string;
  fuelType?: string;
  licensePlate: string;
  renavam: string;
  color: string;
  mileage: number;
  purchasePrice: string;
  salePrice: string;
  minimumCash: string;
  client?: string;
  clientId?: string;
  description?: string;
  features?: string[];
  images?: VehicleImage[];
}

export interface Vehicle {
  id: number;
  name: string;
  brand: string;
  model: string;
  category: string;
  engine: string;
  power: string;
  price: string;
  rating: number;
  reviews: number;
  type: "car" | "motorcycle";
  image: string;
}

export interface Brand {
  id: number;
  name: string;
}

export interface Model {
  id: number;
  name: string;
}

// Mock data para tipos de veículos
const vehicleTypes = [
  { id: "car", name: "Carro" },
  { id: "motorcycle", name: "Moto" },
];

// Mock data para marcas por tipo
const brandsByType = {
  car: [
    { id: 1, name: "Toyota" },
    { id: 2, name: "Honda" },
    { id: 3, name: "Ford" },
    { id: 4, name: "Chevrolet" },
    { id: 5, name: "Volkswagen" },
    { id: 6, name: "Fiat" },
    { id: 7, name: "Hyundai" },
    { id: 8, name: "Nissan" },
    { id: 9, name: "BMW" },
    { id: 10, name: "Mercedes-Benz" },
  ],
  motorcycle: [
    { id: 11, name: "Honda" },
    { id: 12, name: "Yamaha" },
    { id: 13, name: "Kawasaki" },
    { id: 14, name: "Suzuki" },
    { id: 15, name: "BMW" },
    { id: 16, name: "Ducati" },
    { id: 17, name: "Harley-Davidson" },
    { id: 18, name: "KTM" },
    { id: 19, name: "Triumph" },
    { id: 20, name: "Aprilia" },
  ],
};

// Mock data para modelos por marca
const modelsByBrand = {
  // Carros
  1: [
    { id: 1, name: "Corolla" },
    { id: 2, name: "Camry" },
    { id: 3, name: "RAV4" },
  ],
  2: [
    { id: 4, name: "Civic" },
    { id: 5, name: "Accord" },
    { id: 6, name: "CR-V" },
  ],
  3: [
    { id: 7, name: "Focus" },
    { id: 8, name: "Fusion" },
    { id: 9, name: "Escape" },
  ],
  4: [
    { id: 10, name: "Cruze" },
    { id: 11, name: "Malibu" },
    { id: 12, name: "Equinox" },
  ],
  5: [
    { id: 13, name: "Golf" },
    { id: 14, name: "Passat" },
    { id: 15, name: "Tiguan" },
  ],
  6: [
    { id: 16, name: "Palio" },
    { id: 17, name: "Uno" },
    { id: 18, name: "Siena" },
  ],
  7: [
    { id: 19, name: "HB20" },
    { id: 20, name: "i30" },
    { id: 21, name: "Tucson" },
  ],
  8: [
    { id: 22, name: "Sentra" },
    { id: 23, name: "Versa" },
    { id: 24, name: "Kicks" },
  ],
  9: [
    { id: 25, name: "Série 3" },
    { id: 26, name: "Série 5" },
    { id: 27, name: "X3" },
  ],
  10: [
    { id: 28, name: "Classe C" },
    { id: 29, name: "Classe E" },
    { id: 30, name: "GLA" },
  ],

  // Motos
  11: [
    { id: 31, name: "CG 150" },
    { id: 32, name: "CB 650R" },
    { id: 33, name: "CBR 600RR" },
  ],
  12: [
    { id: 34, name: "YZF-R1" },
    { id: 35, name: "MT-07" },
    { id: 36, name: "TMAX" },
  ],
  13: [
    { id: 37, name: "Ninja 650" },
    { id: 38, name: "Z900" },
    { id: 39, name: "Versys 650" },
  ],
  14: [
    { id: 40, name: "GSX-R750" },
    { id: 41, name: "V-Strom 650" },
    { id: 42, name: "Burgman 400" },
  ],
  15: [
    { id: 43, name: "R 1250 GS" },
    { id: 44, name: "S1000RR" },
    { id: 45, name: "F 850 GS" },
  ],
  16: [
    { id: 46, name: "Panigale V4" },
    { id: 47, name: "Monster 821" },
    { id: 48, name: "Multistrada 950" },
  ],
  17: [
    { id: 49, name: "Sportster 883" },
    { id: 50, name: "Street Glide" },
    { id: 51, name: "Road King" },
  ],
  18: [
    { id: 52, name: "Duke 390" },
    { id: 53, name: "RC 390" },
    { id: 54, name: "Adventure 790" },
  ],
  19: [
    { id: 55, name: "Street Triple" },
    { id: 56, name: "Tiger 900" },
    { id: 57, name: "Bonneville T120" },
  ],
  20: [
    { id: 58, name: "RSV4" },
    { id: 59, name: "Tuono V4" },
    { id: 60, name: "Shiver 900" },
  ],
};

export async function fetchVehicleTypes(): Promise<
  { id: string; name: string }[]
> {
  try {
    // TODO: Implementar chamada real da API
    // const response = await fetch('/api/vehicle-types');
    // return response.json();

    // Simular delay da API
    await new Promise((resolve) => setTimeout(resolve, 500));

    return vehicleTypes;
  } catch (error) {
    console.error("Erro ao buscar tipos de veículos:", error);
    return vehicleTypes; // Fallback para dados mock
  }
}

export async function fetchBrandsByType(vehicleType: string): Promise<Brand[]> {
  try {
    console.log("Buscando marcas para tipo:", vehicleType);

    // TODO: Implementar chamada real da API
    // const response = await fetch(`/api/brands?vehicleType=${vehicleType}`);
    // return response.json();

    // Simular delay da API
    await new Promise((resolve) => setTimeout(resolve, 500));

    const brands = brandsByType[vehicleType as keyof typeof brandsByType] || [];
    console.log(
      `Encontradas ${brands.length} marcas para ${vehicleType}:`,
      brands
    );

    return brands;
  } catch (error) {
    console.error("Erro ao buscar marcas:", error);
    return brandsByType[vehicleType as keyof typeof brandsByType] || []; // Fallback para dados mock
  }
}

export async function fetchBrands(): Promise<Brand[]> {
  try {
    // TODO: Implementar chamada real da API
    // const response = await fetch('/api/brands');
    // return response.json();

    // Simular delay da API
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Retornar todas as marcas (carros + motos)
    return [...brandsByType.car, ...brandsByType.motorcycle];
  } catch (error) {
    console.error("Erro ao buscar marcas:", error);
    return [...brandsByType.car, ...brandsByType.motorcycle]; // Fallback para dados mock
  }
}

export async function fetchModels(brandId: number): Promise<Model[]> {
  try {
    // TODO: Implementar chamada real da API
    // const response = await fetch(`/api/models?brandId=${brandId}`);
    // return response.json();

    // Simular delay da API
    await new Promise((resolve) => setTimeout(resolve, 500));

    return modelsByBrand[brandId as keyof typeof modelsByBrand] || [];
  } catch (error) {
    console.error("Erro ao buscar modelos:", error);
    return modelsByBrand[brandId as keyof typeof modelsByBrand] || []; // Fallback para dados mock
  }
}

// Função para fazer requisições HTTP
const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;

  const defaultOptions: RequestInit = {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, defaultOptions);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error);
    throw error;
  }
};

// Serviços da API
export const vehicleService = {
  // Buscar lista de veículos
  getVehicles: async (): Promise<Vehicle[]> => {
    return apiRequest("/vehicles");
  },

  // Buscar detalhes de um veículo específico
  getVehicleDetails: async (vehicleId: string): Promise<VehicleDetails> => {
    return apiRequest(`/vehicles/${vehicleId}`);
  },

  // Buscar veículos por filtro
  getVehiclesByFilter: async (filter: string): Promise<Vehicle[]> => {
    return apiRequest(`/vehicles?filter=${filter}`);
  },

  // Buscar veículos por categoria
  getVehiclesByCategory: async (category: string): Promise<Vehicle[]> => {
    return apiRequest(`/vehicles?category=${category}`);
  },

  // Buscar veículos por tipo (carro/moto)
  getVehiclesByType: async (type: "car" | "motorcycle"): Promise<Vehicle[]> => {
    return apiRequest(`/vehicles?type=${type}`);
  },
};

// Configurações da API
export const apiConfig = {
  baseUrl: API_BASE_URL,
  timeout: 10000, // 10 segundos
  retryAttempts: 3,
};

export default vehicleService;
