import React from 'react';
import split from 'lodash/split';
import join from 'lodash/join';
import replace from 'lodash/replace';
import {View, ScrollView, StyleSheet} from 'react-native';

import merge from 'lodash/merge';

import {Text} from 'src/components';
import ChooseItem from 'src/containers/ChooseItem';
import TextHtml from 'src/containers/TextHtml';

import {green} from 'src/components/config/colors';
import {margin, padding} from 'src/components/config/spacing';
import {lineHeights} from 'src/components/config/fonts';

import {changeFont, changeSize} from 'src/utils/text-html';

class ShippingMethod extends React.Component {
  
  constructor(props, context) {
    super(props, context);
  }

  // render shipping method
  renderItem = (item, index, idStore, select) => {
    const styleHtml = merge(
      {
        div: {
          lineHeight: lineHeights.base,
        },
      },
      changeFont('medium'),
      changeSize('h4')
    );

    const topElement = (
      <TextHtml value={item.label} style={styleHtml}/>
    );
    return (
      <ChooseItem
        item={item}
        onPress={() => onChangeShippingMethod(idStore, item.id)}
        active={item.id === select}
        topElement={topElement}
        colorSelect={green}
        containerStyle={styles.containerItem}
        style={styles.item}
        key={item.id}
      />
    );
  };
  
  render() {
    const {method, selectMethods} = this.props;
    const {package_details, available_methods} = method;
    const vendor = method?.package?.vendor_id ?? '0';
    const selectVisit = selectMethods.get(typeof vendor === 'number' ? vendor.toString(): vendor);
    
    const arrayProduct = typeof package_details === 'string' ? split(package_details, ', '): [];
    const prepareNameProduct = arrayProduct.map(n => replace(n, '&times;', 'x'));

    // console.log("WTF");    
    // console.log(available_methods);

    return (
      <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {available_methods.map((item, index) => renderItem(item, index, vendor, selectVisit))}
        </ScrollView>
        <Text h6 colorThird h6Style={styles.textProduct}>{join(prepareNameProduct, '\n')}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    paddingVertical: padding.large,
  },
  containerItem: {
    marginRight: margin.base + 2,
  },
  textProduct: {
    marginTop: 4,
  },
});

ShippingMethod.defaultprops = {};

export default ShippingMethod;
