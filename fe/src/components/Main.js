import React, { useEffect, useState } from 'react';
import style from '../css/Main.module.css';
import { MdOutlineCalendarToday, MdOutlineToday, MdOutlineFastfood } from "react-icons/md";
import { LinearProgress } from '@mui/material';
import { allList, imageonly, todaysumfood, recommendintake } from './Api';

const Main = () => {
    const num = 75;
    const maxNum = 100;
    const dealt = Math.floor((num / maxNum) * 100);

    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            // 매 초마다 현재 날짜 업데이트
            setCurrentDate(new Date());
        }, 1000);

        // 컴포넌트가 언마운트될 때 interval 정리
        return () => clearInterval(intervalId);
    }, []); // 빈 배열을 전달하여 컴포넌트가 처음 렌더링될 때만 실행

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString('ko-KR', options);
    const dayOfWeek = currentDate.toLocaleDateString('ko-KR', { weekday: 'long' }); // 요일만 따로 저장

    //allList
    const [list, setList] = React.useState();
    React.useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        const response = await allList();
        setList(response);
    };
    const N = list?.data || [];
    // console.log(N);

    //imageonly
    const [img, setImg] = React.useState();
    React.useEffect(() => {
        getData2();
    }, []);

    const getData2 = async () => {
        const response = await imageonly();
        setImg(response);
    };
    const I = img?.data.images || [];
    console.log(I);

    //todaysumfood
    const [today, setToday] = React.useState();
    React.useEffect(() => {
        getData3();
    }, []);

    const getData3 = async () => {
        const response = await todaysumfood();
        setToday(response);
    };
    const T = today?.data.total_food_data || [];


    //recommendintake
    const [intake, setIntake] = React.useState();
    React.useEffect(() => {
        getData4();
    }, []);

    const getData4 = async () => {
        const response = await recommendintake();
        setIntake(response);
    };
    const A = intake?.data.response_data || [];
    // console.log(T);


    return (
        <div className={style.container}>
            <div className={style.header}>
                <img src={"/imgs/Logo.png"} height="30px" />
            </div>

            <div className={style.Section1}>
                {/* <div style={{ marginLeft: '10px'}} ><MdOutlineCalendarToday /> 캘린더</div> */}
                <div className={style.calendar}>
                    <button type='button' className={`${style.btn_day} ${dayOfWeek === "일요일" ? style.active : ''}`}>일</button>
                    <button type='button' className={`${style.btn_day} ${dayOfWeek === "월요일" ? style.active : ''}`}>월</button>
                    <button type='button' className={`${style.btn_day} ${dayOfWeek === "화요일" ? style.active : ''}`}>화</button>
                    <button type='button' className={`${style.btn_day} ${dayOfWeek === "수요일" ? style.active : ''}`}>수</button>
                    <button type='button' className={`${style.btn_day} ${dayOfWeek === "목요일" ? style.active : ''}`}>목</button>
                    <button type='button' className={`${style.btn_day} ${dayOfWeek === "금요일" ? style.active : ''}`}>금</button>
                    <button type='button' className={`${style.btn_day} ${dayOfWeek === "토요일" ? style.active : ''}`}>토</button>
                </div>
            </div>
            <div className={style.Section2}>
                <div className={style.title}><MdOutlineToday /> 일일섭취량</div>
                {T && <div className={style.Day_container}>
                    <div className={style.Kcal}>
                        총 칼로리 <span>{Math.floor(T.Total_food_cal)} / {Math.floor(A.recommended_cal)}Kcal</span>
                        <LinearProgress
                            variant="determinate"
                            value={Math.min(Math.floor(T.Total_food_cal / A.recommended_cal * 100), 100)}
                            style={{ width: '300px', height: '50%', borderRadius: '10px' }}
                        />
                    </div>
                    <div className={style.sec1}>
                        <div>
                            탄수화물 <span>{Math.floor(T.Total_food_carbs)} / {Math.floor(A.recommended_carbs)}g</span>
                            <LinearProgress
                                variant="determinate"
                                value={Math.min(Math.floor(T.Total_food_carbs / A.recommended_carbs * 100), 100)}
                                style={{ width: '200px', height: '50%', borderRadius: '10px' }}
                            />
                        </div>
                        <div>
                            지방 <span>{Math.floor(T.Total_food_fat)} / {Math.floor(A.recommended_fat)}g</span>
                            <LinearProgress
                                variant="determinate"
                                value={Math.min(Math.floor(T.Total_food_fat / A.recommended_fat * 100), 100)}
                                style={{ width: '200px', height: '50%', borderRadius: '10px' }}
                            />
                        </div>
                    </div>
                    <div className={style.sec2}>
                        <div>
                            단백질 <span>{Math.floor(T.Total_food_protein)} / {Math.floor(A.recommended_protein)}g</span>
                            <LinearProgress
                                variant="determinate"
                                value={Math.min(Math.floor(T.Total_food_protein / A.recommended_protein * 100), 100)}
                                style={{ width: '200px', height: '50%', borderRadius: '10px' }}
                            />
                        </div>
                        <div>
                            나트륨 <span>{Math.floor(T.Total_food_nat)} / {Math.floor(A.recommended_nat)}mg</span>
                            <LinearProgress
                                variant="determinate"
                                value={Math.min(Math.floor(T.Total_food_nat / A.recommended_nat * 100), 100)}
                                style={{ width: '200px', height: '50%', borderRadius: '10px' }}
                            />
                        </div>
                    </div>

                </div>}
            </div>
            <div className={style.Section3}>
                <div className={style.title}><MdOutlineFastfood /> 식사 기록</div>
                {N && N.map((meal, index) => (
                    <div key={index} className={style.Food_container}>
                        {I[index] && <img src={`data:image;base64,${I[index].image}`} height='auto' />}
                        <ul className={style.todaymeal_container}>
                            <div className={style.foodname} >{meal.Total_food_name} <span>{meal.Total_food_cal}Kcal</span></div>
                            <div className={style.sec1}>
                                <li>탄수화물 <span>{meal.Total_food_carbs}g</span></li>
                                <li>지방 <span>{meal.Total_food_fat}g</span></li>
                            </div>
                            <div className={style.sec2}>
                                <li>단백질 <span>{meal.Total_food_protein}g</span></li>
                                <li>나트륨 <span>{meal.Total_food_nat}g</span></li>
                            </div>
                        </ul>
                    </div>))}
                {/* <div className={style.Food_container}>
                    <img src={"/imgs/foodsample2.png"} width="200" height="200" style={{ borderRadius: '15px' }} />
                    <ul className={style.todaymeal_container}>
                        <div className={style.foodname} >음식이름 <span>00Kcal</span></div>
                        <div className={style.sec1}>
                            <li>탄수화물 <span>00g</span></li>
                            <li>지방 <span>00g</span></li>
                        </div>
                        <div className={style.sec2}>
                            <li>단백질 <span>00g</span></li>
                            <li>칼슘 <span>00g</span></li>
                        </div>
                    </ul>
                </div> */}
            </div>
        </div>
    );
};

export default Main;