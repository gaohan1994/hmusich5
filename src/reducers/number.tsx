// import { NumberAction } from '../actions';
// import { StoreState } from '../types/index';
// import { INCREMENT_NUMBER, DECREMENT_NUMBER } from '../constants/index';

// const initState: StoreState = {
//     languageName: 'gh',
//     testNumber: 0,
// };

// export default (state: StoreState = initState, action: NumberAction): StoreState => {
//     switch (action.type) {
//         case INCREMENT_NUMBER:
//             return {...state, testNumber: state.testNumber + 1};
//         case DECREMENT_NUMBER:
//             return {...state, testNumber: state.testNumber - 1};
//         default:
//             return state;
//     }
// };