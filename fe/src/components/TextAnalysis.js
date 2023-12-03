import React from 'react';
import style from "../css/Analysis.module.css";
import { LinearProgress } from '@mui/material';
import { result_ocrAi } from "./Api";

const TextAnalysis = () => {
    const [rating, setRating] = React.useState(0);
    const [text, setText] = React.useState();

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
    const N = text?.data || [];
    // console.log(N[N.length - 1].text_protein);
    const parseValue = (value) => {
        if (!value) {
            return 0;
        }
        const match = value.match(/^(\d+(\.\d+)?)\s+/);
        return match ? parseFloat(match[1]) : 0;
    };
    return (
        <div className={style.container}>
            <div className={style.header}>
                <img src={"/imgs/Logo.png"} height="30px" />
            </div>
            <form className={style.form}>
                <div className={style.screen_container}>
                    <div><img src={"/imgs/textsample.png"} height="300" /></div>
                </div>
                <div className={style.analysis_container}>
                    {N[N.length - 1] && <div className={style.analysis}>
                        <div className={style.sec1}>
                            <li>총 칼로리 <span>{parseValue(N[N.length - 1].text_cal)}Kcal</span>
                                <LinearProgress variant="determinate" value={parseValue(N[N.length - 1].text_cal)} style={{ width: '100px', height: '14px', borderRadius: '10px' }} />
                            </li>
                            <br /><br /><br />
                            <li>탄수화물<span>{parseValue(N[N.length - 1].text_carbs)}g</span>
                                <LinearProgress variant="determinate" value={parseValue(N[N.length - 1].text_carbs)} style={{ width: '100px', height: '14px', borderRadius: '10px' }} />
                            </li>
                        </div>
                        <div className={style.sec2}>
                            <li>나트륨<span>{parseValue(N[N.length - 1].text_nat)}mg</span>
                                <LinearProgress variant="determinate" value={parseValue(N[N.length - 1].text_nat)} style={{ width: '100px', height: '14px', borderRadius: '10px' }} />
                            </li>
                            <br /><br /><br />
                            <li>단백질<span>{parseValue(N[N.length - 1].text_protein)}g</span>
                                <LinearProgress variant="determinate" value={parseValue(N[N.length - 1].text_protein)} style={{ width: '100px', height: '14px', borderRadius: '10px' }} />
                            </li>
                        </div>
                        <div className={style.sec3}>
                            <li>지방<span>{parseValue(N[N.length - 1].text_fat)}g</span>
                                <LinearProgress variant="determinate" value={parseValue(N[N.length - 1].text_fat)} style={{ width: '100px', height: '14px', borderRadius: '10px' }} />
                            </li>
                            <br /><br /><br />
                            <li>당류<span>30000000g</span>
                                <LinearProgress variant="determinate" value={30} style={{ width: '100px', height: '14px', borderRadius: '10px' }} />
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
                            <input type='text' placeholder='음식 이름을 적어주세요' />
                        </div>
                    </div>
                </div>
                <div className={style.btn_container}>
                    <button className={style.btn_record}>기록하기</button>
                </div>
            </form>
        </div>
    );
};

export default TextAnalysis;