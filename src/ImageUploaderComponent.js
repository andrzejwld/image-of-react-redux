import React from 'react';
import {Field, reduxForm} from 'redux-form';

import {asyncValidate} from './asyncValidate';

const FileInput = ({input, label, meta: {asyncValidating, touched, error}}) => {
        const handleChange = e => {
            input.onChange(e.target.files[0]);
        };
        const validationText = asyncValidating ? 'Checking image dimensions...' : '';
        return (
            <div>
                <label>{label}</label>
                <div>
                    < input {...input} type="file" value={""} onChange={handleChange}/>
                    <br/>
                    <div>
                        {asyncValidating && <span>{validationText}</span>}
                        {touched && error && <span>{error}</span>}
                    </div>
                </div>

            </div>
        );
    }
;

const ImageUploaderForm = () => {
    return (
        <form>
            <Field
                name="fileInput"
                component={FileInput}
            />
        </form>
    );
};


const ImageUploaderComponent = reduxForm({
    form: "form",
    asyncValidate,
    asyncChangeFields: ["fileInput"]
})(ImageUploaderForm);

export default ImageUploaderComponent
