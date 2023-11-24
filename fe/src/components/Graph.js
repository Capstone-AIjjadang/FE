import React, { useState } from 'react';
import Navigator from './Navigator';
import style from '../css/My.module.css';
import { MdOutlineAlarmOn, MdOutlineRecommend } from "react-icons/md";
import { CircularProgress, CircularProgressWithLabel } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';


const Graph = () => {

    const buttonList = ['탄수화물', '단백질', '지방', '단백질', '나트륨', '칼슘'];

    const [currentValueIndex, setCurrentValueIndex] = useState(0);

    const toggleButton = () => {
        setCurrentValueIndex((prevIndex) => (prevIndex + 1) % buttonList.length);
    };

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

            <div className={style.title}><MdOutlineRecommend /> 주간 영양소 섭취량</div>

            <div className={style.center_container}>
                {buttonList.map((button, index) => (
                    <button
                        key={button}
                        onClick={toggleButton}
                        className={style.edit_profile}
                        style={{ display: index === currentValueIndex ? 'inline-block' : 'none' }}
                        >
                        {button}
                    </button>
                ))}
            </div>

            <div className={style.center_container}>
                <LineChart
                    width={650}
                    height={300}
                    data={data}
                    margin={{ top: 50, right: 30, left: 10, bottom:0}}
                    >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="value" name={buttonList[currentValueIndex]} stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
            </div>

            
        </div>
    );
};

export default Graph;   