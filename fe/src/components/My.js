import React, { useState } from 'react';
import Navigator from './Navigator';
import style from '../css/My.module.css';
import { MdOutlineAlarmOn, MdOutlineRecommend } from "react-icons/md";
import { CircularProgress, CircularProgressWithLabel } from '@mui/material';

const My = () => {
    const [userInfo, setUserInfo] = useState({
        username: '김민원',
        age: 25,
        weight: 78,
        height: 180,
        medicalHistory: '선택',
      });
    
      const handleEditClick = () => {
        // 여기에 정보 수정 모달 또는 다른 수정 방법을 구현할 수 있습니다.
        alert('Edit button clicked!');
      };

      const options = [
        { value: 'option1', label: '비만' },
        { value: 'option2', label: '고혈압' },
        { value: 'option3', label: 'Option 3' },
      ];

    return (
        

        <div className={style.container}>
            <div className={style.header}>
                <img src={"/imgs/Logo.png"} height="50px" />
            </div>

            <div className={style.title}><MdOutlineRecommend />사용자 정보</div>
            <div className={style.Section_container}>
                <div className={style.Section1}>
                    
                    {/* 사용자 사진 및 이름 */}
                    <div><img src={"/imgs/userimg.png"} width="143" height="143"/></div>
                    <div className={style.Username}>
                        {userInfo.username}
                    </div>
                </div>

            <div className={style.Section2}>
                <div className={style.user_container}>
                    <div className={style.User_profile}>
                        <p>나이 : {userInfo.age}세</p>
                        <p>체중 : {userInfo.weight}kg</p>
                        <p>키 : {userInfo.height}cm</p>
                        <div>
                            나의 병력  
                            <select id="selectBox">
                                {options.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className={style.center_container}>
            <button onClick={handleEditClick} className={style.edit_profile}>
                정보 수정
            </button>
        </div>
        
        </div>
    );
};

export default My;