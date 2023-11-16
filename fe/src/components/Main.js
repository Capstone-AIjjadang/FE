import React from 'react';
import Navigator from './Navigator';
import style from '../css/Main.module.css';
import { MdOutlineCalendarToday, MdOutlineToday, MdOutlineFastfood } from "react-icons/md";
import { LinearProgress } from '@mui/material';

const Main = () => {
    const num = 75;
    const maxNum = 100;
    const dealt = Math.floor((num / maxNum) * 100);

    return (
        <div className={style.container}>
            <div className={style.header}>
                <img src={"/imgs/Logo.png"} height="50px" />
            </div>
            <div className={style.Section1}>
                <div className={style.title}><MdOutlineCalendarToday />캘린더</div>

                <div className={style.calendar}>
                    <button type='button' className={style.btn_day1}>일</button>
                    <button type='button' className={style.btn_day2}>월</button>
                    <button type='button' className={style.btn_day3}>화</button>
                    <button type='button' className={style.btn_day4}>수</button>
                    <button type='button' className={style.btn_day5}>목</button>
                    <button type='button' className={style.btn_day6}>금</button>
                    <button type='button' className={style.btn_day7}>토</button>
                </div>
            </div>
            <div className={style.Section2}>
                <div className={style.title}><MdOutlineToday />일일섭취량</div>
                <div className={style.Day_container}>
                    <div className={style.Kcal}>
                        총 칼로리 <span>00Kcal</span>
                        <LinearProgress variant="determinate" value={50} style={{ width: '300px', height: '50%', borderRadius: '10px' }} />
                    </div>
                    <div className={style.sec1}>
                        <div>
                            탄수화물 <span>00g</span>
                            <LinearProgress variant="determinate" value={50} style={{ width: '200px', height: '50%', borderRadius: '10px' }} />
                        </div>
                        <div>
                            지방<span>00g</span>
                            <LinearProgress variant="determinate" value={50} style={{ width: '200px', height: '50%', borderRadius: '10px' }} />
                        </div>
                    </div>
                    <div className={style.sec2}>
                        <div>
                            단백질<span>00g</span>
                            <LinearProgress variant="determinate" value={50} style={{ width: '200px', height: '50%', borderRadius: '10px' }} />
                        </div>
                        <div>
                            칼슘<span>00g</span>
                            <LinearProgress variant="determinate" value={50} style={{ width: '200px', height: '50%', borderRadius: '10px' }} />
                        </div>
                    </div>
                </div>
            </div>
            <div className={style.Section3}>
                <div className={style.title}><MdOutlineFastfood />오늘의 식사</div>
                <div className={style.Food_container}>
                    <img src={"/imgs/foodsample.jpg"} width="200" height="200" />
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
                </div>
                <div className={style.Food_container}>
                    <img src={"/imgs/foodsample.jpg"} width="200" height="200" />
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
                </div>
            </div>
            <Navigator />
        </div>
    );
};

export default Main;