import { View, TextInput, StyleSheet } from "react-native";
import CustomInput from "../input/CustomInput";
import CustomButton from "../buttons/custom-button/CustomButton";
import { useState } from "react";
import { useContext } from "react";
import { ExpensesContext } from "../../store/ExpensesContext";
import { useLayoutEffect } from "react";

function ExpenseForm({ navigation, isEditing, expenseId, defaultValues }) {
  const { addExpense, updateExpense, expenses } = useContext(ExpensesContext);

  const [inputValues, setInputValues] = useState({
    amount: defaultValues ? defaultValues.amount.toString() : "",
    date: defaultValues ? defaultValues.date.toISOString().slice(0, 10) : "",
    description: defaultValues ? defaultValues.description : "",
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add New Expense",
    });
  }, [navigation, isEditing]);

  function confirmHandler() {
    const expenseData = {
      amount: +inputValues.amount,
      date: new Date(inputValues.date),
      description: inputValues.description,
    };

    if (isEditing) {
      updateExpense(expenseId, expenseData);
    } else {
      addExpense(expenseData);
    }
    navigation.goBack();
  }

  function inputChangedHandler(inputName, value) {
    setInputValues((currValues) => {
      return {
        ...currValues,
        [inputName]: value,
      };
    });
  }

  function cancelHandler() {
    navigation.goBack();
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <CustomInput
          label="Amount"
          style={{ flex: 1 }}
          textInput={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangedHandler.bind(this, "amount"),
            value: inputValues.amount,
          }}
        />
        <CustomInput
          label="Date"
          style={{ flex: 1 }}
          textInput={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangedHandler.bind(this, "date"),
            value: inputValues.date,
          }}
        />
      </View>
      <CustomInput
        label="Description"
        textInput={{
          multiline: true,
          onChangeText: inputChangedHandler.bind(this, "description"),
          value: inputValues.description,
        }}
      />
      <View style={styles.buttonContainer}>
        <CustomButton style={{ flex: 1 }} mode="flat" onPress={cancelHandler}>
          Cancel
        </CustomButton>
        <CustomButton style={{ flex: 1 }} onPress={confirmHandler}>
          {isEditing ? "Update" : "Add"}
        </CustomButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: 20,
  },
});

export default ExpenseForm;
