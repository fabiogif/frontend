import { Box, Paper, Typography } from "@mui/material"
import {useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { Category, useGetCategoryQuery, useUpdateCategoryMutation } from "./categorySlice"
import React, { useEffect, useState } from "react"
import { CategoryForm } from "./components/CategoryForm"
import { useSnackbar } from "notistack"

export const CategoryEdit = () =>  {

  const identify = useParams().identify || ""
  const { data: category, isFetching} = useGetCategoryQuery({identify})
  const [updateCategory, status] = useUpdateCategoryMutation()
  const [isdisabled, setIsDisabled]  = useState(false)

  const [categoryState , setCategoryState] = useState<Category>({
    identify: "",
    name: "",
    description: "",
    status: "",
    tenant_id: 1
  })
  const { enqueueSnackbar } =  useSnackbar()
  const dispatch = useAppDispatch();

  const handleToggle = (e:React.ChangeEvent<HTMLInputElement>) => {
    const {name, checked} = e.target;
    setCategoryState({...categoryState, [name]: checked})
  }

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setCategoryState({...categoryState, [name]: value})
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    await updateCategory(categoryState)
  }
  useEffect(()=> {
    if(category){
      setCategoryState(category.data)
    }
  }, [category])

  

  useEffect(()=> {

    if(status.isSuccess){
      enqueueSnackbar("Categoria alterada com sucesso!", { variant: "success"})
    }
    if(status.error){
      enqueueSnackbar("Erro ao atualizar categoria!", { variant: "error"})
    }}, [enqueueSnackbar, status.error, status.isSuccess])


    return (
      <Box>
        <Paper>
          <Box p={2}>
            <Box mb={2}> 
              <Typography variant="h5">Editar Categoria</Typography>
            </Box>
          </Box>
    
           <CategoryForm
                category={categoryState}
                isLoading={false}
                isdisabled={isdisabled}
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                handleToggle={handleToggle}
                ></CategoryForm>
        
        </Paper>
      </Box>
    )
  }
  
  
  