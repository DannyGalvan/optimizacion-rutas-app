
import { Colors } from '@/constants/Colors';
import React from 'react';
import {ActivityIndicator, View, StyleSheet, Text} from 'react-native';

interface Props {
  title: string;
}

export const LoadingComponent = ({title}: Props) => {
  return (
    <View style={styles.cargando}>
      <Text style={styles.loadingText}>{title}</Text>
      <ActivityIndicator size="large" color={Colors.blue} />
    </View>
  );
};

const styles = StyleSheet.create({
  cargando: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.black,
  },
});
