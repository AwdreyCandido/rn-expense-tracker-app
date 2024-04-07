import { View, Text, FlatList, StyleSheet } from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { colors } from "../../constants/styles";

function ExpensesOutput({ expensesPeriod, expenses }) {

  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
      <ExpensesList expenses={expenses} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: colors.primary700,
  },
});

export default ExpensesOutput;
