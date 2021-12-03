import React from 'react';

import {compose} from 'redux';
import {connect} from 'react-redux';
import {fromJS, Map} from 'immutable';
import {withTranslation} from 'react-i18next';
import get from 'lodash/get';

import {StyleSheet, Switch, View, ActivityIndicator, Modal} from 'react-native';
import { KeyboardAwareScrollView as ScrollView} from 'react-native-keyboard-aware-scroll-view'

import {Text, ThemedView, Header} from 'src/components';
import {TextHeader, IconHeader, CartIcon} from 'src/containers/HeaderComponent';
import Container from 'src/containers/Container';
import Button from 'src/containers/Button';
import {Row, Col} from 'src/containers/Gird';
import Heading from 'src/containers/Heading';
import ShippingForm from './ShippingForm';
import ShippingMethod from './ShippingMethod';

import { shippingAddressSelector } from 'src/modules/auth/selectors';
import { selectShippingAddress, selectedShippingMethod} from 'src/modules/cart/selectors';

import {changeData, updateShippingLines} from 'src/modules/cart/actions';
import {isLoginSelector, userSelector} from 'src/modules/auth/selectors';
import {validatorAddress} from 'src/modules/cart/validator';

import {countrySelector} from 'src/modules/common/selectors';

import {margin, padding} from 'src/components/config/spacing';
import {calcCost} from 'src/utils/product';
import {isShippingAddressValid} from 'src/utils/func';
import {red} from 'src/components/config/colors';

class Shipping extends React.Component {
  constructor(props, context) {
    super(props, context);
    const {shipping, dispatch} = this.props;

    this.state = {
      useAsBilling: true,
      errors: Map(),
      editAddress: false || !isShippingAddressValid(shipping),
      loadingMethods: true,
      loadingMethodsError: false,
    };

  }

  onChange = (key, value) => {
    const {dispatch} = this.props;
    this.setState(prevState => ({errors: prevState.errors.delete(key)}));
    dispatch(changeData(['shipping', key], value));
  };

  /**
   * Handle re user my address
   */
  handleUserMyShippingAddress = () => {
    const {dispatch, shippingInit} = this.props;
    dispatch(changeData(['shipping'], shippingInit));
    dispatch(changeData(['shipping', "email"], this.props.user.get("user_email")));
    this.setState({loadingMethods: true});
  };

  setShippingMethods = packages => {
    let error = true;

    try{
      if(packages && packages.length > 0) {
        const {dispatch} = this.props;
        const methods = packages.map(item => get(item, 'available_method', null)).filter(item => item);

        if(methods.length == packages.length) {
          error = false;
          dispatch(updateShippingLines(packages));
        }

      } 
    } catch (err) {
      // console.log(err);
    }

    this.setState({
      loadingMethods: false, 
      loadingMethodsError: error
    });

  };

  handleNext = () => {
    const {
      shipping, 
      nextStep, 
      dispatch, 
      t
    } = this.props;

    // Validation (?? There was error in code, t was used but not passed)
    let errors = validatorAddress(shipping, t);

    // if (!selected) {
    //   errors = errors.set('shipping_lines', t('cart:text_shipping_select_error'));
    // }

    if (errors.size) {
      this.setState({
        errors,
        editAddress: true,
      });
    } else {
      // Same billing address
      const {useAsBilling} = this.state;
      if (useAsBilling) {
        dispatch(changeData(['billing'], shipping));
      }
      this.setState({
        errors: Map(),
      });

      nextStep({useAsBilling});
    }
  };

  handleAddressAddition = () => {
    const {shipping, t} = this.props;

    let errors = validatorAddress(shipping, t);
    
    if (errors.size > 0) {
      this.setState({
        errors,
      });
    } else {
      this.setState({editAddress: false})  
    }
  }

  handleBackModal = () => {
    const {shipping, t, backStep} = this.props;

    let errors = validatorAddress(shipping, t);

    if (errors.size) {
      backStep();
    } else {
      this.setState({editAddress: false})  
    } 
  }

  getCountryName = (code) => {
    const {countries} = this.props;
    const allCountries = countries.toJS().data;

    var idx = allCountries.findIndex(item => item.code == code);
    if (idx != -1) {
      const country = allCountries[idx].name;
      // console.log(country);
      return country;
    }

    return code;

  }

  getStateName = (cc, sc) => {
    const {countries} = this.props;
    const allCountries = countries.toJS().data;

    var ccIdx = allCountries.findIndex(item => item.code == cc);
    if (ccIdx != -1) {
      const states = allCountries[ccIdx].states;
      
      var scIdx = states.findIndex(item => item.code == sc);

      if(scIdx != -1) {
        return states[scIdx].name;
      }

    }

    return sc;

  }

