import { FontAwesome } from "@expo/vector-icons";
import * as ExpoImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import React, { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "./ThemeContext";

interface VehicleImagePickerProps {
  images: string[];
  onImagesChange: (images: string[]) => void;
  maxImages?: number;
  label?: string;
  required?: boolean;
  error?: string;
  onFocus?: () => void;
}

export const VehicleImagePicker: React.FC<VehicleImagePickerProps> = ({
  images,
  onImagesChange,
  maxImages = 10,
  label = "Imagens do Veículo",
  required = false,
  error,
  onFocus,
}) => {
  const { colors } = useTheme();
  const [loading, setLoading] = useState(false);

  const requestPermissions = async () => {
    const { status: cameraStatus } =
      await ExpoImagePicker.requestCameraPermissionsAsync();
    const { status: mediaStatus } =
      await MediaLibrary.requestPermissionsAsync();

    if (cameraStatus !== "granted" || mediaStatus !== "granted") {
      Alert.alert(
        "Permissões Necessárias",
        "É necessário conceder permissões para câmera e galeria para adicionar imagens."
      );
      return false;
    }
    return true;
  };

  const pickImages = async () => {
    if (images.length >= maxImages) {
      Alert.alert(
        "Limite de Imagens",
        `Você pode adicionar no máximo ${maxImages} imagens.`
      );
      return;
    }

    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    setLoading(true);

    try {
      const result = await ExpoImagePicker.launchImageLibraryAsync({
        mediaTypes: ExpoImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        quality: 0.8,
        aspect: [4, 3],
        allowsEditing: false,
        selectionLimit: maxImages - images.length,
      });

      if (!result.canceled && result.assets) {
        const newImages = result.assets.map((asset: any) => asset.uri);
        onImagesChange([...images, ...newImages]);
      }
    } catch (error) {
      console.error("Erro ao selecionar imagens:", error);
      Alert.alert(
        "Erro",
        "Não foi possível selecionar as imagens. Tente novamente."
      );
    } finally {
      setLoading(false);
    }
  };

  const takePhoto = async () => {
    if (images.length >= maxImages) {
      Alert.alert(
        "Limite de Imagens",
        `Você pode adicionar no máximo ${maxImages} imagens.`
      );
      return;
    }

    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    setLoading(true);

    try {
      const result = await ExpoImagePicker.launchCameraAsync({
        mediaTypes: ExpoImagePicker.MediaTypeOptions.Images,
        quality: 0.8,
        aspect: [4, 3],
        allowsEditing: true,
      });

      if (!result.canceled && result.assets && result.assets[0]) {
        const newImage = result.assets[0].uri;
        onImagesChange([...images, newImage]);
      }
    } catch (error) {
      console.error("Erro ao tirar foto:", error);
      Alert.alert("Erro", "Não foi possível tirar a foto. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onImagesChange(newImages);
  };

  const showImageOptions = () => {
    onFocus?.();
    Alert.alert(
      "Adicionar Imagem",
      "Como você gostaria de adicionar uma imagem?",
      [
        {
          text: "Tirar Foto",
          onPress: takePhoto,
        },
        {
          text: "Escolher da Galeria",
          onPress: pickImages,
        },
        {
          text: "Cancelar",
          style: "cancel",
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={[styles.label, { color: colors.text.primary }]}>
          {label}
          {required && <Text style={{ color: colors.status.error }}> *</Text>}
        </Text>
        <Text style={[styles.counter, { color: colors.text.secondary }]}>
          {images.length}/{maxImages}
        </Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.imageContainer}
        contentContainerStyle={styles.imageContent}
      >
        {images.map((image, index) => (
          <View key={index} style={styles.imageWrapper}>
            <Image source={{ uri: image }} style={styles.image} />
            <TouchableOpacity
              style={[
                styles.removeButton,
                { backgroundColor: colors.status.error },
              ]}
              onPress={() => removeImage(index)}
            >
              <FontAwesome name="times" size={12} color="white" />
            </TouchableOpacity>
          </View>
        ))}

        {images.length < maxImages && (
          <TouchableOpacity
            style={[
              styles.addButton,
              {
                backgroundColor: colors.card.background,
                borderColor: colors.card.border,
              },
            ]}
            onPress={showImageOptions}
            disabled={loading}
          >
            {loading ? (
              <FontAwesome
                name="spinner"
                size={24}
                color={colors.text.secondary}
              />
            ) : (
              <>
                <FontAwesome
                  name="plus"
                  size={24}
                  color={colors.text.secondary}
                />
                <Text
                  style={[
                    styles.addButtonText,
                    { color: colors.text.secondary },
                  ]}
                >
                  Adicionar
                </Text>
              </>
            )}
          </TouchableOpacity>
        )}
      </ScrollView>

      {error && (
        <Text style={[styles.errorText, { color: colors.status.error }]}>
          {error}
        </Text>
      )}

      {images.length === 0 && !error && (
        <Text style={[styles.helperText, { color: colors.text.secondary }]}>
          Adicione fotos do veículo para melhorar a apresentação
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  labelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
  },
  counter: {
    fontSize: 14,
  },
  imageContainer: {
    maxHeight: 120,
  },
  imageContent: {
    paddingRight: 16,
  },
  imageWrapper: {
    position: "relative",
    marginRight: 12,
    marginTop: 8,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 12,
  },
  removeButton: {
    position: "absolute",
    top: -8,
    right: -8,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  addButton: {
    width: 100,
    height: 100,
    borderRadius: 12,
    borderWidth: 2,
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    marginTop: 8,
  },
  addButtonText: {
    fontSize: 12,
    marginTop: 4,
    textAlign: "center",
  },
  errorText: {
    fontSize: 12,
    marginTop: 4,
  },
  helperText: {
    fontSize: 12,
    marginTop: 12,
    fontStyle: "italic",
  },
});
