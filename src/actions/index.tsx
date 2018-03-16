import * as constants from '../constants';

export interface IncrementNumber {
    type: constants.INCREMENT_NUMBER;
}

export interface DecrementNumber {
    type: constants.DECREMENT_NUMBER;
}

export type NumberAction = IncrementNumber | DecrementNumber;

export const IncrementNumber = (): IncrementNumber => {
    return {
        type: constants.INCREMENT_NUMBER
    };
};

export const DecrementNumber = (): DecrementNumber => {
    return {
        type: constants.DECREMENT_NUMBER
    };
};