import * as React from 'react';
import { } from '../../types/index';
import { PlaylistType, UserType } from '../../types/componentTypes';
import * as CSSModules from 'react-css-modules';
import config from '../../config/index';
import * as styles from './index.css';
interface Props {
    data: PlaylistType;
}

interface State {
    count: number;
}

class Playlist extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            count: 0
        };
    }

    async componentDidMount() {
        const { data } = this.props;
        const fetchPlayCount = await fetch(`/playlist/count/play/${data && data._id}`).then(res => res.json());
        this.setState({
            count: fetchPlayCount.result
        });
    }

    render() {
        const { data } = this.props;
        return (
            <div styleName="itemBox">
                <i
                    styleName="imageItem"
                    style={{backgroundImage: data && data.pics && data.pics[0] 
                        ? `url("http://${config.host.pic}/${data.pics[0]}")` : `${config.empty_pic}`}}
                />
                {this.renderPlaylistUser(data && data.user)}
                {this.renderPlaylistIcon(data && data.status)}
                {this.renderPlaylistName(data && data.name)}
                {this.renderPlaylistReason(data && data.desc)}
                {this.renderPlaylistCollect()}
            </div>
        );
    }

    private renderPlaylistUser = (user?: UserType): JSX.Element => {
        return (
            <div styleName="user">
                <i 
                    styleName="userImg"
                    style={{backgroundImage: user && user.headimgurl
                            ? user.headimgurl.indexOf('http') === -1
                                ? `url(http://${config.host.pic}/${user.headimgurl}?imageView/2/w/80/h/80)` 
                                : `url(${user.headimgurl}?imageView/2/w/80/h/80)`
                            : `${config.empty_pic}`}}
                />
                <span styleName="userName">{user && user.name}</span>
            </div>
        );
    }

    private renderPlaylistIcon = (status?: number): JSX.Element => {
        return (
            <div styleName="icon"/>
        );
    }

    private renderPlaylistName = (name?: any): JSX.Element => {
        return (
            <div styleName="name">{name}</div>
        );
    }

    private renderPlaylistReason = (reason?: string): JSX.Element => {
        return (
            <div styleName="reason">{reason}</div>
        );
    }

    private renderPlaylistCollect = (id?: string): JSX.Element => {
        const { count } = this.state;
        return (
            <div styleName="collect">
                <i styleName="collectIcon"/>
                <span styleName="collectNumber">{count}</span>
            </div>
        );
    }
}

const PlaylistHoc = CSSModules(Playlist, styles);

export default PlaylistHoc;