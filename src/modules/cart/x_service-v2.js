import request from 'src/utils/fetch';
import {PLUGIN_NAME} from 'src/config/development';
/**
 * Add to cart
 * @param data Cart data { product_id: Number, quantity: Number, variation_id: Number, variation: Array, cart_item_data: Object | Array }
 * @package rn_oreo
 * @since 1.0.0
 * @version 1.0.0
 * @returns {Promise | Promise<unknown>}
 */
export const addToCart = (data) =>
  request.post(`/${PLUGIN_NAME}/v1/cart`, data);

export const removeCartItem = (data) =>
  request.post(`/${PLUGIN_NAME}/v1/remove-cart-item`, data);

export const updateCartQuantity = (data) =>
  request.post(`/${PLUGIN_NAME}/v1/set-quantity`, data);

/**
 * Get list cart
 * @package rn_oreo
 * @since 1.0.0
 * @version 1.0.0
 * @returns {Promise | Promise<unknown>}
 */
export const getCart = () => request.get(`/${PLUGIN_NAME}/v1/cart`);

export const addCoupon = (data) => request.post(`/${PLUGIN_NAME}/v1/add-discount`, data);

export const removeCoupon = (data) =>
  request.post(`/${PLUGIN_NAME}/v1/remove-coupon`, data);
