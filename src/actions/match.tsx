// require<any>('es6-promise').polyfill();
require('es6-promise').polyfill();
// import * as fetch from 'isomorphic-fetch';
import * as constants from '../constants/index';
import { Dispatch } from 'redux';
import { GraphQLClient } from 'graphql-request';

export type MatchesType = {
    matches: Array<object>;
};

export interface ReceiveMatches {
    type: constants.RECEIVE_MATCHES;
    matches: Array<Object>;
}

export type MatchActions = ReceiveMatches;

const client = new GraphQLClient('http://localhost:3000/api/v1/graphql');

export const receiveMatches = () => (dispatch: Dispatch<MatchActions>) => {
    const query = `{
        matches {
            _id
            date
            players {
              _id
              name
              class
            }
            winner
        }
    }`;
    return client.request(query)
            .then((res: MatchesType) => {
                console.log('res', res);
                dispatch({type: constants.RECEIVE_MATCHES, matches: res.matches});
            });
};