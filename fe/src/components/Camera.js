import React, { useEffect } from 'react';
import '../css/Camera.css';
import { useState } from 'react';
import Webcam from "react-webcam";
import { Link, useNavigate } from 'react-router-dom';
import { foodAi } from './Api';

const Camera = () => {
    const fileInput = React.useRef(null);
    const webcamRef = React.useRef(null);

    const [capturedImage, setCapturedImage] = useState(null);

    const [isActive, setIsActive] = useState(false);
    const buttonText = isActive ? '성분표' : '음식';
    const Nowstate = isActive ? 'text' : 'food';
    const history = useNavigate();

    console.log('now /state : ' + Nowstate);
    const handleButtonClick = e => { //갤러리 버튼 클릭
        e.preventDefault();
        console.log('갤러리 버튼 클릭');
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
    const captureImage = async (e) => {
        e.preventDefault();
        const imageSrc = webcamRef.current.getScreenshot();

        // base64 이미지를 Blob으로 변환
        const byteString = atob(imageSrc.split(',')[1]);
        const mimeString = imageSrc.split(',')[0].split(':')[1].split(';')[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        const blob = new Blob([ab], { type: mimeString });
        const jpegFile = new File([blob], 'image.jpg', { type: 'image/jpeg' });
        // FormData 객체를 생성하고 Blob을 추가
        const formData = new FormData();
        formData.append('file', jpegFile);

        // 이제 formData에 JPEG 형식의 이미지가 포함되어 있습니다.
        formData.forEach((value, key) => {
            console.log(key, value);
        });
        const imageUrl = URL.createObjectURL(blob);
        setCapturedImage(imageUrl);
        console.log('??');
        try {
            console.log('???');
            const R = foodAi(formData);
            console.log('!!');
            // 응답을 필요에 따라 처리합니다.
            console.log(R.data);
            console.log('!!!!');
            // 응답에 따라 리다이렉트하려면 다음과 같이 수행할 수 있습니다:
<<<<<<< HEAD
            if (Nowstate === 'text') {
                console.log('텍스트 결과 분석 페이지로');
                history('/camera/textanalysis');
            } else if (Nowstate === 'food') {
                console.log('음식 결과 분석 페이지로');
                history('/camera/analysis');
            }
=======
            // if (Nowstate === 'text') {
            //     console.log('텍스트 결과 분석 페이지로');
            //     history('/camera/textanalysis');
            // } else if (Nowstate === 'food') {
            //     console.log('음식 결과 분석 페이지로');
            //     history('/camera/analysis');
            // }
>>>>>>> f06b13d44c8afa5f8a4d54e2f898f6e758897957

        } catch (error) {
            console.error('이미지 업로드 오류:', error);
            // 필요에 따라 오류를 처리합니다.
        }

    };
    const resetImage = () => {
        setCapturedImage(null);
    };

    const handleToggle = (e) => {
        setIsActive(!isActive);
    };

    return (
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