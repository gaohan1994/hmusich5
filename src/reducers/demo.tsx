import { DemoActions } from '../actions/demo';
import { Demo, Stores } from '../types/index';
import { DECREMENT_DEMO, INCREMENT_DEMO, RECEIVE_PRODUCTS } from '../constants';
import initState from './initState';
import { merge } from 'lodash';

export default function demo (state: Demo = initState.demo, action: DemoActions): Demo {
    switch (action.type) {
        
        case INCREMENT_DEMO:
            state.test += 1;
            return merge({}, state, {});

        case DECREMENT_DEMO:
            state.test -= 1;
            return merge({}, state, {});

        case RECEIVE_PRODUCTS:
            const { products } = action;
            state.products = products;
            return merge({}, state, {});

        default :
            return state;
    }
}

export const getTest = (state: Stores) => state.demo.test;

export const getProducts = (state: Stores) => state.demo.products;