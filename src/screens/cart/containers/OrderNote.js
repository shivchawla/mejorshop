import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import isEqual from 'lodash/isEqual';
import debounce from 'lodash/debounce';
import {withTranslation} from 'react-i18next';
import { WebView } from 'react-native-webview';

import {StyleSheet, View, TouchableOpacity, Modal} from 'react-native';
import {Text, ThemedView, Header} from 'src/components';
import {TextHeader, IconHeader, CartIcon} from 'src/containers/HeaderComponent';
import Heading from 'src/containers/Heading';
import Input from 'src/containers/input/Input';
import TextHtml from 'src/containers/TextHtml';
import ShippingForm from './ShippingForm';

import {countrySelector} from 'src/modules/common/selectors';
import {noteCustomerSelector, metaDataSelector} from 'src/modules/cart/selectors';
import {changeData} from 'src/modules/cart/actions';

import {fromCharCode} from 'src/utils/string';

import {margin, padding} from 'src/components/config/spacing';
import fonts, {lineHeights} from 'src/components/config/fonts';
import ContainerPrivacy from 'src/screens/profile/containers/ContainerPrivacy';

class OrderNote extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      editNotes: false,
      customer_note: props.customer_note,
    };
  }

  onEditNotes = () => {
    this.setState(prevState => ({
      editNotes: !prevState.editNotes,
    }));
  };

  changeNote = value => {
    // console.log("In Change Notes");
    this.props.dispatch(changeData(['customer_note'], value));
  };

  handleNote = value => {
    // console.log("In handle notes");
    this.setState({customer_note: value});
  };

  
  render() {
    const {onChange, data, errors, t} = this.props;
    const {editNotes, customer_note} = this.state;
    
    return (
      <View style={styles.container}>

        <Heading
          title={t('cart:text_note')}
          subTitle={customer_note != '' ? '' : !editNotes ? t('common:text_edit') : t('common:text_hide')}
          onPress={this.onEditNotes}
          containerStyle={styles.headerText}
        />

        {editNotes || customer_note != '' ? (<Input
            label={t('inputs:text_note')}
            multiline
            value={customer_note}
            onChangeText={this.handleNote}
            onEndEditing={(e) => this.changeNote(e.nativeEvent.text)}
          />) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: margin.small,
  },
  headerText: {
    paddingTop: padding.large,
    paddingBottom: padding.small,
  },
  textName: {
    marginBottom: margin.small,
  },
  textBilling: {
    lineHeight: lineHeights.h4 + 1,
  },
  textDescription: {
    marginTop: margin.big,
  },
  headerPrivacy: {
    // paddingTop: 0, height: 56
  },
});

const mapStateToProps = state => ({
  customer_note: noteCustomerSelector(state),
});

export default compose(
    withTranslation(),
    connect(mapStateToProps)
)(OrderNote);
