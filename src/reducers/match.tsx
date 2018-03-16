import { MatchActions } from '../actions/match';
import { Match, Stores } from '../types/index';
import { RECEIVE_MATCHES } from '../constants';
import initState from './initState';
import { merge } from 'lodash';

export default function match (state: Match = initState.match, action: MatchActions): Match {
    switch (action.type) {
        
        case RECEIVE_MATCHES:
            const { matches } = action;
            state.matches = matches;
            return merge({}, state, {});

        default :
            return state;
    }
}

export const getMatches = (state: Stores) => state.match.matches;
