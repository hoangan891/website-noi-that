// Login.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../services/api';
import { setCredentials } from '../../redux/slices/authSlice';
import { 
  TextField, 
  Button, 
  Checkbox, 
  FormControlLabel, 
  Snackbar, 
  Alert, 
  Box, 
  Container, 
  Typography, 
  Paper,
  InputAdornment,
  IconButton
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/auth/login', { email, password });
      dispatch(setCredentials({ user: data, token: data.token }));
      setSnackbarMessage('Đăng nhập thành công');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      navigate('/');
    } catch (err) {
      setSnackbarMessage(err.response?.data?.message || 'Đăng nhập thất bại');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleCloseSnackbar = () => setOpenSnackbar(false);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: `url('https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=600')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(5px)',
        }
      }}
    >
      <Container maxWidth="xs" sx={{ position: 'relative', zIndex: 2 }}>
        <Paper 
          elevation={16}
          sx={{ 
            borderRadius: 3,
            overflow: 'hidden',
            boxShadow: '0 15px 35px rgba(0,0,0,0.3)',
            maxWidth: 400,
            mx: 'auto',
            border: '1px solid rgba(255,255,255,0.1)',
            backgroundColor: 'rgba(255,255,255,0.95)',
          }}
        >
          <Box
            sx={{
              background: 'linear-gradient(135deg, #1565c0 0%, #0d47a1 100%)',
              color: 'white',
              px: 4,
              py: 3.5,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'relative',
            }}
          >
            <Box
              sx={{
                bgcolor: 'white',
                p: 1.2,
                borderRadius: '50%',
                display: 'flex',
                mb: 2,
                boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
              }}
            >
              <LockOutlinedIcon color="primary" fontSize="medium" />
            </Box>
            <Typography variant="h5" component="h1" fontWeight="600" sx={{ mb: 0.5 }}>
              Đăng nhập
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9, fontWeight: 300 }}>
              Chào mừng bạn quay trở lại
            </Typography>
          </Box>

          <Box sx={{ px: 4, py: 4.5, bgcolor: 'rgba(255,255,255,0.95)' }}>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Nhập email của bạn"
                margin="normal"
                required
                sx={{ 
                  mb: 3,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1.5,
                    backgroundColor: 'rgba(245,247,250,0.6)',
                    '&:hover fieldset': {
                      borderColor: 'primary.main',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#1976d2',
                      borderWidth: '2px',
                    },
                  }
                }}
              />
              <TextField
                label="Mật khẩu"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nhập mật khẩu của bạn"
                margin="normal"
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleTogglePassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{ 
                  mb: 2.5,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1.5,
                    backgroundColor: 'rgba(245,247,250,0.6)',
                  }
                }}
              />

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3.5 }}>
                <FormControlLabel
                  control={
                    <Checkbox 
                      checked={rememberMe} 
                      onChange={(e) => setRememberMe(e.target.checked)}
                      sx={{ 
                        color: '#1976d2',
                        '&.Mui-checked': {
                          color: '#1976d2',
                        },
                      }}
                    />
                  }
                  label={<Typography variant="body2">Ghi nhớ tôi</Typography>}
                />
                <Link to="/forgot-password" style={{ 
                  color: '#1976d2', 
                  textDecoration: 'none', 
                  fontSize: '14px',
                  fontWeight: 500,
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}>
                  Quên mật khẩu?
                </Link>
              </Box>

              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ 
                  py: 1.5, 
                  bgcolor: '#1976d2',
                  color: 'white',
                  '&:hover': {
                    bgcolor: '#0d47a1',
                  },
                  borderRadius: 2,
                  textTransform: 'none',
                  fontSize: '16px',
                  fontWeight: 600,
                  mb: 2.5,
                  boxShadow: '0 4px 12px rgba(25, 118, 210, 0.4)',
                  letterSpacing: '0.5px',
                }}
              >
                ĐĂNG NHẬP
              </Button>

              <Typography align="center" variant="body2" sx={{ mt: 2 }}>
                Chưa có tài khoản?{' '}
                <Link
                  to="/register"
                  style={{
                    color: '#1976d2',
                    textDecoration: 'none',
                    fontWeight: 600,
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                >
                  Đăng ký ngay
                </Link>
              </Typography>
            </form>
          </Box>
        </Paper>
      </Container>
      <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%', boxShadow: 3 }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Login;