import {isImmutable} from "immutable";
import lget from 'lodash/get';
import globalConfig from './global';
import configApi from '../config/api';
import {PLUGIN_NAME} from  '../config/development';

// import { fetch as fetchPolyfill } from 'whatwg-fetch'
// global.fetch = fetchPolyfill

/**
 * Get method
 * @param url
 * @returns {Promise<R>}
 */
const get = (url, options = {}) => {
    return new Promise((resolve, reject) => {
        let baseURL = configApi.API_ENDPOINT + '/wp-json' + url;

        const isWC = url.indexOf('/wc') === 0 && url.indexOf('/wcfmmp') !== 0;
        const isQuery = url.indexOf('?') >= 0;
        const isAuth = url.indexOf(`/${PLUGIN_NAME}`) === 0;

        if (isWC) {
            baseURL = `${baseURL}${isQuery ? '&' : '?'}consumer_key=${configApi.CONSUMER_KEY}&consumer_secret=${configApi.CONSUMER_SECRET}`;
        }

        var headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            // 'Cache-Control': 'no-cache, no-store, must-revalidate',
            Authorization: isAuth && globalConfig.getToken() ? `Bearer ${globalConfig.getToken()}` : undefined,
        }; 

        // console.log("In GET");
        // console.log(baseURL);
        // console.log(url);
        // console.log(headers);
        // console.log(url.indexOf(`/${PLUGIN_NAME}`) === 0)
        // console.log("Authorization Required");
        // console.log(isAuth && globalConfig.getToken());
        // console.log("Token");
        // console.log(globalConfig.getToken());

        fetch(baseURL, {
            ...options,
            method: 'GET',
            headers,
        })
            .then((res) => res.json())
            .then(data => {
                if (data.code) {
                    reject(new Error(data.message));
                } else {
                    resolve(data);
                }
            })
            .catch((error) => {
                console.log(error);
                return error;
            });
        },
    );

};

/**
 * Post method
 * @param url
 * @param data
 * @param method
 * @returns {Promise<R>}
 */
const post = (url, data, method = 'POST') => {
    return new Promise((resolve, reject) => {

        // To JS Object
        if (isImmutable(data)) {
            data = data.toJS();
        }

        let baseURL = configApi.API_ENDPOINT + '/wp-json' + url;

        const isWC = url.indexOf('/wc') === 0 && url.indexOf('/wcfmmp') !==0;
        const isDigits = url.indexOf('/digits') === 0;
        const isQuery = url.indexOf('?') >= 0;
        const isAuth = url.indexOf(`/${PLUGIN_NAME}`) === 0;

        if (isWC || isDigits) {
            baseURL = `${baseURL}${isQuery ? '&' : '?'}consumer_key=${configApi.CONSUMER_KEY}&consumer_secret=${configApi.CONSUMER_SECRET}`;
        }

        const headers = {
            Accept: 'application/json',
            Authorization: isAuth && globalConfig.getToken() ? `Bearer ${globalConfig.getToken()}` : null,
            'Content-Type': isDigits ? 'application/x-www-form-urlencoded;charset=UTF-8' : 'application/json',
        };

        // console.log("In POST");
        // console.log(url.indexOf('/mobile-builder') === 0);
        // console.log(baseURL);
        // console.log(headers);

        fetch(baseURL, {
            method: method,
            headers,
            body: isDigits ? data : typeof data === 'object' ? JSON.stringify(data) : null,
        })
        .then((res) => {
            return res.json()
        })
        .then(data => {
            if (data.code) {
                if (isDigits && (data.code === "1" || data.code === 1)) {
                    resolve(data);
                } else if (!isDigits && data.code == 200) {
                    resolve(data);
                } else {
                    throw(new Error(data.message));
                }
            } else {
                resolve(data);
            }
        })
        .catch((error) => {
            console.log(error);
            reject(error);
        });
    });
};

const remove = (url) => {
    return new Promise((resolve, reject) => {

        let baseURL = configApi.API_ENDPOINT + '/wp-json' + url;

        const isWC = url.indexOf('/wc') === 0 && url.indexOf('/wcfmmp') !== 0;
        const isDigits = url.indexOf('/digits') === 0;
        const isQuery = url.indexOf('?') >= 0;
        const isAuth = url.indexOf(`/${PLUGIN_NAME}`) === 0;

        if (isWC || isDigits) {
            baseURL = `${baseURL}${isQuery ? '&' : '?'}consumer_key=${configApi.CONSUMER_KEY}&consumer_secret=${configApi.CONSUMER_SECRET}`;
        }

        fetch(baseURL, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                Authorization: isAuth && globalConfig.getToken() ? `Bearer ${globalConfig.getToken()}` : null,
            },
        })
        .then((res) => {
            return res.json()
        })
        .then(data => {
            let success = lget(data, 'success', true);

            if (success) {
                resolve(data);
            } else {
                throw(new Error(data.message));
            }
        })
        .catch((error) => {
            console.log(error);
            reject(error);
        });
    });
}

export default request = {
    get,
    post,
    remove,
    put: (url, data) => post(url, data, 'PUT')
};

