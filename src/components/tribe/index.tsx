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
            <section 
                styleName="container"
                onClick={this.clickHandle}
            >
                <i 
                    styleName="cover"
                    style={{backgroundImage: tribe.headimg 
                            ? `url(http://${config.host.pic}/${tribe.headimg}?imageView/2/w/100/h/100/q/100)` 
                            : `url(${config.empty_pic})`}}
                />
                <span styleName="name">{tribe.name}</span>
            </section>
        );
    }

    private clickHandle = (): void => {
        const { tribe } = this.props;
        if (config.debug) {
            window.open(`http://www-dev.huanmusic.com/tribe/${tribe._id}`);
        } else {
            window.open(`http://www.huanmusic.com/tribe/${tribe._id}`);
        }  
    }
}

const TribeHoc = CSSModules(Tribe, styles);

export default TribeHoc;