import * as Actions from './constants';

type Action = {type: string, payload: Object};

/**
 * Action Add to cart
 * @param item
 * @param cb
 * @returns {{type: string, payload: {item: CartItem, cb: *}}}
 */
export function addToCart(item, cb = () => {}): Action {
  return {
    type: Actions.ADD_TO_CART,
    payload: {item, cb},
  };
}

/**
 * Action Add list to cart
 * @param data
 * @param cb
 * @returns {{type: string, payload: {data: *, cb: *}}}
 */
export function addListToCart(data, cb = () => {}): Action {
  return {
    type: Actions.ADD_LIST_CART,
    payload: {data, cb},
  };
}

/**
 * Action remove from cart
 * @param item
 * @param cb
 * @returns {{type: string, payload: {item: *, cb: *}}}
 */
export function removeFromCart(item, cb = () => {}): Action {
  return {
    type: Actions.REMOVE_FROM_CART,
    payload: {item, cb},
  };
}

/**
 * Action update quantity cart
 * @param item
 * @param cb
 * @returns {{type: string, payload: {item: *, cb: *}}}
 */
export function updateQuantityCart(item, cb = () => {}): Action {
  return {
    type: Actions.UPDATE_QUANTITY_CART,
    payload: {item, cb},
  };
}

/**
 * Get cart rest api
 * @returns {{type: string, payload: *}}
 */
export function getCart() {
  return {
    type: Actions.GET_CART,
    payload: true,
  };
}

/**
 * Action clear all item in cart
 * @returns {{type}}
 */
export function clearCart() {
  return {
    type: Actions.CLEAR_CART,
  };
}

/**
 * Add coupon code
 * @param code
 * @returns {{type, payload: {code: *}}}
 */
export function addCoupon(code, cb) {
  return {
    type: Actions.ADD_COUPON,
    payload: {
      code,
      cb,
    },
  };
}

/**
 * Action remove coupon
 * @returns {{type}}
 */
export function removeCoupon(code) {
  return {
    type: Actions.REMOVE_COUPON,
    payload: {
      code,
    },
  };
}

/**
 * Update Shipping Lines
 * @param path: collection, Iterable
 * @param value: any
 * @returns {{type: string, payload: {path: *, value: *}}}
 */
export function updateShippingLines(value) {
  return {
    type: Actions.UPDATE_SHIPPING_LINES,
    payload: {
      value,
    },
  };
}
