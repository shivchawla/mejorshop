import React from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  ActivityIndicator,
} from 'react-native';

import {withTranslation} from 'react-i18next';
import moment from 'moment';
import {connect} from 'react-redux';
import {compose} from 'redux';

import InputSelectValue from 'src/containers/input/InputSelectValue';
import Input from 'src/containers/input/Input';
import {SearchBar, Modal, ListItem, Loading} from 'src/components';

import {countrySelector} from 'src/modules/common/selectors';
import {fetchCountries} from 'src/modules/common/actions';

import {fromCharCode} from 'src/utils/string';
import {padding, margin} from 'src/components/config/spacing';

class InputCountry extends React.Component {
  constructor(props, context) {
    super(props, context);
    const {country, value} = props;
    const countries = country.get('data').toJS();

    const selected = countries.find(country => country.code === value);

    this.state = {
      visible: false,
      visibleState: false,
      visibleCity: false,
      search: '',
      states: selected && selected.states ? selected.states : [],
      cities: selected && selected.cities ? selected.cities : [],
    };
  }

  componentDidMount() {
    const {country, dispatch} = this.props;

    if (
      !country.get('expire') ||
      moment.unix(country.get('expire')).isBefore(moment())
    ) {
      dispatch(fetchCountries());
    }

  }

  setModalVisible = visible => {
    this.setState({
      visible,
    });
  };

  setModalStateVisible = visible => {
    this.setState({
      visibleState: visible,
    });
  };

  setModalCityVisible = visible => {
    this.setState({
      visibleCity: visible,
    });
  };

  handleCountrySelect = item => {
    const {onChange, country} = this.props;

    const countries = country.get('data').toJS();

    const findCountry = countries.find(country => country.code === item.code);
     
    const state = findCountry.states && findCountry.states[0] ? findCountry.states[0].code : '';
    const city = state && findCountry.cities && findCountry.cities[state] ? findCountry.cities[state] : [];

    this.setState({
      states: findCountry.states ? findCountry.states : [],
      cities: findCountry.cities ? findCountry.cities : [],
    });

    onChange('country', item.code);
    if (state.length > 0) {
      onChange('state', state);
    }

    if (city.length > 0) {
      onChange('city', city);
    }

    this.setModalVisible(false);
  };

  handleStateSelect = value => {
    const {onChange} = this.props;
  
    onChange('state', value);
    onChange('city', '');
    onChange('postcode', '');

    this.setModalStateVisible(false);
  };

  handleCitySelect = value => {
    const {onChange} = this.props;
    // console.log("City Selected");
    // console.log(value);
    
    onChange('city', value[0]);
    onChange('postcode', value[1]);
    this.setModalCityVisible(false);
  };

  updateSearch = search => {
    this.setState({search});
  };

