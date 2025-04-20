import React from 'react';
import {StyleSheet, ViewStyle, StyleProp, View} from 'react-native';
import {ScrollView} from 'react-native';
import {responsive} from '../utils/theme/responsive';

type MainLayoutTypes = {
  children: React.ReactNode;
  sidePadding?: boolean;
  verticalPadding?: boolean;
  scrollEnabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

const MainLayout = ({
  children,
  sidePadding,
  scrollEnabled,
  verticalPadding,

  style,
}: MainLayoutTypes) => {
  return scrollEnabled ? (
    <ScrollView
      keyboardShouldPersistTaps="always"
      showsVerticalScrollIndicator={false}
      style={[
        styles.container,
        style,
        {
          paddingVertical: verticalPadding ? responsive(20) : 0,
          paddingHorizontal: sidePadding ? responsive(24) : 0,
        },
      ]}
      contentContainerStyle={{flexGrow: 1}}>
      {children}
    </ScrollView>
  ) : (
    <View
      style={[
        styles.container,
        style,
        {
          paddingHorizontal: sidePadding ? responsive(20) : 0,
          paddingTop: verticalPadding ? responsive(24) : 0,
        },
      ]}>
      {children}
    </View>
  );
};

export default MainLayout;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
});
