import { BrandColors } from "@/constants/BrandColors";
import { FontAwesome } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { Platform, Text, TouchableOpacity, View } from "react-native";

export default function ModalScreen() {
  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="bg-red-600 pt-12 pb-6 px-4">
        <View className="flex-row items-center justify-between">
          <Text className="text-white text-2xl font-bold">Sobre o App</Text>
          <TouchableOpacity className="bg-white/20 rounded-full p-2">
            <FontAwesome name="times" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      <View className="flex-1 px-4 py-6">
        <View className="bg-gray-50 rounded-xl p-6 mb-6">
          <View className="bg-red-100 rounded-lg p-4 mb-4 items-center">
            <FontAwesome
              name="motorcycle"
              size={40}
              color={BrandColors.primary}
            />
          </View>
          <Text className="text-2xl font-bold text-gray-800 mb-2 text-center">
            ML Motoscar
          </Text>
          <Text className="text-gray-600 text-center mb-4">
            Sua moto, nossa paixão
          </Text>
          <Text className="text-gray-700 text-center leading-6">
            Descubra as melhores motos com tecnologia de ponta e inteligência
            artificial. Nosso app utiliza machine learning para recomendar a
            moto perfeita para você.
          </Text>
        </View>

        {/* Features */}
        <View className="space-y-4">
          <View className="bg-white rounded-xl p-4 border border-gray-200">
            <View className="flex-row items-center">
              <View className="bg-red-100 rounded-lg p-3 mr-4">
                <FontAwesome
                  name="search"
                  size={20}
                  color={BrandColors.primary}
                />
              </View>
              <View className="flex-1">
                <Text className="font-semibold text-gray-800 mb-1">
                  Busca Inteligente
                </Text>
                <Text className="text-gray-600 text-sm">
                  Encontre sua moto ideal com IA
                </Text>
              </View>
            </View>
          </View>

          <View className="bg-white rounded-xl p-4 border border-gray-200">
            <View className="flex-row items-center">
              <View className="bg-gray-100 rounded-lg p-3 mr-4">
                <FontAwesome
                  name="calculator"
                  size={20}
                  color={BrandColors.gray600}
                />
              </View>
              <View className="flex-1">
                <Text className="font-semibold text-gray-800 mb-1">
                  Comparações
                </Text>
                <Text className="text-gray-600 text-sm">
                  Compare modelos lado a lado
                </Text>
              </View>
            </View>
          </View>

          <View className="bg-white rounded-xl p-4 border border-gray-200">
            <View className="flex-row items-center">
              <View className="bg-red-100 rounded-lg p-3 mr-4">
                <FontAwesome
                  name="star"
                  size={20}
                  color={BrandColors.primary}
                />
              </View>
              <View className="flex-1">
                <Text className="font-semibold text-gray-800 mb-1">
                  Favoritos
                </Text>
                <Text className="text-gray-600 text-sm">
                  Salve suas motos preferidas
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Version Info */}
        <View className="mt-8 bg-gray-50 rounded-xl p-4">
          <Text className="text-gray-500 text-center text-sm">
            Versão 1.0.0 • ML Motoscar © 2024
          </Text>
        </View>
      </View>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}
