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

interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  address: string;
  city: string;
  state: string;
  createdAt: string;
  totalPurchases: number;
  totalValue: string;
  avatar: string;
}

interface StatusFilter {
  id: string;
  label: string;
}

export default function ClientsScreen() {
  const { colors } = useTheme();
  const [searchText, setSearchText] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [clientToDelete, setClientToDelete] = useState<Client | null>(null);

  // Simular dados da API
  const mockClients: Client[] = [
    {
      id: 1,
      name: "João Silva",
      email: "joao.silva@email.com",
      phone: "(11) 99999-9999",
      cpf: "123.456.789-00",
      address: "Rua das Flores, 123",
      city: "São Paulo",
      state: "SP",
      createdAt: "15/12/2024",
      totalPurchases: 3,
      totalValue: "R$ 125.900",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    },
    {
      id: 2,
      name: "Maria Santos",
      email: "maria.santos@email.com",
      phone: "(11) 88888-8888",
      cpf: "987.654.321-00",
      address: "Av. Paulista, 456",
      city: "São Paulo",
      state: "SP",
      createdAt: "14/12/2024",
      totalPurchases: 1,
      totalValue: "R$ 42.500",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
    },
    {
      id: 3,
      name: "Pedro Costa",
      email: "pedro.costa@email.com",
      phone: "(11) 77777-7777",
      cpf: "456.789.123-00",
      address: "Rua Augusta, 789",
      city: "São Paulo",
      state: "SP",
      createdAt: "13/12/2024",
      totalPurchases: 2,
      totalValue: "R$ 145.800",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
    },
    {
      id: 4,
      name: "Ana Oliveira",
      email: "ana.oliveira@email.com",
      phone: "(11) 66666-6666",
      cpf: "789.123.456-00",
      address: "Rua Oscar Freire, 321",
      city: "São Paulo",
      state: "SP",
      createdAt: "12/12/2024",
      totalPurchases: 1,
      totalValue: "R$ 89.900",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
    },
    {
      id: 5,
      name: "Carlos Ferreira",
      email: "carlos.ferreira@email.com",
      phone: "(11) 55555-5555",
      cpf: "321.654.987-00",
      address: "Av. Brigadeiro Faria Lima, 654",
      city: "São Paulo",
      state: "SP",
      createdAt: "11/12/2024",
      totalPurchases: 0,
      totalValue: "R$ 0",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
    },
    {
      id: 6,
      name: "Lucia Martins",
      email: "lucia.martins@email.com",
      phone: "(11) 44444-4444",
      cpf: "654.321.987-00",
      address: "Rua Haddock Lobo, 987",
      city: "São Paulo",
      state: "SP",
      createdAt: "10/12/2024",
      totalPurchases: 1,
      totalValue: "R$ 165.400",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150",
    },
  ];

  // Filtros por status do cliente
  const filters: StatusFilter[] = [
    { id: "all", label: "Todos" },
    { id: "active", label: "Ativos" },
    { id: "inactive", label: "Inativos" },
    { id: "vip", label: "VIP" },
  ];

  // Simular chamada da API
  useEffect(() => {
    const fetchClients = async () => {
      try {
        setLoading(true);
        // Simular delay da API
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setClients(mockClients);
      } catch (error) {
        console.error("Erro ao buscar clientes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  const handleClientPress = (clientId: number) => {
    console.log("Navegando para cliente ID:", clientId);
    // router.push(`/client-details/${clientId}`);
  };

  const handleDeletePress = (clientId: number, e: any) => {
    e.stopPropagation();
    const client = clients.find((c) => c.id === clientId);
    if (client) {
      setClientToDelete(client);
      setDeleteModalVisible(true);
    }
  };

  const confirmDelete = () => {
    if (clientToDelete) {
      setClients(clients.filter((client) => client.id !== clientToDelete.id));
      setDeleteModalVisible(false);
      setClientToDelete(null);
    }
  };

  const cancelDelete = () => {
    setDeleteModalVisible(false);
    setClientToDelete(null);
  };

  const RightContent = () => (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
      <TouchableOpacity
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          borderRadius: 20,
          padding: 8,
        }}
        onPress={() => router.push("/add-client")}
      >
        <FontAwesome name="plus" size={20} color={colors.text.light} />
      </TouchableOpacity>
    </View>
  );

  const filteredClients = clients.filter((client) => {
    // Filtro por status do cliente
    if (selectedFilter !== "all") {
      if (selectedFilter === "active" && client.totalPurchases === 0)
        return false;
      if (selectedFilter === "inactive" && client.totalPurchases > 0)
        return false;
      if (
        selectedFilter === "vip" &&
        parseFloat(
          client.totalValue
            .replace("R$ ", "")
            .replace(".", "")
            .replace(",", ".")
        ) < 100000
      )
        return false;
    }

    // Filtro por busca
    if (searchText) {
      const searchLower = searchText.toLowerCase();
      return (
        client.name.toLowerCase().includes(searchLower) ||
        client.email.toLowerCase().includes(searchLower) ||
        client.phone.includes(searchText) ||
        client.cpf.includes(searchText)
      );
    }

    return true;
  });

  const getClientStatus = (client: Client) => {
    if (client.totalPurchases === 0)
      return { label: "Novo", color: BrandColors.info };
    if (
      parseFloat(
        client.totalValue.replace("R$ ", "").replace(".", "").replace(",", ".")
      ) >= 100000
    ) {
      return { label: "VIP", color: BrandColors.warning };
    }
    return { label: "Ativo", color: BrandColors.success };
  };

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.background.secondary,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color={colors.background.header} />
        <Text style={{ marginTop: 16, color: colors.text.primary }}>
          Carregando clientes...
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background.secondary }}>
      {/* Header */}
      <Header
        leftContent={{
          type: "back",
          title: "Clientes",
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
              style={{
                flex: 1,
                color: colors.text.primary,
                fontSize: 16,
              }}
              placeholder="Buscar por nome, email, telefone ou CPF..."
              placeholderTextColor={colors.text.secondary}
              value={searchText}
              onChangeText={setSearchText}
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
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              color: colors.text.primary,
              marginBottom: 12,
            }}
          >
            Filtrar por:
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ flexDirection: "row" }}
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
        </View>

        {/* Clients List */}
        <View style={{ paddingHorizontal: 16, paddingBottom: 24 }}>
          {filteredClients.length === 0 ? (
            <View
              style={{
                alignItems: "center",
                paddingVertical: 40,
              }}
            >
              <FontAwesome
                name="users"
                size={48}
                color={colors.text.secondary}
                style={{ marginBottom: 16 }}
              />
              <Text
                style={{
                  fontSize: 16,
                  color: colors.text.secondary,
                  textAlign: "center",
                }}
              >
                {searchText
                  ? "Nenhum cliente encontrado para sua busca"
                  : "Nenhum cliente cadastrado"}
              </Text>
            </View>
          ) : (
            filteredClients.map((client) => {
              const status = getClientStatus(client);
              return (
                <TouchableOpacity
                  key={client.id}
                  onPress={() => handleClientPress(client.id)}
                  style={{
                    backgroundColor: colors.card.background,
                    borderRadius: 12,
                    padding: 16,
                    marginBottom: 12,
                    shadowColor: colors.card.shadow,
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                    borderWidth: 1,
                    borderColor: colors.card.border,
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    {/* Avatar */}
                    <Image
                      source={{ uri: client.avatar }}
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 25,
                        marginRight: 12,
                      }}
                    />

                    {/* Client Info */}
                    <View style={{ flex: 1 }}>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          marginBottom: 4,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: "600",
                            color: colors.text.primary,
                            flex: 1,
                          }}
                        >
                          {client.name}
                        </Text>
                        <View
                          style={{
                            backgroundColor: status.color + "20",
                            paddingHorizontal: 8,
                            paddingVertical: 4,
                            borderRadius: 12,
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 12,
                              fontWeight: "500",
                              color: status.color,
                            }}
                          >
                            {status.label}
                          </Text>
                        </View>
                      </View>

                      <Text
                        style={{
                          fontSize: 14,
                          color: colors.text.secondary,
                          marginBottom: 2,
                        }}
                      >
                        {client.email}
                      </Text>

                      <Text
                        style={{
                          fontSize: 14,
                          color: colors.text.secondary,
                          marginBottom: 4,
                        }}
                      >
                        {client.phone}
                      </Text>

                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <Text
                          style={{
                            fontSize: 12,
                            color: colors.text.secondary,
                            marginRight: 16,
                          }}
                        >
                          {client.totalPurchases} compra
                          {client.totalPurchases !== 1 ? "s" : ""}
                        </Text>
                        <Text
                          style={{
                            fontSize: 12,
                            color: colors.text.secondary,
                          }}
                        >
                          Total: {client.totalValue}
                        </Text>
                      </View>
                    </View>

                    {/* Actions */}
                    <View style={{ alignItems: "flex-end" }}>
                      <TouchableOpacity
                        onPress={(e) => handleDeletePress(client.id, e)}
                        style={{
                          padding: 8,
                          borderRadius: 20,
                          backgroundColor: "rgba(255, 59, 48, 0.1)",
                        }}
                      >
                        <FontAwesome
                          name="trash"
                          size={16}
                          color={BrandColors.error}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })
          )}
        </View>
      </ScrollView>

      {/* Delete Confirmation Modal */}
      <Modal
        visible={deleteModalVisible}
        transparent
        animationType="fade"
        onRequestClose={cancelDelete}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: colors.card.background,
              borderRadius: 12,
              padding: 24,
              marginHorizontal: 32,
              borderWidth: 1,
              borderColor: colors.card.border,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "600",
                color: colors.text.primary,
                marginBottom: 8,
                textAlign: "center",
              }}
            >
              Excluir Cliente
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: colors.text.secondary,
                marginBottom: 24,
                textAlign: "center",
                lineHeight: 20,
              }}
            >
              Tem certeza que deseja excluir o cliente{" "}
              <Text style={{ fontWeight: "600" }}>{clientToDelete?.name}</Text>?
              Esta ação não pode ser desfeita.
            </Text>

            <View style={{ flexDirection: "row", gap: 12 }}>
              <TouchableOpacity
                onPress={cancelDelete}
                style={{
                  flex: 1,
                  paddingVertical: 12,
                  paddingHorizontal: 16,
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: colors.card.border,
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: colors.text.primary,
                    fontWeight: "500",
                  }}
                >
                  Cancelar
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={confirmDelete}
                style={{
                  flex: 1,
                  paddingVertical: 12,
                  paddingHorizontal: 16,
                  borderRadius: 8,
                  backgroundColor: BrandColors.error,
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: "white",
                    fontWeight: "500",
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
