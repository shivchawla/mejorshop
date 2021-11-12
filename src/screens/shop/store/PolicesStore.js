import React, {Component} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {Text} from 'src/components';
import Container from 'src/containers/Container';
import {lineHeights} from 'src/components/config/fonts';
import {margin} from 'src/components/config/spacing';
import TextHtml from 'src/containers/TextHtml';

import merge from 'lodash/merge';


class PolicesStore extends Component {
  render() {

    const {store} = this.props;

    if (!store) {
      return null;
    }

    const {wcfm_shipping_policy, wcfm_refund_policy, wcfm_cancellation_policy} = store;

    return (
      <ScrollView>
        <Container>
          <Text h3 medium style={styles.title}>Política de Envíos</Text>
          <TextHtml addLineBreaks={false} style={styles} value={wcfm_shipping_policy}/>
          <Text h3 medium style={styles.title}>Política de Reembolso</Text>
          <TextHtml addLineBreaks={false} style={styles} value={wcfm_refund_policy}/>
          <Text h3 medium style={styles.title}>Política de Cancelación/Devolución/Cambio</Text>
          <TextHtml addLineBreaks={false} style={styles} value={wcfm_cancellation_policy}/>
        </Container>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    marginBottom: margin.base - 1,
  },

  div: {
      marginBottom: margin.big,
      lineHeight: lineHeights.h4,
  },

  p: {
    marginBottom: 3, 
    marginTop: 3
  }
});

export default PolicesStore;
