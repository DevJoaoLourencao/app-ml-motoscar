import { Header } from "@/components/Header";
import { useTheme } from "@/components/ThemeContext";
import React from "react";
import { ScrollView, Text, View } from "react-native";

export default function AddClientScreen() {
  const { colors } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: colors.background.secondary }}>
      {/* Header */}
      <Header
        leftContent={{
          type: "back",
          title: "Adicionar Cliente",
        }}
      />

      <ScrollView style={{ flex: 1 }}>
        <View style={{ padding: 16 }}>
          <Text style={{ color: colors.text.primary, fontSize: 16 }}>
            Tela de adicionar cliente em desenvolvimento...
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
