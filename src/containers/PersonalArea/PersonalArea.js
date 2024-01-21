import './PersonalArea.scss';
import React from 'react';
import Head from '../../components/MainHeader/MainHeader';
import Footer from '../../components/MainFooter/MainFooter';
import PersonalAreaBody from '../../components/PersonalAreaBody/PersonalAreaBody';

const PersonalArea = () => {
    return (
        <div className='PersonalArea__wrap'>
            <Head />
            <PersonalAreaBody />
            <Footer />
        </div>
    )
}

export default PersonalArea;