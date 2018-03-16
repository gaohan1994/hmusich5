import * as React from 'react';
import { incrementDemo, decrementDemo, DemoActions, receiveProducts } from '../../actions/demo';
import DemoClass from '../../components/Demo';
import { Stores } from '../../types/index';
import { connect, Dispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getTest, getProducts } from '../../reducers/demo';

export interface Props {
    test: number;
    incrementDemo: () => void;
    decrementDemo: () => void;
    receiveProducts: () => {};
    products: [{
        id: string;
        name: string;
        price: number;
        manufacturer: string;
    }];
}

class DemoContainer extends React.Component<Props, {}> {

    componentDidMount() {
        const { receiveProducts} = this.props;
        receiveProducts();
    }

    render() {
        const { test, products, incrementDemo, decrementDemo } = this.props;
        return (
            <DemoClass
                test={test}
                products={products}
                incrementDemo={incrementDemo}
                decrementDemo={decrementDemo}
            />
        );
    }
}

export const mapStateToProps = (state: Stores) => ({
    test    : getTest(state),
    products: getProducts(state),
});

export const mapDispatchToProps = (dispatch: Dispatch<DemoActions>) => ({
    incrementDemo   : bindActionCreators(incrementDemo, dispatch),
    decrementDemo   : bindActionCreators(decrementDemo, dispatch),
    receiveProducts : bindActionCreators(receiveProducts, dispatch),
});

export const mergeProps = (stateProps: Object, dispatchProps: Object, ownProps: Object) => 
    Object.assign({}, ownProps, stateProps, dispatchProps);

export default connect(
    mapStateToProps, 
    mapDispatchToProps,
    mergeProps
)(DemoContainer);