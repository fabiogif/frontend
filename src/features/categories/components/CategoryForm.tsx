import { Box, Button, FormControl, FormControlLabel, FormGroup, Grid, Switch, TextField } from '@mui/material';
import { Category } from '../categorySlice';
import { Link } from 'react-router-dom';

type Props = {
    category: Category;
    isdisabled?: boolean;
    isLoading?:boolean;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleToggle: (e: React.ChangeEvent<HTMLInputElement>) => void;

}


export function CategoryForm({category, isdisabled = false, isLoading = false , handleSubmit, handleChange, handleToggle}: Props){
    return(
        <Box p={2}>
              <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                <FormControl fullWidth>
                  <TextField required name="name" label="Nome" value={category.name || "" } disabled={isdisabled} onChange={handleChange}  ></TextField>
                </FormControl>
      
                </Grid>
                <Grid item xs={12}>
                <FormControl fullWidth>
                  <TextField required name="description" label="Descrição"  value={category.description ||""} disabled={isdisabled}  onChange={handleChange} ></TextField>
                </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormGroup>
                    <FormControlLabel
                    control={
                      <Switch
                        name="status"
                        onChange={handleToggle}
                        checked={category.status == 'Ativo' ? true : false}
                        disabled={isdisabled}
                        color="secondary"
                        inputProps={{ 'aria-label': 'controlled' }}
                     />}  label="Status"/>
                  </FormGroup>

                </Grid>
                <Grid item xs={12}>
                  <Box display="flex" gap={2}>
                    <Button variant="contained" component={Link} to="/categories">Voltar</Button>
                    <Button 
                    type="submit"
                    variant="contained"
                    disabled={isdisabled || isLoading}
                    color="secondary">{isLoading ? "Carregando..." : "Salvar"}</Button>
                  </Box>
                </Grid>
              </Grid>
            </form>
        </Box>
    )
}