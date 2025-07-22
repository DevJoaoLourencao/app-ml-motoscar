import { Header } from "@/components/Header";
import { useTheme } from "@/components/ThemeContext";
import { BrandColors } from "@/constants/BrandColors";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
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
  phone: string;
  cpf: string;
  cep: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  createdAt: string;
}

export default function ClientsScreen() {
  const { colors } = useTheme();
  const [searchText, setSearchText] = useState("");
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [clientToDelete, setClientToDelete] = useState<Client | null>(null);

  // Simular dados da API
  const mockClients: Client[] = [
    {
      id: 1,
      name: "João Silva",
      phone: "(11) 99999-9999",
      cpf: "123.456.789-00",
      cep: "01234-567",
      street: "Rua das Flores",
      number: "123",
      complement: "Apto 45",
      neighborhood: "Centro",
      city: "São Paulo",
      state: "SP",
      createdAt: "15/12/2024",
    },
    {
      id: 2,
      name: "Maria Santos",
      phone: "(11) 88888-8888",
      cpf: "987.654.321-00",
      cep: "01310-100",
      street: "Av. Paulista",
      number: "456",
      neighborhood: "Bela Vista",
      city: "São Paulo",
      state: "SP",
      createdAt: "14/12/2024",
    },
    {
      id: 3,
      name: "Pedro Costa",
      phone: "(11) 77777-7777",
      cpf: "456.789.123-00",
      cep: "01305-000",
      street: "Rua Augusta",
      number: "789",
      neighborhood: "Consolação",
      city: "São Paulo",
      state: "SP",
      createdAt: "13/12/2024",
    },
    {
      id: 4,
      name: "Ana Oliveira",
      phone: "(11) 66666-6666",
      cpf: "789.123.456-00",
      cep: "01427-002",
      street: "Rua Oscar Freire",
      number: "321",
      complement: "Sala 10",
      neighborhood: "Jardins",
      city: "São Paulo",
      state: "SP",
      createdAt: "12/12/2024",
    },
    {
      id: 5,
      name: "Carlos Ferreira",
      phone: "(11) 55555-5555",
      cpf: "321.654.987-00",
      cep: "04538-132",
      street: "Av. Brigadeiro Faria Lima",
      number: "654",
      neighborhood: "Itaim Bibi",
      city: "São Paulo",
      state: "SP",
      createdAt: "11/12/2024",
    },
    {
      id: 6,
      name: "Lucia Martins",
      phone: "(11) 44444-4444",
      cpf: "654.321.987-00",
      cep: "01414-002",
      street: "Rua Haddock Lobo",
      number: "987",
      neighborhood: "Cerqueira César",
      city: "São Paulo",
      state: "SP",
      createdAt: "10/12/2024",
    },
  ];

  // Simular chamada da API
  useEffect(() => {
    const fetchClients = async () => {
      setLoading(true);
      try {
        // Simular delay da API
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setClients(mockClients);
      } catch (error) {
        console.error("Erro ao carregar clientes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  const handleClientPress = (clientId: number) => {
    router.push(`/client-details/${clientId}`);
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
          paddingVertical: 6,
          paddingHorizontal: 8,
        }}
        onPress={() => router.push("/add-client")}
      >
        <FontAwesome name="plus" size={20} color={colors.text.light} />
      </TouchableOpacity>
    </View>
  );

  const filteredClients = clients.filter((client) => {
    if (searchText) {
      const searchLower = searchText.toLowerCase();
      return (
        client.name.toLowerCase().includes(searchLower) ||
        client.phone.includes(searchText) ||
        client.cpf.includes(searchText)
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
            title: "Clientes",
          }}
          rightContent={<RightContent />}
        />
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color={BrandColors.primary} />
          <Text style={{ marginTop: 16, color: colors.text.secondary }}>
            Carregando clientes...
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
              placeholder="Buscar por nome, telefone ou CPF..."
              placeholderTextColor={colors.text.secondary}
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>
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
            filteredClients.map((client) => (
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
                  {/* Avatar Icon */}
                  <View
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 25,
                      backgroundColor: BrandColors.primary + "20",
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: 12,
                    }}
                  >
                    <FontAwesome
                      name="user"
                      size={24}
                      color={BrandColors.primary}
                    />
                  </View>

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
                    </View>

                    <Text
                      style={{
                        fontSize: 14,
                        color: colors.text.secondary,
                        marginBottom: 2,
                      }}
                    >
                      {client.cpf}
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
            ))
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
                  backgroundColor: colors.card.background,
                  borderRadius: 8,
                  paddingVertical: 12,
                  alignItems: "center",
                  borderWidth: 1,
                  borderColor: colors.card.border,
                }}
              >
                <Text
                  style={{
                    color: colors.text.primary,
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
                  backgroundColor: BrandColors.error,
                  borderRadius: 8,
                  paddingVertical: 12,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: colors.text.light,
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
