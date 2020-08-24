import request from 'src/utils/fetch';
import queryString from 'query-string';

/**
 * Fetch vendor data
 * @returns {*}
 */

export const getVendor = vendor_id =>
  request.get(`/wcfmmp/v1/store-vendors/${vendor_id}`);


/**
 * Fetch products by vendor id
 * @returns {*}
 */

export const getProductsByVendorId = (vendor_id, query) =>
  request.get(
    `/wcfmmp/v1/products/?id=${vendor_id}&${queryString.stringify(query, {
      arrayFormat: 'comma',
    })}`,
  );
 
/**
 * Fetch list vendor
 * @returns {*}
 */

export const getVendors = query =>
  request.get(
    `/wcfmmp/v1/store-vendors?${queryString.stringify(query, {
      arrayFormat: 'comma',
    })}`,
  );

/**
 * Fetch review by vendor id
 * @returns {*}
 */
//Not supported in WCFM so removed 
//NOT USED - removed the screen to see reviews for vendor
export const getReviewByVendorId = (vendor_id, query) => {
    return request.get(
        `dokan/v1/stores/${vendor_id}/reviews?${queryString.stringify(query, {
            arrayFormat: 'comma',
        })}`,
    );
}


/**
 * Send contact for vendor
 * @returns {*}
 */

//NOT USED - Removed the screen to contact vendor
export const sendContactVendorId = (vendor_id, data) =>
  request.post(
    `/dokan/v1/stores/${vendor_id}/contact`,
    data,
  );

/**
 * Send review for vendor id
 * @returns {*}
 */
//Not supported in WCFM so removed 
//NOT USED - removed the screen to add review for vendor
export const sendReviewVendorId = (vendor_id, data) =>
  request.post(`/dokan/v1/stores/${vendor_id}/reviews`, data);
