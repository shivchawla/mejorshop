import lget from 'lodash/get';

export const isLineEndColumn = (visit = 0, length = 0, col = 0) => {
    if (length < 1 || col < 1 || (length === col)) {
        return false;
    }
    const countRow = Math.ceil(length/col);
    const countVisit = Math.ceil((visit + 1)/col);
    return countRow === countVisit;
};


const isEmpty = (field) => (field && field == '') || !field;

export const isShippingAddressValid = (shipping, compute = false) => {
    
    var forShippingCompute = !(isEmpty(shipping.get('country'))  ||
        isEmpty(shipping.get('state')) ||
        isEmpty(shipping.get('city')) ||
        isEmpty(shipping.get('postcode')));

    var restofTheForm = !(isEmpty(shipping.get('first_name')) ||
        isEmpty(shipping.get('last_name')) ||
        isEmpty(shipping.get('address_1')) || 
        isEmpty(shipping.get('phone')));


    return forShippingCompute && (!compute ? restofTheForm : true); 
};


export const mergeOnlyEmpty = (obj1, obj2) => {
    let response = {};

    let keys = [...new Set(Object.keys(obj1).concat(Object.keys(obj2)))];

    keys.map(key => {
        let v1 = lget(obj1, key, '');
        let v2 = lget(obj2, key, '');

        if (v1 == '' && v2 != '') {
            response[key] = v2;
        } else {
            response[key] = v1;
        }
    });

    return response;
};