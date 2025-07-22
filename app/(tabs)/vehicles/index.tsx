import { Header } from "@/components/Header";
import { useTheme } from "@/components/ThemeContext";
import { BrandColors } from "@/constants/BrandColors";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface Vehicle {
  id: number;
  name: string;
  brand: string;
  model: string;
  category: string;
  engine: string;
  power: string;
  price: string;
  year: number;
  mileage: number;
  licensePlate: string;
  color: string;
  type: "car" | "motorcycle";
  image: string;
}

interface PriceRange {
  id: string;
  label: string;
  min: number;
  max: number;
}

export default function VehiclesScreen() {
  const { colors } = useTheme();
  const [searchText, setSearchText] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedPriceRange, setSelectedPriceRange] = useState("all");
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [vehicleToDelete, setVehicleToDelete] = useState<Vehicle | null>(null);

  // Simular dados da API
  const mockVehicles: Vehicle[] = [
    {
      id: 1,
      name: "Honda CB 650R",
      brand: "Honda",
      model: "CB 650R",
      category: "Sport Naked",
      engine: "649cc",
      power: "95 cv",
      price: "R$ 52.900",
      year: 2022,
      mileage: 8500,
      licensePlate: "FHZ8A60",
      color: "Preto",
      type: "motorcycle",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
    },
    {
      id: 2,
      name: "Yamaha MT-07",
      brand: "Yamaha",
      model: "MT-07",
      category: "Moto Naked",
      engine: "689cc",
      power: "73.4 cv",
      price: "R$ 42.500",
      year: 2021,
      mileage: 12500,
      licensePlate: "ABC1D23",
      color: "Azul",
      type: "motorcycle",
      image:
        "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800",
    },
    {
      id: 3,
      name: "Toyota Corolla",
      brand: "Toyota",
      model: "Corolla",
      category: "Sedan",
      engine: "2.0L",
      power: "170 cv",
      price: "R$ 145.800",
      year: 2023,
      mileage: 3200,
      licensePlate: "DEF-9012",
      color: "Branco",
      type: "car",
      image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800",
    },
    {
      id: 4,
      name: "Kawasaki Z900",
      brand: "Kawasaki",
      model: "Z900",
      category: "Moto Naked",
      engine: "948cc",
      power: "125 cv",
      price: "R$ 52.300",
      year: 2020,
      mileage: 18500,
      licensePlate: "GHI-3456",
      color: "Verde",
      type: "motorcycle",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800",
    },
    {
      id: 5,
      name: "Volkswagen Golf GTI",
      brand: "Volkswagen",
      model: "Golf GTI",
      category: "Hatch",
      engine: "2.0L Turbo",
      power: "230 cv",
      price: "R$ 189.900",
      year: 2022,
      mileage: 8900,
      licensePlate: "JKL-7890",
      color: "Vermelho",
      type: "car",
      image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800",
    },
    {
      id: 6,
      name: "BMW S1000RR",
      brand: "BMW",
      model: "S1000RR",
      category: "Moto Sport",
      engine: "999cc",
      power: "205 cv",
      price: "R$ 89.900",
      year: 2023,
      mileage: 4500,
      licensePlate: "MNO-2345",
      color: "Cinza",
      type: "motorcycle",
      image:
        "https://images.unsplash.com/photo-1582639510494-c80b5de9f148?w=800",
    },
  ];

  // Filtros por tipo de veículo
  const filters = [
    { id: "all", label: "Todos" },
    { id: "car", label: "Carros" },
    { id: "motorcycle", label: "Motos" },
  ];

  // Filtros por faixa de preço
  const priceRanges: PriceRange[] = [
    { id: "all", label: "Todos os preços", min: 0, max: Infinity },
    { id: "under-10k", label: "Até R$ 10k", min: 0, max: 10000 },
    { id: "10k-20k", label: "R$ 10k - R$ 20k", min: 10000, max: 20000 },
    { id: "20k-30k", label: "R$ 20k - R$ 30k", min: 20000, max: 30000 },
    { id: "30k-50k", label: "R$ 30k - R$ 50k", min: 30000, max: 50000 },
    { id: "50k-70k", label: "R$ 50k - R$ 70k", min: 50000, max: 70000 },
    { id: "over-70k", label: "Acima de R$ 70k", min: 70000, max: Infinity },
  ];

  // Função para extrair valor numérico do preço
  const extractPriceValue = (price: string): number => {
    return parseFloat(price.replace(/[^\d,]/g, "").replace(",", "."));
  };

  // Simular chamada da API
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        setLoading(true);
        // Simular delay da API
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setVehicles(mockVehicles);
      } catch (error) {
        console.error("Erro ao buscar veículos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  const handleFilterPress = () => {
    console.log("Filtros pressionados");
  };

  const handleSortPress = () => {
    console.log("Ordenação pressionada");
  };

  const handleVehiclePress = (vehicleId: number) => {
    console.log("Navegando para veículo ID:", vehicleId);
    router.push(`/vehicle-details/${vehicleId}`);
  };

  const handleDeletePress = (vehicleId: number, e: any) => {
    e.stopPropagation();
    const vehicle = vehicles.find((v) => v.id === vehicleId);
    if (vehicle) {
      setVehicleToDelete(vehicle);
      setDeleteModalVisible(true);
    }
  };

  const confirmDelete = () => {
    if (vehicleToDelete) {
      setVehicles(
        vehicles.filter((vehicle) => vehicle.id !== vehicleToDelete.id)
      );
      setDeleteModalVisible(false);
      setVehicleToDelete(null);
    }
  };

  const cancelDelete = () => {
    setDeleteModalVisible(false);
    setVehicleToDelete(null);
  };

  const RightContent = () => (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
      <TouchableOpacity
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          borderRadius: 20,
          paddingVertical: 6,
          paddingHorizontal: 8,
        }}
        onPress={() => router.push("/add-vehicle")}
      >
        <FontAwesome name="plus" size={20} color={colors.text.light} />
      </TouchableOpacity>
    </View>
  );

  const getVehicleIcon = (type: string) => {
    switch (type) {
      case "motorcycle":
        return "motorcycle";
      case "car":
      default:
        return "car";
    }
  };

  // Função para obter o código hexadecimal da cor
  const getColorHex = (colorName: string): string => {
    const colorMap: { [key: string]: string } = {
      Preto: "#000000",
      Branco: "#FFFFFF",
      Prata: "#C0C0C0",
      Cinza: "#808080",
      Azul: "#0000FF",
      Vermelho: "#FF0000",
      Verde: "#008000",
      Amarelo: "#FFFF00",
      Laranja: "#FFA500",
      Rosa: "#FFC0CB",
      Roxo: "#800080",
      Marrom: "#A52A2A",
      Bege: "#F5F5DC",
      Dourado: "#FFD700",
      Champagne: "#F7E7CE",
    };

    return colorMap[colorName] || "#CCCCCC";
  };

  const filteredVehicles = vehicles.filter((vehicle) => {
    // Filtro por tipo de veículo
    if (selectedFilter !== "all") {
      if (selectedFilter === "car" && vehicle.type !== "car") return false;
      if (selectedFilter === "motorcycle" && vehicle.type !== "motorcycle")
        return false;
    }

    // Filtro por faixa de preço
    if (selectedPriceRange !== "all") {
      const priceValue = extractPriceValue(vehicle.price);
      const selectedRange = priceRanges.find(
        (range) => range.id === selectedPriceRange
      );
      if (
        selectedRange &&
        (priceValue < selectedRange.min || priceValue > selectedRange.max)
      ) {
        return false;
      }
    }

    // Filtro por texto de busca
    if (searchText.length > 0) {
      const searchLower = searchText.toLowerCase();
      return (
        vehicle.name.toLowerCase().includes(searchLower) ||
        vehicle.brand.toLowerCase().includes(searchLower) ||
        vehicle.model.toLowerCase().includes(searchLower) ||
        vehicle.category.toLowerCase().includes(searchLower)
      );
    }

    return true;
  });

  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background.secondary }}>
        <Header
          leftContent={{
            type: "text",
            title: "Veículos",
          }}
          rightContent={<RightContent />}
        />
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color={BrandColors.primary} />
          <Text style={{ marginTop: 16, color: colors.text.secondary }}>
            Carregando veículos...
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background.secondary }}>
      {/* Header */}
      <Header
        leftContent={{
          type: "text",
          title: "Veículos",
        }}
        rightContent={<RightContent />}
      />

      <ScrollView style={{ flex: 1 }}>
        {/* Search Bar */}
        <View style={{ paddingHorizontal: 16, paddingVertical: 16 }}>
          <View
            style={{
              backgroundColor: colors.card.background,
              borderRadius: 12,
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 16,
              paddingVertical: 12,
              shadowColor: colors.card.shadow,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              borderWidth: 1,
              borderColor: colors.card.border,
            }}
          >
            <FontAwesome
              name="search"
              size={16}
              color={colors.text.secondary}
              style={{ marginRight: 12 }}
            />
            <TextInput
              placeholder="Buscar veículos..."
              placeholderTextColor={colors.text.muted}
              value={searchText}
              onChangeText={setSearchText}
              style={{
                flex: 1,
                color: colors.text.primary,
                fontSize: 16,
              }}
            />
            {searchText.length > 0 && (
              <TouchableOpacity onPress={() => setSearchText("")}>
                <FontAwesome
                  name="times"
                  size={16}
                  color={colors.text.secondary}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Filters */}
        <View style={{ paddingHorizontal: 16, marginBottom: 16 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 12,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: colors.text.primary,
              }}
            >
              Filtros
            </Text>
            <TouchableOpacity
              onPress={handleSortPress}
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: colors.card.background,
                paddingHorizontal: 8,
                paddingVertical: 6,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: colors.card.border,
              }}
            >
              <FontAwesome
                name="sort"
                size={14}
                color={colors.text.secondary}
                style={{ marginRight: 6 }}
              />
              <Text style={{ color: colors.text.secondary, fontSize: 14 }}>
                Ordenar
              </Text>
            </TouchableOpacity>
          </View>

          {/* Filtros por tipo de veículo */}
          <Text
            style={{
              fontSize: 14,
              fontWeight: "600",
              color: colors.text.primary,
              marginBottom: 8,
            }}
          >
            Tipo de Veículo
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ flexDirection: "row", marginBottom: 16 }}
          >
            {filters.map((filter) => (
              <TouchableOpacity
                key={filter.id}
                onPress={() => setSelectedFilter(filter.id)}
                style={{
                  backgroundColor:
                    selectedFilter === filter.id
                      ? colors.background.header
                      : colors.card.background,
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  borderRadius: 20,
                  marginRight: 8,
                  borderWidth: 1,
                  borderColor:
                    selectedFilter === filter.id
                      ? colors.background.header
                      : colors.card.border,
                }}
              >
                <Text
                  style={{
                    color:
                      selectedFilter === filter.id
                        ? colors.text.light
                        : colors.text.primary,
                    fontWeight: selectedFilter === filter.id ? "600" : "400",
                  }}
                >
                  {filter.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Filtros por faixa de preço */}
          <Text
            style={{
              fontSize: 14,
              fontWeight: "600",
              color: colors.text.primary,
              marginBottom: 8,
            }}
          >
            Faixa de Preço
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ flexDirection: "row" }}
          >
            {priceRanges.map((range) => (
              <TouchableOpacity
                key={range.id}
                onPress={() => setSelectedPriceRange(range.id)}
                style={{
                  backgroundColor:
                    selectedPriceRange === range.id
                      ? colors.background.header
                      : colors.card.background,
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  borderRadius: 20,
                  marginRight: 8,
                  borderWidth: 1,
                  borderColor:
                    selectedPriceRange === range.id
                      ? colors.background.header
                      : colors.card.border,
                }}
              >
                <Text
                  style={{
                    color:
                      selectedPriceRange === range.id
                        ? colors.text.light
                        : colors.text.primary,
                    fontWeight: selectedPriceRange === range.id ? "600" : "400",
                    fontSize: 13,
                  }}
                >
                  {range.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Results Count */}
        <View style={{ paddingHorizontal: 16, marginBottom: 16 }}>
          <Text
            style={{
              color: colors.text.secondary,
              fontSize: 14,
            }}
          >
            {filteredVehicles.length} veículos encontrados
          </Text>
        </View>

        {/* Vehicle Cards */}
        <View style={{ paddingHorizontal: 16, paddingBottom: 32 }}>
          {filteredVehicles.map((vehicle) => (
            <TouchableOpacity
              key={vehicle.id}
              onPress={() => handleVehiclePress(vehicle.id)}
              style={{
                backgroundColor: colors.card.background,
                borderRadius: 16,
                padding: 16,
                marginBottom: 16,
                shadowColor: colors.card.shadow,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                borderWidth: 1,
                borderColor: colors.card.border,
              }}
            >
              <View style={{ flexDirection: "row" }}>
                {/* Vehicle Image */}
                <View
                  style={{
                    borderRadius: 12,
                    width: 100,
                    height: 100,
                    marginRight: 16,
                    overflow: "hidden",
                  }}
                >
                  <Image
                    source={{ uri: vehicle.image }}
                    style={{
                      width: "100%",
                      height: "100%",
                      resizeMode: "cover",
                    }}
                  />
                </View>

                {/* Content */}
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "bold",
                      color: colors.text.primary,
                      marginBottom: 4,
                    }}
                  >
                    {vehicle.name}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: 4,
                    }}
                  >
                    <FontAwesome
                      name="car"
                      size={14}
                      color={colors.text.secondary}
                      style={{ marginRight: 4 }}
                    />
                    <Text
                      style={{
                        color: colors.text.secondary,
                        fontSize: 14,
                        marginRight: 8,
                      }}
                    >
                      {vehicle.licensePlate}
                    </Text>
                    <View
                      style={{
                        width: 12,
                        height: 12,
                        borderRadius: 6,
                        backgroundColor: getColorHex(vehicle.color),
                        borderWidth: 1,
                        borderColor: colors.card.border,
                        marginRight: 4,
                      }}
                    />
                    <Text
                      style={{
                        color: colors.text.secondary,
                        fontSize: 14,
                      }}
                    >
                      {vehicle.color}
                    </Text>
                  </View>

                  {/* Year and Mileage */}
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: 8,
                    }}
                  >
                    <FontAwesome
                      name="calendar"
                      size={14}
                      color={colors.text.secondary}
                    />
                    <Text
                      style={{
                        color: colors.text.secondary,
                        fontSize: 14,
                        marginLeft: 4,
                        marginRight: 12,
                      }}
                    >
                      {vehicle.year}
                    </Text>
                    <FontAwesome
                      name="tachometer"
                      size={14}
                      color={colors.text.secondary}
                    />
                    <Text
                      style={{
                        color: colors.text.secondary,
                        fontSize: 14,
                        marginLeft: 4,
                      }}
                    >
                      {vehicle.mileage.toLocaleString("pt-BR")} km
                    </Text>
                  </View>

                  {/* Price and Actions */}
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "bold",
                        color: BrandColors.primary,
                      }}
                    >
                      {vehicle.price}
                    </Text>
                    <View style={{ flexDirection: "row", gap: 8 }}>
                      <TouchableOpacity
                        onPress={(e) => handleDeletePress(vehicle.id, e)}
                        style={{
                          backgroundColor: "#fee2e2",
                          borderRadius: 20,
                          padding: 8,
                        }}
                      >
                        <FontAwesome name="trash" size={16} color="#dc2626" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Delete Confirmation Modal */}
      <Modal
        visible={deleteModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={cancelDelete}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 20,
          }}
        >
          <View
            style={{
              backgroundColor: colors.card.background,
              borderRadius: 16,
              padding: 24,
              width: "100%",
              maxWidth: 320,
              shadowColor: colors.card.shadow,
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              borderWidth: 1,
              borderColor: colors.card.border,
            }}
          >
            <View style={{ alignItems: "center", marginBottom: 20 }}>
              <View
                style={{
                  backgroundColor: "#fee2e2",
                  borderRadius: 50,
                  width: 60,
                  height: 60,
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 16,
                }}
              >
                <FontAwesome name="trash" size={24} color="#dc2626" />
              </View>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: colors.text.primary,
                  textAlign: "center",
                  marginBottom: 8,
                }}
              >
                Confirmar Exclusão
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: colors.text.secondary,
                  textAlign: "center",
                  lineHeight: 20,
                }}
              >
                Tem certeza que deseja excluir o veículo{" "}
                <Text style={{ fontWeight: "600", color: colors.text.primary }}>
                  {vehicleToDelete?.name}
                </Text>
                ? Esta ação não pode ser desfeita.
              </Text>
            </View>

            <View style={{ flexDirection: "row", gap: 12 }}>
              <TouchableOpacity
                onPress={cancelDelete}
                style={{
                  flex: 1,
                  backgroundColor: colors.card.background,
                  borderWidth: 1,
                  borderColor: colors.card.border,
                  borderRadius: 12,
                  paddingVertical: 12,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: colors.text.primary,
                    fontSize: 16,
                    fontWeight: "600",
                  }}
                >
                  Cancelar
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={confirmDelete}
                style={{
                  flex: 1,
                  backgroundColor: "#dc2626",
                  borderRadius: 12,
                  paddingVertical: 12,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontSize: 16,
                    fontWeight: "600",
                  }}
                >
                  Excluir
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
