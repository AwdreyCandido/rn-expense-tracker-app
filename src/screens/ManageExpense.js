import { Text, View, StyleSheet } from "react-native";
import { useLayoutEffect } from "react";
import IconButton from "../components/buttons/icon-button/IconButton";
import { colors } from "../constants/styles";
import CustomButton from "../components/buttons/custom-button/CustomButton";
import { useContext } from "react";
import { ExpensesContext } from "./../store/ExpensesContext";

function ManageExpense({ route, navigation }) {
  const { addExpense, updateExpense, deleteExpense } =
    useContext(ExpensesContext);

  const expenseId = route.params?.expenseId;
  const isEditing = !!expenseId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add New Expense",
    });
  }, [navigation, isEditing]);

  function confirmHandler() {
    if (isEditing) {
      updateExpense(expenseId, {
        date: new Date("2024-4-7"),
        description: "A new expense updated",
        amount: 9.99,
      });
    } else {
      addExpense({
        date: new Date("2024-4-7"),
        description: "A new expense",
        amount: 9.99,
      });
    }
    navigation.goBack();
  }
  function deleteExpenseHandler() {
    deleteExpense(expenseId);
    navigation.goBack();
  }
  function cancelHandler() {
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <CustomButton style={{ flex: 1 }} mode="flat" onPress={cancelHandler}>
          Cancel
        </CustomButton>
        <CustomButton style={{ flex: 1 }} onPress={confirmHandler}>
          {isEditing ? "Update" : "Add"}
        </CustomButton>
      </View>
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
