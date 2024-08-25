import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { apiSlice } from '../api/apiSlice'
import { CategoryParams, Result, Results } from '../../types/Category'


export interface Category {
    identify: string,
    name: string,
    description: string|null,
    status: string,
    tenant_id:number
}


const category =   {
    "name": "Rickey Schowalter II",
    "identify": "e9b1b34d-499a-471e-a69a-a53e6a255136",
    "description": "Aut at minus ratione placeat qui minima.",
    "status": "Ativo",
    "tenant_id":1
}


const endpointUrl = "/category";


function getCategories({page = 1, perPage = 10, search = "" , pageSize = 1}){
    const params = { page, perPage, search, status:true , pageSize }
    return `${endpointUrl}?${paserQueryParams(params)}`

}
function getCategory({identify}: {identify: string}){
    return `${endpointUrl}/${identify}`
}

function paserQueryParams(params: CategoryParams){
    const queryParams = new URLSearchParams()
    if(params.page){
        queryParams.append('page', params.page.toString())
    }
    if(params.pageSize){
        queryParams.append('per_page', params.pageSize.toString())
    }
    if(params.search){
        queryParams.append('filter', params.search.toString())
    }
    if(params.status){
        queryParams.append('status', params.status.toString())
    }
    return queryParams.toString()
}

function deleteCategoryMutation(category: Category){
    return {
        url: `${endpointUrl}/${category.identify}`,
        method: "DELETE"
    }   
}

function createCategoryMutantion(category: Category){
    return {
            url: `${endpointUrl}`,
            method: "POST",
            body: category
    }
}

function updateCategoryMutation(category: Category){
    return {
        url: `${endpointUrl}/${category.identify}`,
        method: "PUT",
        body: category
    }
}


export const categoriesApiSlice = apiSlice.injectEndpoints({
    endpoints: ({query, mutation}) => ({
        getCategories: query<Results, CategoryParams>({
            query: getCategories,
            providesTags: ["Categories"]
        }),  
        getCategory: query<Result, {identify: string}>({
            query: getCategory,
            providesTags: ["Categories"]
        }),
        deleteCategory: mutation<Result, {identify: string}>({
            query: deleteCategoryMutation,
            invalidatesTags: ['Categories']
        }),
        createCategory: mutation<Result, Category>({
            query: createCategoryMutantion,
            invalidatesTags: ["Categories"]
        }),
        updateCategory: mutation<Result, Category>({
            query: updateCategoryMutation,
            invalidatesTags: ["Categories"]
        })
    }),
})


export const initialState = [
        category,
        {
            "name": "Bermuda de Yaki",
            "identify": "e8b1b34d-499a-471e-a69a-a53e6a255136",
            "description": "Aut at minus ratione placeat qui minima.",
            "status": "Ativo",
            "tenant_id":1
        },
        {
            "name": "Calça de Pizza",
            "identify": "e7b1b34d-499a-471e-a69a-a53e6a255136",
            "description": "Aut at minus ratione placeat qui minima.",
            "status": "Ativo",
            "tenant_id":1
        }
    
    ]
export const selectCategories = (state: RootState) => state.categories

export const categoriesSlice = createSlice({
    name: "categories",
    initialState: initialState,
    reducers: {
        createCategory(state, action){
            state.push(action.payload)
        },
        updateCategory(state, action){
            const index = state.findIndex((category)=> category.identify === action.payload.identify)
            state[index] = action.payload
        },
        deleteCategory(state, action){
            const index = state.findIndex((category)=> category.identify === action.payload.identify)
            state.splice(index, 1)
        },
    }
})

export const selectCategoryByIdentify =  (state: RootState, identify: string) => {
   const category =  state.categories.find((category) =>  category.identify === identify)
   return (category || {
    identify: "",
    name: "",
    description: "",
    status: "",
    tenant_id: 1
   } )
}
                       
export default categoriesSlice.reducer
export const { createCategory, updateCategory, deleteCategory} = categoriesSlice.actions
export const { useGetCategoriesQuery, useDeleteCategoryMutation, useGetCategoryQuery,
               useCreateCategoryMutation, useUpdateCategoryMutation } = categoriesApiSlice

