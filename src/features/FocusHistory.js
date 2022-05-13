import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { colors } from '../utils/colors';
import { fontSizes, spacing } from '../utils/sizes';

export const FocusHistory = ({ history }) => {

  if (!history || !history.length) return null;

  const renderItem = ({item}) => <Text style={styles.item}>- {item}</Text>

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Focus History</Text>
      <FlatList data={history} renderItem={renderItem} />
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
    flex: 1,
  },
  title: {
    color: colors.white,
    fontSize: fontSizes.lg,
    textAlign: 'center',
    fontWight: 'bold',
  },
  item: {
    fontSize: fontSizes.md,
    color: colors.white,
    textAlign: 'center',
    paddingTop: spacing.sm,
  }
});