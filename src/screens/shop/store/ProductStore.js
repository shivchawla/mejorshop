import React, {Component} from 'react';
import {Map, fromJS} from 'immutable';
import {connect} from 'react-redux';

import {StyleSheet, View, FlatList, ActivityIndicator, Dimensions} from 'react-native';

import Container from 'src/containers/Container';
import Refine from 'src/screens/shop/containers/Refine';
// import ItemProduct from './ItemProduct';
import ItemProduct from 'src/containers/ProductItem';
import ModalFilter from './ModalFilter';

import {green} from 'src/components/config/colors';
import {padding, margin} from 'src/components/config/spacing';
import {getProductsByVendorId} from 'src/modules/vendor/service';
import {prepareProductItem, findCategory} from 'src/utils/product';
import {
  columnProductSelector,
  currencySelector,
  daysBeforeNewProductSelector,
  defaultCurrencySelector,
} from 'src/modules/common/selectors';

import {PER_PAGE} from 'src/config/product';

// import {fetchVendorDetail} from 'src/modules/vendor/actions';

const { width } = Dimensions.get('window');

const widthImage = (col = 1) => {
  const widthFlatList = width - 2 * padding.large;
  const widthDistantImage = (col - 1) * padding.small;
  return (widthFlatList - widthDistantImage) / col;
};
const heightImage = (w = 168) => {
  return w; //(w * 200) / 168;
};

class ProductStore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      refreshing: false,
      loadingMore: false,
      data: fromJS([]),
      page: 1,
      sortBy: {},
      isModalRefine: false,
      category: ''
    };
  }
  componentDidMount() {
    this.fetchProducts();
    // this.fetchCategories();
  }
  getData = (vendor_id, page) => {
    const {lang} = this.props;
    const {sortBy} = this.state;

    const objectSortBy = sortBy && sortBy.query ? sortBy.query : {};

    const query = Map({
      status: 'publish',
      lang: lang,
      per_page: PER_PAGE,
      page: page,
      ...objectSortBy,
    });
    return getProductsByVendorId(vendor_id, query.toJS());
  };

  // fetchCategories = async () => {
  //   get_store_taxonomies
  // // }

  fetchProducts = async (page = this.state.page) => {
    try {
      const {store} = this.props;
      const dataGet = await this.getData(store.vendor_id, page);

      if (dataGet.length <= PER_PAGE && dataGet.length > 0) {
        this.setState(preState => {
          return {
            loading: false,
            refreshing: false,
            loadingMore: dataGet.length === PER_PAGE,
            data: page === 1 ? fromJS(dataGet) : preState.data.concat(fromJS(dataGet)),
          };
        });
      } else {
        this.setState({
          loadingMore: false,
          loading: false,
          refreshing: false,
        });
      }
    } catch (e) {
      this.setState({
        loading: false,
      });
    }
  };
  handleLoadMore = () => {
    const {loadingMore} = this.state;

    if (loadingMore) {
      this.setState(
        prevState => ({
          page: prevState.page + 1,
          loadingMore: true,
        }),
        () => {
          this.fetchProducts();
        },
      );
    }
  };

  handleRefresh = () => {
    this.setState(
      {
        page: 1,
        refreshing: true,
      },
      () => {
        this.fetchProducts();
      },
    );
  };
  renderFooter = () => {
    if (!this.state.loadingMore) return <View style={styles.viewFooter} />;

    return (
      <View style={[styles.viewFooter, styles.viewLoadingFooter]}>
        <ActivityIndicator animating size="small" />
      </View>
    );
  };
  sortData = dataSortBy => {
    this.setState(
      {
        sortBy: dataSortBy,
        loading: true,
        refreshing: false,
        loadingMore: false,
        data: fromJS([]),
        page: 1,
      },
      this.fetchProducts,
    );
  };

  render() {
    const {loading, refreshing, data, sortBy, isModalRefine, category} = this.state;
    const {column, currency, defaultCurrency, days, navigation} = this.props;
    const dataPrepare = data.map(item =>
      prepareProductItem(item, currency, defaultCurrency, days),
    );

    const wImage = widthImage(column);
    const hImage = heightImage(wImage);
 

    return (
      <View style={styles.container}>
        <Container style={styles.refine}>
          <Refine onPress={() => this.setState({isModalRefine: true})} />
        </Container>
        {loading ? <View><ActivityIndicator /></View> : (
          <FlatList
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            keyExtractor={item => `${item.id}`}
            numColumns={column}
            columnWrapperStyle={column > 1 ? styles.viewCol : null}
            data={dataPrepare.toJS()}
            renderItem={({item}) => (
              <Container disable={column > 1 ? 'all' : 'none'}>
                <ItemProduct item={item} width={wImage} height={hImage} />
              </Container>
            )}
            onEndReached={this.handleLoadMore}
            onEndReachedThreshold={0.7}
            ListFooterComponent={this.renderFooter}
            refreshing={refreshing}
            onRefresh={this.handleRefresh}
          />
        )}
        <ModalFilter
          visible={isModalRefine}
          select={sortBy}
          setModalVisible={value => this.setState({isModalRefine: value})}
          handleSort={dataSortBy => this.sortData(dataSortBy)}
        />
        {/*<Avatar*/}
        {/*  icon={{*/}
        {/*    name: 'message-square',*/}
        {/*    size: 20,*/}
        {/*    color: white,*/}
        {/*  }}*/}
        {/*  size={60}*/}
        {/*  rounded*/}
        {/*  overlayContainerStyle={styles.overlayIconMessage}*/}
        {/*  containerStyle={styles.containerIconMessage}*/}
        {/*/>*/}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  refine: {
    marginBottom: margin.large,
  },
  overlayIconMessage: {
    backgroundColor: green,
  },
  viewCol: {
    justifyContent: 'space-between',
    paddingHorizontal: padding.large,
  },
  containerIconMessage: {
    position: 'absolute',
    right: margin.big,
    bottom: margin.big,
  },
  separator: {
    height: 36,
  },
  viewFooter: {
    marginBottom: 26,
  },
  viewLoadingFooter: {
    position: 'relative',
    height: 40,
    justifyContent: 'center',
  },
});
const mapStateToProps = state => {
  return {
    column: columnProductSelector(state),
    currency: currencySelector(state),
    defaultCurrency: defaultCurrencySelector(state),
    days: daysBeforeNewProductSelector(state),
  };
}
export default connect(mapStateToProps)(ProductStore);
