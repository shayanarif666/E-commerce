export const fetchingProductsData = async (page = 1) => {
    const pageSize = 24;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    let products = [];

    try {
        const response = await fetch("https://dummyjson.com/products?limit=194");
        if (!response.ok) {
            throw new Error("Something Went Wrong :: Fetching Products");
        }
        const data = await response.json();
        products = data.products.slice(startIndex, endIndex);
    } catch (error) {
        console.log(error);
    }

    return { products, total: pageSize };
}

export const fetchingCategoriesDataList = async (error) => {
    let categories = [];

    try {
        const response = await fetch('https://dummyjson.com/products/category-list');
        if (!response.ok) {
            throw new Error("Something Went Wrong :: Fetching Categories");
        }
        const data = await response.json();
        categories = (data);
    } catch (error) {
        error(error.message);
    }
    return categories

}

export const fetchingCategoriesData = async () => {
    let categoriesList = [];

    try {
        const response = await fetch('https://dummyjson.com/products/categories');
        if (!response.ok) {
            throw new Error("Something Went Wrong :: Fetching Categories");
        }
        const data = await response.json();
        categoriesList = (data);
    } catch (error) {
        console.log(error);
    }
    return categoriesList

}

export const fetchingSingleProduct = async (id) => {
    try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        console.log("response", response);
        if (!response.ok) {
            throw new Error("Something Went Wrong :: Fetching Sungle Product");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const fetchingFilteredProducts = async (params, page = 1) => {
    const pagePerProduct = 12;
    const startIndex = (page - 1) * pagePerProduct;
    const endIndex = startIndex + pagePerProduct;
    let filteredData = [];
    let lengthOfProducts;

    const getCategories = await fetchingCategoriesDataList();
    const isCategory = getCategories.includes(params);

    const query = !isCategory ? `search?q=${params}` : `category/${params}`

    try {
        const response = await fetch(`https://dummyjson.com/products/${query}`);
        console.log("response", response);
        if (!response.ok) {
            throw new Error("Something Went Wrong :: Fetching Searching || Category Product");
        }
        const { products } = await response.json();
        lengthOfProducts = products.length;
        filteredData = products.slice(startIndex, endIndex);
    } catch (error) {
        console.log(error);
    }

    return { filteredData, total: pagePerProduct, length: lengthOfProducts };
}

export const fetchingProductsByCategories = async (category, id) => {
    let productsData = [];

    try {
        const response = await fetch(`https://dummyjson.com/products/category/${category}`);
        console.log("response", response);
        if (!response.ok) {
            throw new Error("Something Went Wrong :: Fetching Searching || Category Product");
        }
        const { products } = await response.json();
        const filterProducts = products.filter((product) => product.id !== parseInt(id));
        productsData = filterProducts;
    } catch (error) {
        console.log(error);
    }

    return productsData;
}
