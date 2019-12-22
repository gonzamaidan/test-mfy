import React from 'react';
import { Typography, Grid } from '@material-ui/core'

export default ({extra, extraKey, label}) => {
	return extra[extraKey]?
	(<Grid item xs={6}>
		<Typography variant="body2" color="textSecondary" component="p">
			{`${label}: ${extra[extraKey]}`}
		</Typography>
	</Grid>) : ("")
}
;
