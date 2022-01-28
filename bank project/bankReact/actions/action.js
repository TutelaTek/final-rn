// this will be where all the network request functions are


//write function
export const getAccounts = async () => {
try {
    const response = await fetch(
        'http://localhost:4000/accounts'
    );
    const json = await response.json();
    return json.accounts;
} catch (error) {
    console.error(error);
}

}



// import the functions where they are being used
