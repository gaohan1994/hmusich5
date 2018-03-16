// import * as React from 'react';
// import * as actions from '../actions/';
// import { Stores, StoreState } from '../types/index';
// import { connect, Dispatch } from 'react-redux';

// export interface Props {
//     test        ?: StoreState;
//     onIncrement ?: () => void;
//     onDecrement ?: () => void;
// }

// class Hello extends React.Component<Props, {}> {
    
//     constructor (props: Props) {
//         super(props);
//     }
    
//     render () {
//         const { test, onDecrement, onIncrement } = this.props;
//         console.log('test', test);
//         return (
//             <div>
//                 {/* <span>{this.getExclamationMarks()}</span> */}
//                 <span>{test}</span>
//                 <div>
//                     <button onClick={onDecrement}>-</button>
//                     <button onClick={onIncrement}>+</button>
//                 </div>
//             </div>
//         );
//     }
// }

// const mapStateToProps = (state: Stores) => ({
//     test: state.number
// });

// const mapDispatchToProps = (dispatch: Dispatch<actions.NumberAction>) => ({
//     onIncrement: () => dispatch(actions.IncrementNumber()),
//     onDecrement: () => dispatch(actions.DecrementNumber()),
// });

// export default connect(mapStateToProps, mapDispatchToProps)(Hello);