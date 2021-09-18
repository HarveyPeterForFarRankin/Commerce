import { makeStyles } from '@material-ui/styles';
import { useEffect, useState } from 'react';
import Slider from '../../Components/Slider';
import { sliderWidth } from '../../Constants/';
import SettingsEthernetIcon from '@material-ui/icons/SettingsEthernet';
import { IconButton } from '@material-ui/core';
import Card from '../../Components/Card';
import { getAllProducts } from '../../API/Products';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Chip from '@material-ui/core/Chip';
import CancelIcon from '@material-ui/icons/Cancel';
import { useHistory } from 'react-router';
//STYLES
const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: '1600px',
    position: 'relative',
    zIndex: 2000,
    marginTop: '50px',
    width: '100%',
    backgroundColor: '#EFEFEF',
    marginBottom: '50px',
  },
  sliderContainer: {
    height: '100%',
    transition: 'all .6s',
    transform: 'scaleX(1)',
    transformOrigin: 'left',
  },
  sliderClosed: {
    transform: 'scaleX(0)',
  },
  content: {
    transition: 'all .6s',
    transform: 'scaleX(1)',
    boxSizing: 'border-box',
    display: 'flex',
    width: '100%',
  },
  contentWide: {
    marginLeft: `-${sliderWidth}`,
  },
  topBar: {
    height: '50px',
    backgroundColor: 'rgb(202,202,202, 0.3)',
    padding: '15px',
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  expdandIcon: {
    cursor: 'pointer',
    height: '24px',
    width: '24px',
    color: '#72A8A1',
  },
  prdoductContainer: {
    width: '100%',
    boxSizing: 'border-box',
    transition: 'all .6s',
    marginRight: `-${sliderWidth}`,
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {},
  },
  prdoductContainerOpen: {
    marginRight: 0,
  },
  cardContainer: {
    transition: 'all .6s',
    cursor: 'pointer',
    margin: '10px',
    flex: 1,
    '&:hover': {
      transform: 'translateY(-10px)',
    },
  },
  smallFilter: {
    display: 'flex',
    flex: '0 0 50%',
    justifyContent: 'space-around',
  },
  filterButton: {
    textTransform: 'capitalize',
    cursor: 'pointer',
    fontSize: '18px',
    border: 'none',
    margin: '5px',
    padding: 0,
    transition: 'all 0.6s',
    '&:hover': {
      color: '#993428',
    },
    overflowY: 'auto',
  },
}));

const categories = ['sport', 'summer', 'smart', 'casual', 'comfort'];

const Products = () => {
  const classes = useStyles();
  const [sliderOpen, setSlider] = useState(false);
  const [products, setProducts] = useState([]);
  const isSmallScreen = useMediaQuery('(max-width:800px)');
  const [category, setCategory] = useState('');
  const history = useHistory();

  useEffect(() => {
    setSlider(false);
  }, [isSmallScreen]);

  useEffect(() => {
    fetchProducts();
  }, [category]);

  const toggleSlider = () => setSlider(!sliderOpen);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await getAllProducts(category);
    const {
      data: { results },
      status,
    } = response;
    if (status === 200) {
      setProducts(results);
    }
  };

  const routeToProductPage = (id) => {
    const { push } = history;
    push({ pathname: `/product/${id}`, state: { key: id } });
  };

  return (
    <div className={classes.container}>
      <div className={`${classes.topBar} ${!!category && classes.spaceBetween}`}>
        {category && (
          <Chip
            label={category}
            onDelete={() => setCategory('')}
            deleteIcon={<CancelIcon />}
            color="secondary"
          />
        )}
        {isSmallScreen ? (
          <div className={classes.smallFilter}>
            {categories.map((category) => {
              return (
                <p
                  className={classes.filterButton}
                  type="button"
                  onClick={() => setCategory(category)}
                >
                  {category}
                </p>
              );
            })}
          </div>
        ) : (
          <IconButton onClick={toggleSlider}>
            <SettingsEthernetIcon className={classes.expdandIcon} />
          </IconButton>
        )}
      </div>
      <div className={`${classes.content} ${!sliderOpen && classes.contentWide}`}>
        <div
          className={`${classes.sliderContainer} ${
            !sliderOpen && classes.sliderClosed
          }`}
        >
          <Slider
            activeCategory={category}
            categoryClick={setCategory}
            closeNav={toggleSlider}
          />
        </div>
        <div
          className={`${classes.prdoductContainer} ${
            sliderOpen && classes.prdoductContainerOpen
          }`}
        >
          {products.map((product) => {
            return (
              <div key={product.id} className={classes.cardContainer}>
                <Card
                  buttonClick={routeToProductPage}
                  id={product.id}
                  title={product.title}
                  category={product.category}
                  cost={product.cost}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Products;
