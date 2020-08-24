import React, {Component} from 'react';

import { View, Text } from 'react-native';

import paypal from './Paypal';
import razorpay from './Razorpay';
import stripe from './Stripe';
import pagalo from './Pagalo';

const gateways = {
  paypal,
  // razorpay,
  // stripe,
  pagalo,
};

class PaymentGateway extends Component {
  render() {
    const { selected,  } = this.props;
    const Gateway = gateways[selected];
    if (Gateway) {
      return <Gateway {...this.props} />
    }
    return null;
  }
}

PaymentGateway.propTypes = {};

export default PaymentGateway;
