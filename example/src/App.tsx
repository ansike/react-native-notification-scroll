import React from 'react';
import { StyleSheet, View } from 'react-native';
import { RNNotificationBar } from 'react-native-notification-scroll';

export default function App() {
  return (
    <View style={styles.container}>
      <RNNotificationBar
        style={{
          backgroundColor: 'red',
          marginTop: 100,
        }}
        notices={[
          '1 asdgajsdhjkahsjdhjkahsjdhjkahsjkxxxxxxx',
          '2 zzskdhjkahsjdhjkahsjdjalksjdlka asdkajks',
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
