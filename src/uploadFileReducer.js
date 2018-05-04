export default (prevState = {}, action) => {
    switch (action.type) {
        case "IMAGE_UPLOADED":
            return {
                ...prevState,
                page: action.page
            };
        default:
            return prevState;
    }
};