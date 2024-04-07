import { Pressable, View, Text, StyleSheet } from "react-native";
import { colors } from "../../constants/styles";
import { getFormattedDate } from "./../../utils/date.js";
import { useNavigation } from "@react-navigation/native";

function ExpenseItem({ id, description, date, amount }) {
  const navigation = useNavigation();

  function editExpenseHandler() {
    navigation.navigate("ManageExpense", { expenseId: id });
  }

  return (
    <Pressable
      onPress={editExpenseHandler}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.expense}>
        <View>
          <Text style={[styles.textBase, styles.description]}>
            {description}
          </Text>
          <Text style={styles.textBase}>{getFormattedDate(date)}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>${amount.toFixed(2)}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
    elevation: 0,
  },
  expense: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: colors.primary500,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 6,
    elevation: 3,
    overflow: "hidden",
  },
  textBase: {
    color: colors.primary50,
  },
  description: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "bold",
  },
  amountContainer: {
    minWidth: 70,
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
  },
  amount: {
    color: colors.primary500,
    fontWeight: "bold",
  },
});

export default ExpenseItem;
