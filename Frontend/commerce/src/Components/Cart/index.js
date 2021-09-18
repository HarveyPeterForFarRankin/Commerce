import { Button, Divider, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import useCart from '../../HOOKS/useCart';
import CancelIcon from '@material-ui/icons/Cancel';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '300px',
    boxSizing: 'border-box',
    padding: '15px',
    overflow: 'hidden',
  },
  items: {
    maxHeight: '300px',
    overflow: 'auto',
  },

  flex: {
    marginTop: '15px',
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  total: {
    padding: 0,
    margin: 0,
    fontSize: '18px',
    fontWeight: 'bold',
  },
  cross: {
    cursor: 'pointer',
    color: theme.palette.secondary.dark,
  },
}));

const Cart = ({ items, ...props }) => {
  const classes = useStyles();
  const [setCartData, deleteCartItem] = useCart();
  const total = items.reduce(
    (acc, item) => item.product.cost * item.quantity + acc,
    0
  );

  const handleDelete = (id) => {
    deleteCartItem(id);
  };

  return (
    <div className={classes.container}>
      {items.length ? (
        <>
          <div className={classes.items}>
            {items.map(({ product: { title, cost }, quantity, id }) => {
              return (
                <div>
                  <div className={classes.flex}>
                    <p className={classes.total}>{title}</p>
                    <IconButton onClick={() => handleDelete(id)}>
                      <CancelIcon className={classes.cross} />
                    </IconButton>
                  </div>

                  <p>£{cost}</p>
                  <Divider />
                </div>
              );
            })}
          </div>
          <div className={classes.flex}>
            <Button className={classes.button} variant="contained" color="secondary">
              Buy Now
            </Button>
            <p className={classes.total}>£{total}</p>
          </div>
        </>
      ) : (
        <p>Cart is empty</p>
      )}
    </div>
  );
};

export default Cart;
