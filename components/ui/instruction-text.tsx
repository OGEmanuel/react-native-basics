import Colors from "@/constants/colors";
import { ReactNode } from "react";
import { StyleSheet, Text } from "react-native";

const InstructionText = (props: { children: ReactNode; style?: {} }) => {
  return (
    <Text style={[styles.instructionText, props.style]}>{props.children}</Text>
  );
};

export default InstructionText;

const styles = StyleSheet.create({
  instructionText: {
    fontFamily: "open-sans",
    color: Colors.accent500,
    fontSize: 24,
  },
});
