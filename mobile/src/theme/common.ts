import { StyleSheet } from 'react-native';
import { MAIN_COLOR, GREEN_COLOR, RED_COLOR } from './colors';

export const commonStyles = StyleSheet.create({
  submitButton: {
    backgroundColor: MAIN_COLOR,
    alignSelf: 'flex-end',
    margin: 10,
    marginTop: 20,
  },
  centerHeaderFlatList: {
    textTransform: 'uppercase',
    textAlign: 'center',
    fontSize: 13,
  },
  headerFlatList: {
    textTransform: 'uppercase',
    fontSize: 13,
  },
  intro: { margin: 10 },
  headerIcon: { color: '#fff', marginTop: 10 },
  listHelper: {
    color: MAIN_COLOR,
    fontSize: 12,
  },
  content: {
    backgroundColor: '#fff',
  },
  fabButton: {
    backgroundColor: MAIN_COLOR,
  },
  whiteText: {
    color: '#fff',
  },
  darkText: {
    color: MAIN_COLOR,
  },
  filterButton: {
    backgroundColor: '#fff',
    borderColor: MAIN_COLOR,
    alignSelf: 'flex-start',
    margin: 10,
  },
  inflow: {
    color: GREEN_COLOR,
    fontWeight: 'bold',
  },
  outlay: {
    color: RED_COLOR,
    fontWeight: 'bold',
  },
});
