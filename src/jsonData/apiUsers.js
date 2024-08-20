export const fetchingAllUsers = async (page = 1) => {
    const pagePerUsers = 20;
    const startingIndex = (page - 1) * pagePerUsers;
    const endingIndex = startingIndex + pagePerUsers;
    let customers = [];

    try {
        const response = await fetch(`https://dummyjson.com/users?limit=190`);
        if (!response.ok) throw new Error("Data could not fetch");
        const data = await response.json();
        customers = data.users.slice(startingIndex, endingIndex);
    } catch (error) {
        console.log("error getting users", error.message)
    }

    return { customers, total: pagePerUsers }
};

export const fetchingSingleUser = async (id) => {
    let customer = {};

    try {
        const response = await fetch(`https://dummyjson.com/users/${id}`);
        if (!response.ok) throw new Error("Data could not fetch");
        const data = await response.json();
        customer = data;
    } catch (error) {
        console.log("error getting users", error.message)
    }

    return customer;
}