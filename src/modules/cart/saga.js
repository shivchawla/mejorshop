import {put, call, takeEvery, select} from 'redux-saga/effects';
import {showMessage} from 'react-native-flash-message';
import * as Actions from './constants';
import {
  addToCart,
  removeCartItem,
  updateCartQuantity,
  getCart,
  addCoupon,
  removeCoupon,
  clearCart,
  fetchShippingMethod,
} from './service';

/**
 * Add to cart saga REST API
 * @returns {IterableIterator<*>}
 */
function* addToCartSaga({payload}) {
  const {item, cb} = payload;
  try {
    yield call(addToCart, item);
    yield call(cb, {success: true});
    yield call(showMessage, {
      message: 'El producto se ha agregado exitosamente',
      type: 'success',
    });
    yield put({
      type: Actions.GET_CART,
      payload: true,
    });
  } catch (error) {
    if (cb) {
      yield call(cb, {success: false, error});
    }

    yield put({
      type: Actions.ADD_TO_CART_ERROR
    });

    yield call(showMessage, {
      message: '¡Lo siento! No puedes agregar esté articulo!',
      type: 'danger',
    });
  }
}

/**
 * Add list to cart saga REST API
 * @returns {IterableIterator<*>}
 */
function* addListToCartSaga({payload}) {
  const {data, cb} = payload;
  try {
    yield put({
      type: Actions.ADD_LIST_CART_SUCCESS
    });
  } catch (error) {
    yield put({
      type: Actions.ADD_LIST_CART_ERROR
    });
   
  }
}

/**
 * Remove from cart saga REST API
 * @returns {IterableIterator<*>}
 */
function* removeFromCartSaga({payload}) {
  const {item, cb} = payload;
  try {
    yield call(removeCartItem, item);
    yield call(cb);
    yield call(showMessage, {
      message: 'El producto se ha eliminado exitosamente',
      type: 'success',
    });
    yield put({
      type: Actions.GET_CART
    });
  } catch (error) {
    yield put({
      type: Actions.REMOVE_FROM_CART_ERROR
    });
    yield call(showMessage, {
      message: error.message,
      type: 'danger',
    });
    if (cb) {
      yield call(cb);
    }
  }
}

/**
 * Update quantity cart saga REST API
 * @returns {IterableIterator<*>}
 */
function* updateQuantityCartSaga({payload}) {
  const {item, cb} = payload;
  try {
    yield call(updateCartQuantity, item);
    yield call(cb);
    yield call(showMessage, {
      message: 'La cantidad de producto se ha actualizado exitosamente',
      type: 'success',
    });
    yield put({
      type: Actions.GET_CART
    });
  } catch (error) {
    yield put({
      type: Actions.UPDATE_QUANTITY_CART_ERROR
    });
    yield call(showMessage, {
      message: error.message,
      type: 'danger',
    });
    if (cb) {
      yield call(cb);
    }
  }
}

/**
 * Clear cart saga REST API
 * @returns {IterableIterator<*>}
 */
function* clearCartSaga() {
  try {
    yield call(clearCart);
    yield put({
      type: Actions.GET_CART
    });
  } catch (error) {
    yield call(showMessage, {
        message: error.message,
        type: 'danger',
    });
  }
}

/**
 * Get list cart sage REST API
 * @returns {IterableIterator<*>}
 */
function* getCartSaga() {
  try {
    const data = yield call(getCart);
    yield put({type: Actions.GET_CART_SUCCESS, payload: data});
  } catch (e) {
    yield put({type: Actions.GET_CART_ERROR});
  }
}

function* addCouponSaga({payload}) {
  try {
    const {code} = payload;
    const data = yield call(addCoupon, {coupon_code: code});
    if (data.success) {
      yield put({
        type: Actions.GET_CART,
      });
      // yield call(cb);
    } else {
      yield call(showMessage, {
        message: 'Revisar el código de cupon otra vez',
        type: 'danger',
      });
      yield put({
        type: Actions.ADD_COUPON_ERROR,
      });
    }
  } catch (e) {
    
    yield put({
      type: Actions.ADD_COUPON_ERROR,
    });
    yield call(showMessage, {
      message: e.message,
      type: 'danger',
    });
  }
}

function* removeCouponSaga({payload}) {
  try {
    const data = yield call(removeCoupon, {coupon_code: payload.code});
    if (data.success) {
      yield put({
        type: Actions.GET_CART,
      });
    } else {
      yield call(showMessage, {
        message: 'Revisar el código de cupon otra vez',
        type: 'danger',
      });
      yield put({
        type: Actions.REMOVE_COUPON_ERROR,
      });
    }
  } catch (e) {
    yield put({
      type: Actions.REMOVE_COUPON_ERROR,
    });
    yield call(showMessage, {
      message: e.message,
      type: 'danger',
    });
  }
}


function* getShippingMethodSaga() {
  try {
    const data = yield call(fetchShippingMethod);
    yield put({type: Actions.UPDATE_SHIPPING_LINES, payload: data});
  } catch(e) {
    yield call(showMessage, {
      message: e.message,
      type: 'danger',
    });
  }
}

export default function* cartSaga() {
  yield takeEvery(Actions.ADD_TO_CART, addToCartSaga);
  yield takeEvery(Actions.ADD_LIST_CART, addListToCartSaga);
  yield takeEvery(Actions.REMOVE_FROM_CART, removeFromCartSaga);
  yield takeEvery(Actions.UPDATE_QUANTITY_CART, updateQuantityCartSaga);
  yield takeEvery(Actions.GET_CART, getCartSaga);
  yield takeEvery(Actions.CLEAR_CART, clearCartSaga);  
  yield takeEvery(Actions.ADD_COUPON, addCouponSaga);
  yield takeEvery(Actions.REMOVE_COUPON, removeCouponSaga);
  yield takeEvery(Actions.GET_SHIPPING_METHODS, getShippingMethodSaga);
}
