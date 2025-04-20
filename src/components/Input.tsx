import {
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
  StyleProp,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import Typography from './Typography';
import {responsive} from '../utils/theme/responsive';

import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/Entypo';

interface InputProps extends TextInputProps {
  label?: string;
  style?: StyleProp<ViewStyle>;
  secure?: boolean;
  inputWrapperStyles?: StyleProp<ViewStyle>;
  lableStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  errorText?: string;
  withIcon?: boolean;
  clearInput?: boolean;
  characterCount?: boolean;
  clearInputPress?: () => void;
}

const Input = ({
  label,
  style,
  lableStyle,
  secure,
  inputWrapperStyles,
  errorText,
  inputStyle,
  withIcon,
  clearInput,
  clearInputPress,
  characterCount,
  ...props
}: InputProps) => {
  const [secureText, setSecureText] = useState(secure);

  return (
    <View style={style}>
      {Boolean(label) && (
        <>
          <Typography style={lableStyle} weight={'medium'} size={14}>
            {label}
          </Typography>
        </>
      )}
      <View
        style={[
          styles.inputWrapper,
          inputWrapperStyles,
          props.multiline && styles.multiLineWrapperStyles,
        ]}>
        {withIcon && (
          <View
            style={{
              position: 'absolute',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              left: responsive(12),
            }}>
            <Icon
              name={'search'}
              color={'grey'}
              size={responsive(16)}
              style={styles.leftIcon}
            />
          </View>
        )}
        <TextInput
          style={[
            styles.inputStyle,
            inputStyle,
            withIcon && styles.inputWithIcon,
            props.multiline && [
              styles.multilineInput,
              {
                paddingTop: characterCount ? responsive(20) : responsive(12),
              },
            ],
          ]}
          placeholderTextColor={'grey'}
          secureTextEntry={secureText}
          textAlignVertical={props.multiline ? 'top' : 'auto'}
          {...props}
        />

        {clearInput && (
          <TouchableOpacity
            style={{
              position: 'absolute',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              right: responsive(12),
            }}
            onPress={clearInputPress}>
            <Icon1
              style={{top: responsive(3)}}
              name={'cross'}
              color={'black'}
              size={16}
            />
          </TouchableOpacity>
        )}
      </View>
      {Boolean(errorText) && (
        <Typography
          weight={'semi-bold'}
          size={12}
          color={'red'}
          style={styles.helperText}>
          {errorText}
        </Typography>
      )}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  inputStyle: {
    width: '100%',
    height: '100%',
    borderRadius: responsive(16),
    borderWidth: 1,
    borderColor: 'dark-grey',
    paddingHorizontal: responsive(12),
    marginTop: responsive(6),
    fontSize: responsive(16),
    color: 'black',
  },
  inputWithIcon: {
    paddingLeft: responsive(40),
  },
  inputWrapper: {
    width: '100%',
    height: responsive(48),
    position: 'relative',
    justifyContent: 'center',
    marginTop: responsive(6),
    alignItems: 'center',
    flexDirection: 'row',
  },
  passwordEye: {
    position: 'absolute',
    right: responsive(15),
  },
  leftIcon: {
    // top: responsive(3),
  },
  helperText: {
    marginTop: responsive(4),
    marginLeft: responsive(8),
  },
  multiLineWrapperStyles: {
    height: responsive(120),
  },
  multilineInput: {
    height: '100%',
    paddingBottom: responsive(12),
  },
});
