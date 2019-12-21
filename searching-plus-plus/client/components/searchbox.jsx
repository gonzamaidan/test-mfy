import React, { Component } from 'react';
import { connect } from 'react-redux';
import ACTIONS from '../actions';
import { Grid, Paper } from '@material-ui/core'


/**
 * We keep the UI state local, decoupled from the *REDUX STATE*.
 */

class Searchbox extends Component {
    handleTextChange(event) {
        this.setState({ text: event.target.value });
    }

    componentDidMount() {
        this.setState({ text: '' });
    }

    render() {
        return (
            <Paper className="searchbox">
                <Grid container>
                    <input type="text" onChange={event => this.handleTextChange(event)} />
                    <button onClick={() => this.props.doSearch(this.state.text)}>Search</button>
                </Grid>
            </Paper>
        );
    }
}


const mapStateToProps = (state, ownProps) => {
    return {};
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        doSearch: (text) => dispatch(ACTIONS.searchFor(text))
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(Searchbox);
