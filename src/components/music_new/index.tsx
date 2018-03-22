import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';
import config from '../../config/index';
import { MusicType, SingerType } from '../../types/componentTypes';

interface Props {
    music: MusicType;
}

interface State {}

class Music extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
    }

    render() {
        const { music } = this.props;
        return (
            <section styleName="container">
                <div 
                    styleName="cover"
                    style={{backgroundImage: music.pics 
                        ? `url(http://${config.host.pic}/${music.pics[0]}?imageView/2/w/80/h/80)` 
                        : `url(${config.empty_pic}?imageView/2/w/80/h/80)`}}    
                >
                    <div styleName="mask"/>
                </div>
                <span styleName="musicname">{music.name}</span>
                {this.renderSingers(music.singers)}
            </section>
        );
    }

    private renderSingers = (singers: Array<SingerType>): JSX.Element => {
        const data = singers.map((item: SingerType, i) => (
            <span
                key={`mainmusics` + item._id}
            >
                {item.name}
                {i + 1 === singers.length ? `` : `，`}
            </span>
        ));
        return (
            <span styleName="singername">{data}</span>
        );
    }
}

const MusicHoc = CSSModules(Music, styles);

export default MusicHoc;