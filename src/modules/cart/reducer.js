import {fromJS} from 'immutable';
import * as Actions from './constants';
import {SIGN_OUT_SUCCESS} from 'src/modules/auth/constants';

export const initState = fromJS({
  payment_method: 'pagalo',
  payment_method_title: '',
  set_paid: false,
  status: 'pending',
  billing: {
    first_name: '',
    last_name: '',
    address_1: '',
    address_2: '',
    city: '',
    state: 'GU',
    company: '',
    postcode: '',
    country: 'GT',
    email: '',
    phone: '',
  },
  shipping: {
    first_name: '',
    last_name: '',
    address_1: '',
    address_2: '',
    city: '',
    state: 'GU',
    company: '',
    postcode: '',
    country: 'GT',
    email: '',
    phone: '',
    note: '',
  },
  line_items: [],
  shipping_lines: [],
  coupon_lines: [],
  customer_note: '',
  cart_totals: {},
  meta_data: {
    _billing_wooccm11: 'CF',
    _billing_wooccm12: '',
  },

  cart_loading: false,
  cart_list_loading: false,
  cart_remove_loading: false,
  cart_update_loading: false,
  cart_update_add_coupon_loading: false,
  cart_update_delete_coupon_loading: false,
});

function cartReducer(state = initState, {type, payload}) {
  switch (type) {
    case SIGN_OUT_SUCCESS:
      return initState;
    // Clear cart
    case Actions.CLEAR_CART:
      return initState
      .set('billing', state.get('billing'))
      .set('shipping', state.get('shipping'))
      .set('meta_data', state.get('meta_data'))
      .set('customer_note', '');

    case Actions.GET_CART:
      if (!state.get('line_items') && payload) {
        return state.set('cart_loading', true);
      }
      return state;

    case Actions.GET_CART_SUCCESS:
      //Check what's payload
      // console.log(payload.items);
      return state
        .set('line_items', fromJS(Object.values(payload.items)))
        .set('cart_totals', fromJS(payload.totals))
        .set('coupon_lines', fromJS(payload.coupons))
        .set('cart_loading', false)
        .set('cart_list_loading', false)
        .set('cart_remove_loading', false)
        .set('cart_update_loading', false)
        .set('cart_update_add_coupon_loading', false)
        .set('cart_update_delete_coupon_loading', false);
    
    case Actions.GET_CART_ERROR:
      return state
        .set('cart_loading', false)
        .set('cart_remove_loading', false)
        .set('cart_update_loading', false);  
    case Actions.ADD_LIST_CART:
      return state.set('cart_list_loading', true);
    case Actions.ADD_LIST_CART_SUCCESS:
    case Actions.ADD_LIST_CART_ERROR:
      return state.set('cart_list_loading', false);
    case Actions.REMOVE_FROM_CART:
      return state.set('cart_remove_loading', true);
    case Actions.REMOVE_FROM_CART_ERROR:
      return state.set('cart_remove_loading', false);
    case Actions.UPDATE_QUANTITY_CART:
      return state.set('cart_update_loading', true);
    case Actions.UPDATE_QUANTITY_CART_ERROR:
      return state.set('cart_update_loading', false);
    case Actions.ADD_COUPON:
      return state.set('cart_update_add_coupon_loading', true);
    case Actions.REMOVE_COUPON:
      return state.set('cart_update_delete_coupon_loading', true);
    case Actions.ADD_COUPON_SUCCESS:
    case Actions.ADD_COUPON_ERROR:
      return state.set('cart_update_add_coupon_loading', false);
    case Actions.REMOVE_COUPON_SUCCESS:
    case Actions.REMOVE_COUPON_ERROR:
      return state.set('cart_update_delete_coupon_loading', false);
    
    case Actions.CHANGE_DATA:
      return state.setIn(payload.path, payload.value);

    case Actions.UPDATE_SHIPPING_LINES:
      return state.set('shipping_lines', fromJS(payload.value));
       
    default:
      return state;
          
    // case Actions.CHANGE_QTY_CART:
    //   return state.update('line_items', line_items => {
    //     const {item, quantity} = payload;
    //     const index = line_items.findIndex(i => i.equals(item));
    //     return line_items.setIn([index, 'quantity'], quantity);
    //   });
    // case Actions.REMOVE_CART:
    //   return state.update('line_items', line_items => {
    //     const {item} = payload;
    //     return line_items.filter(i => !i.equals(item));
    //   });
    // case Actions.CHANGE_DATA:
    //   return state.setIn(payload.path, payload.value);

    // case Actions.UPDATE_SHIPPING_LINES:
    //   return state.set('shipping_lines', payload.value);
    
    // case SIGN_OUT_SUCCESS:
    //   return initState;

    // // Coupon
    // case Actions.ADD_COUPON_SUCCESS:
    //   return state.update('coupon_lines', coupon_lines => {
    //     const {code} = payload;
    //     // validate coupon
    //     if (!code) {
    //       return coupon_lines;
    //     }
    //     const index = coupon_lines.findIndex(coupon => coupon.get('code') === code);
    //     // new item
    //     if (index === -1) {
    //       return coupon_lines.push(fromJS({code}));
    //     }
    //     return coupon_lines;
    //   });
    // case Actions.REMOVE_COUPON:
    //   return state.update('coupon_lines', coupon_lines => {
    //     const {code} = payload;
    //     return coupon_lines.filter(coupon => coupon.get('code') !== code);
    //   });
    // case 'UPDATE_DEMO_CONFIG_SUCCESS':
    //   return initState;
    // default:
    //   return state;
  }
}

export default cartReducer;
