import { View, Text, FlatList, StyleSheet } from "react-native";
import { colors } from "../../constants/styles";

function ExpensesSummary({ expenses, periodName }) {
  const sum = expenses.reduce((sum, expense) => {
    return sum + expense.amount;
  }, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.period}>{periodName}</Text>
      <Text style={styles.sum}>${sum.toFixed(2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: colors.primary50,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30
  },
  period: {
    fontSize: 16,
    color: colors.primary400,
  },
  sum: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.primary500,
  },
});

export default ExpensesSummary;
