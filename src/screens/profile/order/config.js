import moment from 'moment';
import lowerCase from 'lodash/lowerCase';
import upperFirst from 'lodash/upperFirst';

import { red, green, yellow, teal } from 'src/components/config/colors';

export const strDate = (date) => {
  if (!date) {
    return null;
  }
  return moment.parseZone(date).format('hh:mm a   DD/MM/YYYY');
};

export const strDate2 = (date) => {
  const dateStr = moment.parseZone(date).format('MMM D, YYYY');
  const timeStr = moment.parseZone(date).format('hh:mm a');
  return `${dateStr} at ${timeStr}`;
};

export const objectStatus = (status = 'completed') => {
  const text = upperFirst(lowerCase(status));
  if (status === 'completed') {
    return {
      icon: 'check',
      color: green,
      text: 'Completado' ,
    };
  }
  if (status === 'processing') {
    return {
      icon: 'clock',
      color: teal,
      text: 'Procesando',
    };
  }
  if (status === 'cancelled' || status === 'failed') {
    return {
      icon: 'x',
      color: red,
      text: status === 'cancelled' ? 'Cancelado' : 'Fallido',
    };
  }
  return {
    icon: 'clock',
    color: yellow,
    text : status == "pending" ? 'En Espera' : text,
  };
};
