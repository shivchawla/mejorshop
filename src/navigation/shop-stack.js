import { shopStack } from 'src/config/navigator';

import { createStackNavigator } from 'react-navigation-stack';

import Category from 'src/screens/shop/category';
import Products from 'src/screens/shop/products';
import Search from 'src/screens/shop/search';

import Product from 'src/screens/shop/product';

import Stores from 'src/screens/shop/stores';
import StoreDetail from 'src/screens/shop/store-detail';

const ShopStack = createStackNavigator(
  {
    [shopStack.category]: Category,

    [shopStack.products]: Products,
   
    [shopStack.product]: Product,

    [shopStack.store_detail]: StoreDetail,
    [shopStack.stores]: Stores,
  },
  {
    defaultNavigationOptions: {
      headerShown: false,
      initialRouteName: 'CategoryScreen',
    },
  }
);

export default ShopStack;
