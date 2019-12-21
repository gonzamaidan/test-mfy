import React from 'react';
import { Card, CardContent, Grid, Typography } from '@material-ui/core'

export default ({ result = {id: '', street: '??', number: '???' } }) => (
    <Grid item xs={12} sm={8} lg={4}>
        <Card>
            <CardContent>
				<Typography gutterBottom variant="h5" component="h2" className="client-styles-result-cardTitle">
				    { result.street } { result.number }
                    <Typography gutterBottom variant="h5" component="h2" className="client-styles-result-cardTitle-right">{ result.valuation} </Typography>
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                
				</Typography>
            </CardContent>
        </Card>
    </Grid>
);
