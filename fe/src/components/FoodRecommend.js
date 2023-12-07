    import React, { useEffect, useState } from 'react';
    import axios from 'axios';
    import style from '../css/FoodRecommend.module.css';
    import { MdOutlineAlarmOn, MdOutlineRecommend } from "react-icons/md";
    import { CircularProgress, CircularProgressWithLabel } from '@mui/material';

    const FoodRecommend = () => {
        const [todayData, settodayData] = useState({
            total_food_data: {
                Total_food_nat: 0, // 또는 다른 기본값 설정
                // 기타 필요한 속성
            },
            // 기타 필요한 속성
        });
        const [intakeyData, setintakeData] = useState(null);
        const [userData, setUserData] = useState(null);
        // get
        const fetchData = async () => {
            try {
                // FastAPI 서버로 요청을 보냅니다. today_sum/recomend_intake/recomend_food
                const response1 = await axios.get('http://localhost:8000/today_sum_food/');
                const response2 = await axios.get('http://localhost:8000/recommended_intake/');
                const response = await axios.get('http://localhost:8000/recommended_food/');

                // 서버로부터 받은 데이터를 state에 저장합니다.
                settodayData(response1.data);
                setintakeData(response2.data);
                setUserData(response.data);
                console.log('Total_food_nat:', response1.data.total_food_data.Total_food_nat);
                console.log('Name:', response.data[0].name1);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        useEffect(() => {
            // fetchData 함수를 호출하여 데이터를 가져옵니다.
            fetchData();
        }, []);

        return (
            <div className={style.container}>
                <div className={style.header}>
                    <img src={"/imgs/Logo.png"} height="30px" />
                </div>
                <div className={style.Section_container}>
                    <div className={style.Section1}>
                        <div className={style.title}><MdOutlineAlarmOn /> 성분 경보기</div>
                        <div className={style.IngredientAlarm_container}>
                            <div className={style.title}>
                                나트륨 경보기
                                <span style={{ marginLeft: '7px' }}>{todayData && todayData.total_food_data ? Math.floor(todayData.total_food_data.Total_food_nat) : "로딩 중..."}/2300mg</span>
                            </div>
                            <div className={style.CircularGraph}>
                                {todayData && todayData.total_food_data ? (
                                    <CircularProgress
                                        variant="determinate"
                                        value={Math.floor(todayData.total_food_data.Total_food_nat / 2300 * 100 > 100 ? 100 : todayData.total_food_data.Total_food_nat / 2300 * 100)}
                                        size='80px'
                                        thickness={8}
                                        style={{
                                            color: todayData.total_food_data.Total_food_nat / 2300 * 100 >= 70
                                                ? 'red'
                                                : todayData.total_food_data.Total_food_nat / 2300 * 100 >= 30
                                                    ? 'blue'
                                                    : 'green'
                                        }}
                                    />
                                ) : null}
                            </div>
                            <span className={style.Alarm_direction} style={{
                                color: todayData && todayData.total_food_data
                                    ? todayData.total_food_data.Total_food_nat / 2300 * 100 >= 70
                                        ? 'red'
                                        : todayData.total_food_data.Total_food_nat / 2300 * 100 >= 30
                                            ? 'blue'
                                            : 'green'
                                    : 'black' // 설정할 기본 색상
                            }}>
                                {todayData.total_food_data.Total_food_nat / 2300 * 100 >= 70
                                    ? '오늘 나트륨 섭취량이 위험합니다.'
                                    : todayData.total_food_data.Total_food_nat / 2300 * 100 >= 30
                                        ? '오늘 나트륨 섭취량이 적정합니다.'
                                        : '오늘 나트륨 섭취량이 안전합니다.'
                                }
                            </span>
                        </div>
                    </div>
                    <div className={style.Section2}>
                        <div className={style.title}><MdOutlineRecommend /> 추천 음식</div>
                        <div className={style.Recommend_container}>
                            <div className={style.Rec_direction}>현재 잔여 나트륨 함량은 00g 입니다.<br />
                                권장 칼륨은 00g 입니다.<br />
                                추천드리는 음식은 아래와 같습니다.</div>
                            <ul className={style.Rec_foods}>
                                <li>01. {userData && userData.length > 0 ? userData[0].name1 : "Loading..."} </li>
                                <li>02. {userData && userData.length > 0 ? userData[0].name2 : "Loading..."}</li>
                                <li>03. {userData && userData.length > 0 ? userData[0].name3 : "Loading..."}</li>
                                <li>04. {userData && userData.length > 0 ? userData[0].name4 : "Loading..."}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    export default FoodRecommend;