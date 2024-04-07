import { Text, View } from "react-native";
import ExpensesOutput from "./../components/expenses-output/ExpensesOutput";
import { useContext } from "react";
import { ExpensesContext } from "./../store/ExpensesContext";

function AllExpenses() {
  const { expenses } = useContext(ExpensesContext);

  return <ExpensesOutput expenses={expenses} expensesPeriod="Total" />;
}

export default AllExpenses;
