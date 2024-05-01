import './Main.scss';
import React from 'react';
import MainLeftSide from '../../components/MainLeftSide/MainLeftSide';
import MainSlider from '../../components/MainSlider/MainSlider';
import MainRightSide from '../../components/MainRightSide/MainRightSide';

function Main() {

  return (
    <div className="main">
      <MainLeftSide />
      <MainSlider />
      <MainRightSide />
    </div>
  );
}

export default Main;
