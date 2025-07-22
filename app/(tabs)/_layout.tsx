import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import React from "react";

import { useTheme } from "@/components/ThemeContext";
import { useColorScheme } from "@/components/useColorScheme";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={20} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { colors } = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.tabIconSelected,
        tabBarInactiveTintColor: colors.tabIconDefault,
        tabBarStyle: {
          backgroundColor: colors.background.tabBar,
          borderTopColor: colors.border.light,
        },
        // Ocultar headers em todas as telas
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Início",
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="vehicles/index"
        options={{
          title: "Veículos",
          tabBarIcon: ({ color }) => <TabBarIcon name="car" color={color} />,
        }}
      />
      <Tabs.Screen
        name="clients/index"
        options={{
          title: "Clientes",
          tabBarIcon: ({ color }) => <TabBarIcon name="users" color={color} />,
        }}
      />
      <Tabs.Screen
        name="sales/index"
        options={{
          title: "Vendas",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="bar-chart" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="installments/index"
        options={{
          title: "Pagamentos",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="credit-card" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
