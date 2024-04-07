import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "./src/constants/styles";
import { useNavigation } from "@react-navigation/native";

import ManageExpense from "./src/screens/ManageExpense";
import AllExpenses from "./src/screens/AllExpenses";
import RecentExpenses from "./src/screens/RecentExpenses";
import IconButton from "./src/components/buttons/icon-button/IconButton";
import ExpensesContextProvider  from "./src/store/ExpensesContext";

const Stack = createNativeStackNavigator();
const Drawer = createBottomTabNavigator();

function ExpensesOverview() {
  const navigation = useNavigation();

  function addExpenseHandler() {
    navigation.navigate("ManageExpense");
  }

  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.primary500 },
        headerTintColor: "white",
        tabBarStyle: {
          position: "absolute",
          backgroundColor: colors.primary500,
          height: 70,
          paddingBottom: 10,
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          borderWidth: 1,
          borderColor: colors.primary500,
        },
        tabBarActiveTintColor: colors.accent500,
        tabBarLabelStyle: { fontSize: 12, marginTop: 0 },
        headerRight: ({ tintColor }) => {
          return (
            <IconButton
              onPress={addExpenseHandler}
              icon={"add"}
              size={30}
              color={tintColor}
            />
          );
        },
      }}
    >
      <Drawer.Screen
        options={{
          title: "Recent Expenses",
          tabBarLabel: "Recent Expenses",
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="hourglass" size={size} color={color} />;
          },
        }}
        name="RecentExpenses"
        component={RecentExpenses}
      />
      <Drawer.Screen
        options={{
          title: "All Expenses",
          tabBarLabel: "All Expenses",
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="calendar" size={size} color={color} />;
          },
        }}
        name="AllExpenses"
        component={AllExpenses}
      />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <ExpensesContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: colors.primary500 },
              headerTintColor: "white",
            }}
          >
            <Stack.Screen
              options={{ headerShown: false }}
              name="ExpensesOverview"
              component={ExpensesOverview}
            />
            <Stack.Screen
              name="ManageExpense"
              component={ManageExpense}
              options={{ presentation: "fullScreenModal" }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ExpensesContextProvider>
    </>
  );
}
