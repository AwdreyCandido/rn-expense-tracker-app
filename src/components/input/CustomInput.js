import { View, TextInput, Text, StyleSheet } from "react-native";
import { colors } from "../../constants/styles";

function CustomInput({ label, style, textInput, isValid }) {
  const inputStyles = [styles.input];

  if (textInput && textInput.multiline) {
    inputStyles.push(styles.inputMultiline);
  }

  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={[styles.label, !isValid && styles.invalidLabel]}>{label}</Text>
      <TextInput style={[inputStyles, !isValid && styles.invalidInput]} {...textInput} />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 12,
    color: colors.primary100,
    marginBottom: 4,
  },
  input: {
    color: colors.primary700,
    backgroundColor: colors.primary100,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  invalidLabel: {
    color: "red",
  },
  invalidInput: {
    backgroundColor: colors.error50,
  },
});

export default CustomInput;
