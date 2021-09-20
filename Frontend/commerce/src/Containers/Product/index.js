import {
  Button,
  Divider,
  Select,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useContext, useEffect, useState } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { withRouter } from 'react-router';
import { getProduct, getReviewsForProduct, addToOrder } from '../../API/Products';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import Tooltip from '@material-ui/core/Tooltip';
import Reviews from '../../Components/Reviews';
import { useRef } from 'react';
import { Rating } from '@material-ui/lab';
import useCart from '../../HOOKS/useCart';
import { AuthContext } from '../../App';

const useStyles = makeStyles((theme) => ({
  outerContainer: {
    padding: '15px',
    boxSizing: 'border-box',
    height: '100wh',
    backgroundColor: '#EFEFEF',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  container: {
    boxSizing: 'border-box',
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
    maxWidth: '100%',
    flexBasis: '50%',
    objectFit: 'cover',
    [theme.breakpoints.up('md')]: {
      borderTopRightRadius: '10px',
      borderBottomRightRadius: '10px',
    },
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
    fontFamily: 'Lilita One, cursive',
    textTransform: 'capitalize',
    fontSize: '35px',
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
  reivews: {
    padding: '30px 0px',
  },
  question: {
    transition: 'all .6s',
    color: theme.palette.info.main,
    '&:hover': {
      color: theme.palette.info.dark,
    },
  },
}));

const Product = ({ match, ...props }) => {
  const classes = useStyles();
  const isLargerThanSmall = useMediaQuery('(max-width:1200px)');
  const [product, setProduct] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [pageSize, setPageSize] = useState(2);
  const reviewsEndRef = useRef(null);
  const [setCartData] = useCart();
  const [user, setUser, isAuthenticated, setAuthenticated] = useContext(AuthContext);

  useEffect(() => {
    const {
      params: { key },
    } = match;
    //get product
    handleProduct(key);
    // get all reviews for
    fetchReviews(key);
  }, []);

  useEffect(() => {
    // listen for pagination
    fetchReviews(product.id);
  }, [pageSize]);

  const handleChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleProduct = (id) => {
    getProduct(id)
      .then((res) => {
        const { data } = res;
        setProduct(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleAddToCart = async () => {
    const order = localStorage.getItem('cart');
    if (!!quantity) {
      console.log(product);
      const payload = {
        order: +order,
        product: +product.id,
        size: 1,
        quantity: +quantity,
      };
      const response = await addToOrder(payload);
      const { status } = response;
      if (status === 200) setCartData(order);
    }
  };

  const fetchReviews = async (id) => {
    if (id) {
      const response = await getReviewsForProduct(
        id?.toString(),
        pageSize.toString()
      );
      const {
        data: { results },
      } = response;
      setReviews(results);
      return response;
    }
  };

  const handleMoreReviews = () => setPageSize(pageSize + 2);
  const handleClose = () => setPageSize(2);

  const { id, title, description, cost, inventory } = product;
  const quantityList = [1, 2, 3, 4, 5];

  const overallRating =
    reviews.reduce((acc, current) => acc + current.rating, 0) / reviews.length;

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
              <p className={classes.cost}>£{cost}.00</p>
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
              <Rating disabled name="simple-controlled" value={overallRating} />
              <Tooltip
                title={
                  !isAuthenticated
                    ? 'Please sign in'
                    : !inventory
                    ? 'Sold Out'
                    : 'Add to Cart'
                }
              >
                <Button
                  onClick={handleAddToCart}
                  disabled={!inventory || !isAuthenticated}
                  className={classes.cartButton}
                  color="secondary"
                  variant="contained"
                >
                  Add To Cart
                </Button>
              </Tooltip>

              <div className={classes.helpIconPosition}>
                <Tooltip title="Returns">
                  <HelpOutlineIcon className={classes.question} />
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
        <div className={classes.reivews}>
          <Typography className={classes.title} variant="h2" component="h2">
            Reviews
          </Typography>
          <Divider />
          <div ref={reviewsEndRef}>
            <Reviews
              handleClose={handleClose}
              handleMoreButton={handleMoreReviews}
              reviews={reviews}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default withRouter(Product);
