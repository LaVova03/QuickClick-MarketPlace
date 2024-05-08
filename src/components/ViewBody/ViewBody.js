import './ViewBody.scss';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ViewBody = () => {

    const navigate = useNavigate();
    const isData = useSelector(state => state.myReducer2.isData);
    const isImages = useSelector(state => state.myReducer2.isImages);

    const isIdCard = localStorage.getItem('setIdCard');
    const indexCard = localStorage.getItem('indexCard');

    const [photoUrl, addPhotoUrl] = useState([]);

    useEffect(() => {
        const newPhotoUrls = [];

        isImages[indexCard]?.forEach((base64String, index) => {
            const byteCharacters = atob(base64String);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: 'image/jpeg' });
            const url = URL.createObjectURL(blob);
            newPhotoUrls.push(url);
        });

        addPhotoUrl(newPhotoUrls);

    }, [isImages, indexCard]);

    useEffect(() => {
        console.log(photoUrl)
    }, [photoUrl])

    return (
        <div className='view_body_wrap'>
            <header>
                <button
                    onClick={() => navigate('/personal_area')}
                >
                </button>
            </header>

            {isData?.map(el => {
                if (el.id === +isIdCard) {
                    return (
                        <main key={el.id}>
                            <header>
                                <label>{el.title}</label>
                            </header>
                            <img src={photoUrl[0]} alt='logo' />
                        </main>
                    );
                }
                return null;
            })}
        </div >
    )
}

export default ViewBody;