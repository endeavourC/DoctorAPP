export const registerUser = async values => {
    const request = await fetch(`http://127.0.0.1:8000/api/user/register`, {
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
    const request = await fetch(`http://127.0.0.1:8000/api/user/login`, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(values)
    });

    const data = await request.json();

    return data;
};

export const isCurrentUserAuth = async (key, { token }) => {
    const request = await fetch(`http://127.0.0.1:8000/api/user/current`, {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    });
    const data = await request.json();
    return data;
};

export const getUserData = async (key, { token }) => {
    const request = await fetch(`http://127.0.0.1:8000/api/user/`, {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    });
    const data = await request.json();

    return data;
};

export const logoutUser = async token => {
    const request = await fetch(`http://127.0.0.1:8000/api/user/logout`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    const data = await request.json();
    console.log(data);
    return data;
};
