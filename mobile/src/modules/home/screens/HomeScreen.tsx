import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export class HomeScreen extends React.PureComponent {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Bienvenue sur edgar majordome</Text>
        <Button
          title={'Se connecter'}
          onPress={() => this.props.navigation.navigate('Authentication')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#686868',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
