import React from 'react';
import { StyleSheet, Platform, Dimensions } from 'react-native';

import { View } from 'react-native';
import { WebView } from 'react-native-webview';
import { withTheme } from 'src/components';

const Screen = Dimensions.get('window');
const ScreenWidth = Screen.width;

const queryString = require('query-string');

import getHTML from './html';

class PaymentPagalo extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      error: false,
      processing: false,
    }
  }

  onMessage = event => {

    const {handlePaymentProgress} = this.props;
    
    this.setState({processing: true, error: false});
    
    handlePaymentProgress({
      method: 'pagalo',
      data: queryString.parse(event.nativeEvent.data),
    })
    .catch(err => {
      this.setState({error: true, processing: false});
    })
  };

  render() {
    const { theme } = this.props;

    const {error, processing} = this.state;

    let errorMessage = error ? '¡Algo salio mal! Intentalo de nuevo' : '';
    let processingDisplay = processing ? 'block' : 'none';
    let buttonText = processing ? 'Procesando...' : 'Finalizar Pago';
    let screenWidth = `${ScreenWidth}px`;

    let html = getHTML(buttonText, processingDisplay, errorMessage, screenWidth);

    return (
      <View style={{ flex: 1 }}>
        <WebView
          style={styles.container}
          onMessage={this.onMessage}
          originWhitelist={['*']}
          source={{html}}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: 'transparent',
  },
});

export default withTheme(PaymentPagalo);
