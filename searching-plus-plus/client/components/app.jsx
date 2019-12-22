import React, { Component } from 'react';
import { connect } from 'react-redux';

import Searchbox from './searchbox.jsx';
import Resultbox from './resultbox.jsx';
import Title from './title.jsx';
import { Grid, CssBaseline, TablePagination } from '@material-ui/core'

import '../styles/app.css';
import ACTIONS from "../actions";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			rowsPerPage:12,
			page: 1,
		}
	}
	
	componentDidMount() {
		this.setState({ text: '' });
	}
	
	
	
	render() {
		const handleChangePage = (event, newPage) => {
			this.props.doSearch(this.state.text, newPage + 1)
			this.setState({page: newPage + 1});
		}
		const search = () => {
			this.props.doSearch(this.state.text, 1);
			this.setState({page:1})
        }
		
		const handleTextChange = (event) => {
			this.setState({ text: event.target.value });
		}
		
		const {page, rowsPerPage} = this.state
		return (
			<Grid container
				  direction="row"
				  justify="center"
				  alignItems="center"
			>
				<CssBaseline/>
				<Title/>
				<Grid className="client-styles-app-bodyGrid" item xs={12} sm={10}>
					<Grid xs={12} item>
						<Searchbox handleTextChange={handleTextChange} search={search} />
					</Grid>
					<Grid xs={12} item>
						{
							this.props.results.length > 0 &&
							(
								<TablePagination
									rowsPerPageOptions={[10]}
									component="div"
									count={this.props.count}
									rowsPerPage={rowsPerPage}
									page={page - 1}
									backIconButtonProps={{
										'aria-label': 'Pagina anterior',
									}}
									nextIconButtonProps={{
										'aria-label': 'Proxima pagina',
									}}
									onChangePage={handleChangePage}
								/>)}
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
		count: state.count,
		text: state.text,
		page: state.page,
		rowsPerPage: state.rowsPerPage
	};
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		doSearch: (text, page) => dispatch(ACTIONS.searchFor(text, page))
	};
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
