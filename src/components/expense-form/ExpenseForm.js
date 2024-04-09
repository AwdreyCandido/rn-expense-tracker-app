import { View, TextInput, StyleSheet, Alert, Text } from "react-native";
import CustomInput from "../input/CustomInput";
import CustomButton from "../buttons/custom-button/CustomButton";
import { useState } from "react";
import { useContext } from "react";
import { ExpensesContext } from "../../store/ExpensesContext";
import { useLayoutEffect } from "react";
import { colors } from "../../constants/styles";

function ExpenseForm({ navigation, isEditing, expenseId, defaultValues }) {
  const { addExpense, updateExpense, expenses } = useContext(ExpensesContext);

  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : "",
      isValid: true,
    },
    date: {
      value: defaultValues ? defaultValues.date.toISOString().slice(0, 10) : "",
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description : "",
      isValid: true,
    },
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add New Expense",
    });
  }, [navigation, isEditing]);

  function confirmHandler() {
    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== "Invalid Date";
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      // Alert.alert("Invalid input", "Please check your input values");
      setInputs((currInputs) => {
        return {
          amount: { value: currInputs.amount.value, isValid: amountIsValid },
          date: { value: currInputs.date.value, isValid: dateIsValid },
          description: {
            value: currInputs.description.value,
            isValid: descriptionIsValid,
          },
        };
      });
      return;
    }

    if (isEditing) {
      updateExpense(expenseId, expenseData);
    } else {
      addExpense(expenseData);
    }
    navigation.goBack();
  }

  function inputChangedHandler(inputName, value) {
    setInputs((currValues) => {
      return {
        ...currValues,
        [inputName]: { value: value, isValid: true },
      };
    });
  }

  function cancelHandler() {
    navigation.goBack();
  }

  const formIsInvalid =
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid;

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <CustomInput
          label="Amount"
          isValid={inputs.amount.isValid}
          style={{ flex: 1 }}
          textInput={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangedHandler.bind(this, "amount"),
            value: inputs.amount.value,
          }}
        />
        <CustomInput
          label="Date"
          isValid={inputs.date.isValid}
          style={{ flex: 1 }}
          textInput={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangedHandler.bind(this, "date"),
            value: inputs.date.value,
          }}
        />
      </View>
      <CustomInput
        label="Description"
        isValid={inputs.description.isValid}
        textInput={{
          multiline: true,
          onChangeText: inputChangedHandler.bind(this, "description"),
          value: inputs.description.value,
        }}
      />
      {formIsInvalid && (
        <Text style={styles.errorText}>Invalid input values!</Text>
      )}
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
  errorText: {
    textAlign: "center",
    color: "red",
    margin: 8,
    fontSize: 16,
  },
});

export default ExpenseForm;
