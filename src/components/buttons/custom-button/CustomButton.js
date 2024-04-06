import { View, Pressable, Text, StyleSheet } from "react-native";
import { colors } from "../../../constants/styles";

function CustomButton({ children, onPress, mode, style }) {
  return (
    <View style={style}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => pressed && styles.pressed}
      >
        <View style={[styles.button, mode === "flat" && styles.flat]}>
          <Text style={[styles.buttonText, mode === "flat" && styles.flatText]}>
            {children}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 4,
    padding: 10,
    backgroundColor: colors.primary500,
    borderColor: colors.primary500,
    borderWidth: 2, 
  },
  flat: {
    borderWidth: 2, 
    borderColor: colors.primary400,
    backgroundColor: "transparent",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: '600'
  },
  flatText: {
    color: colors.primary400,
  },
  pressed: {
    opacity: 0.75,
    backgroundColor: colors.primary100,
    borderRadius: 4,
  },
});

export default CustomButton;
