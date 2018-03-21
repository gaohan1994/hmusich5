require('es6-promise').polyfill();
import * as fetch from 'isomorphic-fetch';
import * as constants from '../constants/main';
import { Dispatch } from 'redux';
import config from '../config/index';

export interface LoadRecommendPlaylist {
    type: constants.RECEIVE_MAIN_RECOMMEND_PLAYLIST;
    playlist: Array<Object>;
}

export interface LoadRecommendTribe {
    type: constants.RECEIVE_MAIN_RECOMMEND_TRIBE;
    tribe: Array<Object>;
}

export type MainActions = LoadRecommendPlaylist | LoadRecommendTribe;

export const loadRecommendPlaylist = () => (dispatch: Dispatch<MainActions>) => {
    return  fetch(`/trend`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    count: 1
                })
            })
            .then(res => res.json())
            .then(dates => {
                const promise = dates.map((item: string) => {
                    return fetch(`http://${config.qnssl_old}${item}`).then(res => res.json());
                });

                Promise.all(promise)
                    .then(data => {
                        dispatch({type: constants.RECEIVE_MAIN_RECOMMEND_PLAYLIST, playlist: data});
                    });
            });
};

export const loadRecommendTribe = () => (dispatch: Dispatch<MainActions>) => {
    return  fetch(`/hot/tribes/6`)
            .then(res => res.json())
            .then(res => {
                if (res.success === true) {
                    dispatch({type: constants.RECEIVE_MAIN_RECOMMEND_TRIBE, tribe: res.result});
                } else {
                    throw new Error('loadRecommendTribe Error');
                }
            });
};