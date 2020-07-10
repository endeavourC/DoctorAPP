export const createOffer = async (token, values) => {
    const upload = await uploadFile(token, values.image);

    /**
     *  Replace image to src path
     */
    const uploadResponse = await upload.json();

    /*
     *  Return Errors if status is error
     */
    if (uploadResponse.status === "error") {
        const data = uploadResponse.response.image;
        return { data, status: "error" };
    }

    /**
     *  If status is no error make another request
     */

    values.image = uploadResponse.response;
    const request = await fetch(`http://127.0.0.1:8000/api/offers/`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json"
        },
        body: JSON.stringify(values)
    });
    const data = await request.json();

    return { data, status: "success" };
};

export const uploadFile = async (token, file) => {
    const formData = new FormData();
    formData.append("image", file);

    const request = await fetch(`http://127.0.0.1:8000/api/images/`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`
        },
        body: formData
    });

    return request;
};

export const getOffersByUserId = async (key, { userId }) => {
    if (userId === undefined) return false;

    const request = await fetch(
        `http://127.0.0.1:8000/api/offers/user/${userId}`
    );
    const response = await request.json();

    return response;
};
