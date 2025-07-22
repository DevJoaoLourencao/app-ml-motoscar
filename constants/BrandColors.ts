// ML Motoscar Brand Colors
export const BrandColors = {
  // Primary Colors
  primary: "#CC0000", // Vermelho principal da marca
  primaryLight: "#FF3333", // Vermelho mais claro
  primaryDark: "#990000", // Vermelho mais escuro

  // Neutral Colors
  white: "#FFFFFF", // Branco puro
  black: "#000000", // Preto puro

  // Gray Scale
  gray50: "#FAFAFA", // Cinza muito claro
  gray100: "#F5F5F5", // Cinza claro
  gray200: "#EEEEEE", // Cinza médio claro
  gray300: "#E0E0E0", // Cinza médio
  gray400: "#BDBDBD", // Cinza médio escuro
  gray500: "#9E9E9E", // Cinza padrão
  gray600: "#757575", // Cinza escuro
  gray700: "#616161", // Cinza muito escuro
  gray800: "#424242", // Cinza quase preto
  gray900: "#212121", // Cinza preto

  // Semantic Colors
  success: "#4CAF50", // Verde para sucesso
  warning: "#FF9800", // Laranja para avisos
  error: "#F44336", // Vermelho para erros
  info: "#2196F3", // Azul para informações

  // Background Colors
  background: {
    primary: "#FFFFFF", // Fundo principal (branco)
    secondary: "#F5F5F5", // Fundo secundário (cinza claro)
    dark: "#000000", // Fundo escuro (preto)
    card: "#FFFFFF", // Fundo de cards
  },

  // Text Colors
  text: {
    primary: "#000000", // Texto principal (preto)
    secondary: "#757575", // Texto secundário (cinza)
    light: "#FFFFFF", // Texto claro (branco)
    muted: "#9E9E9E", // Texto suave (cinza)
    brand: "#CC0000", // Texto da marca (vermelho)
  },

  // Border Colors
  border: {
    light: "#E0E0E0", // Borda clara
    medium: "#BDBDBD", // Borda média
    dark: "#757575", // Borda escura
  },

  // Shadow Colors
  shadow: {
    light: "rgba(0, 0, 0, 0.1)",
    medium: "rgba(0, 0, 0, 0.2)",
    dark: "rgba(0, 0, 0, 0.3)",
  },

  // Gradient Colors
  gradients: {
    primary: ["#CC0000", "#FF3333"], // Gradiente vermelho
    dark: ["#000000", "#424242"], // Gradiente escuro
    light: ["#FFFFFF", "#F5F5F5"], // Gradiente claro
    brand: ["#CC0000", "#990000"], // Gradiente da marca
  },

  // Status Colors
  status: {
    online: "#4CAF50", // Online/Disponível
    offline: "#9E9E9E", // Offline/Indisponível
    maintenance: "#FF9800", // Manutenção
    error: "#F44336", // Erro
  },
};

// Theme configurations
export const LightTheme = {
  // Backgrounds
  background: {
    primary: BrandColors.white,
    secondary: BrandColors.gray50,
    card: BrandColors.white,
    header: BrandColors.primary,
    tabBar: BrandColors.white,
  },

  // Text colors
  text: {
    primary: BrandColors.black,
    secondary: BrandColors.gray600,
    light: BrandColors.white,
    muted: BrandColors.gray500,
    brand: BrandColors.primary,
  },

  // UI Elements
  tint: BrandColors.primary,
  tabIconDefault: BrandColors.gray400,
  tabIconSelected: BrandColors.primary,

  // Borders
  border: {
    light: BrandColors.gray200,
    medium: BrandColors.gray300,
    dark: BrandColors.gray400,
  },

  // Cards and containers
  card: {
    background: BrandColors.white,
    border: BrandColors.gray200,
    shadow: BrandColors.shadow.light,
  },

  // Buttons
  button: {
    primary: {
      background: BrandColors.primary,
      text: BrandColors.white,
    },
    secondary: {
      background: BrandColors.gray100,
      text: BrandColors.gray700,
    },
    outline: {
      background: "transparent",
      border: BrandColors.primary,
      text: BrandColors.primary,
    },
  },

  // Input fields
  input: {
    background: BrandColors.gray100,
    border: BrandColors.gray300,
    text: BrandColors.black,
    placeholder: BrandColors.gray500,
  },

  // Status indicators
  status: {
    success: BrandColors.success,
    warning: BrandColors.warning,
    error: BrandColors.error,
    info: BrandColors.info,
  },
};

export const DarkTheme = {
  // Backgrounds
  background: {
    primary: BrandColors.black,
    secondary: BrandColors.gray900,
    card: BrandColors.gray800,
    header: BrandColors.primary,
    tabBar: BrandColors.gray900,
  },

  // Text colors
  text: {
    primary: BrandColors.white,
    secondary: BrandColors.gray300,
    light: BrandColors.white,
    muted: BrandColors.gray500,
    brand: BrandColors.primary,
  },

  // UI Elements
  tint: BrandColors.primary,
  tabIconDefault: BrandColors.gray600,
  tabIconSelected: BrandColors.primary,

  // Borders
  border: {
    light: BrandColors.gray700,
    medium: BrandColors.gray600,
    dark: BrandColors.gray500,
  },

  // Cards and containers
  card: {
    background: BrandColors.gray800,
    border: BrandColors.gray700,
    shadow: BrandColors.shadow.dark,
  },

  // Buttons
  button: {
    primary: {
      background: BrandColors.primary,
      text: BrandColors.white,
    },
    secondary: {
      background: BrandColors.gray700,
      text: BrandColors.white,
    },
    outline: {
      background: "transparent",
      border: BrandColors.primary,
      text: BrandColors.primary,
    },
  },

  // Input fields
  input: {
    background: BrandColors.gray800,
    border: BrandColors.gray600,
    text: BrandColors.white,
    placeholder: BrandColors.gray500,
  },

  // Status indicators
  status: {
    success: BrandColors.success,
    warning: BrandColors.warning,
    error: BrandColors.error,
    info: BrandColors.info,
  },
};

export default BrandColors;
