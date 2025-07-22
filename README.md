# 🎨 Cores da Marca - ML Motoscar

Este diretório contém a configuração de cores da marca ML Motoscar.

## 📁 Arquivos

- `BrandColors.ts` - Configuração principal das cores da marca
- `Colors.ts` - Configuração de temas (light/dark) usando as cores da marca
- `ColorUsage.tsx` - Exemplos de uso das cores em componentes

## 🎯 Cores Principais

### Vermelho da Marca
- **Primary**: `#CC0000` - Vermelho principal da marca
- **Light**: `#FF3333` - Vermelho mais claro
- **Dark**: `#990000` - Vermelho mais escuro

### Cores Neutras
- **White**: `#FFFFFF` - Branco puro
- **Black**: `#000000` - Preto puro

### Escala de Cinzas
- **Gray50**: `#FAFAFA` - Cinza muito claro
- **Gray100**: `#F5F5F5` - Cinza claro
- **Gray200**: `#EEEEEE` - Cinza médio claro
- **Gray300**: `#E0E0E0` - Cinza médio
- **Gray400**: `#BDBDBD` - Cinza médio escuro
- **Gray500**: `#9E9E9E` - Cinza padrão
- **Gray600**: `#757575` - Cinza escuro
- **Gray700**: `#616161` - Cinza muito escuro
- **Gray800**: `#424242` - Cinza quase preto
- **Gray900**: `#212121` - Cinza preto

## 🚀 Como Usar

### Importação Básica
```typescript
import { BrandColors } from '@/constants/BrandColors';
```

### Uso em Componentes
```typescript
// Botão primário
<TouchableOpacity style={{ backgroundColor: BrandColors.primary }}>
  <Text style={{ color: BrandColors.white }}>Botão</Text>
</TouchableOpacity>

// Texto da marca
<Text style={{ color: BrandColors.text.brand }}>ML Motoscar</Text>

// Card com borda
<View style={{ 
  backgroundColor: BrandColors.background.card,
  borderColor: BrandColors.border.light 
}}>
```

### Uso com Tailwind/NativeWind
```typescript
// Usando as cores em classes Tailwind
<View className="bg-red-600"> // Equivale a BrandColors.primary
<Text className="text-gray-800"> // Equivale a BrandColors.text.primary
```

### Gradientes
```typescript
// Gradiente da marca
<LinearGradient colors={BrandColors.gradients.brand}>
  <Text>Conteúdo</Text>
</LinearGradient>
```

## 🎨 Cores Semânticas

- **Success**: `#4CAF50` - Verde para sucesso
- **Warning**: `#FF9800` - Laranja para avisos
- **Error**: `#F44336` - Vermelho para erros
- **Info**: `#2196F3` - Azul para informações

## 🌓 Temas

### Light Theme
- Background: Branco
- Text: Preto
- Tint: Vermelho da marca

### Dark Theme
- Background: Preto
- Text: Branco
- Tint: Vermelho da marca

## 📋 Exemplos Práticos

### Botões
```typescript
// Botão primário
<ButtonExample title="Confirmar" variant="primary" onPress={() => {}} />

// Botão outline
<ButtonExample title="Cancelar" variant="outline" onPress={() => {}} />
```

### Cards
```typescript
<View style={{
  backgroundColor: BrandColors.background.card,
  borderColor: BrandColors.border.light,
  borderWidth: 1,
  borderRadius: 8,
  padding: 16,
  shadowColor: BrandColors.shadow.medium,
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
}}>
  <Text style={{ color: BrandColors.text.primary }}>Conteúdo do card</Text>
</View>
```

## 🔧 Configuração do Tailwind

Para usar as cores da marca no Tailwind, adicione ao `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#CC0000',
          light: '#FF3333',
          dark: '#990000',
        },
        gray: {
          50: '#FAFAFA',
          100: '#F5F5F5',
          // ... outras variações
        }
      }
    }
  }
}
```

## 📝 Notas Importantes

1. **Consistência**: Sempre use as cores definidas aqui para manter a identidade visual
2. **Acessibilidade**: As cores foram escolhidas considerando contraste adequado
3. **Flexibilidade**: Use as variações (light/dark) para criar hierarquia visual
4. **Semântica**: Use as cores semânticas para feedback do usuário

## 🎯 Princípios de Design

- **Vermelho como cor principal**: Representa paixão, velocidade e energia
- **Neutros para equilíbrio**: Branco, preto e cinzas para criar harmonia
- **Contraste adequado**: Garantir legibilidade em diferentes contextos
- **Hierarquia visual**: Usar variações de cor para criar foco e organização 
