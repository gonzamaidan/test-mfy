import React, { Component } from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core'

import '../styles/app.css';

class Title extends Component {
	render() {
		return (
				<AppBar>
					<Toolbar>
						<Typography variant={"h4"}>
							Propiedades
						</Typography>
					</Toolbar>
				</AppBar>
		);
	}
}

export default Title;
