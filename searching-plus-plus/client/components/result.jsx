import React from 'react';
import { Card, CardContent, Grid, Typography } from '@material-ui/core'
import ResultExtra from './resultExtra.jsx'

export default ({ result = {id: '', street: '??', number: '???', province: '' }, result: { extra = {}} }) => (
    <Grid item xs={12} sm={8} lg={4}>
        <Card>
            <CardContent>
				<Typography gutterBottom variant="h5" component="h2" className="client-styles-result-cardTitle">
				    { result.street } { result.number }
                    <Typography gutterBottom variant="h5" component="h2" className="client-styles-result-cardTitle-right">
                        $ { parseInt(result.valuation).toLocaleString(navigator.language, { minimumFractionDigits: 0 })}</Typography>
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    { result.county != "NULL" ? result.county + ", " : "" }{ result.area != "NULL" ? result.area + ", " : "" }{result.province}
				</Typography>
                <Grid container >
                    <ResultExtra extra={extra} extraKey={"piso"} label={"Piso"} />
                    <ResultExtra extra={extra} extraKey={"dpto"} label={"Depto"} />
                    <ResultExtra extra={extra} extraKey={"antiguedad"} label={"Antiguedad"} />
                    <ResultExtra extra={extra} extraKey={"cantbanos"} label={"Cant. baños"} />
                    <ResultExtra extra={extra} extraKey={"cantdorm"} label={"Cant. dormitorios"} />
                    <ResultExtra extra={extra} extraKey={"cantcocheras"} label={"Cant. cocheras"} />
                </Grid>
            </CardContent>
        </Card>
    </Grid>
);
