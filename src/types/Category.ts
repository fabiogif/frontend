export interface Results {
    data: Category[];
    meta: Meta;
}



export interface Result {
    data: Category;
    meta: Meta;
}
export interface Category {
    name:        string;
    identify:    string;
    description: null | string;
    url:         string;
    status:      string;
    tenant_id:   number;
}

export interface Meta {
    total:        number;
    isFirstPage:  boolean;
    isLastPage:   boolean;
    currentPage:  number;
    nextPage:     number;
    previousPage: number;
}

export interface CategoryParams {
    page?: number
    perPage?: number
    search?: string
    status?: boolean
    pageSize:number
}

export interface Links {

}