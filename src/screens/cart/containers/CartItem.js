import React from 'react';
import split from 'lodash/split';
import get from 'lodash/get';
import { compose } from 'redux';
import { withTranslation } from 'react-i18next';


import {fromJS} from 'immutable';
import unescape from 'lodash/unescape';
import {StyleSheet, View} from 'react-native';
import {withTheme, Image, Text} from 'src/components';
import {Row, Col} from 'src/containers/Gird';
import Quantity from 'src/containers/Quantity';

import {grey4} from 'src/components/config/colors';
import {padding, margin} from 'src/components/config/spacing';
import {sizes, lineHeights} from 'src/components/config/fonts';

import currencyFormatter from 'src/utils/currency-formatter';

class CartItem extends React.Component {
  // onChange = quantity => {
  //   const {changeQuantity, item} = this.props;
  //   changeQuantity(item, quantity);
  // };

  renderVariation = (item, index) => {
    return (
      <Text key={index} style={styles.textAttribute}>
        {item.name} : {item.option}
      </Text>
    );
  };

  getUrlImage = thumb => {
    if (!thumb || typeof thumb !== 'string') {
      return null;
    }
    const array = split(thumb, 'src="');
    return split(array?.[1] ?? '', '"')[0];
  };

  render() {
    const {theme, item, currency, updateQuantity, goToProduct, goToStore, style, t} = this.props;
    if (!item) {
      return null;
    }

    const {
      key,
      product_id,
      thumb,
      thumbnail,
      is_sold_individually,
      product_name: name,
      quantity,
      line_subtotal,
      line_total,
      variation,
      variation_data,
      product_image,
      vendor, 
      gallery
    } = item;

    //Hiding attributes..it's present in the name
    // const attributes = Object.keys(variation_data).map(key => { 
    //   return {name: key, option: variation_data[key]}
    // });

    const attributes = null;

    const image = product_image || thumbnail;

    return (
      <Row
        style={[
          styles.container,
          {
            backgroundColor: theme.colors.bgColor,
            borderColor: theme.colors.border,
          },
          style && style,
        ]}>
        <Image source={{uri: image}} style={styles.image} />

        <Col style={styles.content}>
          <View>
            <Text
              medium
              onPress={() => goToProduct(product_id)}
              style={styles.title}>
              {unescape(name)}
            </Text>
            {<Row style={styles.viewAttribute}>
              {attributes ? attributes.map((item, index) => this.renderVariation(item, index)) : null}
            </Row>}
            <Text style={style.title}>{t('cart:text_sold_by')}<Text onPress={() => goToStore(vendor.id)}>{vendor.store_name}</Text></Text>
          </View>
          {!is_sold_individually && (
            <Quantity value={parseInt(quantity)} onChange={(value) => updateQuantity(item, value)} />
          )}
        </Col>
        <Col style={{maxWidth: 70}}>
        {line_total != line_subtotal ? (
          <Row><Text style={[styles.price, styles.originalPrice]}>{currencyFormatter(line_subtotal, currency)}
          </Text></Row>) : null}
          <Row><Text style={styles.price}>{currencyFormatter(line_total, currency)}</Text></Row>
        </Col>
      </Row>  
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 0,
    marginRight: 0,
    padding: padding.large,
    borderBottomWidth: 1,
  },
  image: {
    width: 80,
    height: 107,
  },
  content: {
    paddingLeft: padding.big,
    paddingRight: padding.large,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  title: {
    marginBottom: margin.small - 1,
  },
  viewAttribute: {
    marginBottom: margin.small,
    marginLeft: 0,
    marginRight: 0,
    flexWrap: 'wrap',
  },
  textAttribute: {
    fontSize: sizes.h6 - 2,
    lineHeight: lineHeights.h6 - 2,
    color: grey4,
    marginRight: margin.small,
  },
  originalPrice: {
    textDecorationLine: 'line-through', color: 'red'
  },
  price:{
    textAlign:'right',
    flex: 1,
  }
});

export default compose(withTranslation(), withTheme)(CartItem);
