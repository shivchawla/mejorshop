import { Map } from 'immutable';
import isMobilePhone from 'validator/lib/isMobilePhone';
import isEmail from 'validator/lib/isEmail';
import isLength from 'validator/lib/isLength';

export function validatorAddress(shipping, t) {
  let errors = Map();
  if (!shipping.get('first_name') || !isLength(shipping.get('first_name'), { min: 1, max: 32 })) {
    errors = errors.set('first_name', t('validators:text_first_name'));
  }

  if (!shipping.get('last_name') || !isLength(shipping.get('last_name'), { min: 1, max: 32 })) {
    errors = errors.set('last_name', t('validators:text_last_name'));
  }

  if (!shipping.get('city') || !isLength(shipping.get('city'), { min: 2, max: 128 })) {
    errors = errors.set('city', t('validators:text_city'));
  }

  if (!shipping.get('state') || !isLength(shipping.get('state'), { min: 2, max: 128 })) {
    errors = errors.set('state', t('validators:text_state'));
  }

  if (!shipping.get('address_1') || !isLength(shipping.get('address_1'), { min: 3, max: 128 })) {
    errors = errors.set('address_1', t('validators:text_address_1'));
  }

  if (!shipping.get('postcode') && !isLength(shipping.get('postcode'), { min: 2, max: 10 })) {
    errors = errors.set('postcode', t('validators:text_postcode'));
  }

  if (!shipping.get('country')) {
    errors = errors.set('country', t('validators:text_country'));
  }

  if (!shipping.get('phone') || !isMobilePhone(shipping.get('phone'))) {
    errors = errors.set('phone', t('validators:text_phone'));
  }

  // if (!shipping.get('email') || !isEmail(shipping.get('email'))) {
  //   errors = errors.set('email', 'E-Mail Address does not appear to be valid!');
  // }

  return errors;
}
