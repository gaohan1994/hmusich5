import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import * as styles from './index.css';
import { PlaylistType, UserType, MainPlaylistsType } from '../../types/componentTypes';
import config from '../../config/index';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

const AutoSwipeableViews = autoPlay(SwipeableViews);

type PlaylistReceiveData = {
    playlists: Array<PlaylistType>;
};

interface Props {
    data?: MainPlaylistsType;
}

interface State {
    current: number;
}
/**
 * Creates an instance of Playlist.
 * @param {Props} props 
 * @memberof Playlist
 * 
 * render:
 * 【1】 renderUser     : private func      渲染歌单作者
 * 【2】 renderPlaylist : private func      渲染每个歌单
 * 【3】 renderPlaylist_User: private func  渲染歌单作者
 */
class Playlists extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            current: 0,
        };
    }

    render() {
        const { current } = this.state;
        const { data } = this.props;
        const 
            lists: Array<JSX.Element> = [],
            trigs: Array<JSX.Element> = [];
        if (data && data.length > 0) {

            data.map((item: PlaylistReceiveData) => {

                if (item.playlists && item.playlists.length > 0) {

                    item.playlists.map((list: PlaylistType, i: number) => {
                        
                        lists.push(
                            <div 
                                styleName="item"
                                key={list._id}
                                onClick={this.clickHandle.bind(this, list._id)}
                            >   
                                {this.renderPlaylist(list)}
                            </div>
                        );

                        trigs.push(
                            <span 
                                key={i}
                                styleName={current === i ? `on` : ``}
                            />
                        );
                    });
                }
            });
        }
        
        const style = {
            width: '77.778vw',
            height: '100%'
        };

        const containerStyle = {
            width: '100%',
            height: '100%'
        };

        return (
            <section styleName="container">
                <ul styleName="trig">
                    {trigs}
                </ul>
                <AutoSwipeableViews
                    autoplay={true}
                    style={style}
                    index={current}
                    containerStyle={containerStyle}
                    onChangeIndex={this.onChangeIndex}
                    enableMouseEvents={true}
                >
                    {lists}
                </AutoSwipeableViews>
            </section>
        );
    }

    private clickHandle = (id: string) => {
        if (config.debug) {
            window.open(`http://www-dev.huanmusic.com/playlist/${id}`);
        } else {
            window.open(`http://www.huanmusic.com/playlist/${id}`);
        }  
    }

    private readonly onChangeIndex = (index: number, indexLast: number): void => {
        this.setState({
            current: index
        });
    }

    private renderPlaylist = (data?: PlaylistType): JSX.Element => {
        
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
                {this.renderPlaylistCollect(data && data.collect)}
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
            <div styleName="reason">{`reason`}</div>
        );
    }

    private renderPlaylistCollect = (collect?: number): JSX.Element => {
        return (
            <div styleName="collect">
                <i styleName="collectIcon"/>
                <span styleName="collectNumber">{collect}</span>
            </div>
        );
    }
}

const PlaylistsHoc = CSSModules(Playlists, styles);

export default PlaylistsHoc;