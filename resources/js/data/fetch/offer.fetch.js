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

    values.image = uploadResponse.image;
    values.image_thumbnail = uploadResponse.image_thumbnail;

    const request = await fetch(`${process.env.MIX_URL}/api/offers/`, {
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

export const updateOffer = async (
    token,
    values,
    offerID,
    isImageUploaded = false
) => {
    /*
     * Set initial values to image and image_thumbnail then check if new image is uploaded
     */

    const initialImageValues = {
        image: values.image,
        image_thumbnail: values.image_thumbnail
    };
    if (isImageUploaded) {
        const upload = await uploadFile(token, values.image);
        const response = await upload.json();

        /**
         * If image is uploaded change current image and image_thumbnail path to new image src
         */
        if (response.status === "error") {
            return {
                status: "error",
                data: response.data
            };
        }

        initialImageValues.image_thumbnail = response.image_thumbnail;
        initialImageValues.image = response.image;
    }

    /**
     * Merge initialImage Values and values in 1 object
     */

    const offerData = {
        ...values,
        ...initialImageValues
    };
    const request = await fetch(
        `${process.env.MIX_URL}/api/offers/${offerID}`,
        {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-type": "application/json"
            },
            body: JSON.stringify(offerData)
        }
    );
    const response = await request.json();

    return { response, status: "success" };
};

export const uploadFile = async (token, file) => {
    const formData = new FormData();
    formData.append("image", file);

    const request = await fetch(`${process.env.MIX_URL}/api/images/`, {
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
        `${process.env.MIX_URL}/api/offers/user/${userId}`
    );
    const response = await request.json();

    return response;
};

export const deleteOffer = async ({ offerId, token }) => {
    const request = await fetch(
        `${process.env.MIX_URL}/api/offers/${offerId}`,
        {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
    const response = await request.json();
    return response;
};

export const editSingleOffer = async (key, { offerId, token }) => {
    const request = await fetch(
        `${process.env.MIX_URL}/api/offers/${offerId}/edit`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    const response = await request.json();
    return response;
};
