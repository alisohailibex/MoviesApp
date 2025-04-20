import {StyleSheet} from 'react-native';
import React from 'react';
import Toast, {
  BaseToast,
  BaseToastProps,
  ErrorToast,
} from 'react-native-toast-message';
import {responsive} from './responsive';

const toastConfig = {
  success: (props: BaseToastProps) => {
    return (
      <BaseToast
        {...props}
        text1NumberOfLines={1}
        text2NumberOfLines={2}
        style={[styles.baseToastContainer, styles.successToast]}
        text1Style={styles.text1Style}
        text2Style={styles.text2Style}
        contentContainerStyle={styles.toastContainer}
      />
    );
  },
  error: (props: BaseToastProps) => {
    return (
      <ErrorToast
        {...props}
        text1NumberOfLines={1}
        text2NumberOfLines={2}
        style={[styles.baseToastContainer, styles.errorToast]}
        text1Style={styles.text1Style}
        text2Style={styles.text2Style}
        contentContainerStyle={styles.toastContainer}
      />
    );
  },
};

const ToastMessage = () => {
  return <Toast position="bottom" config={toastConfig} bottomOffset={0} />;
};

export default ToastMessage;

const styles = StyleSheet.create({
  baseToastContainer: {
    elevation: 10,
    paddingHorizontal: responsive(10),
    height: responsive(70),
    alignItems: 'center',
    borderLeftWidth: 10,
  },
  successToast: {
    backgroundColor: 'blue',
    borderLeftColor: 'blue',
  },
  errorToast: {
    backgroundColor: 'red',
    borderLeftColor: 'red',
  },
  text1Style: {
    fontSize: responsive(16),
    color: 'light-grey',
    marginBottom: responsive(5),
    lineHeight: responsive(15),
  },
  text2Style: {
    fontSize: responsive(12),
    color: 'light-grey',
    lineHeight: responsive(15),
  },
  toastContainer: {
    paddingHorizontal: responsive(5),
    paddingLeft: responsive(17),
  },
});
