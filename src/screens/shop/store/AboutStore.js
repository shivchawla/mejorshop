import React from 'react';
import lowerCase from 'lodash/lowerCase';
import {connect} from 'react-redux';
import moment from 'moment';

import {View, StyleSheet, Linking, ScrollView, Image, Dimensions} from 'react-native';
import {Text, Icon} from 'src/components';
import Container from 'src/containers/Container';
import SocialIcon from 'src/containers/SocialIcon';
import TextHtml from 'src/containers/TextHtml';

import {countrySelector} from 'src/modules/common/selectors';
import {fetchCountries} from 'src/modules/common/actions';

import {grey4} from 'src/components/config/colors';
import {margin, padding} from 'src/components/config/spacing';
import {lineHeights} from 'src/components/config/fonts';

const {width} = Dimensions.get('window');
const widthImage = width - padding.large * 2;
const heightImage = (widthImage * 242) / 345;

const checkValue = str => {
  if (!str || lowerCase(str) === 'undefined' || lowerCase(str) === 'null' || str === 'N/A') {
    return null;
  }
  return true;
};

const getAddress = (address, countries) => {
  if (!address) {
    return '';
  }
  let str = '';
  if (checkValue(address.street_2)) {
    str = str + address.street_2;
  }
  if (checkValue(address.street_1)) {
    str =
      str.length > 0 ? str + `, ${address.street_1}` : str + address.street_1;
  }
  if (checkValue(address.city)) {
    str = str.length > 0 ? str + `, ${address.city}` : str + address.city;
  }
  if (checkValue(address.state)) {
    str = str.length > 0 ? str + `, ${address.state}` : str + address.state;
  }
  if (checkValue(address.country)) {
    if (countries && countries.length > 0) {
      const findCountry = countries.find(c => c.code === address.country);

      if (findCountry) {
        str = str.length > 0 ? str + `, ${findCountry.name}` : str + findCountry.name;
      }
    }
  }

  return str;
};

const typeSocial = {
  facebook: 'facebook',
  gplus: 'google-plus-official',
  youtube: 'youtube',
  twitter: 'twitter',
  linkedin: 'linkedin',
  pinterest: 'pinterest',
  instagram: 'instagram',
  flickr: 'flickr',
};

class AboutStore extends React.Component {
  componentDidMount() {
    const {country, dispatch} = this.props;
    if (
      !country.get('expire') ||
      moment.unix(country.get('expire')).isBefore(moment())
    ) {
      // dispatch(fetchCountries());
      var fetchCountriesNotRequired = true;
    }
  }
  render() {
    // const {store, country} = this.props;
    const {store} = this.props;

    if (!store) {
      return null;
    }
    const {vendor_address, vendor_email, vendor_phone, social, about} = store;

    // const countries = country.get('data').toJS();

    // const addressStr = store.vendor_address;
    // getAddress(address, countries);
    // console.log(about);

    return (
      <ScrollView>
        <Container>
          {/*<Image*/}
          {/*  source={require('src/assets/images/map.png')}*/}
          {/*  style={{width: widthImage, height: heightImage, marginBottom: margin.big + 7}}/>*/}
          <View>
            <TextHtml value={about}/>
            {vendor_address && vendor_address != '' && (<View style={styles.viewRowInfo}>
              <Icon
                name={'map'}
                size={16}
                containerStyle={styles.iconInfo}
                color={grey4}
              />
              <Text>{vendor_address}</Text>
            </View>)}

            {vendor_phone && vendor_phone != '' && (<View style={styles.viewRowInfo}>
              <Icon
                name="phone-call"
                size={16}
                containerStyle={styles.iconInfo}
                color={grey4}
              />
              <Text>{vendor_phone}</Text>
            </View>)}

            {vendor_email && vendor_email != '' && (<View style={styles.viewRowInfo}>
              <Icon
                name="mail"
                size={16}
                containerStyle={styles.iconInfo}
                color={grey4}
              />
              <Text>{vendor_email}</Text>
            </View>)}

          </View>
          <View style={styles.viewSocial}>
            {Object.keys(social || {}).map((key, index) =>
              social[key] ? (
                <SocialIcon
                  key={key}
                  light
                  raised={false}
                  type={typeSocial[key]}
                  style={styles.socialIconStyle}
                  iconSize={15}
                  onPress={() => Linking.openURL(social[key])}
                />
              ) : null,
            )}
          </View>
        </Container>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  description: {
      marginBottom: margin.big + 7,
      lineHeight: lineHeights.h4,
  },
  viewInfo: {
    width: 250,
  },
  viewRowInfo: {
    flexDirection: 'row',
    marginBottom: margin.base,
    marginTop: margin.big, 
  },
  iconInfo: {
    width: 30,
    marginVertical: 3,
    alignItems: 'flex-start',
  },
  viewSocial: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -margin.small / 2,
    marginTop: margin.large + 2,
    marginBottom: margin.large,
  },
  socialIconStyle: {
    width: 32,
    height: 32,
    margin: 0,
    marginHorizontal: margin.small / 2,
    paddingTop: 0,
    paddingBottom: 0,
    marginBottom: margin.small,
  },
});

const mapStateToProps = state => ({
  country: countrySelector(state),
});

export default connect(mapStateToProps)(AboutStore);
