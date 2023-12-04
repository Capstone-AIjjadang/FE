import React, { useState } from 'react';
import style from '../css/Graph.module.css';
import { MdOutlineRecommend } from "react-icons/md";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const Graph = () => {
    const buttonList = ['탄수화물', '단백질', '지방', '나트륨', '칼슘'];
    const [currentValueIndex, setCurrentValueIndex] = useState(0);
    const resultString = `value${currentValueIndex + 1}`;

    const toggleButton = () => {
        setCurrentValueIndex((prevIndex) => (prevIndex + 1) % buttonList.length);
    };

    const data = [
        { day: '월', value1: 230, value2: 30, value3: 30, value4: 2.5, value5: 0.5 },
        { day: '화', value1: 140, value2: 40, value3: 49, value4: 3.1, value5: 0.8 },
        { day: '수', value1: 250, value2: 66, value3: 66, value4: 1.9, value5: 1.3 },
        { day: '목', value1: 370, value2: 92, value3: 35, value4: 2.3, value5: 1.2 },
        { day: '금', value1: 120, value2: 42, value3: 40, value4: 1.2, value5: 0.9 },
        { day: '토', value1: 250, value2: 29, value3: 51, value4: 4.5, value5: 0.2 },
        { day: '일', value1: 210, value2: 31, value3: 68, value4: 3.4, value5: 0.4 },
    ];

    const handleEditClick = () => {
        // 여기에 정보 수정 모달 또는 다른 수정 방법을 구현할 수 있습니다.
        alert('Edit button clicked!');
    };

    return (
        <div className={style.container}>
            <div className={style.header}>
                <img src={"/imgs/Logo.png"} height="30px" />
            </div>

            <div className={style.center_container}>
                {buttonList.map((button, nut_index) => (
                    <button
                        key={button}
                        onClick={toggleButton}
                        className={style.btn_style}
                        style={{ display: nut_index === currentValueIndex ? 'inline-block' : 'none' }}
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
                    margin={{ top: 50, right: 30, left: 10, bottom: 0 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey={resultString} name={buttonList[currentValueIndex]} stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
            </div>
        </div>
    );
};

export default Graph;
