import React from 'react';
import style from "../css/Analysis.module.css";
import { LinearProgress } from '@mui/material';
import { result_foodAi } from './Api';

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
        const response = await result_foodAi();
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
                {N[N.length - 1] && <div className={style.screen_container}>
                    <div><img src={"/imgs/foodsample1.png"} height="250" /></div>
                    <div className={style.foodname}>{N[N.length - 1].food_name}</div>
                </div>}
                <div className={style.analysis_container}>

                    {N[N.length - 1] && <div className={style.analysis}>
                        <div className={style.sec1}>
                            <li>총 칼로리 <span>{N[N.length - 1].food_cal}Kcal</span>
                                <LinearProgress variant="determinate" value={N[N.length - 1].food_cal / 10} style={{ width: '100px', height: '14px', borderRadius: '10px' }} />
                            </li>
                            <br /><br /><br />
                            <li>탄수화물<span>{N[N.length - 1].food_carbs}g</span>
                                <LinearProgress variant="determinate" value={N[N.length - 1].food_carbs} style={{ width: '100px', height: '14px', borderRadius: '10px' }} />
                            </li>
                        </div>
                        <div className={style.sec2}>
                            <li>나트륨<span>{N[N.length - 1].food_nat}mg</span>
                                <LinearProgress variant="determinate" value={N[N.length - 1].food_nat} style={{ width: '100px', height: '14px', borderRadius: '10px' }} />
                            </li>
                            <br /><br /><br />
                            <li>단백질<span>{N[N.length - 1].food_protein}g</span>
                                <LinearProgress variant="determinate" value={N[N.length - 1].food_protein} style={{ width: '100px', height: '14px', borderRadius: '10px' }} />
                            </li>
                        </div>
                        <div className={style.sec3}>
                            <li>지방<span>{N[N.length - 1].food_fat}g</span>
                                <LinearProgress variant="determinate" value={N[N.length - 1].food_fat} style={{ width: '100px', height: '14px', borderRadius: '10px' }} />
                            </li>
                            <br /><br /><br />
                            <li>당류<span>{N[N.length - 1].food_sugar}g</span>
                                <LinearProgress variant="determinate" value={N[N.length - 1].food_sugar} style={{ width: '100px', height: '14px', borderRadius: '10px' }} />
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