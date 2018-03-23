import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';
import config from '../../config/index';
import { WrapImagesType, WrapImageType } from '../../types/componentTypes';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

const AutoSwipeableViews = autoPlay(SwipeableViews);

interface Props {
    images: WrapImagesType;
}

interface State {
    current: number;
}

class Swiper extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            current: 1,
        };
    }

    render() {
        const { current } = this.state;
        const { images } = this.props;
        const 
            data: Array<JSX.Element> = [],
            trig: Array<JSX.Element> = [];
            
        images.map((item: WrapImageType, i) => {
            data.push(
                <li 
                    key={i}
                    styleName="imageItem"
                    style={{backgroundImage: item.pic 
                            ? `url(http://${config.host.pic}/${item.pic}?imageView/2/w/720/h/350)` 
                            : `url(${config.empty_pic})`}}
                >
                    <div styleName="itemlabel">
                        {item.tag}
                    </div>
                </li>
            );
            trig.push(
                <span 
                    key={i}
                    styleName={current === i + 1 ? `on` : ``}
                />
            );
        });

        const style = {
            width: '100%',
            height: '100%'
        };

        const containerStyle = {
            width: '100%',
            height: '100%'
        };
        
        return (
            <section styleName="container">
                <AutoSwipeableViews
                    autoplay={true}
                    style={style}
                    containerStyle={containerStyle}
                    onChangeIndex={this.onChangeIndex}
                >
                    {data}
                </AutoSwipeableViews>
                <ul styleName="trig">{trig}</ul>
            </section>
        );
    }

    private readonly onChangeIndex = (index: number, indexLast: number): void => {
        this.setState({
            current: index + 1
        });
    }
}

const SwiperHoc = CSSModules(Swiper, styles);

export default SwiperHoc;