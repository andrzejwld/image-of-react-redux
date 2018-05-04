import React from 'react';
import {Field, reduxForm} from 'redux-form';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {uploadFile} from './actions';
import {asyncValidate} from './asyncValidate';

const FileInput = ({input, label, meta: {asyncValidating, touched, error}}) => {
        const handleChange = e => {
            input.onChange(e.target.files[0]);
        };
        return (
            <div>
                <label>{label}</label>
                <div className={asyncValidating ? 'async-validating' : ''}>
                    < input {...input} type="file" value={""} onChange={handleChange}/>
                    {touched && error && <span>{error}</span>}
                </div>
            </div>
        );
    }
;

const ImageUploaderForm = props => {
    const {uploadFile} = props;
    return (
        <form>
            <Field
                name="fileInput"
                component={FileInput}
                onChange={(_, file) => {
                    uploadFile(file);
                }}
            />
        </form>
    );
};


const mapDispatchToProps = dispatch =>
    bindActionCreators({uploadFile}, dispatch);
const ImageUploaderComponent = reduxForm({
    form: "form", // a unique identifier for this form
    asyncValidate,
    asyncChangeFields: ["fileInput"]
})(ImageUploaderForm);

export default connect(null, mapDispatchToProps)(ImageUploaderComponent);
