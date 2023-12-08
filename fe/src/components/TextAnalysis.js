import React from 'react';
import style from "../css/Analysis.module.css";
import { LinearProgress } from '@mui/material';
import { result_ocrAi, imageonly, todaysumfood, recommendintake } from './Api';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';
const TextAnalysis = () => {
    const [loading, setLoading] = React.useState(true);
    const [rating, setRating] = React.useState(0);
    const [text, setText] = React.useState();
    const history = useNavigate();
    const [input_foodname, setinput_foodname] = React.useState('');
    const handleRatingChange = (value) => {
        setRating(value);
    };
    React.useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        const response = await result_ocrAi();
        setText(response);
    };
    // console.log(text?.data);
    const Text = text?.data.TextImageInfo || [];
    const Image = text?.data.OCRImageInfo || [];
    const handleRecordClick = async (e) => {
        e.preventDefault();
        console.log(rating);

        try {
            // 서버로 보낼 데이터
            const postData = new URLSearchParams();
            postData.append('amount_eaten', rating.toString()); // 문자열로 변환하여 추가
            postData.append('name', input_foodname); // 문자열로 변환하여 추가

            // Axios를 사용하여 POST 요청
            const response = await axios.post('http://localhost:8000/total_text_result/', postData);

            // 서버 응답 처리
            console.log('서버 응답:', response.data);
            history('/');
            // 여기에서 필요한 추가 처리를 수행할 수 있습니다.
        } catch (error) {
            // 에러 응답 콘솔 출력
            console.error('서버 통신 오류:', error);
            console.log('에러 응답 데이터:', error.response.data);
        }
    };

    //todaysumfood
    const [today, setToday] = React.useState();
    React.useEffect(() => {
        getData3();
    }, []);

    const getData3 = async () => {
        const response = await todaysumfood();
        setToday(response);
    };
    const T = today?.data.total_food_data || [];

    //recommendintake
    const [intake, setIntake] = React.useState();
    React.useEffect(() => {
        getData4();
    }, []);

    const getData4 = async () => {
        const response = await recommendintake();
        setIntake(response);
    };
    const A = intake?.data.response_data || [];
    React.useEffect(() => {
        // 5초 동안의 지연을 시뮬레이션합니다.
        const timeoutId = setTimeout(() => {
            setLoading(false);
        }, 3000);

        // 메모리 누수를 방지하기 위해 timeout을 정리합니다.
        return () => clearTimeout(timeoutId);
    }, []); // 컴포넌트가 마운트될 때 한 번만 실행됩니다.

    if (loading) {
        return <Loading />; // 로딩 중일 때 Loading 컴포넌트를 표시합니다.
    }
    return (
        <div className={style.container}>
            <div className={style.header}>
                <img src={"/imgs/Logo.png"} height="30px" />
            </div>
            <form className={style.form}>
                <div className={style.screen_container}>
                    {Image[Image.length - 1] && <div><img src={`data:image;base64,${Image[Image.length - 1].image}`} height="300" /></div>}
                </div>
                <div className={style.analysis_container}>
                    {Text[Text.length - 1] && <div className={style.analysis}>
                        <div className={style.sec1}>
                            <li>
                                총 칼로리 <span>{Math.floor(Text[Text.length - 1].text_cal * 10) / 10} Kcal</span>
                                <LinearProgress
                                    variant="determinate"
                                    value={(Math.floor(Text[Text.length - 1].text_cal * 10) / 10) / (Math.floor((A.recommended_cal - T.Total_food_cal) * 10) / 10) * 100 < 0 ? 100 : (Math.floor(Text[Text.length - 1].text_cal * 10) / 10) / (Math.floor((A.recommended_cal - T.Total_food_cal) * 10) / 10) * 100}
                                    style={{ width: '100px', height: '14px', borderRadius: '10px' }}
                                />
                            </li>
                            <br /><br /><br />
                            <li>
                                탄수화물<span>{Math.floor(Text[Text.length - 1].text_carbs * 10) / 10} g</span>
                                <LinearProgress
                                    variant="determinate"
                                    value={(Math.floor(Text[Text.length - 1].text_carbs * 10) / 10) / (Math.floor((A.recommended_carbs - T.Total_food_carbs) * 10) / 10) * 100 < 0 ? 100 : (Math.floor(Text[Text.length - 1].text_carbs * 10) / 10) / (Math.floor((A.recommended_carbs - T.Total_food_carbs) * 10) / 10) * 100}
                                    style={{ width: '100px', height: '14px', borderRadius: '10px' }}
                                />
                            </li>
                        </div>
                        <div className={style.sec2}>
                            <li>
                                나트륨<span>{Math.floor(Text[Text.length - 1].text_nat * 10) / 10} mg</span>
                                <LinearProgress
                                    variant="determinate"
                                    value={(Math.floor(Text[Text.length - 1].text_nat * 10) / 10) / (Math.floor((A.recommended_nat - T.Total_food_nat) * 10) / 10) * 100 < 0 ? 100 : (Math.floor(Text[Text.length - 1].text_nat * 10) / 10) / (Math.floor((A.recommended_nat - T.Total_food_nat) * 10) / 10) * 100}
                                    style={{ width: '100px', height: '14px', borderRadius: '10px' }}
                                />
                            </li>
                            <br /><br /><br />
                            <li>
                                단백질<span>{Math.floor(Text[Text.length - 1].text_protein * 10) / 10} g</span>
                                <LinearProgress
                                    variant="determinate"
                                    value={(Math.floor(Text[Text.length - 1].text_protein * 10) / 10) / (Math.floor((A.recommended_protein - T.Total_food_protein) * 10) / 10) * 100 < 0 ? 100 : (Math.floor(Text[Text.length - 1].text_protein * 10) / 10) / (Math.floor((A.recommended_protein - T.Total_food_protein) * 10) / 10) * 100}
                                    style={{ width: '100px', height: '14px', borderRadius: '10px' }}
                                />
                            </li>
                        </div>
                        <div className={style.sec3}>
                            <li>
                                지방<span>{Math.floor(Text[Text.length - 1].text_fat * 10) / 10} g</span>
                                <LinearProgress
                                    variant="determinate"
                                    value={(Math.floor(Text[Text.length - 1].text_fat * 10) / 10) / (Math.floor((A.recommended_fat - T.Total_food_fat) * 10) / 10) * 100 < 0 ? 100 : (Math.floor(Text[Text.length - 1].text_fat * 10) / 10) / (Math.floor((A.recommended_fat - T.Total_food_fat) * 10) / 10) * 100}
                                    style={{ width: '100px', height: '14px', borderRadius: '10px' }}
                                />
                            </li>
                        </div>

                    </div>}
                </div>
                <div className={style.info_container}>
                    <div className={style.Info1}>
                        <div className={style.title}>
                            얼마나 드셨나요?
                        </div>
                        <div className={style.gagebar}>
                            {[1, 2, 3, 4].map((space) => (
                                <div
                                    key={space}
                                    onClick={() => handleRatingChange(space / 4)}
                                    style={{
                                        display: 'flex',
                                        flex: 1,
                                        cursor: 'pointer',
                                        textAlign: 'center',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        backgroundColor: space / 4 <= rating ? '#6C95EC' : '#F5EBEB',
                                        marginLeft: '3px',
                                    }}
                                >
                                    {space}/{4}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={style.Info2}>
                        <div className={style.title}>
                            무슨 음식인가요?
                        </div>
                        <div className={style.write_foodname}>
                            <input type='text' placeholder='음식 이름을 적어주세요'
                                value={input_foodname}
                                onChange={(e) => setinput_foodname(e.target.value)} />
                        </div>
                    </div>
                </div>
                <div className={style.btn_container}>
                    <button className={style.btn_record} onClick={handleRecordClick}>기록하기</button>
                </div>
            </form>
        </div>
    );
};

export default TextAnalysis;