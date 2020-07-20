export const filter = (obj, predicate) => {
    return Object.keys(obj)
        .filter(key => predicate(obj[key]))
        .reduce((res, key) => Object.assign(res, { [key]: obj[key] }), {});
};