  showShippingAddress = () => {
    const {shipping} = this.props;

    // this.getCountryName(shipping.get('country'));
    // this.getStateName(shipping.get('country'), shipping.get('state'));

    return (
      <>
        <Text colorSecondary style={styles.textName}>
          {shipping.get('first_name')} {shipping.get('last_name')}
        </Text>
        <Text colorThird style={styles.textBilling}>
          {shipping.get('address_1')}
        </Text>
        {shipping.get('address_2') && shipping.get('address_2') != '' ? 
          (<Text colorThird style={styles.textBilling}>
            {shipping.get('address_2')}
          </Text>): null
        }

        <Text colorThird style={styles.textBilling}>
          {shipping.get('city')}
        </Text>
        <Text colorThird style={styles.textBilling}>
          {   this.getStateName(shipping.get('country'), shipping.get('state'))} - {shipping.get('postcode')}
        </Text>
        {/*<Text colorThird style={styles.textBilling}>
          {shipping.get('country')}
        </Text>*/}
        <Text colorThird style={styles.textBilling}>
          Tel: {shipping.get('phone')}
        </Text>
      </>
    );
  };

  handleEditAddress = () => {
    this.setState({editAddress: true});
  };

  render() {
    const {backStep, shipping, isLogin, t} = this.props;

    const {useAsBilling, errors, editAddress, loadingMethods, loadingMethodsError, isModal} = this.state;
    const isEmpty = editAddress || !isShippingAddressValid(shipping); 
    
    const computeShipping = isShippingAddressValid(shipping, true);

    return (
      <View style={{ flex: 1 }}>

      <ScrollView>
        <Container style={styles.content}>
          <Heading
            title={t('cart:text_delivery')}
            subTitleComponent={isLogin && (
              <Button
                title={editAddress ? t('cart:text_use_my_address') : t('common:text_edit')}
                type={'outline'}
                size={'small'}
                onPress={editAddress ? this.handleUserMyShippingAddress : this.handleEditAddress}
              />
            )}
            containerStyle={[styles.textTitle, styles.headingDelivery]}
          />
          
          {/*isEmpty ? !isModal ? (<ShippingForm
            errors={errors}
            data={shipping}
            onChange={this.onChange}
          />) : null : (this.showShippingAddress())*/}

          {!isEmpty ? this.showShippingAddress() : null}

          <Modal
            visible={isEmpty}
            backdropColor='transparent'
            onRequestClose={() => this.handleBackModal()}
          >
          <View style={{flex: 1}}>
          <ScrollView>
            <Container style={{paddingTop: 0}}>
            <Header
              leftComponent={<IconHeader onPress={() => this.handleBackModal()}/>}
              centerComponent={<TextHeader title={t('cart:text_add_billing')} />}
            />
            <ShippingForm
              errors={errors}
              data={shipping}
              onChange={this.onChange}
            />
            </Container>
          </ScrollView>
          
          <Container style={styles.footer}>
            <Button title={t('cart:text_add_address')} onPress={() => this.handleAddressAddition()}/>
          </Container>
          
          </View>
        </Modal>


          {/*<View style={styles.useAsBilling}>
            <Text style={styles.usAsBillingText} colorSecondary>
              {t('cart:text_use_billing')}
            </Text>
            <Switch
              value={useAsBilling}
              onValueChange={() => this.setState({useAsBilling: !useAsBilling})}
            />
          </View>*/}
                     
          <Heading title={t('cart:text_shipping_method')}
            containerStyle={[{marginTop: margin.big + margin.large}, styles.textTitle]}
          />
          
          <ShippingMethod
            setShippingMethods={this.setShippingMethods}
            compute={computeShipping}
          />

        </Container>
      </ScrollView>

      <Container>
        <Row style={styles.footer}>
          <Col>
              <Button
                type="outline"
                onPress={backStep}
                title={t('common:text_back')}
              />
            </Col>
            <Col>
              <Button 
                disabled={loadingMethodsError} 
                loading={loadingMethods} 
                onPress={this.handleNext} 
                title={t('common:text_next')}/>
            </Col>
        </Row>
      </Container>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  content: {
    paddingTop: padding.large,
  },
  headingDelivery: {
    alignItems: 'center',
  },
  textTitle: {
    paddingTop: 0,
    paddingBottom: padding.base,
  },
  useAsBilling: {
    flexDirection: 'row',
    marginTop: margin.large + 4,
    marginBottom: margin.large + margin.big,
  },
  usAsBillingText: {
    marginVertical: 3,
    flex: 1,
  },
  footer: {
    // padding: padding.base, 
    marginBottom: margin.big,
  },
});

const mapStateToProps = state => ({
  shipping: selectShippingAddress(state),
  shippingInit: shippingAddressSelector(state),
  isLogin: isLoginSelector(state),
  countries: countrySelector(state),
  user: userSelector(state),
});

export default compose(
  withTranslation(),
  connect(mapStateToProps),
)(Shipping);
