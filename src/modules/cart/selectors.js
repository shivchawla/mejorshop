import { createSelector } from 'reselect';
import { defaultCurrencySelector, currencySelector } from '../common/selectors';
import {fromJS} from 'immutable';

export const rootCart = state => state.cart; 

/**
 * Select cart list
 */
export const selectCartList = createSelector(
  rootCart,
  cart => cart.get('line_items') || fromJS([]),
);

/**
 * Cart total selector
 * @package rn_oreo
 * @since 1.0.0
 */
export const cartTotalSelector = createSelector(
  rootCart,
  cart => cart.getIn(['cart_totals','total']) || 0,
);


/**
 * Cart sub-total selector
 * @package rn_oreo
 * @since 1.0.0
 */
export const cartContentTotalSelector = createSelector(
  rootCart,
  cart => cart.getIn(['cart_totals','cart_contents_total']) || 0,
);

/**
 * Count item in cart
 */
export const cartSizeSelector = createSelector(
  selectCartList,
  items => items.reduce((total, item) => {
    const quantity = item.get('quantity') && parseInt(item.get('quantity')) > 0 ? parseInt(item.get('quantity')) : 0;
    return quantity + total;
  }, 0),
);

/**
 * Select shipping address
 */
export const selectShippingAddress = createSelector(
  rootCart,
  cart => cart.get('shipping')
);

/**
 * Selected shipping method
 */
export const selectedShippingMethod = createSelector(
  rootCart,
  cart => cart.get('shipping_lines')
);

/**
 * Select billing address
 */
export const selectBillingAddress = createSelector(
  rootCart,
  cart => cart.get('billing')
);

/**
 * Selected payment method
 */
export const selectedPaymentMethod = createSelector(
  rootCart,
  cart => cart.get('payment_method')
);

/**
 * Selected coupon list
 */
export const couponLinesSelector = createSelector(
  rootCart,
  cart => cart.get('coupon_lines')
);

/**
 * Selected note customer
 */
export const noteCustomerSelector = createSelector(
  rootCart,
  cart => cart.get('customer_note')
);

/**
 * Selected customer NIT
 */
export const metaDataSelector = createSelector(
  rootCart,
  cart => cart.get('meta_data')
);

/**
 * Loading cart
 */
export const loadingItemSelector = createSelector(
  rootCart,
  data => data.get('cart_loading'),
);

/**
 * Loading remove cart
 */
export const loadingRemoveItemSelector = createSelector(
  rootCart,
  data => data.get('cart_remove_loading'),
);

/**
 * Loading update quantity cart
 */
export const loadingUpdateQuantitySelector = createSelector(
  rootCart,
  data => data.get('cart_update_loading') || 
    data.get('cart_update_add_coupon_loading') || 
    data.get('cart_update_delete_coupon_loading'),
);

/**
 * Cart coupons add loading selector
 * @package rn_oreo
 * @since 1.0.0
 */
export const couponsAddLoadingSelector = createSelector(
  rootCart,
  cart => cart.get('cart_update_add_coupon_loading'),
);

/**
 * Cart coupons delete loading selector
 * @package rn_oreo
 * @since 1.0.0
 */
export const couponsDeleteLoadingSelector = createSelector(
  rootCart,
  cart => cart.get('cart_update_delete_coupon_loading'),
);
