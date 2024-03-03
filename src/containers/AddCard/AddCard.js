import './AddCard.scss';
import React from 'react';
import MainHeader from '../../components/MainHeader/MainHeader';
import MainFooter from '../../components/MainFooter/MainFooter';
import AddCardBody from '../../components/AddCardBody/AddCardBody';

const AddCard = () => {
    return (
        <div className='AddCard__wrap'>
            <MainHeader />
            <AddCardBody />
            <MainFooter />
        </div>
    )
}

export default AddCard;