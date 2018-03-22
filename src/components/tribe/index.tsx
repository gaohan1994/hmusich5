import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';
import config from '../../config/index';
import { TribeType } from '../../types/componentTypes';

interface Props {
    tribe: TribeType;
}

interface State {
    
}

class Tribe extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
    }

    render() {
        const { tribe } = this.props;
        return (
            <section styleName="container">
                <i 
                    styleName="cover"
                    style={{backgroundImage: tribe.headimg 
                            ? `url(http://${config.host.pic}/${tribe.headimg}?imageView/2/w/100/h/100)` 
                            : `url(${config.empty_pic})`}}
                />
                <span styleName="name">{tribe.name}</span>
            </section>
        );
    }
}

const TribeHoc = CSSModules(Tribe, styles);

export default TribeHoc;