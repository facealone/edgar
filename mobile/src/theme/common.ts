import { StyleSheet } from 'react-native';
import { MAIN_COLOR } from './colors';

export const commonStyles = StyleSheet.create({
  submitButton: {
    backgroundColor: MAIN_COLOR,
    alignSelf: 'flex-end',
    margin: 10,
    marginTop: 20,
  },
  centerHeaderFlatList: {
    textTransform: 'uppercase',
    fontWeight: '500',
    textAlign: 'center',
    fontSize: 13,
  },
  headerFlatList: {
    textTransform: 'uppercase',
    fontWeight: '500',
    fontSize: 13,
  },
  intro: { margin: 10 },
  headerIcon: { color: '#fff', marginTop: 10 },
});
