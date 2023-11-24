import React from 'react';
import '../css/Camera.css';
import { useState } from 'react';
import Webcam from "react-webcam";
import { Link } from 'react-router-dom';
// npm install react-webcam

const Camera = () => {

    const fileInput = React.useRef(null);
    const webcamRef = React.useRef(null);

    const [capturedImage, setCapturedImage] = useState(null);

    const handleButtonClick = e => { //갤러리 버튼 클릭
        e.preventDefault();
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
        const imageSrc = webcamRef.current.getScreenshot(); //형식 지정하게 할 수 있니?
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
        // 
        <div className='camera_container'>
            <Link to="/" className='GotoHome' />
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
                        screenshotQuality={1}
                        minScreenshotWidth={1080}
                        minScreenshotHeight={720}
                    // width={ }
                    />
                )}
                <div className='food_name'>
                    {capturedImage ? '찍은 사진' : '인식된 음식이름'}
                </div>
            </div>
            <br />
            <div>
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
                        <img src={process.env.PUBLIC_URL + "/imgs/btn_gallary.png"} className='btn_gallary' />
                    </button>

                    <button type="button" className='btn_photo' onClick={capturedImage ? resetImage : captureImage} />
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div
                            className={`toggle-button ${isActive ? 'ingredient' : 'food'}`}
                            onClick={handleToggle}
                        >
                        </div>
                        {buttonText}
                    </div>

                </form>
            </div>
        </div >
    );
};
export default Camera;