import './Main.scss';
import React from 'react';
import MainHeader from '../../components/MainHeader/MainHeader';
import MainLeftSide from '../../components/MainLeftSide/MainLeftSide';
import MainSlider from '../../components/MainSlider/MainSlider';
import MainRightSide from '../../components/MainRightSide/MainRightSide';
import MainFooter from '../../components/MainFooter/MainFooter';

function Main() {

  return (
    <div className="main">
      <MainHeader />
      <MainLeftSide />
      <MainSlider />
      <MainRightSide />
      <MainFooter />
    </div>
  );
}

export default Main;
