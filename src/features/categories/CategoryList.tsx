import { Box, Button, Typography } from "@mui/material"
import { Link } from "react-router-dom"
import { useDeleteCategoryMutation, useGetCategoriesQuery } from "./categorySlice"
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { CategoriesTable } from "./components/CategoryTable";
import { DataGrid, GridColDef, GridFilterModel, GridPaginationModel, GridRenderCellParams, GridToolbar } from "@mui/x-data-grid"

export const CategoryList = () => {


   const [deleteCategory, deleteCategoryStatus ] = useDeleteCategoryMutation()
   const [page, setPage] = useState(1)
   const [ rowsPerPage ] = useState([5,10, 20,25,50])
   const [ perPage, setPerPage ] = useState(5)
   const [search, setSearch] = useState("")

   const [paginationModel, setPaginationModel] = useState({
      pageSize: 10,
      page:1,
      search
    });

   const { data, isFetching, error } = useGetCategoriesQuery(paginationModel)


  async function handleDeleteCategory(identify: string){
     await deleteCategory({ identify })
   }

   useEffect(() => {
      if(deleteCategoryStatus.isSuccess){
         enqueueSnackbar('Categoria removida com sucesso', { variant: 'success'})
      }

      if(deleteCategoryStatus.error){
         enqueueSnackbar('Ocorreu um erro ao remover a categoria', { variant: 'error'})
      }

      if(error){
         enqueueSnackbar('Não foi possivel carregar a lista', { variant: 'error'})
      }
   }, [deleteCategoryStatus, enqueueSnackbar, error])

   if(error){
      return <Typography> Não foi possivel carregar a lista</Typography>
   }
   function handleOnPageChange(page: GridPaginationModel){
   }

   function handleOnPageSizeChange(paginationModel: GridPaginationModel){
      const updatedPaginationModel = {
         ...paginationModel,
         page: paginationModel.page,
         search: ''
     };

     setPaginationModel(updatedPaginationModel);

   }
   
   function handleFilterChange(filterModel: GridFilterModel){
      if (!filterModel.quickFilterValues?.length) {
         return setPaginationModel({ ...paginationModel, search: "" });
       }
   
       const search = filterModel.quickFilterValues.join("");
       setPaginationModel({ ...paginationModel, search });
   }

    return (
     <Box maxWidth="lg" sx={{ mt:4, mb:4}}>
      <Box display="flex" justifyContent="flex-end">
         <Button variant="contained" color="secondary" component={Link} to="/categories/create" style={{ marginBottom: "1rem"}}>Adicionar Categoria</Button>
      </Box>
      <CategoriesTable 
                     data={data} 
                     perPage={paginationModel.page}
                     page={paginationModel.page} 
                     pageSize={paginationModel.pageSize}
                     isFetching={isFetching} 
                     rowsPerPage={rowsPerPage} 
                     handleOnPageChange={handleOnPageChange} 
                     paginationModel={paginationModel}
                     handleFilterChange={handleFilterChange}  
                     handleOnPageSizeChange={handleOnPageSizeChange} 
                     handleDelete={handleDeleteCategory}/>

     </Box>
    )
  }
  