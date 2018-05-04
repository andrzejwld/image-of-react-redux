import loadImage from 'image-promise';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export const EXPECTED_IMAGE_WIDTH = 2250;
export const EXPECTED_IMAGE_HEIGHT = 1500;

const readFile = (file) => {
    let reader = new global.FileReader();
    return new Promise((resolve, reject) => {
        reader.onloadend = (event) => {
            file.data = event.target.result;
            resolve(file.data);
        };

        reader.onerror = () => {
            return reject(this);
        };

        if (/^image/.test(file.type)) {
            reader.readAsDataURL(file);
        } else {
            reader.readAsText(file);
        }
    })
};

const validateImageDimensions = (resolve, reject, file) => {
    return readFile(file).then((imgSrc) => {
        return loadImage(imgSrc)
    }).then((image) => {
            return new Promise(() => {
                let errors = {};
                if (image.width !== EXPECTED_IMAGE_WIDTH || image.height !== EXPECTED_IMAGE_HEIGHT) {
                    errors['fileInput'] = 'Invalid dimensions';
                    reject(errors);
                }
                return resolve();
            })
        }
    );
};


export const asyncValidate = (values) => {
    return new Promise((resolve, reject) => validateImageDimensions(resolve, reject, values.fileInput));
};


