import { Button, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useEffect } from 'react';
import { deleteOrderItem } from '../../API/Products';
import useCart from '../../HOOKS/useCart';

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
}));

const Cart = ({ items, ...props }) => {
  const classes = useStyles();
  const [setCartData, deleteCartItem] = useCart();
  const total = items.reduce(
    (acc, item) => item.product.cost * item.quantity + acc,
    0
  );

  const handleDelete = (id) => {
    deleteOrderItem(id);
  };

  return (
    <div className={classes.container}>
      <div className={classes.items}>
        {items.map(({ product: { title, cost }, quantity, id }) => {
          return (
            <div>
              <p className={classes.total}>{title}</p>
              <p>£{cost}</p>
              <button onClick={() => handleDelete(id)}>Delete</button>
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
    </div>
  );
};

export default Cart;
