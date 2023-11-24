import React, { useEffect, useState } from 'react';
import style from '../css/Main.module.css';
import { MdOutlineCalendarToday, MdOutlineToday, MdOutlineFastfood } from "react-icons/md";
import { LinearProgress } from '@mui/material';

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



    return (
        <div className={style.container}>
            <div className={style.header}>
                <img src={"/imgs/Logo.png"} height="50px" />
            </div>

            <div>
                <p>현재 날짜: {formattedDate}</p>
                <p>오늘은 {dayOfWeek} 입니다.</p>
            </div>

            <div className={style.Section1}>
                <div className={style.title}><MdOutlineCalendarToday />캘린더</div>

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
                <div className={style.title}><MdOutlineToday />일일섭취량</div>
                <div className={style.Day_container}>
                    <div className={style.Kcal}>
                        총 칼로리 <span>00Kcal</span>
                        <LinearProgress variant="determinate" value={80} style={{ width: '300px', height: '50%', borderRadius: '10px' }} />
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
        </div>
    );
};

export default Main;