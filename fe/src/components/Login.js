import * as React from 'react';
import style from '../css/Login.module.css';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const defaultTheme = createTheme();

export default function Login() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <div className={style.container}>
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                }}
            >
                <div className="Card1">
                    <div className="logo_image">
                        <img src={"/imgs/Logo.png"} height="30px" />
                    </div>
                </div>

                <TextField
                className="idpw"
                margin="normal"
                label="아이디"
                required
                fullWidth
                name="email"
                autoComplete="current-password"
                vertical-align="bottom"
                />

                <TextField
                className="idpw"
                margin="normal"
                label="비밀번호"
                type="password"
                required
                fullWidth
                name="password"
                autoComplete="current-password"
                />

                <Button
                className="btn"
                type="submit"
                fullWidth
                variant="contained"
                height="34px"
                //mt는 위쪽과의 간격격
                sx={{ mt: 3, mb: 2 }}
                >
                    <span className="font">로그인</span>
                </Button>

                <Grid container>
                    <Grid item xs>
                        <Link href="Sign_in.js" style={{ textDecoration: 'none' }}>
                        회원가입
                        </Link>
                    </Grid>

                    <Grid item>
                        <Link to="/signUp" style={{ textDecoration: 'none' }}>
                            <span className="findlink" margin="50">
                                아이디찾기
                            </span>
                        </Link>
                        <span className="findlink" margin="50">
                        {' '}
                        |{' '}
                        </span>
                        <Link to="/signUp" style={{ textDecoration: 'none' }}>
                            <span className="findlink" margin="50">
                                비밀번호찾기
                            </span>
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    </div>
  );
}