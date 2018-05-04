import {SubmissionError} from 'redux-form';
import loadImage from 'image-promise';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export const EXPECTED_IMAGE_WIDTH = 2250;
export const EXPECTED_IMAGE_HEIGHT = 1500;

const readFile = (file) => {
    let reader = new global.FileReader();
    return new Promise((resolve, reject) => {
        reader.onloadend = (event) => {
            //console.log('EVENT IS ', event);
            file.data = event.target.result;
            //console.log(file.data);
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
    let higherErrors = {};
    const reader = new FileReader();

    reader.onloadend = () => {
        const img = new Image();
        img.onload = function () {
            const width = this.width;
            const height = this.height;
            if (width !== EXPECTED_IMAGE_WIDTH || height !== EXPECTED_IMAGE_HEIGHT) {
                higherErrors['fileInput'] = 'Invalid image dimensions';
            }
            if (higherErrors) {
                reject(higherErrors);
            } else {
                return resolve(higherErrors);
            }
        };
        // loadImage(reader.result).then(
        //     function (image) {
        //         console.log("image loaded!!!", image.width, image.height);
        //     }
        // );
        // img.src = reader.result;
    };
    //reader.readAsDataURL(file);
    return readFile(file).then((imgSrc) => {
        return loadImage(imgSrc)
        // console.log("img src is ", imgSrc);
    }).then((image) => {
            return new Promise(() => {
                let errors = {};
                if (image.width !== EXPECTED_IMAGE_WIDTH || image.height !== EXPECTED_IMAGE_HEIGHT) {
                    errors['fileInput'] = 'Napraw rozmiar!!!';
                    reject(errors);
                }
                return resolve();
                //console.log("image loaded!!!", image.width, image.height);
            })
        }
    );
};


export const asyncValidate = (values) => {
    // return validateImageDimensions(values.fileInput).then()
    return new Promise((resolve, reject) => validateImageDimensions(resolve, reject, values.fileInput));
    // let errors = {};
    // errors['fileInput'] = 'missing';
    // return new Promise((resolve, reject) => {
    //     if (errors) {
    //         reject(errors);
    //     } else {
    //         resolve();
    //     }
    // });
    // return sleep(1000).then(() => {
    //     const image = values.fileInput;
    //     validateImageDimensions(image);
    //     // throw {fileINput: 'invalid'};
    //     // dispatch()
    //     // simulate server latency
    //     //throw {fileInput: 'That username is taken'};
    //     // console.log("async validating", values);
    // });
};


