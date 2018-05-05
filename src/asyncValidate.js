export const EXPECTED_IMAGE_WIDTH = 2250;
export const EXPECTED_IMAGE_HEIGHT = 1500;

const readFile = (file) => {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
        reader.onloadend = (event) => {
            file.data = event.target.result;
            resolve(file.data);
        };

        reader.onerror = () => {
            reject(this);
        };

        reader.readAsDataURL(file);
    })
};

const convertToImg = (src) => {
    const img = new Image();
    return new Promise((resolve, reject) => {
        img.onload = (event) => {
            resolve(event.target);
        };

        img.onerror = () => {
            reject(this);
        };

        img.src = src;
    })
};

const checkImageDimensions = (resolve, reject, img) => {
    return new Promise(() => {
        let errors = {};
        if (img.width !== EXPECTED_IMAGE_WIDTH || img.height !== EXPECTED_IMAGE_HEIGHT) {
            errors['fileInput'] = 'Invalid dimensions';
            reject(errors);
        }
        resolve();
    })
};

const validateImageDimensions = (resolve, reject, file) => {

    return readFile(file)
        .then((dataUrl) => {
            return convertToImg(dataUrl);
        })
        .then((img) => {
                return checkImageDimensions(resolve, reject, img);
            }
        );
};


export const asyncValidate = (values) => {
    return new Promise((resolve, reject) => validateImageDimensions(resolve, reject, values.fileInput));
};


