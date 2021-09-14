import {
  Button,
  Divider,
  Select,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useEffect, useState } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { withRouter } from 'react-router';
import { getProduct } from '../../API/Products';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles((theme) => ({
  outerContainer: {
    boxSizing: 'border-box',
    height: '100wh',
    backgroundColor: '#EFEFEF',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  container: {
    padding: '15px',
    width: 'min(100%, 1200px)',
    borderRadius: '10px',
  },
  productContainer: {
    height: '700px',
    backgroundColor: '#ffffff',
    display: 'flex',
    flexDirection: 'row',
    borderRadius: '10px',
  },
  row: {
    height: 'auto',
    flexDirection: 'column',
  },
  media: {
    boxSizing: 'border-box',
  },
  img: {
    borderTopRightRadius: '10px',
    borderBottomRightRadius: '10px',
    maxWidth: '100%',
    flexBasis: '50%',
    objectFit: 'cover',
  },
  innerContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    boxSizing: 'border-box',
    padding: '15px',
    width: '100%',
  },
  title: {
    textTransform: 'capitalize',
    fontSize: '24px',
    paddingBottom: '12px',
  },
  text: {
    padding: '12px 5px',
  },
  purchaseContainer: {
    position: 'relative',
    height: '300px',
    border: `1px solid ${'#ECECEC'} `,
    borderRadius: '10px',
    padding: '15px',
  },
  cost: {
    paddding: 0,
    margin: 0,
    fontSize: '28px',
  },
  inventory: {
    fontSize: '20px',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  green: {
    color: '#72A8A1',
  },
  red: {
    color: '#993428',
  },
  flex: {
    display: 'flex',
  },
  numberInput: {
    alignItems: 'center',
    marginLeft: '50px',
  },
  cartButton: {
    position: 'absolute',
    bottom: '15px',
    left: '15px',
  },
  helpIconPosition: {
    cursor: 'pointer',
    position: 'absolute',
    top: '15px',
    right: '15px',
  },
}));

const Product = ({ match, ...props }) => {
  const classes = useStyles();
  const isLargerThanSmall = useMediaQuery('(max-width:1200px)');
  const [product, setProduct] = useState(0);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    const {
      params: { key },
    } = match;

    getProduct(key)
      .then((res) => {
        const { data } = res;
        setProduct(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleChange = (e) => {
    setQuantity(e.target.value);
  };

  const { id, title, description, cost, inventory } = product;
  const quantityList = [1, 2, 3, 4, 5];
  return (
    <section className={classes.outerContainer}>
      <div className={classes.container}>
        <div
          className={`${classes.productContainer} ${
            isLargerThanSmall && classes.row
          }`}
        >
          {!!product && (
            <img
              className={classes.img}
              src={require(`../../Assets/shoes/${id}.jpg`).default}
              alt="shoe"
            />
          )}
          <div className={classes.innerContainer}>
            <div>
              <Typography className={classes.title} variant="h5" component="h2">
                {title}
              </Typography>
              <Divider />
              <p className={classes.text}>{description}</p>
            </div>
            <div className={classes.purchaseContainer}>
              <p className={classes.cost}>£{cost}</p>
              <p>
                {inventory ? (
                  <p className={`${classes.inventory} ${classes.green}`}>In Stock</p>
                ) : (
                  <p className={`${classes.inventory} ${classes.red}`}>
                    Out of Stock
                  </p>
                )}
              </p>
              <div className={classes.flex}>
                <p className={classes.inventory}>quantity</p>
                <FormControl variant="outlined">
                  <Select
                    disabled={!inventory}
                    disableUnderline
                    className={classes.numberInput}
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={quantity}
                    onChange={handleChange}
                    label="Age"
                  >
                    {quantityList.map((number) => {
                      return <MenuItem value={number}>{number}</MenuItem>;
                    })}
                  </Select>
                </FormControl>
              </div>
              <Button
                disabled={!inventory}
                className={classes.cartButton}
                color="secondary"
                variant="contained"
              >
                Add To Cart
              </Button>
              <div className={classes.helpIconPosition}>
                <Tooltip title="Returns">
                  <HelpOutlineIcon className={classes.green} />
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default withRouter(Product);
