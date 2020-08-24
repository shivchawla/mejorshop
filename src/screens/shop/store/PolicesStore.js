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

    const {store_policies} = store;

    // console.log(store);

    if (!store_policies) {
      return null;
    }
    
    const {shipping_policy, refund_policy, cancellation_policy} = store_policies;

    return (
      <ScrollView>
        <Container>
          <Text h3 medium style={styles.title}>Política de Envíos</Text>
          <TextHtml addLineBreaks={false} style={styles} value={shipping_policy}/>
          <Text h3 medium style={styles.title}>Política de Reembolso</Text>
          <TextHtml addLineBreaks={false} style={styles} value={refund_policy}/>
          <Text h3 medium style={styles.title}>Política de Cancelación/Devolución/Cambio</Text>
          <TextHtml addLineBreaks={false} style={styles} value={cancellation_policy}/>
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
