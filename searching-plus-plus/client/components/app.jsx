import React, { Component } from 'react';
import { connect } from 'react-redux';

import Searchbox from './searchbox.jsx';
import Resultbox from './resultbox.jsx';
import Title from './title.jsx';
import { Grid, CssBaseline, AppBar, Toolbar, Typography } from '@material-ui/core'

import '../styles/app.css';

class App extends Component {
    render() {
        return (
            <Grid containter>
                <CssBaseline/>
                <Title/>
                <Grid className="client-styles-app-bodyGrid" item xs={12} container>
                    <Grid xs={12} item>
                        <Searchbox />
                    </Grid>
                    <Grid xs={12} item>
                        <Resultbox results={this.props.results} />
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        results: state.results,
        text: state.text,
    };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {};
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
