import { useTheme } from "@/components/ThemeContext";
import { BrandColors } from "@/constants/BrandColors";
import { FontAwesome } from "@expo/vector-icons";
import React, { useState } from "react";
import { Control, Controller, FieldError } from "react-hook-form";
import {
  FlatList,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface CitySelectProps {
  control: Control<any>;
  name: string;
  label?: string;
  placeholder?: string;
  error?: FieldError;
  required?: boolean;
  onFocus?: () => void;
  selectedState?: string;
}

// Lista de cidades principais por estado (você pode expandir conforme necessário)
const citiesByState: { [key: string]: string[] } = {
  "São Paulo": [
    "São Paulo",
    "Campinas",
    "Santos",
    "Ribeirão Preto",
    "Sorocaba",
    "São José dos Campos",
    "Mogi das Cruzes",
    "Piracicaba",
    "Bauru",
    "Jundiaí",
    "Franca",
    "Limeira",
    "Araraquara",
    "Taubaté",
    "Itaquaquecetuba",
    "Guarulhos",
    "Osasco",
    "Santo André",
    "São Bernardo do Campo",
    "São Caetano do Sul",
  ],
  "Rio de Janeiro": [
    "Rio de Janeiro",
    "Niterói",
    "Petrópolis",
    "Nova Iguaçu",
    "Duque de Caxias",
    "São Gonçalo",
    "Belford Roxo",
    "Campos dos Goytacazes",
    "Volta Redonda",
    "Macaé",
    "Cabo Frio",
    "Angra dos Reis",
    "Barra Mansa",
    "Nova Friburgo",
    "Teresópolis",
    "Magé",
    "Itaboraí",
    "São João de Meriti",
    "Queimados",
    "Japeri",
  ],
  "Minas Gerais": [
    "Belo Horizonte",
    "Uberlândia",
    "Contagem",
    "Juiz de Fora",
    "Betim",
    "Montes Claros",
    "Ribeirão das Neves",
    "Uberaba",
    "Governador Valadares",
    "Ipatinga",
    "Sete Lagoas",
    "Divinópolis",
    "Santa Luzia",
    "Ibirité",
    "Poços de Caldas",
    "Pouso Alegre",
    "Patos de Minas",
    "Lavras",
    "Itabira",
    "Araguari",
  ],
  Bahia: [
    "Salvador",
    "Feira de Santana",
    "Vitória da Conquista",
    "Camaçari",
    "Itabuna",
    "Lauro de Freitas",
    "Ilhéus",
    "Jequié",
    "Alagoinhas",
    "Barreiras",
    "Porto Seguro",
    "Simões Filho",
    "Paulo Afonso",
    "Eunápolis",
    "Santo Antônio de Jesus",
    "Valença",
    "Candeias",
    "Tucano",
    "Senhor do Bonfim",
    "Itamaraju",
  ],
  Paraná: [
    "Curitiba",
    "Londrina",
    "Maringá",
    "Ponta Grossa",
    "Cascavel",
    "São José dos Pinhais",
    "Foz do Iguaçu",
    "Colombo",
    "Guarapuava",
    "Paranaguá",
    "Araucária",
    "Toledo",
    "Apucarana",
    "Pinhais",
    "Campo Largo",
    "Arapongas",
    "Almirante Tamandaré",
    "Umuarama",
    "Cambé",
    "Piraquara",
  ],
  "Rio Grande do Sul": [
    "Porto Alegre",
    "Caxias do Sul",
    "Pelotas",
    "Canoas",
    "Santa Maria",
    "Gravataí",
    "Viamão",
    "Novo Hamburgo",
    "São Leopoldo",
    "Rio Grande",
    "Alvorada",
    "Passo Fundo",
    "Sapucaia do Sul",
    "Uruguaiana",
    "Santa Cruz do Sul",
    "Cachoeirinha",
    "Bagé",
    "Bento Gonçalves",
    "Erechim",
    "Guaíba",
  ],
  "Santa Catarina": [
    "Florianópolis",
    "Joinville",
    "Blumenau",
    "São José",
    "Criciúma",
    "Itajaí",
    "Lages",
    "Jaraguá do Sul",
    "Palhoça",
    "Balneário Camboriú",
    "Brusque",
    "Tubarão",
    "Camboriú",
    "Chapecó",
    "São Francisco do Sul",
    "Itapema",
    "Imbituba",
    "Navegantes",
    "Araranguá",
    "Concórdia",
  ],
  Goiás: [
    "Goiânia",
    "Aparecida de Goiânia",
    "Anápolis",
    "Rio Verde",
    "Luziânia",
    "Águas Lindas de Goiás",
    "Valparaíso de Goiás",
    "Trindade",
    "Formosa",
    "Novo Gama",
    "Senador Canedo",
    "Itumbiara",
    "Catalão",
    "Jataí",
    "Santo Antônio do Descoberto",
    "Caldas Novas",
    "Goianésia",
    "Mineiros",
    "Morrinhos",
    "Pirenópolis",
  ],
  Pernambuco: [
    "Recife",
    "Jaboatão dos Guararapes",
    "Olinda",
    "Caruaru",
    "Petrolina",
    "Paulista",
    "Cabo de Santo Agostinho",
    "Camaragibe",
    "Garanhuns",
    "Vitória de Santo Antão",
    "Igarassu",
    "São Lourenço da Mata",
    "Abreu e Lima",
    "Ipojuca",
    "Escada",
    "Goiana",
    "Moreno",
    "Bezerros",
    "São José do Egito",
    "Belo Jardim",
  ],
  Ceará: [
    "Fortaleza",
    "Caucaia",
    "Juazeiro do Norte",
    "Maracanaú",
    "Sobral",
    "Crato",
    "Itapipoca",
    "Maranguape",
    "Iguatu",
    "Quixadá",
    "Canindé",
    "Crateús",
    "Aquiraz",
    "Pacatuba",
    "Quixeramobim",
    "Aracati",
    "Pacajus",
    "Russas",
    "Tianguá",
    "Camocim",
  ],
};

export function CitySelect({
  control,
  name,
  label = "Cidade",
  placeholder = "Selecione a cidade...",
  error,
  required = false,
  onFocus,
  selectedState,
}: CitySelectProps) {
  const { colors } = useTheme();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchText, setSearchText] = useState("");

  const availableCities = selectedState
    ? citiesByState[selectedState] || []
    : [];
  const filteredCities = availableCities.filter((city) =>
    city.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View>
      <Text
        style={{
          color: colors.text.primary,
          marginBottom: 8,
          fontWeight: "600",
        }}
      >
        {label} {required && "*"}
      </Text>

      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <>
            <TouchableOpacity
              style={{
                backgroundColor: colors.card.background,
                borderRadius: 12,
                padding: 16,
                borderWidth: 1,
                borderColor: error ? colors.status.error : colors.card.border,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                opacity: !selectedState ? 0.5 : 1,
              }}
              onPress={() => {
                if (selectedState) {
                  onFocus?.();
                  setIsModalVisible(true);
                }
              }}
              disabled={!selectedState}
            >
              <Text
                style={{
                  color: value ? colors.text.primary : colors.text.secondary,
                  flex: 1,
                }}
              >
                {value || placeholder}
              </Text>
              <FontAwesome
                name="chevron-down"
                size={16}
                color={colors.text.secondary}
              />
            </TouchableOpacity>

            <Modal
              visible={isModalVisible}
              animationType="slide"
              transparent={true}
              onRequestClose={() => setIsModalVisible(false)}
            >
              <TouchableOpacity
                style={{
                  flex: 1,
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  justifyContent: "flex-end",
                }}
                activeOpacity={1}
                onPress={() => setIsModalVisible(false)}
              >
                <TouchableOpacity
                  style={{
                    backgroundColor: colors.background.primary,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    maxHeight: "80%",
                  }}
                  activeOpacity={1}
                  onPress={() => {}}
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
                      Selecionar Cidade
                    </Text>
                    <TouchableOpacity
                      onPress={() => setIsModalVisible(false)}
                      style={{ padding: 8 }}
                    >
                      <FontAwesome
                        name="times"
                        size={20}
                        color={colors.text.secondary}
                      />
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
                      placeholder="Buscar cidade..."
                      placeholderTextColor={colors.text.secondary}
                      value={searchText}
                      onChangeText={setSearchText}
                    />
                  </View>

                  {/* Cities List */}
                  <FlatList
                    data={filteredCities}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={{
                          padding: 16,
                          borderBottomWidth: 1,
                          borderBottomColor: colors.border.light,
                          backgroundColor:
                            value === item
                              ? BrandColors.primary + "20"
                              : "transparent",
                        }}
                        onPress={() => {
                          onChange(item);
                          setIsModalVisible(false);
                          setSearchText("");
                        }}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 16,
                              color: colors.text.primary,
                            }}
                          >
                            {item}
                          </Text>
                          {value === item && (
                            <FontAwesome
                              name="check"
                              size={16}
                              color={BrandColors.primary}
                            />
                          )}
                        </View>
                      </TouchableOpacity>
                    )}
                    ListEmptyComponent={
                      <View
                        style={{ alignItems: "center", paddingVertical: 40 }}
                      >
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
                          Nenhuma cidade encontrada
                        </Text>
                      </View>
                    }
                  />
                </TouchableOpacity>
              </TouchableOpacity>
            </Modal>
          </>
        )}
      />

      {error && (
        <Text
          style={{ color: colors.status.error, fontSize: 12, marginTop: 4 }}
        >
          {error.message}
        </Text>
      )}
    </View>
  );
}
