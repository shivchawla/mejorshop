import React from 'react';
import { View, ActivityIndicator, ScrollView, StyleSheet } from 'react-native';

import forEach from 'lodash/forEach';
import merge from 'lodash/merge';
import debounce from 'lodash/debounce'


import { connect } from 'react-redux';
import {compose} from 'redux';
import {withTranslation} from 'react-i18next';

import { Text } from 'src/components';
// import ChooseItem from 'src/containers/ChooseItem';
import {Row, Col} from 'src/containers/Gird';
import TextHtml from 'src/containers/TextHtml';

// import { getContinentCode, getZones } from 'src/modules/cart/service';
import { currencySelector, defaultCurrencySelector, listCurrencySelector } from 'src/modules/common/selectors';

import { selectShippingAddress } from 'src/modules/cart/selectors';
import { fetchShippingMethod } from 'src/modules/cart/service';
import currencyFormatter from 'src/utils/currency-formatter';

import { margin, padding } from 'src/components/config/spacing';
import { red, blue, teal, yellow, pink, olive, orange, violet, purple, brown } from 'src/components/config/colors';
import { calcCost } from 'src/utils/product';
import {isShippingAddressValid} from 'src/utils/func';
import {lineHeights} from 'src/components/config/fonts';
import {changeFont, changeSize} from 'src/utils/text-html';

const color = [red, blue, teal, yellow, pink, olive, orange, violet, purple, brown];

class ShippingMethod extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      loading: true,
      shippingMethods: [],
    };

    this.getShippingMethods = debounce(this.getShippingMethods, 2000);
  }

  componentDidMount() {
    const { shipping, compute } = this.props;
    if (compute) {
      this.getShippingMethods(shipping);
    }
  }

  compareShippingAddress = (oldShipping, newShipping) => {
    const {postcode: oPostcode} = oldShipping.toJS();
    const {postcode: nPostcode} = newShipping.toJS();

    return oPostcode != nPostcode;    
  }

  componentDidUpdate(prevProps) {
    const { shipping, compute } = this.props;
    const { shipping: oldShipping } = prevProps;

    if (this.compareShippingAddress(oldShipping, shipping) && compute) {
      this.getShippingMethods(shipping)
    }
  }

  /**
   * Get shipping methods
   * @param cc: country code
   * @returns {Promise<void>}
   */
  getShippingMethods = async shipping => {
    const { setShippingMethods } = this.props;
    const isValid = isShippingAddressValid(shipping, true);

    try {
      if (isValid) {
        this.setState({
          loading: true,
        }); 

        const {country, state, city, postcode} = shipping.toJS();
        
        const query = {
          country,
          state, 
          city, 
          postcode, 
        };

        const shippingMethods = await fetchShippingMethod(query);

        this.setState({
          loading: false,
          shippingMethods: shippingMethods,
        });

      } else {
        throw new Error("Shipping Address is not valid for computation");
      }
    } catch (err) {
      this.setState({
        loading: false,
      })
    }

    //After complete
    setShippingMethods(this.state.shippingMethods);
  };

  renderItem = (item, index) => {
    const {available_method, store_name} = item;

    // const {store: {store_name}} = item;
    const {t} = this.props;

    const styleHtml = merge(
      {
        div: {
          lineHeight: lineHeights.base,
        },
      },
      changeFont('medium'),
      changeSize('h4')
    );

    let view;
    // if (available_methods && available_methods.length > 0) {
    if (available_method) { 
      // const method = available_methods[0];
      const method = available_method;
      view = (<Row key={index} style={styles.container}>
          <Col>
            <Text medium style={styles.textTitle}>
              {store_name ? t('cart:text_shipping_store', {name: store_name}) : 'MejorShop Envío'}
            </Text>
          </Col>
          <TextHtml value={method.label} style={styleHtml}/>
        </Row>);
    }
    
    return view;
  }

  render() {
    const { loading, shippingMethods} = this.state;

    return (<View style={[styles.viewMethod, {flex: 1 }]}>
      {!loading ? 
        shippingMethods.length > 0 ? 
          shippingMethods.map((method, index) => 
          this.renderItem(method, index))
          : (<Text medium style={{color: 'red', marginTop: margin.big, textAlign: 'center'}}>
              No hay métodos de envío disponibles para tu ubicación. Lo sentimos.
            </Text>) 
        : (<ActivityIndicator/>)
      }
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    marginBottom: margin.big,
  },
  textTitle: {
    paddingTop: 0,
    paddingBottom: padding.base,
  },
  textMethod: {
    paddingBottom: padding.small - 3,
  },
  viewMethod: {
    marginBottom: margin.base,
  },
  item: {
    paddingVertical: padding.base,
  },
  containerItem: {
    marginRight: margin.base,
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 1,
  },
});

ShippingMethod.defaultprops = {};

const mapStateToProps = state => ({
  shipping: selectShippingAddress(state),
  currency: currencySelector(state),
  defaultCurrency: defaultCurrencySelector(state),
  currencies: listCurrencySelector(state),
});

export default compose(
  withTranslation(),
  connect(mapStateToProps)
)(ShippingMethod);
