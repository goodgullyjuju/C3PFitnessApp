// app/components/navigation/ThemedView.tsx
import React from 'react';
import { View, StyleSheet, type ViewProps } from 'react-native';
import { useThemeColor } from '../../hooks/useThemeColor';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export const ThemedView: React.FC<ThemedViewProps> = ({ style, lightColor, darkColor, ...otherProps }) => {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return (
    <View
      style={[{ backgroundColor }, styles.view, style]}
      {...otherProps}
    />
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    pointerEvents: 'auto', // Use style.pointerEvents if needed
  },
});
