import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import style from '../css/Login.module.css';

const Login = ({ onLogin }) => {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });

    // Simulate login logic
    if (onLogin) {
      onLogin(); // 호출된 콜백 함수

      // Navigate to /my after successful login
      navigate('/my');
    }
  };

  return (
    <div className={style.container}>
      <Link to="/My" className='GotoHome' />
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: '250px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div className="Card1" style={{ marginBottom: '20px' }}>
            <div className="logo_image">
              <img src={"/imgs/Logo.png"} height="30px" alt="logo" />
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              label="아이디"
              required
              fullWidth
              name="email"
              autoComplete="current-password"
              style={{
                verticalAlign: 'bottom',
                borderRadius: '10px',
                border: '0.5px solid #999',
                background: '#FFF',
                boxShadow: '0px 1px 4px 0px rgba(0, 0, 0, 0.25)',
              }}
            />

            <TextField
              label="비밀번호"
              required
              fullWidth
              name="password"
              type="password"
              autoComplete="current-password"
              style={{
                verticalAlign: 'bottom',
                borderRadius: '10px',
                border: '0.5px solid #999',
                background: '#FFF',
                boxShadow: '0px 1px 4px 0px rgba(0, 0, 0, 0.25)',
              }}
            />

            <Button
              type="submit"
              style={{
                height: '34px',
                flexShrink: 0,
                width: '100%',
                borderRadius: '30px',
                background: '#3D61AD',
                boxShadow: '0px 1px 4px 0px rgba(0, 0, 0, 0.25)',
              }}
              sx={{ mt: 3, mb: 2 }}
            >
              <span className={style.loginfont}>로그인</span>
            </Button>
          </form>

          <Grid container>
            <Grid item xs>
              <Link to="/Join" style={{ textDecoration: 'none' }}>
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
};

export default Login;
