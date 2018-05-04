import {SubmissionError} from 'redux-form';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const EXPECTED_IMAGE_WIDTH = 1260;
const EXPECTED_IMAGE_HEIGHT = 750;

const validateImageDimensions = (resolve, reject, file) => {
    let errors = {};
    const reader = new FileReader();
    reader.onloadend = () => {
        const img = new Image();
        img.onload = function () {
            const width = this.width;
            const height = this.height;
            console.log(`Image dimensions: ${width} X ${height}`);
            if (width !== EXPECTED_IMAGE_WIDTH || height !== EXPECTED_IMAGE_HEIGHT) {
                errors['fileInput'] = 'Invalid image dimensions';
            }
            if (errors) {
                reject(errors);
            } else {
                resolve(errors);
            }
        };
        img.src = reader.result;
    };
    reader.readAsDataURL(file);
    console.log("READER READ FILE");
};

export const asyncValidateDimensions = (values) => {
    return new Promise((resolve, reject) => {
        reject({fileInput: 'invalid dimensions'})
    })
};

export const asyncValidate = (values) => {
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


