import { DataGrid, GridColDef, GridFilterModel, GridPaginationModel, GridRenderCellParams, GridToolbar } from "@mui/x-data-grid"
import { Results } from "../../../types/Category"
import { Box, debounce, IconButton, Typography } from "@mui/material"
import { Link } from "react-router-dom"
import { deleteCategory } from "../categorySlice"
import DeleteIcon from "@mui/icons-material/Delete";


type Props = {
    data: Results | undefined
    perPage: number
    page: number //Itens por pagina
    pageSize: number
    isFetching: boolean //Apresentar loading
    rowsPerPage: number[]//Linhas por pagina
    paginationModel:GridPaginationModel,
    handleOnPageChange:(page: GridPaginationModel) => void 
    handleFilterChange:(filterModel: GridFilterModel) => void
    handleOnPageSizeChange:(pageSize : GridPaginationModel) => void
    handleDelete:(identify: string) => void
}


export function CategoriesTable({
    data,
    perPage,
    isFetching,
    rowsPerPage,
    paginationModel,
    handleOnPageChange,
    handleFilterChange,
    handleOnPageSizeChange,
    handleDelete,
}:Props){

    const componentProps = {
        toolbar: {
          showQuickFilter: true,
          quickFilterProps: { debounceMs: 500 },
        },
        
      };
    
    const columns: GridColDef[] = [
        { field: 'name', headerName: 'Nome', flex: 1,  renderCell:renderNameCell},
        { field: 'description', headerName: 'Descrição', width: 350, flex: 1 },
        { field: 'status', headerName: 'Status', width: 150, flex: 1, renderCell: renderIsActiveCell},
        { field: 'id', headerName: 'Ação', width: 350, flex: 1, renderCell: renderActionsCell },
     ]

     function mapDataToGridRows(data: Results){
        const { data: categories} = data
        return categories.map((category) => ({
            id: category.identify,
            name: category.name,
            description: category.description,
            status: category.status
         }))
     }

     function renderNameCell(rowData: GridRenderCellParams)
     {
       return(
          <Link 
              style={{textDecoration: "none"}}
              to={`/categories/edit/${rowData.id}`}>
             <Typography color="primary">{rowData.value}</Typography>
          </Link>) 
     }
     function renderActionsCell(params: GridRenderCellParams)
     {
       return(
          <IconButton color="secondary" onClick={() => handleDelete(params.value)}  aria-label="delete">
             <DeleteIcon/>
          </IconButton>
       )
     }

     function renderIsActiveCell(rowData: GridRenderCellParams){
        return (
            <Typography color={rowData.value == 'Ativo' ? "primary" : "secondary"}>
                {rowData.value}
            </Typography>
        )
     }
     const rows = data ? mapDataToGridRows(data) : []
     const rowsCount = data?.meta.total || 0
     return (
        <Box sx={{ display: "flex", height: 690}}>
         
                <DataGrid
                        rows={rows}
                        pagination={true}
                        columns={columns}
                        filterMode="server"
                        paginationMode="server"
                        rowCount={rowsCount}
                        loading={isFetching}
                        onFilterModelChange={handleFilterChange}
                        paginationModel={paginationModel}
                        pageSizeOptions={rowsPerPage}
                        onPaginationModelChange={(paginationModel) => handleOnPageSizeChange(paginationModel)}
                        //onPageSizeChange={handleOnPageSizeChange}
                        slots={{ toolbar: GridToolbar }}
                        slotProps={componentProps}
                        checkboxSelection={false}
                        disableColumnFilter={true}
                        disableColumnSelector={true}
                        disableDensitySelector={true}
                    />


        </Box>
     )
  
}