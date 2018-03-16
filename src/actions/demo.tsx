// require<any>('es6-promise').polyfill();
require('es6-promise').polyfill();
import * as fetch from 'isomorphic-fetch';
import * as constants from '../constants/index';
import { Dispatch } from 'redux';

export interface IncrementDemo {
    type: constants.INCREMENT_DEMO;
}

export interface DecrementDemo {
    type: constants.DECREMENT_DEMO;
}

export interface ReceiveProducts {
    type: constants.RECEIVE_PRODUCTS;
    products: Array<Object>;
}

export type DemoActions = IncrementDemo | DecrementDemo | ReceiveProducts;

export const incrementDemo = () => (dispatch: Dispatch<DemoActions>) => {
    dispatch({type: constants.INCREMENT_DEMO});
};

export const decrementDemo = () => (dispatch: Dispatch<DemoActions>) => {
    dispatch({type: constants.DECREMENT_DEMO});
};

export const receiveProducts = () => (dispatch: Dispatch<DemoActions>) => {
    return fetch(`http://localhost:3000/api/products`)
            .then(res => res.json())
            .then(res => {
                dispatch({type: constants.RECEIVE_PRODUCTS, products: res.products});
            });
};