import React, { useState } from 'react';
import Navigator from './Navigator';
import style from '../css/My.module.css';
import { MdOutlineAlarmOn, MdOutlineRecommend } from "react-icons/md";
import { CircularProgress, CircularProgressWithLabel } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';


const Graph = () => {

    const data = [
        { day: '월', value: 500 },
        { day: '화', value: 300 },
        { day: '수', value: 700 },
        { day: '목', value: 200 },
        { day: '금', value: 600 },
        { day: '토', value: 800 },
        { day: '일', value: 400 },
    ];
    
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

            <LineChart
                width={600}
                height={300}
                data={data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
        </div>
    );
};

export default Graph;   