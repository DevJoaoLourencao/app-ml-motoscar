import { Header } from "@/components/Header";
import { useTheme } from "@/components/ThemeContext";
import { ThemeToggle } from "@/components/ThemeToggle";
import { BrandColors } from "@/constants/BrandColors";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { ScrollView, Switch, Text, TouchableOpacity, View } from "react-native";

export default function SettingsScreen() {
  const { colors } = useTheme();

  const handleNotificationPress = () => {
    // Lógica para notificações
    console.log("Notificações pressionadas");
  };

  const handleProfilePress = () => {
    // Lógica para perfil
    console.log("Perfil pressionado");
  };

  const handleBackPress = () => {
    router.back();
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
        onPress={handleProfilePress}
      >
        <FontAwesome name="user" size={20} color={colors.text.light} />
      </TouchableOpacity>
      <ThemeToggle size="medium" variant="icon" />
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.background.secondary }}>
      {/* Header */}
      <Header
        leftContent={{
          type: "back",
          title: "Configurações",
          onBackPress: handleBackPress,
        }}
        rightContent={<RightContent />}
      />

      <ScrollView style={{ flex: 1 }}>
        {/* Theme Section */}
        <View style={{ paddingHorizontal: 16, paddingVertical: 24 }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: colors.text.primary,
              marginBottom: 16,
            }}
          >
            Aparência
          </Text>

          <View
            style={{
              backgroundColor: colors.card.background,
              borderRadius: 16,
              padding: 20,
              shadowColor: colors.card.shadow,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              borderWidth: 1,
              borderColor: colors.card.border,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                color: colors.text.primary,
                marginBottom: 12,
              }}
            >
              Tema do Aplicativo
            </Text>

            <View style={{ marginBottom: 16 }}>
              <Text
                style={{
                  color: colors.text.secondary,
                  fontSize: 14,
                  marginBottom: 8,
                }}
              >
                Escolha entre tema claro e escuro
              </Text>

              {/* Theme Toggle Variants */}
              <View style={{ gap: 12 }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingVertical: 8,
                  }}
                >
                  <Text style={{ color: colors.text.primary, fontSize: 14 }}>
                    Botão de Ícone
                  </Text>
                  <ThemeToggle size="small" variant="icon" />
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingVertical: 8,
                  }}
                >
                  <Text style={{ color: colors.text.primary, fontSize: 14 }}>
                    Botão Completo
                  </Text>
                  <ThemeToggle size="medium" variant="button" />
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingVertical: 8,
                  }}
                >
                  <Text style={{ color: colors.text.primary, fontSize: 14 }}>
                    Botão com Texto
                  </Text>
                  <ThemeToggle size="large" variant="full" />
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Notifications Section */}
        <View style={{ paddingHorizontal: 16, marginBottom: 24 }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: colors.text.primary,
              marginBottom: 16,
            }}
          >
            Notificações
          </Text>

          <View
            style={{
              backgroundColor: colors.card.background,
              borderRadius: 16,
              padding: 20,
              shadowColor: colors.card.shadow,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              borderWidth: 1,
              borderColor: colors.card.border,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 16,
              }}
            >
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                    color: colors.text.primary,
                  }}
                >
                  Notificações Push
                </Text>
                <Text
                  style={{
                    color: colors.text.secondary,
                    fontSize: 14,
                  }}
                >
                  Receba alertas sobre novas motos
                </Text>
              </View>
              <Switch
                value={true}
                onValueChange={() => {}}
                trackColor={{
                  false: colors.border.light,
                  true: BrandColors.primary,
                }}
                thumbColor={colors.text.light}
              />
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 16,
              }}
            >
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                    color: colors.text.primary,
                  }}
                >
                  Notificações por Email
                </Text>
                <Text
                  style={{
                    color: colors.text.secondary,
                    fontSize: 14,
                  }}
                >
                  Receba atualizações por email
                </Text>
              </View>
              <Switch
                value={false}
                onValueChange={() => {}}
                trackColor={{
                  false: colors.border.light,
                  true: BrandColors.primary,
                }}
                thumbColor={colors.text.light}
              />
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                    color: colors.text.primary,
                  }}
                >
                  Notificações de Promoções
                </Text>
                <Text
                  style={{
                    color: colors.text.secondary,
                    fontSize: 14,
                  }}
                >
                  Receba ofertas especiais
                </Text>
              </View>
              <Switch
                value={true}
                onValueChange={() => {}}
                trackColor={{
                  false: colors.border.light,
                  true: BrandColors.primary,
                }}
                thumbColor={colors.text.light}
              />
            </View>
          </View>
        </View>

        {/* Account Section */}
        <View style={{ paddingHorizontal: 16, marginBottom: 24 }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: colors.text.primary,
              marginBottom: 16,
            }}
          >
            Conta
          </Text>

          <View
            style={{
              backgroundColor: colors.card.background,
              borderRadius: 16,
              shadowColor: colors.card.shadow,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              borderWidth: 1,
              borderColor: colors.card.border,
            }}
          >
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 20,
                borderBottomWidth: 1,
                borderBottomColor: colors.border.light,
              }}
            >
              <View
                style={{
                  backgroundColor: BrandColors.gray100,
                  borderRadius: 8,
                  padding: 12,
                  marginRight: 16,
                }}
              >
                <FontAwesome
                  name="user"
                  size={20}
                  color={BrandColors.primary}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                    color: colors.text.primary,
                  }}
                >
                  Perfil
                </Text>
                <Text
                  style={{
                    color: colors.text.secondary,
                    fontSize: 14,
                  }}
                >
                  Editar informações pessoais
                </Text>
              </View>
              <FontAwesome
                name="chevron-right"
                size={16}
                color={colors.text.secondary}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 20,
                borderBottomWidth: 1,
                borderBottomColor: colors.border.light,
              }}
            >
              <View
                style={{
                  backgroundColor: BrandColors.gray100,
                  borderRadius: 8,
                  padding: 12,
                  marginRight: 16,
                }}
              >
                <FontAwesome
                  name="lock"
                  size={20}
                  color={BrandColors.gray600}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                    color: colors.text.primary,
                  }}
                >
                  Segurança
                </Text>
                <Text
                  style={{
                    color: colors.text.secondary,
                    fontSize: 14,
                  }}
                >
                  Alterar senha e configurações de segurança
                </Text>
              </View>
              <FontAwesome
                name="chevron-right"
                size={16}
                color={colors.text.secondary}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 20,
              }}
            >
              <View
                style={{
                  backgroundColor: BrandColors.gray100,
                  borderRadius: 8,
                  padding: 12,
                  marginRight: 16,
                }}
              >
                <FontAwesome
                  name="credit-card"
                  size={20}
                  color={BrandColors.gray600}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                    color: colors.text.primary,
                  }}
                >
                  Pagamentos
                </Text>
                <Text
                  style={{
                    color: colors.text.secondary,
                    fontSize: 14,
                  }}
                >
                  Gerenciar métodos de pagamento
                </Text>
              </View>
              <FontAwesome
                name="chevron-right"
                size={16}
                color={colors.text.secondary}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Support Section */}
        <View style={{ paddingHorizontal: 16, marginBottom: 24 }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: colors.text.primary,
              marginBottom: 16,
            }}
          >
            Suporte
          </Text>

          <View
            style={{
              backgroundColor: colors.card.background,
              borderRadius: 16,
              shadowColor: colors.card.shadow,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              borderWidth: 1,
              borderColor: colors.card.border,
            }}
          >
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 20,
                borderBottomWidth: 1,
                borderBottomColor: colors.border.light,
              }}
            >
              <View
                style={{
                  backgroundColor: BrandColors.gray100,
                  borderRadius: 8,
                  padding: 12,
                  marginRight: 16,
                }}
              >
                <FontAwesome
                  name="question-circle"
                  size={20}
                  color={BrandColors.gray600}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                    color: colors.text.primary,
                  }}
                >
                  Central de Ajuda
                </Text>
                <Text
                  style={{
                    color: colors.text.secondary,
                    fontSize: 14,
                  }}
                >
                  Perguntas frequentes e tutoriais
                </Text>
              </View>
              <FontAwesome
                name="chevron-right"
                size={16}
                color={colors.text.secondary}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 20,
                borderBottomWidth: 1,
                borderBottomColor: colors.border.light,
              }}
            >
              <View
                style={{
                  backgroundColor: BrandColors.gray100,
                  borderRadius: 8,
                  padding: 12,
                  marginRight: 16,
                }}
              >
                <FontAwesome
                  name="envelope"
                  size={20}
                  color={BrandColors.gray600}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                    color: colors.text.primary,
                  }}
                >
                  Contatar Suporte
                </Text>
                <Text
                  style={{
                    color: colors.text.secondary,
                    fontSize: 14,
                  }}
                >
                  Entre em contato conosco
                </Text>
              </View>
              <FontAwesome
                name="chevron-right"
                size={16}
                color={colors.text.secondary}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 20,
              }}
            >
              <View
                style={{
                  backgroundColor: BrandColors.gray100,
                  borderRadius: 8,
                  padding: 12,
                  marginRight: 16,
                }}
              >
                <FontAwesome
                  name="info-circle"
                  size={20}
                  color={BrandColors.gray600}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                    color: colors.text.primary,
                  }}
                >
                  Sobre o App
                </Text>
                <Text
                  style={{
                    color: colors.text.secondary,
                    fontSize: 14,
                  }}
                >
                  Versão 1.0.0
                </Text>
              </View>
              <FontAwesome
                name="chevron-right"
                size={16}
                color={colors.text.secondary}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Logout Section */}
        <View style={{ paddingHorizontal: 16, paddingBottom: 32 }}>
          <TouchableOpacity
            style={{
              backgroundColor: colors.status.error,
              borderRadius: 16,
              padding: 20,
              alignItems: "center",
              shadowColor: colors.card.shadow,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              borderWidth: 1,
              borderColor: colors.status.error,
            }}
          >
            <FontAwesome
              name="sign-out"
              size={20}
              color={colors.text.light}
              style={{ marginBottom: 8 }}
            />
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                color: colors.text.light,
              }}
            >
              Sair da Conta
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
