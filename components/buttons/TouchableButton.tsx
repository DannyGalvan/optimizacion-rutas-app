import { global } from "@/constants/Colors";
import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

interface Props {
  styles: StyleProp<ViewStyle>;
  textStyle: StyleProp<TextStyle>;
  onPress: () => void;
  title: string;
  iconColor?: string;
  icon?: string;
}

export const TouchableButton = ({
  styles,
  icon,
  onPress,
  textStyle,
  title,
  iconColor,
}: Props) => {
  return (
    <TouchableOpacity
      style={[global.button, styles]}
      onPress={onPress}
      accessibilityLabel={title}
    >
      <Text style={textStyle}>{title}</Text>
      {icon && <Ionicons name="person" size={30} color={iconColor} />}
    </TouchableOpacity>
  );
};
