import { global } from "@/constants/Colors";
import React, { ComponentProps } from "react";
import {
  TouchableOpacity,
  Text,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Icon } from "../icons/Icon";
import { IconProps } from "@expo/vector-icons/build/createIconSet";

interface Props {
  styles?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  className?: string;
  textClassName?: string;
  onPress: () => void;
  title: string;
  iconColor?: string;
  icon?: IconProps<ComponentProps<typeof Ionicons>['name']>['name'];
  iconSize?: number;
}

export const TouchableButton = ({
  styles,
  icon,
  onPress,
  textStyle,
  title,
  iconColor,
  className,
  textClassName,
  iconSize,
}: Props) => {
  return (
    <TouchableOpacity
      style={[global.button, styles]}
      className={className}
      onPress={onPress}
      accessibilityLabel={title}
    >
      <Text className={textClassName} style={textStyle}>
        {title}        
      </Text>
      {icon && <Icon name={icon} size={iconSize ?? 20} color={iconColor} />}
    </TouchableOpacity>
  );
};
