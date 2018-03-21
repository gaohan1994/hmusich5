import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';

interface Props {

}

interface State {
    
}

class Swiper extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <section styleName="container">
                swiper
                <div styleName="itemlabel">
                    Label
                </div>
                <ul styleName="trig">
                    <span/>
                    <span styleName="on"/>
                    <span/>
                </ul>
            </section>
        );
    }
}

const SwiperHoc = CSSModules(Swiper, styles);

export default SwiperHoc;