import React from 'react';

import {connect} from 'react-redux';
import {Map} from 'immutable';
import {withTranslation} from 'react-i18next';

import {StyleSheet, View} from 'react-native';
import { KeyboardAwareScrollView as ScrollView} from 'react-native-keyboard-aware-scroll-view'

import {Text} from 'src/components';
import {Row, Col} from 'src/containers/Gird';
import Button from 'src/containers/Button';
import Heading from 'src/containers/Heading';
import Container from 'src/containers/Container';
import PaymentMethod from './PaymentMethod';
import PaymentForm from './PaymentForm';

import {createOrder, updateOrder} from 'src/modules/order/actions';
import {
  selectOrder,
  selectOrderPending,
  selectUpdateOrderPending,
} from 'src/modules/order/selectors';
import {
  selectBillingAddress,
  selectedPaymentMethod,
  cartTotalSelector,
} from 'src/modules/cart/selectors';
import {changeData} from 'src/modules/cart/actions';

import {margin, padding} from 'src/components/config/spacing';
import {validatorAddress} from 'src/modules/cart/validator';
import {red} from 'src/components/config/colors';

class Payment extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      errors: Map(),
    };
  }

  onChange = (key, value) => {
    const {dispatch} = this.props;
    dispatch(changeData(['billing', key], value));
  };

  onChangeNIT = (key, value) => {
    const {dispatch} = this.props;
    const nitOrCf = value == '' ? 'CF' : 'NIT';
    dispatch(changeData(['meta_data', '_billing_wooccm11'], nitOrCf));
    dispatch(changeData(['meta_data', '_billing_wooccm12'], value));
  };

  handleConfirm = () => {
    try{
    const {dispatch, billing, selected, order, t} = this.props;

    // Validation
    let errors = validatorAddress(billing);

    if (!selected) {
      errors = errors.set('payment_method', t('cart:text_payment_select_error'));
    }

    if (errors.size) {
      this.setState({
        errors,
      });
    } else {
      if (order && order.get('id')) {
        dispatch(updateOrder(order.get('id')));
      } else {
        dispatch(createOrder());
      }
    }
  }catch(err) {
    // console.log(err);
  }
  };

  render() {
    const {
      pending,
      updatedPending,
      backStep,
      nextStep,
      billing,
      params,
      t,
    } = this.props;
    const {errors} = this.state;

    return (
      <View style={{ flex: 1 }}>

      <ScrollView>
        <Container>
          <Heading
            title={t('cart:text_payment_method')}
            containerStyle={styles.headerText}
          />
          <Text style={{color: red}}>{errors.get('payment_method')}</Text>
          <PaymentMethod nextStep={nextStep} />
          <PaymentForm
            data={billing}
            onChange={this.onChangeNIT}
            errors={errors}
            params={params}
          />
        </Container>
        </ScrollView>
      
        <Container>
        <Row style={styles.footer}>
            <Col>
              <Button
                type="outline"
                onPress={() => backStep()}
                title={t('common:text_back')}
              />
            </Col>
            <Col>
              <Button
                loading={pending || updatedPending}
                onPress={this.handleConfirm}
                title={t('common:text_payment')}
              />
            </Col>
          </Row>
        </Container>



      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerText: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  footer: {
    marginBottom: margin.big,
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 36,
  }
});

const mapStateToProps = state => ({
  updatedPending: selectUpdateOrderPending(state),
  pending: selectOrderPending(state),
  order: selectOrder(state),
  billing: selectBillingAddress(state),
  selected: selectedPaymentMethod(state),
  total: cartTotalSelector(state),
});

export default connect(mapStateToProps)(withTranslation()(Payment));
