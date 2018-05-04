export function uploadFile(file) {
    console.log("upload file external");
    return dispatch => {
        console.log("inner uploadFile");
        const reader = new FileReader();
        reader.onloadend = () => {
            const img = new Image();
            img.onload = function () {
                const width = this.width;
                const height = this.height;
                console.log(`Image dimensions: ${width} X ${height}`);

                // dispatch(startAsyncValidation("asyncValidation"));
            };
            img.src = reader.result;
        };
        reader.readAsDataURL(file);
        console.log("READER READ FILE");
    };
}

