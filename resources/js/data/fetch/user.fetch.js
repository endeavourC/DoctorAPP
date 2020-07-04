export const registerUser = async values => {
    const request = await fetch(`http://127.0.0.1:8000/api/register`, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(values)
    });
    const data = await request.json();
    return data;
};

export const loginUser = async values => {
    const request = await fetch(`http://127.0.0.1:8000/api/login`, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(values)
    });

    const data = await request.json();

    return data;
};
