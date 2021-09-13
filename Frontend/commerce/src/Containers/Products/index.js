import { makeStyles } from '@material-ui/styles';
import { useState } from 'react';
import Slider from '../../Components/Slider';
import { sliderWidth } from '../../Constants/';
import SettingsEthernetIcon from '@material-ui/icons/SettingsEthernet';
import { IconButton } from '@material-ui/core';
import Card from '../../Components/Card';
//STYLES
const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: '1600px',
    position: 'relative',
    zIndex: 2000,
    marginTop: '50px',
    width: '100%',
    backgroundColor: '#EFEFEF',
    height: '400px',
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
    margin: '10px',
    flex: 1,
  },
}));

const Products = () => {
  const classes = useStyles();
  const [sliderOpen, setSlider] = useState(false);

  const toggleSlider = () => setSlider(!sliderOpen);

  return (
    <div className={classes.container}>
      <div className={classes.topBar}>
        <IconButton onClick={toggleSlider}>
          <SettingsEthernetIcon className={classes.expdandIcon} />
        </IconButton>
      </div>
      <div className={`${classes.content} ${!sliderOpen && classes.contentWide}`}>
        <div
          className={`${classes.sliderContainer} ${
            !sliderOpen && classes.sliderClosed
          }`}
        >
          <Slider closeNav={toggleSlider} />
        </div>
        <div
          className={`${classes.prdoductContainer} ${
            sliderOpen && classes.prdoductContainerOpen
          }`}
        >
          {[0, 0, 0, 0].map((card) => {
            return (
              <div className={classes.cardContainer}>
                <Card />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Products;
