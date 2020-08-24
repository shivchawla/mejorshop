import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { ThemedView } from 'src/components';
import Empty from './Empty';
import { margin } from 'src/components/config/spacing';

const Unconnected = ({ clickTry }) => {
  return (
    <ThemedView isFullView>
      <Empty
        title='Sin conexión a Internet'
        subTitle='Comprueba tu conexión a Internet y vuelve a intentarlo.'
        avatarElement={<ThemedView colorSecondary style={styles.avatar} >
          <Image
            source={require('src/assets/images/unconnected.png')}
            resizeMode='stretch'
          />
        </ThemedView>}
        titleButton='Inténtalo de nuevo'
        clickButton={clickTry? clickTry : () => {}}
        buttonProps={{
          type: 'solid',
        }}
      />
    </ThemedView>
  )
};

const styles = StyleSheet.create({
  avatar: {
    width: 95,
    height: 95,
    borderRadius: 47.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: margin.big + 4
  }
});

export default Unconnected;
