import React, { useEffect, useState } from 'react';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Content, Text } from 'native-base';
import i18n from '../../../i18n';
import { StyleSheet, Vibration } from 'react-native';

export const ScanScreen = ({ navigation }: any) => {
  const [hasCameraPermission, setCameraPermission] = useState<boolean>(false);

  const handleBarCodeScanned = ({ data }: string) => {
    Vibration.vibrate([0, 100, 0]);
    navigation.navigate('CardAdd', {
      barCode: data,
    });
  };

  const handlePermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);

    setCameraPermission(status === 'granted');
  };

  useEffect(() => {
    handlePermission();
  }, []);

  return (
    <Content padder>
      <Text>{i18n.t('card.scan.intro')}</Text>
      {hasCameraPermission && (
        <BarCodeScanner
          onBarCodeScanned={handleBarCodeScanned}
          style={styles.barCode}
        />
      )}
    </Content>
  );
};

const styles = StyleSheet.create({
  barCode: {
    flex: 1,
    width: '100%',
    height: 200,
    margin: 20,
  },
});

ScanScreen.navigationOptions = {
  title: i18n.t('card.scan.title'),
};
