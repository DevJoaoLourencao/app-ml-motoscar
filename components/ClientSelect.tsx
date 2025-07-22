import { useTheme } from "@/components/ThemeContext";
import { BrandColors } from "@/constants/BrandColors";
import { FontAwesome } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface Client {
  id: string;
  name: string;
  email?: string;
  phone?: string;
}

interface ClientSelectProps {
  value?: string;
  onSelect: (client: Client | null) => void;
  placeholder?: string;
  disabled?: boolean;
  onFocus?: () => void;
}

// Dados mockados de clientes - em produção viria da API
const mockClients: Client[] = [
  {
    id: "1",
    name: "João Silva",
    email: "joao@email.com",
    phone: "(11) 99999-9999",
  },
  {
    id: "2",
    name: "Maria Santos",
    email: "maria@email.com",
    phone: "(11) 88888-8888",
  },
  {
    id: "3",
    name: "Pedro Oliveira",
    email: "pedro@email.com",
    phone: "(11) 77777-7777",
  },
  {
    id: "4",
    name: "Ana Costa",
    email: "ana@email.com",
    phone: "(11) 66666-6666",
  },
  {
    id: "5",
    name: "Carlos Ferreira",
    email: "carlos@email.com",
    phone: "(11) 55555-5555",
  },
];

export function ClientSelect({
  value,
  onSelect,
  placeholder = "Selecionar cliente...",
  disabled = false,
  onFocus,
}: ClientSelectProps) {
  const { colors } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState("");

  const filteredClients = mockClients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchText.toLowerCase()) ||
      client.email?.toLowerCase().includes(searchText.toLowerCase()) ||
      client.phone?.includes(searchText)
  );

  const selectedClient = mockClients.find((client) => client.name === value);

  // Debug logs
  console.log("ClientSelect Debug:");
  console.log("modalVisible:", modalVisible);
  console.log("searchText:", searchText);
  console.log("filteredClients length:", filteredClients.length);
  console.log("mockClients length:", mockClients.length);

  const handlePress = () => {
    if (!disabled) {
      onFocus?.();
      setModalVisible(true);
    }
  };

  const handleClientSelect = (client: Client) => {
    onSelect(client);
    setModalVisible(false);
    setSearchText("");
  };

  return (
    <>
      <TouchableOpacity
        style={{
          backgroundColor: colors.card.background,
          borderRadius: 12,
          padding: 16,
          borderWidth: 1,
          borderColor: colors.card.border,
          opacity: disabled ? 0.5 : 1,
        }}
        onPress={handlePress}
        disabled={disabled}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flex: 1 }}>
            {selectedClient ? (
              <View>
                <Text
                  style={{
                    color: colors.text.primary,
                    fontSize: 16,
                    fontWeight: "500",
                  }}
                >
                  {selectedClient.name}
                </Text>
                {selectedClient.email && (
                  <Text
                    style={{
                      color: colors.text.secondary,
                      fontSize: 14,
                      marginTop: 2,
                    }}
                  >
                    {selectedClient.phone}
                  </Text>
                )}
              </View>
            ) : (
              <Text style={{ color: colors.text.secondary, fontSize: 16 }}>
                {placeholder}
              </Text>
            )}
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            {selectedClient && (
              <TouchableOpacity
                onPress={() => onSelect(null)}
                style={{
                  paddingVertical: 4,
                  paddingHorizontal: 6,
                  borderRadius: 20,
                  backgroundColor: colors.status.error + "20",
                }}
              >
                <FontAwesome
                  name="times"
                  size={14}
                  color={colors.status.error}
                />
              </TouchableOpacity>
            )}
            <FontAwesome
              name="chevron-down"
              size={16}
              color={colors.text.secondary}
            />
          </View>
        </View>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            justifyContent: "flex-end",
          }}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
        >
          <TouchableOpacity
            style={{
              backgroundColor: colors.background.primary,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              maxHeight: "90%",
              minHeight: 900,
            }}
            activeOpacity={1}
            onPress={() => {}} // Previne que o clique no conteúdo feche o modal
          >
            {/* Header */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                padding: 16,
                borderBottomWidth: 1,
                borderBottomColor: colors.border.light,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: colors.text.primary,
                }}
              >
                Selecionar Cliente
              </Text>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={{ padding: 8 }}
              >
                <FontAwesome
                  name="times"
                  size={20}
                  color={colors.text.secondary}
                />
              </TouchableOpacity>
            </View>

            {/* Option to add new client */}
            <View
              style={{
                padding: 16,
                borderBottomWidth: 1,
                borderBottomColor: colors.card.border,
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: BrandColors.primary,
                  borderRadius: 12,
                  padding: 16,
                  alignItems: "center",
                }}
                onPress={() => {
                  setModalVisible(false);
                  // TODO: Implementar navegação para adicionar novo cliente
                  console.log("Adicionar novo cliente");
                }}
              >
                <Text
                  style={{
                    color: colors.text.light,
                    fontSize: 16,
                    fontWeight: "600",
                  }}
                >
                  Adicionar Novo Cliente
                </Text>
              </TouchableOpacity>
            </View>

            {/* Search */}
            <View style={{ padding: 16 }}>
              <TextInput
                style={{
                  backgroundColor: colors.card.background,
                  borderRadius: 12,
                  padding: 16,
                  color: colors.text.primary,
                  borderWidth: 1,
                  borderColor: colors.card.border,
                  fontSize: 16,
                }}
                placeholder="Buscar cliente..."
                placeholderTextColor={colors.text.secondary}
                value={searchText}
                onChangeText={setSearchText}
              />
            </View>

            {/* Clients List */}
            <ScrollView
              style={{
                flex: 1,
                paddingHorizontal: 16,
                paddingBottom: 20,
              }}
            >
              {filteredClients.length > 0 ? (
                filteredClients.map((client) => (
                  <TouchableOpacity
                    key={client.id}
                    style={{
                      backgroundColor: colors.card.background,
                      borderRadius: 12,
                      padding: 16,
                      marginBottom: 8,
                      borderWidth: 1,
                      borderColor: colors.card.border,
                      flexDirection: "row",
                      alignItems: "flex-start",
                    }}
                    onPress={() => handleClientSelect(client)}
                  >
                    <View style={{ flex: 1 }}>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "600",
                          color: colors.text.primary,
                          marginBottom: 4,
                        }}
                      >
                        {client.name}
                      </Text>
                      {client.email && (
                        <Text
                          style={{
                            fontSize: 14,
                            color: colors.text.secondary,
                            marginBottom: 2,
                          }}
                        >
                          {client.email}
                        </Text>
                      )}
                      {client.phone && (
                        <Text
                          style={{ fontSize: 14, color: colors.text.secondary }}
                        >
                          {client.phone}
                        </Text>
                      )}
                    </View>
                    {value === client.name && (
                      <FontAwesome
                        name="check"
                        size={16}
                        color={BrandColors.primary}
                        style={{ marginLeft: 8, marginTop: 2 }}
                      />
                    )}
                  </TouchableOpacity>
                ))
              ) : (
                <View style={{ alignItems: "center", paddingVertical: 40 }}>
                  <FontAwesome
                    name="search"
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
                    Nenhum cliente encontrado
                  </Text>
                </View>
              )}
            </ScrollView>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </>
  );
}
