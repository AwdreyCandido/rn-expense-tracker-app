import { Text, View } from "react-native";
import ExpensesOutput from "./../components/expenses-output/ExpensesOutput"


function RecentExpenses() {
  return <ExpensesOutput expensesPeriod="Last 7 Days"/>
}

export default RecentExpenses;
