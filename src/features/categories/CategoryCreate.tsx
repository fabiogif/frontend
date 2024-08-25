import { Box, Button, FormControl, FormControlLabel, FormGroup, Grid, Paper, Switch, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { Category, useCreateCategoryMutation } from "./categorySlice"
import { CategoryForm } from "./components/CategoryForm"
import { enqueueSnackbar } from "notistack"

export const CategoryCreate = () => { 

  const [ isdisabled, setIsdisabled] = useState(false)
  const [categoryState, setCategoryState] = useState<Category>(
    {
      identify: "",
      name: "",
      description: "",
      status: "",
      tenant_id: 1
    }
  )

  const [createCategory, status] = useCreateCategoryMutation()

  const handleToggle = (e:React.ChangeEvent<HTMLInputElement>) => {
    const {name, checked} = e.target;
    const checkedValue = checked ? 'A' : 'I'
    console.log(checkedValue)
      setCategoryState({...categoryState, [name]: checkedValue})
  }

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setCategoryState({...categoryState, [name]: value})
  }
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    await createCategory(categoryState)
  }

  useEffect(()=>{
    if(status.isSuccess){
      enqueueSnackbar("Categoria casdastrada com sucesso", { variant: "success"})
    }
    if(status.error){
      enqueueSnackbar("Erro ao cadastrar categoria", {variant: "error"})
    }
  },[enqueueSnackbar, status.error, status.isSuccess])

    return (
      <Box>
        <Paper>
          <Box p={2}>
            <Box mb={2}> 
              <Typography variant="h5">Adicionar Categoria</Typography>
            </Box>
          </Box>
          <Box p={2} >
          <CategoryForm
              category={categoryState}
              isLoading={false}
              isdisabled={isdisabled}
              handleSubmit={handleSubmit}
              handleChange={handleChange}
              handleToggle={handleToggle}
          ></CategoryForm>
          </Box>
        </Paper>
      </Box>
    )
  }
  