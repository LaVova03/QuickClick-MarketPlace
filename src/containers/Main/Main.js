import './Main.scss';
import MainHeader from '../../components/MainHeader/MainHeader';
import MainLeftSide from '../../components/MainLeftSide/MainLeftSide';
import MainSlider from '../../components/MainSlider/MainSlider';

function Main() {
  return (
    <div className="Main">
      <MainHeader />
      <MainLeftSide />
      <MainSlider />
    </div>
  );
}

export default Main;
