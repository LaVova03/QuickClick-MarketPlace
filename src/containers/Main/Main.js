import './Main.scss';
import MainHeader from '../../components/MainHeader/MainHeader';
import MainLeftSide from '../../components/MainLeftSide/MainLeftSide';
import MainSlider from '../../components/MainSlider/MainSlider';
import MainRightSide from '../../components/MainRightSide/MainRightSide';
import MainFooter from '../../components/MainFooter/MainFooter';
import MainBurgerMenu from '../../components/MainBurgerMenu/MainBurgerMenu';
import { useSelector } from 'react-redux';

function Main() {

  const isFlagSet = useSelector(state => state.myReducer?.isFlagSet);

  return (
    <div className="main">
      <MainHeader />
      <MainLeftSide />
      <MainSlider />
      <MainRightSide />
      <MainFooter />
      {isFlagSet ? <MainBurgerMenu /> : null}
    </div>
  );
}

export default Main;
