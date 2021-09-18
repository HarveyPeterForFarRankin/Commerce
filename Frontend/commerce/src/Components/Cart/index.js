import { Button, Divider, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import useCart from '../../HOOKS/useCart';
import CancelIcon from '@material-ui/icons/Cancel';
import { useContext } from 'react';
import { AuthContext } from '../../App';
import { getCart, updateOrder } from '../../API/Products';

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
    textTransform: 'capitalize',
  },
  cross: {
    cursor: 'pointer',
    color: theme.palette.secondary.dark,
  },
  quantity: {
    padding: 0,
    marginRight: '15px',
  },
}));

const Cart = ({ items = [], ...props }) => {
  const [user, setUser, isAuthenticated, setAuthenticated, cart, setCart] =
    useContext(AuthContext);
  const classes = useStyles();
  const [setCartData, deleteCartItem] = useCart();

  let total = 0;
  if (Array.isArray(items))
    total = items.reduce((acc, item) => item.product.cost * item.quantity + acc, 0);

  const handleDelete = (id) => {
    deleteCartItem(id);
  };

  const handleBuy = () => {
    const cartId = localStorage.getItem('cart');
    if (cartId) {
      const payload = {
        status: 'closed',
        owner: user.id || user.user_id,
      };
      updateOrder(payload, cartId).then((res) => {
        const { status } = res;
        if (status === 200) {
          localStorage.removeItem('cart');
          setCart([]);
          getCart(user.id || user.user_id).then((res) => {
            const {
              data: { id },
            } = res;
            localStorage.setItem('cart', id);
          });
        }
      });
    }
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
                  <div className={classes.flex}>
                    <p>£{cost}</p>
                    <p className={classes.quantity}>x {quantity}</p>
                  </div>
                  <Divider />
                </div>
              );
            })}
          </div>
          <div className={classes.flex}>
            <Button
              onClick={handleBuy}
              className={classes.button}
              variant="contained"
              color="secondary"
            >
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
