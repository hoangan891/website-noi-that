// Register.js
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
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agree, setAgree] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;

    if (password.trim().length < 8) {
      setPasswordError('Mật khẩu phải có ít nhất 8 ký tự');
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (confirmPassword.trim().length < 8) {
      setConfirmPasswordError('Xác nhận mật khẩu phải có ít nhất 8 ký tự');
      isValid = false;
    } else {
      setConfirmPasswordError('');
    }

    if (password.trim().length >= 8 && confirmPassword.trim().length >= 8 && password !== confirmPassword) {
      setConfirmPasswordError('Mật khẩu xác nhận không khớp');
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setSnackbarMessage('Vui lòng sửa lỗi trước khi đăng ký');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }
    if (!agree) {
      setSnackbarMessage('Vui lòng đồng ý với điều khoản');
      setSnackbarSeverity('warning');
      setOpenSnackbar(true);
      return;
    }
    try {
      const { data } = await api.post('/auth/register', { name, email, phone, password });
      dispatch(setCredentials({ user: data, token: data.token }));
      setSnackbarMessage('Đăng ký thành công');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      navigate('/');
    } catch (err) {
      setSnackbarMessage(err.response?.data?.message || 'Đăng ký thất bại');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleCloseSnackbar = () => setOpenSnackbar(false);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: `url('https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600')`,
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
      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 2 }}>
        <Paper 
          elevation={16}
          sx={{ 
            borderRadius: 3,
            overflow: 'hidden',
            boxShadow: '0 15px 35px rgba(0,0,0,0.3)',
            maxWidth: 480,
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
              <PersonAddIcon color="primary" fontSize="medium" />
            </Box>
            <Typography variant="h5" component="h1" fontWeight="600" sx={{ mb: 0.5 }}>
              Đăng ký tài khoản
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9, fontWeight: 300 }}>
              Điền thông tin để tạo tài khoản mới
            </Typography>
          </Box>

          <Box sx={{ px: 4, py: 4, bgcolor: 'rgba(255,255,255,0.95)' }}>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Họ và tên"
                variant="outlined"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nhập họ và tên của bạn"
                margin="normal"
                required
                sx={{ 
                  mb: 2.5,
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
                label="Email"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Nhập email của bạn"
                type="email"
                margin="normal"
                required
                sx={{ 
                  mb: 2.5,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1.5,
                    backgroundColor: 'rgba(245,247,250,0.6)',
                  }
                }}
              />
              <TextField
                label="Số điện thoại"
                variant="outlined"
                fullWidth
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Nhập số điện thoại của bạn"
                margin="normal"
                sx={{ 
                  mb: 2.5,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1.5,
                    backgroundColor: 'rgba(245,247,250,0.6)',
                  }
                }}
              />
              <TextField
                label={
                  <span>
                    Mật khẩu <Box component="span" sx={{ color: 'error.main' }}>*</Box>
                  </span>
                }
                InputLabelProps={{ required: false }}
                type={showPassword ? "text" : "password"}
                variant="outlined"
                fullWidth
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (passwordError && e.target.value.trim().length >= 8) {
                    setPasswordError('');
                  }
                  if (confirmPassword && confirmPassword === e.target.value) {
                    setConfirmPasswordError('');
                  }
                }}
                placeholder="Nhập mật khẩu (tối thiểu 8 ký tự)"
                margin="normal"
                required
                error={Boolean(passwordError)}
                helperText={passwordError || 'Mật khẩu tối thiểu 8 ký tự'}
                inputProps={{ minLength: 8 }}
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
              <TextField
                label={
                  <span>
                    Xác nhận mật khẩu <Box component="span" sx={{ color: 'error.main' }}>*</Box>
                  </span>
                }
                InputLabelProps={{ required: false }}
                type={showConfirmPassword ? "text" : "password"}
                variant="outlined"
                fullWidth
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (confirmPasswordError && e.target.value.trim().length >= 8) {
                    setConfirmPasswordError('');
                  }
                  if (password && password === e.target.value) {
                    setConfirmPasswordError('');
                  }
                }}
                placeholder="Nhập lại mật khẩu"
                margin="normal"
                required
                error={Boolean(confirmPasswordError)}
                helperText={confirmPasswordError || 'Nhập lại mật khẩu để xác nhận'}
                inputProps={{ minLength: 8 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle confirm password visibility"
                        onClick={handleToggleConfirmPassword}
                        edge="end"
                      >
                        {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{ 
                  mb: 3,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1.5,
                    backgroundColor: 'rgba(245,247,250,0.6)',
                  }
                }}
              />
              <FormControlLabel
                control={
                  <Checkbox 
                    checked={agree} 
                    onChange={(e) => setAgree(e.target.checked)}
                    sx={{ 
                      color: '#1976d2',
                      '&.Mui-checked': {
                        color: '#1976d2',
                      },
                    }}
                  />
                }
                label={
                  <Typography variant="body2">
                    Tôi đồng ý với{' '}
                    <Link to="/terms" style={{ 
                      color: '#1976d2', 
                      textDecoration: 'none',
                      fontWeight: 500,
                      '&:hover': {
                        textDecoration: 'underline',
                      },
                    }}>
                      điều khoản và điều kiện
                    </Link>
                  </Typography>
                }
                sx={{ mb: 3 }}
              />
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
                ĐĂNG KÝ
              </Button>
              <Typography align="center" variant="body2" sx={{ mt: 2 }}>
                Đã có tài khoản?{' '}
                <Link to="/login" style={{ 
                  color: '#1976d2', 
                  textDecoration: 'none', 
                  fontWeight: 600,
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}>
                  Đăng nhập ngay
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

export default Register;