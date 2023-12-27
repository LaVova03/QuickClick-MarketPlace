import './Main.scss';
import MainHeader from '../../components/MainHeader/MainHeader';
import MainLeftSide from '../../components/MainLeftSide/MainLeftSide';
import MainSlider from '../../components/MainSlider/MainSlider';
import MainRightSide from '../../components/MainRightSide/MainRightSide';

function Main() {
  return (
    <div className="Main">
      <MainHeader />
      <MainLeftSide />
      <MainSlider />
      <MainRightSide />
    </div>
  );
}

export default Main;
