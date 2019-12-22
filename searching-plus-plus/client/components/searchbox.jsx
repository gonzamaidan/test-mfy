import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Paper, TextField, Button } from '@material-ui/core'
import "../styles/searchbox.css"

/**
 * We keep the UI state local, decoupled from the *REDUX STATE*.
 */

class Searchbox extends Component {
	render() {
		return (
			<Paper className="client-styles-searchbox-paper">
				<Grid container spacing={2}>
					<Grid item xs={10} sm={4} lg={2}>
						<TextField
							id="standard-name"
							label="Buscar"
							onChange={event => this.props.handleTextChange(event)}
							margin="normal"
						/>
					</Grid>
					<Grid item xs={2}>
						<Button variant={"contained"} onClick={() => this.props.search()}>Buscar</Button>
					</Grid>
				</Grid>
			</Paper>
		);
	}
}


const mapStateToProps = (state, ownProps) => {
	return {};
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {};
}


export default connect(mapStateToProps, mapDispatchToProps)(Searchbox);
