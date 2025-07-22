import { useCallback, useRef } from "react";
import { ScrollView, TextInput, View } from "react-native";

interface UseAutoScrollReturn {
  scrollViewRef: React.RefObject<ScrollView | null>;
  inputRefs: React.MutableRefObject<{
    [key: string]: React.RefObject<TextInput | View>;
  }>;
  registerInput: (name: string, ref: React.RefObject<TextInput | View>) => void;
  scrollToInput: (name: string) => void;
  handleInputFocus: (name: string) => void;
}

export function useAutoScroll(): UseAutoScrollReturn {
  const scrollViewRef = useRef<ScrollView>(null);
  const inputRefs = useRef<{
    [key: string]: React.RefObject<TextInput | View>;
  }>({});

  const registerInput = useCallback(
    (name: string, ref: React.RefObject<TextInput | View>) => {
      inputRefs.current[name] = ref;
    },
    []
  );

  const scrollToInput = useCallback((name: string) => {
    const inputRef = inputRefs.current[name];
    if (inputRef?.current && scrollViewRef.current) {
      // Usar setTimeout para garantir que o layout foi atualizado
      setTimeout(() => {
        inputRef.current?.measureLayout(
          scrollViewRef.current as any,
          (x, y) => {
            // Scroll para posicionar o input acima do teclado
            // Adicionar um offset para dar espaço acima do input
            const offset = 150; // Aumentado o offset para mais espaço
            const scrollY = Math.max(0, y - offset);

            scrollViewRef.current?.scrollTo({
              y: scrollY,
              animated: true,
            });
          },
          () => {
            console.warn(`Não foi possível medir a posição do input: ${name}`);
            // Fallback: scroll para uma posição aproximada
            scrollViewRef.current?.scrollTo({
              y: 200,
              animated: true,
            });
          }
        );
      }, 50);
    }
  }, []);

  const handleInputFocus = useCallback(
    (name: string) => {
      // Aguardar o teclado aparecer antes de fazer o scroll
      setTimeout(() => {
        scrollToInput(name);
      }, 300); // Aumentado o delay para dar tempo do teclado aparecer
    },
    [scrollToInput]
  );

  return {
    scrollViewRef,
    inputRefs,
    registerInput,
    scrollToInput,
    handleInputFocus,
  };
}
