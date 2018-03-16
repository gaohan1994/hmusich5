import * as React from 'react';

export interface Props {
    test: number;
    incrementDemo: () => void;
    decrementDemo: () => void;
    products: [{
        id: string;
        name: string;
        price: number;
        manufacturer: string;
    }];
}

class DemoClass extends React.Component<Props, {}> {

    constructor(props: Props) {
        super(props);
    }

    render() {
        const { test, incrementDemo, decrementDemo } = this.props;
        return (
            <div>
                <span>{test}</span>
                <p onClick={incrementDemo}>+</p>
                <p onClick={decrementDemo}>-</p>
                {this.renderProducts()}
            </div>
        );
    }

    private renderProducts = () => {
        const { products } = this.props;
        const data = products.map((item) => <li key={item.id}>{item.name}--{item.manufacturer}: ${item.price}</li>);
        return data;
    }
}

export default DemoClass;