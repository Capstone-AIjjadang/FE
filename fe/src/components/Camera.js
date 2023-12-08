import React, { useState } from 'react';
import '../css/Camera.css';
import Webcam from "react-webcam";
import { Link, useNavigate } from 'react-router-dom';
import { foodAi, ocrAi } from './Api';

const Camera = () => {
    const fileInput = React.useRef(null);
    const webcamRef = React.useRef(null);

    const [capturedImage, setCapturedImage] = useState(null);

    const [isActive, setIsActive] = useState(false);
    const buttonText = isActive ? '성분표' : '음식';
    const Nowstate = isActive ? 'text' : 'food';
    const history = useNavigate();

    console.log('now /state : ' + Nowstate);

    // Define formData outside of captureImage
    let formData;

    const handleButtonClick = e => {
        e.preventDefault();
        console.log('갤러리 버튼 클릭');
        fileInput.current.click();
    };

    const handleImageSelect = (e) => {
        const selectedImage = e.target.files[0];
        if (selectedImage) {
            const imageURL = URL.createObjectURL(selectedImage);
            setCapturedImage(imageURL);
        }
    };

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

        // Set formData value
        formData = new FormData();
        formData.append('file', jpegFile);

        const imageUrl = URL.createObjectURL(blob);
        setCapturedImage(imageUrl);

        try {
            let R;
            if (Nowstate === 'text') {
                console.log('OCR');
                R = await ocrAi(formData);
                history('/camera/textanalysis');
                console.log('텍스트 결과 분석 페이지로');
            } else if (Nowstate === 'food') {
                console.log('Food AI');
                R = await foodAi(formData);



                history('/camera/analysis');
                console.log('음식 결과 분석 페이지로');
            }
        } catch (error) {
            console.error('이미지 업로드 오류:', error);
        }
    };

    const resetImage = async () => {
        try {
            let R;
            if (Nowstate === 'text') {
                console.log('OCR');
                const imageBlob = await getImageBlobFromUrl(capturedImage);
                formData = new FormData();
                formData.append('file', imageBlob);
                R = await ocrAi(formData);
                history('/camera/textanalysis', { imageResult: R.data });
            } else if (Nowstate === 'food') {
                console.log('Food AI');
                const imageBlob = await getImageBlobFromUrl(capturedImage);
                formData = new FormData();
                formData.append('file', imageBlob);
                R = await foodAi(formData);
                history('/camera/analysis', { foodResult: R.data });
            }

            setCapturedImage(null); // 이미지 제거
        } catch (error) {
            console.error('이미지 업로드 오류:', error);
        }
    };

    // URL을 통해 이미지를 Blob으로 변환하는 함수
    const getImageBlobFromUrl = async (url) => {
        const response = await fetch(url);
        const blob = await response.blob();
        return blob;
    };


    // base64 이미지를 Blob으로 변환하는 함수
    const getImageBlobFromBase64 = (base64) => {
        return new Promise((resolve, reject) => {
            // base64 이미지를 Blob으로 변환
            const byteString = atob(base64.split(',')[1]);
            const mimeString = base64.split(',')[0].split(':')[1].split(';')[0];
            const ab = new ArrayBuffer(byteString.length);
            const ia = new Uint8Array(ab);
            for (let i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }
            const blob = new Blob([ab], { type: mimeString });
            resolve(blob);
        });
    };

    const handleToggle = () => {
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
                    <button className='btn_gallary' onClick={handleButtonClick}>
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
        </div>
    );
};

export default Camera;
