import { makeStyles } from '@material-ui/styles';
import { Button, Card } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import Rating from '@material-ui/lab/Rating';

const useStyles = makeStyles((theme) => ({
  container: {
    boxSizing: 'border-box',
    marginTop: '25px',
    display: 'flex',
    flexWrap: 'wrap',
  },
  card: {
    flex: ' 1 1 400px',
    margin: '10px',
    padding: '20px',
    boxSizing: 'border-box',
  },
  buttonContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  flex: {
    marginTop: '20px',
    width: '150px',
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

const Reviews = ({ reviews, handleMoreButton, handleClose, ...props }) => {
  const classes = useStyles();
  return (
    <>
      <section className={classes.container}>
        {reviews?.map(({ review_text, rating, user: { first_name } }) => {
          return (
            <Card classes={{ root: classes.card }}>
              <h3>{first_name}</h3>
              <Rating disabled name="simple-controlled" value={rating} />
              <p>{review_text}</p>
            </Card>
          );
        })}
      </section>
      {!!reviews.length && (
        <div className={classes.buttonContainer}>
          <div className={classes.flex}>
            <Button onClick={handleMoreButton} variant="outlined" color="primary">
              <ArrowDropDownIcon />
            </Button>
            <Button onClick={handleClose} variant="outlined" color="primary">
              <ArrowDropUpIcon />
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Reviews;
