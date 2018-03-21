import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';
import { MusicType } from '../../types/componentTypes';

interface Props {
    music?: MusicType;
}

interface State {}

class Music extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <section styleName="container">
                <div styleName="cover">
                    <div styleName="mask"/>
                </div>
                <span styleName="musicname">歌名</span>
                <span styleName="singername">歌手名</span>
            </section>
        );
    }
}

const MusicHoc = CSSModules(Music, styles);

export default MusicHoc;