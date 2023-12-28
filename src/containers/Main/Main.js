import './Main.scss';
import MainHeader from '../../components/MainHeader/MainHeader';
import MainLeftSide from '../../components/MainLeftSide/MainLeftSide';
import MainSlider from '../../components/MainSlider/MainSlider';
import MainRightSide from '../../components/MainRightSide/MainRightSide';
import MainFoter from '../../components/MainFoter/MainFoter';

function Main() {
  return (
    <div className="Main">
      <MainHeader />
      <MainLeftSide />
      <MainSlider />
      <MainRightSide />
      <MainFoter />
    </div>
  );
}

export default Main;
