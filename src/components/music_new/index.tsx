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
            <section 
                styleName="container"
                onClick={this.clickHandle}
            >
                <div 
                    styleName="cover"
                    style={{backgroundImage: music.pics 
                        ? `url(http://${config.host.pic}/${music.pics[0]})` 
                        : `url(${config.empty_pic}?imageView/2/w/100/h/100/q/100)`}}    
                >
                    <div styleName="mask"/>
                </div>
                <span styleName="musicname">{music.name}</span>
                {this.renderSingers(music.singers)}
            </section>
        );
    }

    private clickHandle = (): void => {
        const { music } = this.props;
        if (config.debug) {
            window.open(`http://www-dev.huanmusic.com/music/${music._id}`);
        } else {
            window.open(`http://www.huanmusic.com/music/${music._id}`);
        }  
    }

    private renderSingers = (singers: Array<SingerType>): JSX.Element => {
        const data = singers.map((item: SingerType, i) => item.name);
        return (
            <span styleName="singername">{data.join('，')}</span>
        );
    }
}

const MusicHoc = CSSModules(Music, styles);

export default MusicHoc;