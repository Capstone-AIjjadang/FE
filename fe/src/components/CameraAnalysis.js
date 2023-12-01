import React from 'react';
import style from "../css/Analysis.module.css";
import { LinearProgress } from '@mui/material';
import { nutri } from './Api';

const CameraAnalysis = () => {
    const [rating, setRating] = React.useState(0);
    const handleRatingChange = (value) => {
        setRating(value);
    };
    const [nut, setNutri] = React.useState();
    React.useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        const response = await nutri();
        setNutri(response);
    };
    console.log(nut?.data);
    const N = nut?.data || [];
    return (
        <div className={style.container}>
            <div className={style.header}>
                <img src={"/imgs/Logo.png"} height="30px" />
            </div>
            <form className={style.form}>
                <div className={style.screen_container}>
                    <div><img src={"/imgs/foodsample1.png"} height="250" /></div>
                    <div className={style.foodname}>인식된 음식이름</div>
                </div>
                <div className={style.analysis_container}>

                    {N[N.length - 1] && <div className={style.analysis}>
                        <div className={style.sec1}>
                            <li>총 칼로리 <span>00Kcal</span>
                                <LinearProgress variant="determinate" value={N[N.length - 1].calories} style={{ width: '100px', height: '14px', borderRadius: '10px' }} />
                            </li>
                            <br /><br /><br />
                            <li>탄수화물<span>00g</span>
                                <LinearProgress variant="determinate" value={N[N.length - 1].carbohydrates} style={{ width: '100px', height: '14px', borderRadius: '10px' }} />
                            </li>
                        </div>
                        <div className={style.sec2}>
                            <li>나트륨<span>00g</span>
                                <LinearProgress variant="determinate" value={N[N.length - 1].sodium} style={{ width: '100px', height: '14px', borderRadius: '10px' }} />
                            </li>
                            <br /><br /><br />
                            <li>단백질<span>00g</span>
                                <LinearProgress variant="determinate" value={N[N.length - 1].protein} style={{ width: '100px', height: '14px', borderRadius: '10px' }} />
                            </li>
                        </div>
                        <div className={style.sec3}>
                            <li>지방<span>00g</span>
                                <LinearProgress variant="determinate" value={10} style={{ width: '100px', height: '14px', borderRadius: '10px' }} />
                            </li>
                            <br /><br /><br />
                            <li>칼륨<span>00g</span>
                                <LinearProgress variant="determinate" value={N[N.length - 1].potassium} style={{ width: '100px', height: '14px', borderRadius: '10px' }} />
                            </li>
                        </div>
                    </div>}
                </div>
                <div className={style.info_container}>
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
                <div className={style.btn_container}>
                    <button className={style.btn_record}>기록하기</button>
                </div>
            </form>
        </div>
    );
};

export default CameraAnalysis;