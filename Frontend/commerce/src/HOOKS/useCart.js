import { useContext } from 'react';
import { getCartItems, deleteOrderItem } from '../API/Products';
import { AuthContext } from '../App';

const useCart = () => {
  const [user, setUser, isAuthenticated, setAuthenticated, cart, setCart] =
    useContext(AuthContext);

  const setCartData = async (cartId) => {
    const response = await getCartItems(cartId);
    const {
      status,
      data: { results },
    } = response;
    if (status === 200) setCart(results);
  };

  const deleteCartItem = async (cartId) => {
    console.log('here');
    const response = await deleteOrderItem(cartId);
    const { status } = response;
    console.log(response);
    if (status === 204) setCartData(localStorage.getItem('cart'));
  };

  return [setCartData, deleteCartItem];
};

export default useCart;
