import { View, Text, FlatList, StyleSheet } from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { colors } from "../../constants/styles";

const EXPENSES = [
  {
    id: "e1",
    description: "A book",
    amount: 59.99,
    date: new Date("2024-2-22"),
  },
  {
    id: "e2",
    description: "Hamburguer",
    amount: 8.99,
    date: new Date("2024-4-3"),
  },
  {
    id: "e3",
    description: "Chocolate",
    amount: 4.99,
    date: new Date("2024-3-19"),
  },
  {
    id: "e4",
    description: "Shoes",
    amount: 94.99,
    date: new Date("2024-3-1"),
  },
  {
    id: "e5",
    description: "Another book",
    amount: 14.99,
    date: new Date("2024-3-10"),
  },
];

function ExpensesOutput({ expensesPeriod }) {
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={EXPENSES} periodName={expensesPeriod} />
      <ExpensesList expenses={EXPENSES} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: colors.primary700
  }
})

export default ExpensesOutput;
