import { View, Text, FlatList } from "react-native";
import ExpenseItem from "../expense-item/ExpenseItem";

function renderExpenseItem(data) {
  item = data.item;
  return <ExpenseItem {...item} />;
}

function ExpensesList({ expenses }) {
  return (
    <FlatList
      data={expenses}
      renderItem={renderExpenseItem}
      keyExtractor={(item) => item.id}
    />
  );
}

export default ExpensesList;
