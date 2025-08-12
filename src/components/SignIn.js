
// import React from 'react';
// import {
//   Box,
//   Grid,
//   TextField,
//   Typography,
//   Button,
//   Checkbox,
//   FormControlLabel,
//   InputAdornment,
//   IconButton,
//   Link,
// } from '@mui/material';
// import {
//   Visibility,
//   VisibilityOff,
//   LockOutlined,
// } from '@mui/icons-material';





// const SignIn = () => {
//   const [showPassword, setShowPassword] = React.useState(false);
//   const handleClickShowPassword = () => setShowPassword((show) => !show);

//   return (
//     <Grid container sx={{ width: '100vw', height: '100vh' }}>
//       {/* Left Side - Login Form */}
//       <Grid
//         item
//         xs={12}
//         md={5}
//         sx={{
//           backgroundColor: '#0f172a',
//           color: '#fff',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           px: 4,
//         }}
//       >
//         <Box maxWidth={400} width="100%" sx={{ textAlign: 'center' }}> 
//           <img src="/logo.png" alt="Logo" style={{ width: '150px', marginBottom: '20px', justifyContent: 'center' }} />

//           <Typography variant="h6" gutterBottom mt={3}>
//             Sign In Below
//           </Typography>

//           <Box component="form" noValidate sx={{ mt: 2 }}>
//             <TextField
//               fullWidth
//               label="Email/Username"
//               margin="normal"
//               required
//               autoComplete="username"
//               InputProps={{
//                 style: { backgroundColor: '#1e293b', color: '#fff' },
//               }}
//               InputLabelProps={{ style: { color: '#cbd5e1' } }}
//             />

//             <TextField
//               fullWidth
//               label="Password"
//               type={showPassword ? 'text' : 'password'}
//               margin="normal"
//               required
//               autoComplete="current-password"
//               InputProps={{
//                 style: { backgroundColor: '#1e293b', color: '#fff' },
//                 endAdornment: (
//                   <InputAdornment position="end">
//                     <IconButton
//                       onClick={handleClickShowPassword}
//                       edge="end"
//                       sx={{ color: '#94a3b8' }}
//                     >
//                       {showPassword ? <VisibilityOff /> : <Visibility />}
//                     </IconButton>
//                   </InputAdornment>
//                 ),
//               }}
//               InputLabelProps={{ style: { color: '#cbd5e1' } }}
//             />

//             {/* <Box display="flex" justifyContent="space-between" alignItems="center" mt={1}>
//               <FormControlLabel
//                 control={<Checkbox sx={{ color: '#fff' }} defaultChecked />}
//                 label={<Typography color="#cbd5e1">Remember me?</Typography>}
//               />
//               <Link href="#" underline="hover" color="#38bdf8">
//                 Lost your password?
//               </Link>
//             </Box> */}

//            <Button
//   fullWidth
//   variant="contained"
//   startIcon={<LockOutlined />}
//   sx={{
//     mt: 3,
//     py: 1.5,
//     fontWeight: 'bold',
//     backgroundColor: '#F0720B',
//     '&:hover': {
//       backgroundColor: '#d96206', // slightly darker shade for hover
//     },
//     color: '#fff',
//   }}
// >
//   Sign in
// </Button>

//           </Box>
//         </Box>
//       </Grid>

//       {/* Right Side - Background Image */}
//       <Grid
//         item
//         xs={12}
//         md={7}
//         sx={{
//           flexGrow: 1,
//           minWidth: 0,
//           height: '100vh',
//           backgroundImage:`url(/solar.jpg)`,
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//           backgroundRepeat: 'no-repeat',
//           position: 'relative',
//         }}
//       >
//         <Box
//           sx={{
//             position: 'absolute',
//             bottom: 20,
//             left: 20,
//             color: '#fff',
//             textShadow: '0 2px 4px rgba(0,0,0,0.7)',
//           }}
//         >
         
//         </Box>
//       </Grid>
//     </Grid>
//   );
// };

// export default SignIn;


import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Grid,
  TextField,
  Typography,
  Button,
  InputAdornment,
  IconButton,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  LockOutlined,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://13.201.150.234/t2/api/admin/login', {
        email,
        password,
      });

      if (res.data.status) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('admin', JSON.stringify(res.data.admin));
        navigate('/dashboard');
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      alert('Login failed. Check your credentials.');
    }
  };

  return (
    <Grid container sx={{ width: '100vw', height: '100vh' }} columns={12}>
      <Grid
        item
        sx={{
          gridColumn: { xs: '1 / -1', md: '1 / 6' },
          backgroundColor: '#0f172a',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          px: 4,
        }}
      >
        <Box maxWidth={400} width="100%" sx={{ textAlign: 'center' }}>
          <img src="/logo.png" alt="Logo" style={{ width: '150px', marginBottom: '20px' }} />
          <Typography variant="h6" gutterBottom mt={3}>Sign In Below</Typography>

          <form onSubmit={handleLogin} style={{ marginTop: 16 }}>
            <TextField
              fullWidth
              label="Email"
              margin="normal"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{ style: { backgroundColor: '#1e293b', color: '#fff' } }}
              InputLabelProps={{ style: { color: '#cbd5e1' } }}
            />

            <TextField
              fullWidth
              label="Password"
              type={showPassword ? 'text' : 'password'}
              margin="normal"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                style: { backgroundColor: '#1e293b', color: '#fff' },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword} edge="end" sx={{ color: '#94a3b8' }}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              InputLabelProps={{ style: { color: '#cbd5e1' } }}
            />

            <Button
              fullWidth
              variant="contained"
              type="submit"
              startIcon={<LockOutlined />}
              sx={{
                mt: 3,
                py: 1.5,
                fontWeight: 'bold',
                backgroundColor: '#F0720B',
                '&:hover': { backgroundColor: '#d96206' },
                color: '#fff',
              }}
            >
              Sign in
            </Button>
          </form>
        </Box>
      </Grid>

     <Grid
        item
        sx={{
          gridColumn: { xs: '1 / -1', md: '6 / -1' },
          height: '100vh',
          flexGrow: 1,
         backgroundImage: "url('/solar.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
    </Grid>
  );
};

export default SignIn;