  render() {
    const {visible, visibleState, visibleCity, search} = this.state;
    const {label, value, country, state, city, errorCountry, errorState, errorCity, t} = this.props;

    const countries = country.get('data').toJS();
    const loading = country.get('loading');

    const selected = countries.find(country => country.code === value);

    //Either the states

    const states = this.state.states.length > 0 ? this.state.states : (selected && selected.states ? selected.states : []);
    const cities = this.state.cities.length > 0 ? this.state.cities : (selected && selected.cities ? selected.cities : []);

    const dataCountry = countries.filter(
      country => country.name.toLowerCase().indexOf(search.toLowerCase()) >= 0,
    );

    const findState = states.find(valueState => valueState.code === state);
    const nameState = findState ? findState.name : '';

    const allCityList = Object.values(cities);
    const cityList = state && cities[state] ? cities[state] :
            allCityList.length > 0 ? allCityList.reduce((prev, current) => [...prev, ...current]) : [];

    const findCity = cityList.find(valueCity => valueCity[0] === city);
    const nameCity = findCity ? findCity[0] : '';
    const postalCity = findCity ? findCity[1] : '';


    return (
      <>
        <InputSelectValue
          onPress={() => this.setModalVisible(true)}
          label={label}
          value={selected ? fromCharCode(selected.name) : ''}
          error={errorCountry}
        />
        <View style={{marginTop: margin.base}}>
          {states.length > 0 ? (
            <InputSelectValue
              onPress={() => this.setModalStateVisible(true)}
              label={t('common:text_state')}
              value={nameState}
              error={errorState}
            />
          ) : (
            <Input
              label={t('common:text_state')}
              value={state}
              onChangeText={value => this.handleStateSelect(value)}
            />
          )}
        </View>
        <View style={{marginTop: margin.base}}>
          {cityList.length > 0 ? (
            <InputSelectValue
              onPress={() => this.setModalCityVisible(true)}
              label={t('inputs:text_city')}
              value={nameCity}
              error={errorCity}
            />
          ) : (
            <Input
              label={t('inputs:text_city')}
              value={city}
              onChangeText={value => this.handleCitySelect(value)}
            />
          )}
        </View>
        {/*Modal country*/}
        <Modal
          visible={visible}
          setModalVisible={this.setModalVisible}
          ratioHeight={1.0}
          underTopElement={
            <View style={{paddingHorizontal: 10}}>
              <SearchBar
                cancelButton={false}
                placeholder={t('common:text_search_country_mobile')}
                onChangeText={this.updateSearch}
                value={search}
                platform="ios"
                onClear={() => this.setState({search: ''})}
                containerStyle={{
                  paddingVertical: 0,
                  paddingBottom: padding.small,
                }}
              />
            </View>
          }>
          <View
            style={{
              paddingHorizontal: padding.big,
              paddingBottom: padding.base,
            }}>
            {loading ? (
              <ActivityIndicator />
            ) : (
              <FlatList
                data={dataCountry}
                keyExtractor={item => item.code}
                renderItem={({item, index}) => (
                  <ListItem
                    onPress={() => this.handleCountrySelect(item)}
                    title={fromCharCode(item.name)}
                    type="underline"
                    activeOpacity={1}
                    rightIcon={
                      value === item.code
                        ? {
                            name: 'check',
                            size: 22,
                          }
                        : null
                    }
                    containerStyle={styles.item}
                  />
                )}
              />
            )}
          </View>
        </Modal>
        {/*Modal state*/}
        <Modal
          visible={visibleState}
          setModalVisible={this.setModalStateVisible}
          ratioHeight={1.0}>
          <View
            style={{
              paddingHorizontal: padding.big,
              paddingBottom: padding.base,
            }}>
            <FlatList
              data={states}
              keyExtractor={item => item.code}
              renderItem={({item, index}) => (
                <ListItem
                  onPress={() => this.handleStateSelect(item.code)}
                  title={fromCharCode(item.name)}
                  type="underline"
                  activeOpacity={1}
                  rightIcon={
                    state === item.code
                      ? {
                        name: 'check',
                        size: 22,
                      }
                      : null
                  }
                  containerStyle={styles.item}
                />
              )}
            />
          </View>
        </Modal>
      {/*Modal city*/}
        <Modal
          visible={visibleCity}
          setModalVisible={this.setModalCityVisible}
          ratioHeight={1.0}>
          <View
            style={{
              paddingHorizontal: padding.big,
              paddingBottom: padding.base,
            }}>
            <FlatList
              data={cityList}
              keyExtractor={item => item[0]}
              renderItem={({item, index}) => (
                <ListItem
                  onPress={() => this.handleCitySelect(item)}
                  title={fromCharCode(item[0])}
                  type="underline"
                  activeOpacity={1}
                  rightIcon={
                    city === item[0]
                      ? {
                        name: 'check',
                        size: 22,
                      }
                      : null
                  }
                  containerStyle={styles.item}
                />
              )}
            />
          </View>
        </Modal>
      </>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    paddingHorizontal: 0,
    paddingVertical: padding.large - 2,
  },
});

const mapStateToProps = state => ({
  country: countrySelector(state),
});

export default compose(
  withTranslation(),
  connect(mapStateToProps),
)(InputCountry);
