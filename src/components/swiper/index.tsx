import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';
import config from '../../config/index';
import { WrapImagesType, WrapImageType } from '../../types/componentTypes';

interface Props {
    images: WrapImagesType;
}

interface State {
    current: number;
}

class Swiper extends React.Component<Props, State> {

    private timer: any;

    constructor(props: Props) {
        super(props);
        this.state = {
            current: 1,
        };
    }

    public changePage = (e: number): void => {
        this.setState({
            current: e
        });
    }

    public turn = (n: number): void => {
        const { current } = this.state;
        const { images } = this.props;
        const length = images.length;

        let _n = current + n;
        if (_n > length) {
            _n = _n - length;
        }
        if (_n < 0) {
            _n = 0;
        } 

        this.setState({
            current: _n
        });
    }

    autoPlay = (): void => {
        this.timer = setInterval(() => {this.turn(1); } , 5000);
    }

    componentDidMount() {
        this.autoPlay();
    }

    componentWillUnmount() {
        clearInterval(this.timer);
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
        return (
            <section styleName="container">
                <ul 
                    styleName="images"
                    style={{width       : images ? `${images.length * 100}%` : `500%`,
                            marginLeft  : `${-(current - 1) * 100}%`}}
                >
                   {data}
                </ul>
                <ul styleName="trig">{trig}</ul>
            </section>
        );
    }
}

const SwiperHoc = CSSModules(Swiper, styles);

export default SwiperHoc;