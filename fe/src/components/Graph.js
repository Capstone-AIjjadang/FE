import React, { useState } from 'react';
import Navigator from './Navigator';
import style from '../css/My.module.css';
import { MdOutlineAlarmOn, MdOutlineRecommend } from "react-icons/md";
import { CircularProgress, CircularProgressWithLabel } from '@mui/material';
import { Line } from 'react-chartjs-2';

const Graph = () => {

    const data = {
        labels: ['월', '화', '수', '목', '금', '토', '일'],
        datasets: [
          {
            label: '데이터',
            data: [500, 300, 700, 200, 600, 800, 400],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
          },
        ],
      };

      const options = {
        scales: {
          y: {
            beginAtZero: true,
            max: 1000,
          },
        },
      };
    
      const handleEditClick = () => {
        // 여기에 정보 수정 모달 또는 다른 수정 방법을 구현할 수 있습니다.
        alert('Edit button clicked!');
      };

    return (
        <div className={style.container}>
            <div className={style.header}>
                <img src={"/imgs/Logo.png"} height="50px" />
            </div>

            <div className={style.title}><MdOutlineRecommend />사용자 정보</div>

            <div className={style.center_container}>
                <button onClick={handleEditClick} className={style.edit_profile}>
                    정보 수정
                </button>
            </div>
        </div>
    );
};

export default Graph;   