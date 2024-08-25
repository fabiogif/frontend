import { Box, Typography } from '@mui/material';
import { ThemeProvider } from '@mui/system';
import { Header } from './app/component/Header';
import { Layout } from './app/component/Layout';
import { appTheme } from './config/theme';
import { Route, Routes } from 'react-router-dom';
import { CategoryList } from './features/categories/CategoryList';
import { CategoryEdit } from './features/categories/CategoryEdit';
import { CategoryCreate } from './features/categories/CategoryCreate';
import { SnackbarProvider } from 'notistack'


function App(){
 return (
  <ThemeProvider theme={appTheme}>
   <SnackbarProvider
    maxSnack={3}     
    anchorOrigin={{ vertical: "top", horizontal: "right"}}
   >
      <Box component='main'
      sx={{
        height:'100vh',
        backgroundColor: (theme) => theme.palette.grey[900]
      }}>
        <Header></Header>
        <Layout>
          <Routes>
            <Route path='/' element={<CategoryList/>}/>
            <Route path='/categories' element={<CategoryList/>}/>
            <Route path='/categories/create' element={<CategoryCreate/>}/>
            <Route path='/categories/edit/:identify' element={<CategoryEdit/>}/>

            <Route path='*' element={
              <Box sx={{ color: "#fff"}}>
                <Typography variant="h1">404</Typography>
                <Typography variant="h6">Página não encontrada</Typography>
              </Box>
            }/>
          </Routes>
        </Layout>
      </Box>
  </SnackbarProvider>
</ThemeProvider>
 )
}
export default App
