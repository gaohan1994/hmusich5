import * as React from 'react';
import { Stores } from '../../types/reducerTypes';
import { TribesType } from '../../types/componentTypes';
import { connect, Dispatch } from 'react-redux';
import * as CSSModules from 'react-css-modules';
import { bindActionCreators } from 'redux';
import { MatchActions } from '../../actions/match';
import * as styles from './index.css';

import Header from '../../components/header';
import Swiper from '../../components/swiper';
import Music from '../../components/music_new';
import Playlists from '../../components/playlist';
import Tribe from '../../components/tribe';
import Footer from '../../components/footer';

import { loadRecommendPlaylist, loadRecommendTribe } from '../../actions/main';
import { getPlaylist, getTribe } from '../../reducers/main';

export interface Props {
    getPlaylist : Array<Object>;
    getTribe    : TribesType;
    loadRecommendPlaylist   : () => void;
    loadRecommendTribe      : () => void;
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
        const { loadRecommendPlaylist, loadRecommendTribe } = this.props;
        loadRecommendPlaylist();
        loadRecommendTribe();
    }

    render() {
        return (
            <div styleName="container">
                <Header/>
                <Swiper/>
                {this.renderMusics()}
                {this.renderPlaylists()}
                {this.renderTribes()}
                <Footer/>
            </div>
        );
    }

    private renderMusics = () => {
        return (
            <section styleName="daliymusic">
                <i styleName="more"/>
                <div styleName="title">
                    <i styleName="icon"/>
                </div>
                <ul styleName="musics">
                    <li styleName="musicitem">
                        <Music/>
                    </li>
                    <li styleName="musicitem">
                        <Music/>
                    </li>
                    <li styleName="musicitem">
                        <Music/>
                    </li>
                </ul>
            </section>
        );
    }

    private renderPlaylists = () => {
        const { getPlaylist } = this.props;
        return (
            <section styleName="playlists">
                <i styleName="listmore"/>
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
                <i styleName="more"/>
                <div styleName="title">
                    <i styleName="tribeIcon"/>
                </div>
                <ul styleName="tribesBox">
                    {tribes}
                </ul>
            </section>
        );
    }
}

const MainHoc = CSSModules(Main, styles);

export const mapStateToProps = (state: Stores) => ({
    getPlaylist : getPlaylist(state),
    getTribe    : getTribe(state),
});

export const mapDispatchToProps = (dispatch: Dispatch<MatchActions>) => ({
    loadRecommendPlaylist   : bindActionCreators(loadRecommendPlaylist, dispatch),
    loadRecommendTribe      : bindActionCreators(loadRecommendTribe, dispatch),
});

export const mergeProps = (stateProps: Object, dispatchProps: Object, ownProps: Object) => 
    Object.assign({}, ownProps, stateProps, dispatchProps);

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(MainHoc);