import * as React from 'react';
import { Stores, MatchType } from '../../types/index';
import { connect, Dispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import Match from '../../components/match';
import Player from '../../components/player';
import { MatchActions, receiveMatches } from '../../actions/match';
import { getMatches } from '../../reducers/match';

export interface Props {
    matches: Array<MatchType>;
    receiveMatches: () => {};
}

export interface State {
    
}

class Home extends React.Component<Props, State> {
    
    constructor(props: Props) {
        super(props);
        this._renderMatches = this._renderMatches.bind(this);
    }

    componentDidMount() {
        const { receiveMatches } = this.props;
        receiveMatches();
    }

    _renderMatches = () => {
        const { matches } = this.props;
        console.log('matches', matches);
        const result = matches.map((item: MatchType) => (
            <Match 
                key={item._id}
                data={item}
            />
        ));
        return result;
    }

    render() {
        return (
            <div>
                {this._renderMatches()}
                <Player/>
            </div>
        );
    }
}

export const mapStateToProps = (state: Stores) => ({
    matches: getMatches(state),
});

export const mapDispatchToProps = (dispatch: Dispatch<MatchActions>) => ({
    receiveMatches: bindActionCreators(receiveMatches, dispatch),
});

export const mergeProps = (stateProps: Object, dispatchProps: Object, ownProps: Object) => 
    Object.assign({}, ownProps, stateProps, dispatchProps);

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Home);