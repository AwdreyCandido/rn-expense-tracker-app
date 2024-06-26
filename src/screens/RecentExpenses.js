import { Text, View } from "react-native";
import ExpensesOutput from "./../components/expenses-output/ExpensesOutput";
import { useContext } from "react";
import { ExpensesContext } from "./../store/ExpensesContext";
import { getDateMinusDays } from "../utils/date";

function RecentExpenses() {
  const { expenses } = useContext(ExpensesContext);

  const recentExpenses = expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return expense.date >= date7DaysAgo && expense.date <= today;
  });

  return (
    <ExpensesOutput expenses={recentExpenses} expensesPeriod="Last 7 Days" />
  );
}

export default RecentExpenses;
