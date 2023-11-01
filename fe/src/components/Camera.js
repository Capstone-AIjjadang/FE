import React from 'react';
import '../Module.css/Camera.Module.css'
import btn_gallary from '../styles/btn_gallary.png';
import { useState } from 'react';
import Webcam from "react-webcam";
// npm install react-webcam

const Camera = () => {

    const fileInput = React.useRef(null);
    const webcamRef = React.useRef(null);

    const [capturedImage, setCapturedImage] = useState(null);

    const handleButtonClick = e => { //갤러리 버튼 클릭
        e.preventDefault();
        fileInput.current.click();
    };
    const handleChange = e => {
        fileInput.current.click();
    };
    const handleImageSelect = (e) => {
        const selectedImage = e.target.files[0];
        if (selectedImage) {
            const imageURL = URL.createObjectURL(selectedImage);
            setCapturedImage(imageURL); // 이미지를 capturedImage 상태에 설정
        }
    };

    //webcam 사진캡쳐 부분
    const captureImage = (e) => {
        e.preventDefault();
        const imageSrc = webcamRef.current.getScreenshot();
        setCapturedImage(imageSrc);
    };
    const resetImage = () => {
        setCapturedImage(null);
    };

    //음식,성분표 토글버튼
    const [isActive, setIsActive] = useState(false);
    const buttonText = isActive ? '성분표' : '음식';
    const handleToggle = () => {
        setIsActive(!isActive);
    };


    return (
        <div className='camera_container'>
            <div className='screen_container'>
                {capturedImage ? (
                    <img
                        src={capturedImage}
                        alt='Captured'
                        className='screen'
                    />
                ) : (
                    <Webcam
                        ref={webcamRef}
                        className='screen'
                        screenshotFormat='image/jpeg'
                    />
                )}
                <div className='food_name'>
                    {capturedImage ? '찍은 사진' : '인식된 음식이름'}
                </div>
            </div>
            <br />
            <div className='btns'>
                <form type="submit" className='btns'>
                    <input
                        type="file"
                        accept='image/*'
                        ref={fileInput}
                        onChange={handleImageSelect}
                        style={{ display: "none" }}
                    />
                    <button className='btn_gallary'
                        onClick={handleButtonClick}>
                        <img src={btn_gallary} className='btn_gallary' />
                    </button>

                    <button type="button" className='btn_photo' onClick={capturedImage ? resetImage : captureImage}>
                        {capturedImage ? '다시 찍기' : '사진 찍기'}
                    </button>

                    <div
                        className={`toggle-button ${isActive ? 'ingredient' : 'food'}`}
                        onClick={handleToggle}
                    >
                    </div>
                    {buttonText}
                </form>
            </div>
        </div>
    );
};
export default Camera;