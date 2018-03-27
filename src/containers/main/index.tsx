import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import * as CSSModules from 'react-css-modules';
import { bindActionCreators } from 'redux';
import { MainActions } from '../../actions/main';
import * as styles from './index.css';
import config from '../../config/index';

import Header from '../../components/header';
import Swiper from '../../components/swiper';
import Music from '../../components/music_new';
import Playlists from '../../components/playlist';
import Tribe from '../../components/tribe';
import Footer from '../../components/footer';

import { Stores } from '../../types/reducerTypes';

import { 
    TribesType, 
    WrapImagesType,
    MainNewMusicsType,
    MainPlaylistsType
} from '../../types/componentTypes';

import { 
    loadRecommendPlaylist, 
    loadRecommendTribe,
    loadMainImages,
    loadMainNewMusics,
} from '../../actions/main';

import { 
    getPlaylist, 
    getTribe,
    getWrapImages,
    getMainNewMusics,
} from '../../reducers/main';

export interface Props {
    getPlaylist             : MainPlaylistsType;
    getTribe                : TribesType;
    getWrapImages           : WrapImagesType;
    getMainNewMusics        : MainNewMusicsType;
    loadRecommendPlaylist   : () => void;
    loadRecommendTribe      : () => void;
    loadMainImages          : () => void;
    loadMainNewMusics       : () => void;
}

export interface State {
    
}

/**
 * @returns 
 * @memberof Main
 * 首页
 * render:
 * 【1】 renderMusics       : private func      渲染新歌
 * 【2】 renderPlaylists    : private func      渲染歌单 
 * 【3】 renderTribes       : private func      渲染圈子
 */
class Main extends React.Component<Props, State> {

    componentDidMount() {
        const { 
            loadRecommendPlaylist, 
            loadRecommendTribe,
            loadMainImages,
            loadMainNewMusics,
        } = this.props;
        loadRecommendPlaylist();
        loadRecommendTribe();
        loadMainImages();
        loadMainNewMusics();
    }

    public onMoreClickHandle = (index: string): void => {
        if (config.debug) {
            window.open(`http://www-dev.huanmusic.com/${index}`);
        } else {
            window.open(`http://www.huanmusic.com/music/${index}`);
        }  
    }

    public onDownloadClickHandle = () => {
        window.location.href = 'http://www.huanmusic.com/download.html';
    }

    render() {
        const { getWrapImages } = this.props;
        return (
            <div styleName="container">
                <Header/>
                <Swiper images={getWrapImages}/>
                {this.renderMusics()}
                {this.renderPlaylists()}
                {this.renderTribes()}
                <Footer/>
            </div>
        );
    }

    private renderMusics = () => {
        const { getMainNewMusics } = this.props;
        const musics = getMainNewMusics.musics && getMainNewMusics.musics.slice(0, 3).map((item) => (
            <li 
                styleName="musicitem"
                key={item._id}
            >
                <Music music={item}/>
            </li>
        ));
        return (
            <section styleName="daliymusic">
                <i 
                    styleName="more"
                    onClick={this.onDownloadClickHandle}
                />
                <div styleName="title">
                    <i styleName="icon"/>
                </div>
                <ul styleName="musics">{musics}</ul>
            </section>
        );
    }

    private renderPlaylists = () => {
        const { getPlaylist } = this.props;
        return (
            <section styleName="playlists">
                <i 
                    styleName="listmore"
                    onClick={() => this.onMoreClickHandle('playlists')}
                />
                <div styleName="listtitle">
                    <i styleName="listicon"/>
                </div>
                <div styleName="playlistBox">
                    <Playlists
                        data={getPlaylist}
                    />
                </div>
            </section>
        );
    }

    private renderTribes = () => {
        const { getTribe } = this.props;
        const tribes = getTribe && getTribe.map((item) => (
            <li 
                styleName="tribeItem"
                key={item._id}
            >
                <Tribe tribe={item.tribe}/>
            </li>
        ));
        return (
            <section styleName="tribes">
                <i 
                    styleName="more"
                    onClick={this.onDownloadClickHandle}
                />
                <div styleName="title">
                    <i styleName="tribeIcon"/>
                </div>
                <ul styleName="tribesBox">
                    {tribes.slice(0, 4)}
                </ul>
            </section>
        );
    }
}

const MainHoc = CSSModules(Main, styles);

export const mapStateToProps = (state: Stores) => ({
    getPlaylist     : getPlaylist(state),
    getTribe        : getTribe(state),
    getWrapImages   : getWrapImages(state),
    getMainNewMusics: getMainNewMusics(state),
});

export const mapDispatchToProps = (dispatch: Dispatch<MainActions>) => ({
    loadRecommendPlaylist   : bindActionCreators(loadRecommendPlaylist, dispatch),
    loadRecommendTribe      : bindActionCreators(loadRecommendTribe, dispatch),
    loadMainImages          : bindActionCreators(loadMainImages, dispatch),
    loadMainNewMusics       : bindActionCreators(loadMainNewMusics, dispatch),
});

export const mergeProps = (stateProps: Object, dispatchProps: Object, ownProps: Object) => 
    Object.assign({}, ownProps, stateProps, dispatchProps);

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(MainHoc);