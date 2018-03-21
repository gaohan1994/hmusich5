import { MainActions } from '../actions/main';
import { Stores, Main } from '../types/reducerTypes';
import { RECEIVE_MAIN_RECOMMEND_PLAYLIST, RECEIVE_MAIN_RECOMMEND_TRIBE } from '../constants/main';
import initState from './initState';
import { merge } from 'lodash';

export default function main (state: Main = initState.main, action: MainActions): Main {
    switch (action.type) {
        
        case RECEIVE_MAIN_RECOMMEND_PLAYLIST:
            const { playlist } = action;
            state.playlist = playlist;
            return merge({}, state, {});

        case RECEIVE_MAIN_RECOMMEND_TRIBE:
            const { tribe } = action;
            state.tribe = tribe;
            return merge({}, state, {});
            
        default :
            return state;
    }
}

export const getPlaylist = (state: Stores) => state.main.playlist;

export const getTribe = (state: Stores) => state.main.tribe;
