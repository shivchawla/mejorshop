import React from 'react';
import {withTranslation} from 'react-i18next';
import {Map, fromJS} from 'immutable';

import throttle from  'lodash/throttle';

import {View, StyleSheet} from 'react-native';

import {Row, Col} from 'src/containers/Gird';
import Input from 'src/containers/input/Input';
import InputCountry from './InputCountry';

import {margin} from 'src/components/config/spacing';

class ShippingAddress extends React.Component {
  constructor(props, context) {
    super(props, context);
    const {data, metaData} = props
    this.state = {
      address: data ? data.toJS() : {},
      meta_data: metaData ? metaData.toJS() : {},
    };

    // this.updateValue = throttle(this.updateValue, 1000, {trailing: true});

  }

  updateValue = (key, value) => {
      this.props.onChange(key, value);
  }

  handleChange = (key, value) => {
    this.setState(prevState => {
      var oldAddress = prevState.address;
      var old_meta_data = prevState.meta_data;

      if (key != 'nit') {
        oldAddress[key] = value;
      } else {
        old_meta_data['_billing_wooccm11'] = 'NIT';
        old_meta_data['_billing_wooccm12'] = value;
      }
      return {address: oldAddress, meta_data: old_meta_data}});
  }

  render() {
    const {onChange, data, errors, t, isBilling = false} = this.props;
    const {address, meta_data} = this.state;

    if (!address) {
      return null;
    }

    return (<>
      {!isBilling ? (
        <View>
          <Row style={styles.row}>
            <Col>
              <Input
                error={errors && errors.get('first_name')}
                label={t('inputs:text_first_name')}
                value={address['first_name']}
                onChangeText={value => this.handleChange('first_name', value)}
                onEndEditing={(e) => this.updateValue('first_name', e.nativeEvent.text)}
              />
            </Col>
            <Col>
              <Input
                error={errors && errors.get('last_name')}
                label={t('inputs:text_last_name')}
                value={address['last_name']}
                onChangeText={value => this.handleChange('last_name', value)}
                onEndEditing={(e) => this.updateValue('last_name', e.nativeEvent.text)}
              />
            </Col>
          </Row>

          {/*<Row style={styles.row}>
            <Col>
              <Input
                label={t('inputs:text_company')}
                value={data.get('company')}
                onChangeText={value => onChange('company', value)}
              />
            </Col>
          </Row>*/}

          <Row style={styles.row}>
            <Col>
              <InputCountry
                error={errors && errors.get('country')}
                label={t('inputs:text_country')}
                value={data.get('country')}
                onChange={onChange}
                state={data.get('state')}
                city={data.get('city')}
              />
            </Col>
          </Row>

          <Row style={styles.row}>
            <Col>
              <Input
                error={errors && errors.get('address_1')}
                label={t('inputs:text_address')}
                value={address['address_1']}
                onChangeText={value => this.handleChange('address_1', value)}
                onEndEditing={(e) => this.updateValue('address_1', e.nativeEvent.text)}
              />
            </Col>
          </Row>

          <Row style={styles.row}>
            <Col>
              <Input
                error={errors && errors.get('address_2')}
                label={t('inputs:text_address_2')}
                value={address['address_2']}
                onChangeText={value => this.handleChange('address_2', value)}
                onEndEditing={(e) => this.updateValue('address_2', e.nativeEvent.text)}
              />
            </Col>
          </Row>

          {/*<Row style={styles.row}>
            <Col>
              <Input
                error={errors && errors.get('city')}
                label={t('inputs:text_city')}
                value={data.get('city')}
                onChangeText={value => onChange('city', value)}
              />
            </Col>
            <Col>
              <Input
                error={errors && errors.get('postcode')}
                label={t('inputs:text_postcode')}
                value={data.get('postcode')}
                onChangeText={value => onChange('postcode', value)}
              />
            </Col>
          </Row>*/}

          <Row style={styles.row}>
            <Col>
              <Input
                keyboardType="phone-pad"
                error={errors && errors.get('phone')}
                label={t('inputs:text_phone')}
                value={address['phone']}
                onChangeText={value => this.handleChange('phone', value)}
                onEndEditing={(e) => this.updateValue('phone', e.nativeEvent.text)}
              />
            </Col>
          </Row>

        {/*<Row style={styles.row}>
          <Col>
            <Input
              error={errors && errors.get('email')}
              label={t('inputs:text_email')}
              value={data.get('email')}
              onChangeText={value => onChange('email', value)}
            />
          </Col>
        </Row>*/}
        </View>
      ) :    
      (<View>
          <Row style={styles.row}>
            <Col>
              <Input
                label={'NIT (opcional)'}
                value={meta_data['_billing_wooccm12']}
                onChangeText={value => this.handleChange('nit', value)}
                onEndEditing={(e) => this.updateValue('nit', e.nativeEvent.text)}
              />
            </Col>
          </Row>
        </View>
      )}
    </>

    );
  }
}

ShippingAddress.defaultProps = {
  errors: Map(),
};

const styles = StyleSheet.create({
  row: {
    marginBottom: margin.base,
  },
});

export default withTranslation()(ShippingAddress);
