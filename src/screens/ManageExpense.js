import { Text, View, StyleSheet } from "react-native";
import { useLayoutEffect } from "react";
import IconButton from "../components/buttons/icon-button/IconButton";
import { colors } from "../constants/styles";
import CustomButton from "../components/buttons/custom-button/CustomButton";
import { useContext } from "react";
import { ExpensesContext } from "./../store/ExpensesContext";
import ExpenseForm from "../components/expense-form/ExpenseForm";

function ManageExpense({ route, navigation }) {
  const {expenses,deleteExpense } =
    useContext(ExpensesContext);


  const expenseId = route.params?.expenseId;
  const isEditing = !!expenseId;

  const selectedExpense = expenses.find(
    (expense) => expense.id === expenseId
  );

  function deleteExpenseHandler() {
    deleteExpense(expenseId);
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        navigation={navigation}
        expenseId={expenseId}
        isEditing={isEditing}
        defaultValues={selectedExpense}
      />
      {isEditing && (
        <View style={styles.icon}>
          <IconButton
            icon="trash"
            color={"red"}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: colors.primary800,
  },
  icon: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: colors.primary200,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20,
  },
});

export default ManageExpense;
