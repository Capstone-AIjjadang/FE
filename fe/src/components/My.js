import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import style from '../css/My.module.css';
import { MdOutlineRecommend } from "react-icons/md";
import { Avatar, Button, CssBaseline, TextField, FormControl, FormControlLabel, FormHelperText, Grid, Box, Typography, Container } from '@mui/material/';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { memberinfo } from './Api';

const My = () => {
    const [userData, setUserData] = useState(null);
    const [formData, setFormData] = useState({
        name: "성헌아",
        weight: 1002,
        height: 19021,
        gender: "21",
        medical_history: "위피중독"
    });

    // get
    const fetchData = async () => {
        try {
            // FastAPI 서버로 요청을 보냅니다.
            const response = await axios.get('http://localhost:8000/fetch_user_join/');

            // 서버로부터 받은 데이터를 state에 저장합니다.
            setUserData(response.data);
            console.log('Name:', response.data[0].name);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    useEffect(() => {
        // fetchData 함수를 호출하여 데이터를 가져옵니다.
        fetchData();
    }, []);


    // const [userInfo, setUserInfo] = useState({
    //     username: '김민원',
    //     age: 25,
    //     weight: 78,
    //     height: 180,
    //     medicalHistory: '선택',
    // });

    const [isA1Visible, setA1Visible] = useState(true);
    const [isB1Visible, setB1Visible] = useState(false);
    const [isA2Visible, setA2Visible] = useState(true);
    const [isB2Visible, setB2Visible] = useState(false);
    const [isUserEditVisible, setUserEditVisible] = useState(false);

    // put
    const handleUpdateClick = async () => {
        if (isUserEditVisible) {
            try {
                const formDataString = new URLSearchParams(formData).toString();

                // 서버로 데이터를 보내고자 하는 PUT 요청
                const response = await axios.put('http://localhost:8000/update_user/', formDataString, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                });

                if (response.status === 200) {
                    console.log('Data updated successfully:', response.data);

                    // 업데이트 후에 서버에서 새로운 정보를 가져오기
                    fetchData();
                } else {
                    console.error('Failed to update data:', response.statusText);
                }
            } catch (error) {
                console.error('Error updating data:', error);
            }
        }
    };


    const toggleButtons1 = () => {
        setA1Visible(!isA1Visible);
        setB1Visible(!isB1Visible);
    };

    const toggleButtons2 = () => {
        handleUpdateClick();
        setA2Visible(!isA2Visible);
        setB2Visible(!isB2Visible);
        setUserEditVisible(!isUserEditVisible);
    };

    const [gender, setGender] = React.useState('');
    const [medical_history, setmedical_history] = React.useState('');

    const handleChange = (field, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    // const handleChange1 = (event) => {
    //     setGender(event.target.value);
    // };
    // const handleChange2 = (event) => {
    //     setmedical_history(event.target.value);
    // };


    const options1 = [
        { value: 'option1', label: '남자' },
        { value: 'option2', label: '여자' },
    ];

    const options2 = [
        { value: 'option1', label: '비만' },
        { value: 'option2', label: '고혈압' },
        { value: 'option3', label: '당뇨' },
    ];



    return (
        <div className={style.container}>
            <div className={style.header}>
                <img src={"/imgs/Logo.png"} height="30px" />
            </div>

            <div className={style.title}><MdOutlineRecommend /> 사용자 정보</div>
            <div className={style.Section_container}>
                <div className={style.Section1}>
                    {/* 사용자 사진 및 이름 */}
                    <div><img src={"/imgs/userimg.png"} width="143" height="143" /></div>
                    <div className={style.Username}>
                        {userData && userData.length > 0 ? userData[0].name : "Loading..."}
                    </div>
                </div>

                <div className={style.Section2}>
                    {isUserEditVisible ? (
                        <div className={style.user_edit}>
                            <div className={style.User_profile}>
                                <TextField // input에 해당하는 태그
                                    required
                                    fullWidth
                                    id='weight'
                                    label='체중'
                                    name='weight'
                                    variant='standard'
                                    value={formData.weight}
                                    onChange={(e) => handleChange('weight', e.target.value)}
                                    style={{ marginBottom: '15px' }}
                                />
                                <TextField // input에 해당하는 태그
                                    required
                                    fullWidth
                                    id='height'
                                    label='키'
                                    name='height'
                                    variant='standard'
                                    value={formData.height}
                                    onChange={(e) => handleChange('height', e.target.value)}
                                    style={{ marginBottom: '15px' }}
                                />
                                <Box sx={{ minWidth: 120, marginBottom: '15px' }}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">성별</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={formData.gender}
                                            label="성별"
                                            onChange={(e) => handleChange('gender', e.target.value)}
                                        >
                                            <MenuItem value={1}>남자</MenuItem>
                                            <MenuItem value={0}>여자</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                                <Box sx={{ minWidth: 120, marginBottom: '15px' }}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">병력</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={formData.medical_history}
                                            label="병력"
                                            onChange={(e) => handleChange('medical_history', e.target.value)}
                                        >
                                            <MenuItem value={0}>없음</MenuItem>
                                            <MenuItem value={1}>고혈압</MenuItem>
                                            <MenuItem value={2}>당뇨</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box>
                            </div>
                        </div>
                    ) : (<div className={style.user_container}>
                        <div className={style.User_profile}>
                            <p>나이 : {userData && userData.length > 0 ? userData[0].age : "Loading..."}세</p>
                            <p>체중 : {userData && userData.length > 0 ? userData[0].weight : "Loading..."}kg</p>
                            <p>키 : {userData && userData.length > 0 ? userData[0].height : "Loading..."}cm</p>
                            <p>성별 : {userData && userData.length > 0 ? userData[0].gender : "Loading..."}</p>
                            <p>병력 : {userData && userData.length > 0 ? userData[0].medical_history : "Loading..."}</p>
                        </div>
                    </div>)}
                </div>
            </div>

            <div className={style.center_container}>
                {isA1Visible && (

                    <Link to="/Login" className={style.login}>
                        <button onClick={toggleButtons1} className={style.logout}>
                            로그인
                        </button>
                    </Link>
                
                )}
            {isB1Visible && (
                <button onClick={toggleButtons1} className={style.logout}>
                    로그아웃
                </button>
            )}

            {isA2Visible && (
                <button onClick={toggleButtons2} className={style.edit_profile}>
                    정보 수정
                </button>
            )}
            {isB2Visible && (
                <button onClick={toggleButtons2} className={style.edit_profile}>
                    확인
                </button>
            )}
        </div>
        </div >
    );
};

export default My;