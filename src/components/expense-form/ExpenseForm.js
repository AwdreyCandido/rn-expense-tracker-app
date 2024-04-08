import { View, TextInput, StyleSheet } from "react-native";
import CustomInput from "../input/CustomInput";

function ExpenseForm() {
  function amountHandler() {}
  function dateHandler() {}
  function descriptionHandler() {}

  return (
    <View style={{flex: 1}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <CustomInput
          label="Amount"
          style={{flex: 1}}
          textInput={{
            keyboardType: "decimal-pad",
            onChangeText: amountHandler,
          }}
        />
        <CustomInput
          label="Date"
          style={{flex: 1}}
          textInput={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: dateHandler,
          }}
        />
      </View>
      <CustomInput
        label="Description"
        textInput={{
          multiline: true,
          onChangeText: descriptionHandler,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});

export default ExpenseForm;
