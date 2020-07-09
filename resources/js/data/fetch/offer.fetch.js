export const createOffer = async (token, values) => {
    /**
     *  Clone values object and delete image from him
     */
    const offerValues = Object.assign({}, values);
    delete offerValues.image;

    const request = await fetch(`http://127.0.0.1:8000/api/offers/`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json"
        },
        body: JSON.stringify(offerValues)
    });
    const data = await request.json();
    const upload = await uploadFile(token, values.image);
    console.log(upload);
    return data;
};

export const uploadFile = async (token, file) => {
    const formData = new FormData();
    formData.append("image", file);

    const request = await fetch(`http://127.0.0.1:8000/api/images/`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
        },
        body: formData
    });
    const data = await request.json();

    return data;
};
