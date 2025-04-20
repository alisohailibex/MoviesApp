import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {responsive} from '../utils/theme/responsive';

interface ButtonProps extends TouchableOpacityProps {
  bgColor?: string;
  sidePadding?: number;
  borderColor?: string;
  borderWidth?: number;
}

const PrimaryButton = ({
  children,
  bgColor = 'black',
  sidePadding,
  borderColor,
  borderWidth,
  style,
  ...props
}: ButtonProps) => {
  return (
    <TouchableOpacity
      {...props}
      activeOpacity={0.5}
      style={[
        styles.buttonContainer,
        {
          backgroundColor: bgColor,
          paddingHorizontal: sidePadding ? sidePadding : 0,
          borderColor: borderColor || 'transparent',
          borderWidth: borderWidth || 0,
        },
        style,
      ]}>
      {children}
    </TouchableOpacity>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  buttonContainer: {
    paddingVertical: responsive(12),
    borderRadius: responsive(12),
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
