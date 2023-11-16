import React from 'react';
import Navigator from './Navigator';
import style from '../css/FoodRecommend.module.css';
import { MdOutlineAlarmOn, MdOutlineRecommend } from "react-icons/md";
import { CircularProgress, CircularProgressWithLabel } from '@mui/material';

const FoodRecommend = () => {
    return (
        <div className={style.container}>
            <div className={style.header}>
                <img src={"/imgs/Logo.png"} height="50px" />
            </div>
            <div className={style.Section_container}>
                <div className={style.Section1}>
                    <div className={style.title}><MdOutlineAlarmOn />성분 경보기</div>
                    <div className={style.IngredientAlarm_container}>
                        <div className={style.title}>
                            나트륨 경보기
                            <span >00/00 g</span>
                        </div>
                        <div className={style.CircularGraph}>
                            <CircularProgress variant="determinate" value={75} size='80px' thickness={8} />
                        </div>
                        <span className={style.Alarm_direction}>
                            오늘 나트륨 섭취량이 위험합니다.
                        </span>
                    </div>
                </div>
                <div className={style.Section2}>
                    <div className={style.title}><MdOutlineRecommend />추천 음식</div>
                    <div className={style.Recommend_container}>
                        <div className={style.Rec_direction}>현재 잔여 나트륨 함량은 00g 입니다.<br />
                            권장 칼륨은 00g 입니다.<br />
                            추천드리는 음식은 아래와 같습니다.</div>
                        <ul className={style.Rec_foods}>
                            <li>01. 추천음식1</li>
                            <li>02. 추천음식2</li>
                            <li>03. 추천음식3</li>
                            <li>04. 추천음식4</li>
                        </ul>
                    </div>
                </div>
            </div>
            <Navigator />
        </div>
    );
};

export default FoodRecommend;