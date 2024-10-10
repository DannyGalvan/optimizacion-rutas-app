/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { StyleSheet } from "react-native";

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
  blue: '#153A89',
  white: '#fff',
  yellow: '#E8EF19',
  opacity: 'rgba(255,255,255,0.5)',
  red: '#DC1D40',
  black: '#000000',
  skyBlue: '#a3d2e6',
  orange: "#ff8000",
  green: "#00ff00",
  gray: "rgb(180, 180, 180)"
};

export const global = StyleSheet.create({
  backgroundGlobal: {
    backgroundColor: Colors.blue,
    flex: 1,
  },
  container: {
    flex: 1,
  },
  textLight: {
    color: Colors.black,
    fontWeight: 'bold',
  },
  textDark: {
    color: Colors.white,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: Colors.black,
    textAlign: 'center',
    marginVertical: 10,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.black,
    textAlign: 'center',
    marginBottom: 10,
  },
  text: {
    fontSize: 14,
    color: Colors.black,
    paddingBottom: 10,
    paddingEnd: 10,
  },
  errorColor: {
    color: Colors.red,
    fontWeight: 'bold',
  },
  successColor: {
    color: Colors.green,
    fontWeight: 'bold',
  },
  inputDark: {
    height: 40,
    borderBottomWidth: 2,
    borderColor: Colors.white,
    color: Colors.white,
  },
  inputLight: {
    height: 40,
    borderBottomWidth: 2,
    borderColor: Colors.black,
    color: Colors.black,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: 25,
    flexDirection: "row"
  },
  textButton: {
    fontWeight: 'bold',
  },
});
