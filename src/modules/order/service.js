import request from 'src/utils/fetch';
import {PLUGIN_NAME} from 'src/config/development';

/**
 * Create an order
 * @param data: order info
 * @returns {*}
 */
export const createOrder = data => request.post(`/wc/v3/orders`, data);

/**
 * Update an order
 * @param id : order id
 * @param data : data update
 * @returns {*}
 */
export const updateOrder = (id, data) => request.put(`/wc/v3/orders/${id}`, data);

/**
 * Update an order
 * @param id : order id
 * @param data : data update
 * @returns {*}
 */
export const deleteOrder = (id, data) => request.remove(`/wc/v3/orders/${id}`);

/**
 * payment stripe
 * @param data
 * @returns {*}
 */
export const paymentStripe = data => request.post(`/${PLUGIN_NAME}/v1/payment-stripe`, data);

/**
 * payment stripe
 * @param data
 * @returns {*}
 */
export const paymentPagalo = data => request.post(`/${PLUGIN_NAME}/v1/payment-pagalo`, data);

/**
 * refund
 * @param idOrder, amount,
 * @returns {*}
 */
export const refundOrder = (idOrder, amount) => request.post(`/wc/v3/orders/${idOrder}/refunds`, { amount });

/**
 * Process Payment
 * @param data
 * @returns {Promise<AxiosResponse<T>>}
 */
export const processPayment = (data) => request.post(`/${PLUGIN_NAME}/v1/process_payment`, data);
