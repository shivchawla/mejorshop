import request from 'src/utils/fetch';
import queryString from 'query-string';
import {CART_PLUGIN_NAME} from 'src/config/development';

/**
 * Add to cart
 * @param data Cart data { product_id: Number, quantity: Number, variation_id: Number, variation: Array, cart_item_data: Object | Array }
 * @package rn_oreo
 * @since 1.0.0
 * @version 1.0.0
 * @returns {Promise | Promise<unknown>}
 */
export const addToCart = (data) => request.post(`/${CART_PLUGIN_NAME}/v1/add-item`, data);

// export const removeCartItem = (data) => {
//   return request.post(`/${CART_PLUGIN_NAME}/v1/remove-cart-item`, data);
// }

export const removeCartItem = (data) => request.remove(`/${CART_PLUGIN_NAME}/v1/item`, data);


// export const updateCartQuantity = (data) =>
//   request.post(`/${CART_PLUGIN_NAME}/v1/set-quantity`, data);


export const updateCartQuantity = (data) => request.post(`/${CART_PLUGIN_NAME}/v1/item`, data);


export const getCart = () => request.get(`/${CART_PLUGIN_NAME}/v1/get-cart/?thumb=true`);

// export const clearCart = () => request.remove(`/${CART_PLUGIN_NAME}/v1/cart`);
export const clearCart = () => request.post(`/${CART_PLUGIN_NAME}/v1/clear`);

export const addCoupon = (data) => request.post(`/${CART_PLUGIN_NAME}/v1/add-discount`, data);

export const removeCoupon = (data) => request.post(`/${CART_PLUGIN_NAME}/v1/remove-coupon`, data);

export const fetchShippingMethod = (query) => 
	request.get(`/${CART_PLUGIN_NAME}/v1/shipping-methods?${queryString.stringify(query, { arrayFormat: 'comma' })}`);
	