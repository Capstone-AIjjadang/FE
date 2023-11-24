import React, { useState } from 'react';
import styles from '../css/Navigator.module.css';
import { Link } from 'react-router-dom';
import { BiHomeAlt2, BiCamera } from 'react-icons/bi';
import { BsGraphUp } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { GoThumbsup } from 'react-icons/go';
//npm install react-router-dom
//npm install react-icons

const Navigator = () => {
    const [activeNav, setActiveNav] = useState(1);  

    return (
        <div className={styles.container}>
            <div className={styles.menu_bar}>
                <Link to="/" className={`${styles.links} ${activeNav === 1 ? styles.active : ''}`}
                onClick={() => setActiveNav(1)}>
                    <BiHomeAlt2 size='30' /><br />홈
                </Link>
                <Link to="/camera" className={`${styles.links} ${activeNav === 2 ? styles.active : ''}`}
                onClick={() => setActiveNav(2)}>
                    <BiCamera size='30' /><br />촬영
                </Link>
                <Link to="/recommend" className={`${styles.links} ${activeNav === 3 ? styles.active : ''}`}
                onClick={() => setActiveNav(3)}>
                    <GoThumbsup size='30' /><br />음식추천
                </Link>
                <Link to="/graph" className={`${styles.links} ${activeNav === 4 ? styles.active : ''}`}
                onClick={() => setActiveNav(4)}>
                    <BsGraphUp size='30' /><br />영양성분
                </Link>
                <Link to="/my" className={`${styles.links} ${activeNav === 5 ? styles.active : ''}`}
                onClick={() => setActiveNav(5)}>
                    <CgProfile size='30' /><br />내 건강정보
                </Link>
            </div>
        </div>
    );
};

export default Navigator;