import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';

const useStyles = makeStyles({
  media: {
    boxSizing: 'border-box',
    height: '300px',
    paddingTop: '56.25%', // 16:9
  },
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function SimpleCard({ id, title, category, buttonClick, ...props }) {
  const classes = useStyles();
  const image = require(`../../Assets/shoes/${id}.jpg`).default;
  return (
    <Card onClick={() => buttonClick(id)} className={classes.root}>
      <CardMedia className={classes.media} image={image} title="Paella dish" />
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {category}
        </Typography>
        <Typography variant="h5" component="h2">
          {title}
        </Typography>
        <Typography variant="body2" component="p">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          onClick={() => buttonClick(id)}
          variant="outlined"
          color="secondary"
          size="small"
        >
          Details
        </Button>
      </CardActions>
    </Card>
  );
}
