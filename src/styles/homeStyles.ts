import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listPadding: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  nameLabel: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  nameValue: {
    fontWeight: 'normal',
  },
});