import React from 'react';
import style from "../css/Analysis.module.css";
import { LinearProgress } from '@mui/material';
import { result_ocrAi } from "./Api";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const TextAnalysis = () => {
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
                            <li>총 칼로리 <span>{Text[Text.length - 1].text_cal}Kcal</span>
                                <LinearProgress variant="determinate" value={Text[Text.length - 1].text_cal} style={{ width: '100px', height: '14px', borderRadius: '10px' }} />
                            </li>
                            <br /><br /><br />
                            <li>탄수화물<span>{Text[Text.length - 1].text_carbs}g</span>
                                <LinearProgress variant="determinate" value={Text[Text.length - 1].text_carbs} style={{ width: '100px', height: '14px', borderRadius: '10px' }} />
                            </li>
                        </div>
                        <div className={style.sec2}>
                            <li>나트륨<span>{Text[Text.length - 1].text_nat}mg</span>
                                <LinearProgress variant="determinate" value={Text[Text.length - 1].text_nat} style={{ width: '100px', height: '14px', borderRadius: '10px' }} />
                            </li>
                            <br /><br /><br />
                            <li>단백질<span>{Text[Text.length - 1].text_protein}g</span>
                                <LinearProgress variant="determinate" value={Text[Text.length - 1].text_protein} style={{ width: '100px', height: '14px', borderRadius: '10px' }} />
                            </li>
                        </div>
                        <div className={style.sec3}>
                            <li>지방<span>{Text[Text.length - 1].text_fat}g</span>
                                <LinearProgress variant="determinate" value={Text[Text.length - 1].text_fat} style={{ width: '100px', height: '14px', borderRadius: '10px' }} />
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