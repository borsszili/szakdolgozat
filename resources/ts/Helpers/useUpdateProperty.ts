export const updateProperty = (key, value, setState) => {
    setState((prevState) => ({
        ...prevState,
        [key]: value,
    }));
};
