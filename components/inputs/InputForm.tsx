import { Colors, global } from "@/constants/Colors";
import React from "react";
import { Text, StyleSheet, TextInput, View, useColorScheme } from "react-native";

interface Props {
  label: string;
  name?: string;
  placeholder: string;
  onChangeText: any;
  value: string;
  errorMessage?: string;
  secureTextEntry: boolean;
  onFocus?: any;
  colorText?: any;
  colorInput?: any;
  placeholderTextColor?: any;
  containerStyles?: any;
  multiline?: boolean;
}

export const InputForm = ({
  label,
  placeholder,
  onChangeText,
  value,
  secureTextEntry,
  onFocus,
  errorMessage,
  name,
  colorText,
  colorInput,
  placeholderTextColor,
  containerStyles,
  multiline,
}: Props) => {

  const sheme = useColorScheme();

  return (
    <View style={[styles.container, containerStyles]}>
      <Text style={colorText ? colorText : sheme == 'dark' ? Colors.white : Colors.black}>{label}</Text>
      <TextInput
        style={[styles.input, colorInput ? colorInput : sheme == 'dark' ? global.inputDark : global.inputLight]}
        placeholder={placeholder}
        onChangeText={(text) => onChangeText(text, name)}
        value={value}
        placeholderTextColor={placeholderTextColor ?? Colors.opacity}
        secureTextEntry={secureTextEntry}
        onFocus={onFocus}
        multiline={multiline}
        numberOfLines={8}
        textBreakStrategy="highQuality"
      />
      <View>
        <Text style={[global.errorColor, styles.textCenter]}>
          {errorMessage}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    width: "100%",
    marginVertical: 5,
  },
  input: {
    height: 50,
  },
  textCenter: {
    textAlign: "center",
  },
});
