import React, { useState, useEffect } from 'react';
import axios from 'axios';
import style from "../css/Analysis.module.css";
import { LinearProgress } from '@mui/material';
import { result_foodAi, imageonly } from './Api';
import { useNavigate } from 'react-router-dom';
// import loading from './loading';

const CameraAnalysis = () => {
    const [rating, setRating] = React.useState(0);
    const [amountEaten, setAmountEaten] = React.useState(0.5); // 초기값 설정
    const history = useNavigate();


    const handleRatingChange = (value) => {
        setRating(value);
    };

    const [nut, setNutri] = React.useState();
    React.useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        const response = await result_foodAi();
        setNutri(response);
    };
    console.log(nut?.data);
    const N = nut?.data || [];

    const [img, setImg] = React.useState();
    React.useEffect(() => {
        getData2();
    }, []);

    const getData2 = async () => {
        const response = await imageonly();
        setImg(response);
    };
    const I = img?.data || [];
    // const realImg = I.images[I.images.length - 1];
    console.log('I:', I);
    console.log('I.images:', I.images);
    // console.log('I.images.length:', I.images ? I.images.length : 'undefined');
    // const len = I.images.length;
    // console.log(len);

    const handleRecordClick = async (e) => {
        e.preventDefault();
        console.log(rating);

        try {
            // 서버로 보낼 데이터
            const postData = new URLSearchParams();
            postData.append('amount_eaten', rating.toString()); // 문자열로 변환하여 추가

            // Axios를 사용하여 POST 요청
            const response = await axios.post('http://localhost:8000/total_food_result/', postData);

            // 서버 응답 처리
            console.log('서버 응답:', response.data);
            history('/');
            // 여기에서 필요한 추가 처리를 수행할 수 있습니다.
        } catch (error) {
            // 에러 응답 콘솔 출력
            console.error('서버 통신 오류:', error);
            console.log('에러 응답 데이터:', error.response.data);
        }
    };

    return (
        <div className={style.container}>
            <div className={style.header}>
                <img src={"/imgs/Logo.png"} height="30px" />
            </div>
            <form className={style.form}>
                {N[N.length - 1] && <div className={style.screen_container}>
                    {I.images && I.images[I.images.length - 1] && <img src={`data:image;base64,${I.images[I.images.length - 1].image}`} height='300px' />}
                    <div className={style.foodname}>{N[N.length - 1].food_name}</div>
                </div>}
                <div className={style.analysis_container}>
                    {N[N.length - 1] && <div className={style.analysis}>
                        <div className={style.sec1}>
                            <li>총 칼로리 <span>{N[N.length - 1].food_cal}Kcal</span>
                                <LinearProgress variant="determinate" value={N[N.length - 1].food_cal / 10} style={{ width: '100px', height: '14px', borderRadius: '10px' }} />
                            </li>
                            <br /><br /><br />
                            <li>탄수화물<span>{N[N.length - 1].food_carbs}g</span>
                                <LinearProgress variant="determinate" value={N[N.length - 1].food_carbs} style={{ width: '100px', height: '14px', borderRadius: '10px' }} />
                            </li>
                        </div>
                        <div className={style.sec2}>
                            <li>나트륨<span>{N[N.length - 1].food_nat}mg</span>
                                <LinearProgress variant="determinate" value={N[N.length - 1].food_nat / 10} style={{ width: '100px', height: '14px', borderRadius: '10px' }} />
                            </li>
                            <br /><br /><br />
                            <li>단백질<span>{N[N.length - 1].food_protein}g</span>
                                <LinearProgress variant="determinate" value={N[N.length - 1].food_protein} style={{ width: '100px', height: '14px', borderRadius: '10px' }} />
                            </li>
                        </div>
                        <div className={style.sec3}>
                            <li>지방<span>{N[N.length - 1].food_fat}g</span>
                                <LinearProgress variant="determinate" value={N[N.length - 1].food_fat} style={{ width: '100px', height: '14px', borderRadius: '10px' }} />
                            </li>
                        </div>
                    </div>}
                </div>
                <div className={style.info_container}>
                    <div className={style.title}>
                        얼마나 드셨나요?
                    </div>
                    <div className={style.gagebar}>
                        {[1, 2, 3, 4].map((space) => (
                            <div
                                key={space}
                                onClick={() => handleRatingChange(space / 4)}
                                style={{
                                    display: 'flex',
                                    flex: 1,
                                    cursor: 'pointer',
                                    textAlign: 'center',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: space / 4 <= rating ? '#6C95EC' : '#F5EBEB',
                                    marginLeft: '3px',
                                }}
                            >
                                {space}/{4}
                            </div>
                        ))}
                    </div>
                </div>
                <div className={style.btn_container}>
                    <button className={style.btn_record} onClick={handleRecordClick}>기록하기</button>
                </div>
            </form>
        </div>
    );
};

export default CameraAnalysis;
