import React from 'react';

const Loading = () => {
    const containerStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    };

    const contentStyle = {
        textAlign: 'center',
    };
    return (
        <div style={containerStyle}>
            <div style={contentStyle}>
                <h3>결과 분석 중입니다.</h3>
                <img src={"/imgs/loading.gif"} />
            </div>
        </div>
    );
};

export default Loading;