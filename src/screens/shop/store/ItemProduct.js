import React from 'react';

import {compose} from 'recompose';
import {connect} from 'react-redux';
import {List, Map, fromJS} from 'immutable';

import {withNavigation} from 'react-navigation';
import {useTranslation} from 'react-i18next';

import unescape from 'lodash/unescape';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Image, Badge, Text, ThemeConsumer} from 'src/components';
import WishListIcon from 'src/containers/WishListIcon';
import Price from 'src/containers/Price';
import Rating from 'src/containers/Rating';

import {configsSelector} from 'src/modules/common/selectors';
import {addToCart} from 'src/modules/cart/actions';

import {white, black} from 'src/components/config/colors';
import {borderRadius, margin} from 'src/components/config/spacing';
import {mainStack} from 'src/config/navigator';

import {SIMPLE} from 'src/config/product';

const ItemProduct = React.memo(props => {
  const {
    item,
    width,
    height,
    navigation,
    dispatch,
    theme,
    configs,
  } = props;
  const {
    name,
    images,
    price_format,
    on_sale,
    is_new,
    type,
    average_rating,
    rating_count,
    id,
    purchasable,
    stock_status,
  } = item;
  const {t} = useTranslation();

  const productItemStyle = {
    width: width,
  };

  const productItemImageStyle = {
    width,
    height,
  };
  const listStatus = ['instock', 'onbackorder'];

  const out_of_stock = stock_status == 'outofstock';

  return (
    <ThemeConsumer>
      {({theme}) => (
        <TouchableOpacity
          delayPressIn={150}
          style={productItemStyle}
          onPress={() => navigation.push(mainStack.product, {id})}>
          <View>
            <Image
              source={
                images && images.length
                  ? {uri: images[0].shop_single}
                  : require('src/assets/images/pDefault.png')
              }
              style={productItemImageStyle}
              PlaceholderContent={<ActivityIndicator />}
            />
            <View style={styles.labelWrap}>
              <View style={styles.viewHeaderLabel}>
                <View>
                  {is_new ? (
                    <Badge
                      value={t('common:text_new')}
                      status="success"
                      containerStyle={styles.badge}
                    />
                  ) : null}
                  
                  {on_sale && !out_of_stock ? (
                    <Badge value={t('common:text_sale')} status="warning" />
                  ) : null}
                  
                  {out_of_stock ? (
                    <Badge value={t('common:text_outofstock')} status="error" />
                  ) : null}

                </View>
                <WishListIcon product_id={id} />
              </View>
              {configs.get('toggleAddButtonProduct') &&
                configs.get('toggleCheckout') &&
                type === SIMPLE &&
                purchasable &&
                listStatus.includes(stock_status) && (
                  <TouchableOpacity
                    style={styles.buttonAdd}
                    onPress={() =>
                      dispatch(
                        addToCart({
                          product_id: item.id,
                          quantity: 1,
                          variation: Map(),
                          product: fromJS(item),
                          meta_data: List(),
                        }),
                      )
                    }>
                    <Text h4 medium style={styles.textAdd}>
                      +
                    </Text>
                  </TouchableOpacity>
                )}
            </View>
          </View>
          <View style={styles.viewInfo}>
            <Text
              h5
              style={[
                styles.textName,
                {
                  color: theme.ProductItem.color,
                },
              ]}
            >
              {unescape(name)}
            </Text>
            <Price
              price_format={price_format}
              type={type}
              style={styles.textPrice}
            />
            {configs.get('toggleReviewProduct') &&
            configs.get('toggleRatingProduct') ? (
              <View style={styles.viewFooter}>
                <Rating
                  size={12}
                  startingValue={parseFloat(average_rating)}
                  readonly
                />
                <Text style={styles.nameRating}>({rating_count})</Text>
              </View>
            ) : null}
          </View>
        </TouchableOpacity>
      )}
    </ThemeConsumer>  
  );
});

const styles = StyleSheet.create({
  viewInfo: {
    marginTop: margin.base + 2,
  },
  labelWrap: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    bottom: 12,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  viewHeaderLabel: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textName: {
    marginBottom: 4,
  },
  textPrice: {
    marginBottom: margin.small,
  },
  badge: {
    marginBottom: 5,
  },
  viewFooter: {
    flexDirection: 'row',
    // justifyContent: '',
    alignItems: 'center',
  },
  nameRating: {
    fontSize: 10,
    lineHeight: 15,
    marginLeft: margin.small - 2,
  },
  buttonAdd: {
    backgroundColor: black,
    width: 29,
    height: 29,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: borderRadius.base,
  },
  textAdd: {
    color: white,
  },
});

ItemProduct.defaultProps = {
  width: 227,
  height: 227,
};

const mapStateToProps = state => {
  return {
    configs: configsSelector(state),
  };
};

export default compose(
  withNavigation,
  connect(mapStateToProps),
)(ItemProduct);
