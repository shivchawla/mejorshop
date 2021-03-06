import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { withTranslation } from 'react-i18next';

import get from 'lodash/get';

import { StyleSheet, View } from 'react-native';
import { withTheme, Text, Avatar } from 'src/components';

import Container from 'src/containers/Container';
import Button from 'src/containers/Button';

import { homeTabs } from 'src/config/navigator';

import { white } from 'src/components/config/colors';
import { margin } from 'src/components/config/spacing';
import { lineHeights } from 'src/components/config/fonts';

import {selectBillingAddress} from 'src/modules/cart/selectors';
import {selectOrder} from 'src/modules/order/selectors';

class Done extends React.Component {
  handleContinue = () => {
    const { navigation } = this.props;
    navigation.pop();
    navigation.navigate(homeTabs.shop);
  };

  render() {
    const { params, theme, t } = this.props;

    return (
      <Container style={styles.container}>
        <View style={styles.content}>
          <Avatar
            rounded
            icon={{
              name: 'check',
              size: 47,
              color: white,
            }}
            size={95}
            overlayContainerStyle={{
              backgroundColor: theme.colors.success,
            }}
            containerStyle={styles.icon}
          />
          <Text h2 medium style={styles.textTitle}>
            {t('cart:text_congrats')}
          </Text>
          <Text colorSecondary style={styles.textDescription}>
            {t('cart:text_congrats_description')}
          </Text>
          <Text colorSecondary style={[styles.textDescription, {marginTop: margin.large}]}>
            Tu número de pedido: <Text medium>#{get(params, 'id', '')}</Text>. Revisar tu correo electrónico: <Text medium>{get(params, 'billing.email', '')}</Text> para mas detalles.  
          </Text>
        </View>
        <Button title={t('cart:text_shopping')} onPress={this.handleContinue} containerStyle={styles.button} />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginBottom: margin.big + 4,
  },
  textTitle: {
    marginBottom: margin.base,
  },
  textDescription: {
    textAlign: 'center',
    lineHeight: lineHeights.h4,
  },
  button: {
    marginVertical: margin.big,
  },
});

export default compose(
  withTranslation(),
  withNavigation,
  withTheme,
)(Done);
