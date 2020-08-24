export const isLineEndColumn = (visit = 0, length = 0, col = 0) => {
    if (length < 1 || col < 1 || (length === col)) {
        return false;
    }
    const countRow = Math.ceil(length/col);
    const countVisit = Math.ceil((visit + 1)/col);
    return countRow === countVisit;
};


export const isShippingAddressValid = (shipping, compute = false) => {
    
    var forShippingCompute = !(shipping.get('country') == '' ||
        shipping.get('state') == '' ||
        shipping.get('city') == '' ||
        shipping.get('postcode') == '');

    var restofTheForm = !(shipping.get('first_name') == '' ||
        shipping.get('last_name') == '' ||
        shipping.get('address_1') == '' || 
        shipping.get('phone') == '');

    return forShippingCompute && (!compute ? restofTheForm : true); 
};