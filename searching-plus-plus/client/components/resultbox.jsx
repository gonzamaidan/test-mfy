import React from 'react';
import Result from './result.jsx';
import { Grid } from '@material-ui/core'
import '../styles/result.css'
export default ({ results = [] }) => (
    <Grid item xs={12} className="resultbox">
        <Grid container spacing={2}>
            {
                results.map((result, index) =>
                    (<Result result={result} key={index} />))
            }
        </Grid>
    </Grid>
);
