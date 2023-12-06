// Registration.js

import React, { useState } from 'react';
import style from '../css/Join.module.css';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';


const Registration = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        age: '',
        weight: '',
        height: '',
        medicalHistory: '0', // Default to '없음'
    });

    const handleChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Add your registration logic here
        console.log(formData);
    };

    return (
        <div className={style.container}>
            <Link to="/" className="GotoHome" />

            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        marginTop: '120px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    {/* ... Logo and other elements ... */}

                    <TextField
                        margin="normal"
                        label="이름"
                        required
                        fullWidth
                        name="name"
                        variant="standard"
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        className="idpw"
                    />

                    <TextField
                        margin="normal"
                        label="아이디"
                        required
                        fullWidth
                        name="email"
                        variant="standard"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        className="idpw"
                    />

                    <TextField
                        label="비밀번호"
                        required
                        fullWidth
                        name="password"
                        type="password"
                        variant="standard"
                        value={formData.password}
                        onChange={(e) => handleChange('password', e.target.value)}
                        className="idpw"
                    />

                    <TextField
                        label="비밀번호 확인"
                        required
                        fullWidth
                        name="confirmPassword"
                        type="password"
                        variant="standard"
                        value={formData.confirmPassword}
                        onChange={(e) => handleChange('confirmPassword', e.target.value)}
                        className="idpw"
                    />

                    {/* Add more TextField components for age, weight, height */}
                    <div style={{ display: 'flex', marginTop: '20px' }}>
                        <Box sx={{ minWidth: 120, marginBottom: '2px', marginRight: '10px' }}>
                            <TextField
                                label="나이"
                                required
                                fullWidth
                                name="age"
                                variant="standard"
                                value={formData.age}
                                onChange={(e) => handleChange('age', e.target.value)}
                                className="idpw"
                            />
                        </Box>

                        {/* ... Other fields ... */}

                        <Box sx={{ minWidth: 120, marginBottom: '2px', marginRight: '10px' }}>
                            <TextField
                                label="몸무게"
                                required
                                fullWidth
                                name="weight"
                                variant="standard"
                                value={formData.weight}
                                onChange={(e) => handleChange('weight', e.target.value)}
                                className="idpw"
                            />
                        </Box>

                        <Box sx={{ minWidth: 120, marginBottom: '2px'}}>
                            <TextField
                                label="키"
                                required
                                fullWidth
                                name="height"
                                variant="standard"
                                value={formData.height}
                                onChange={(e) => handleChange('height', e.target.value)}
                                className="idpw"
                            />
                        </Box>
                    </div>

                    <Box sx={{ minWidth: 120, marginBottom: '2px', marginTop:'20px'}}>
                        <TextField
                            label="병력"
                            required
                            fullWidth
                            select
                            name="medicalHistory"
                            variant="standard"
                            value={formData.medicalHistory}
                            onChange={(e) => handleChange('medicalHistory', e.target.value)}
                            className="idpw"
                        >
                            <MenuItem value="0">없음</MenuItem>
                            <MenuItem value="1">고혈압</MenuItem>
                            <MenuItem value="2">당뇨</MenuItem>
                        </TextField>
                    </Box>

                    <Button
                        style={{
                            height: '34px',
                            flexShrink: 0,
                            width: '100%',
                            borderRadius: '30px',
                            background: '#3D61AD',
                            boxShadow: '0px 1px 4px 0px rgba(0, 0, 0, 0.25)',
                        }}
                        className={style.login}
                        sx={{ mt: 3, mb: 2 }}
                        onClick={handleSubmit}
                    >
                        <span className={style.loginfont}>회원가입</span>
                    </Button>
                </Box>
            </Container>
        </div>
    );
};

export default Registration;
