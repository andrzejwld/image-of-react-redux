import React from "react";
import { Field, reduxForm } from "redux-form";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import asyncValidate from "./asyncValidate";

const FileInput = ({ input, label, meta: { touched, error } }) => {
    const handleChange = e => {
        input.onChange(e.target.files[0]);
    };
    return (
        <div>
            <label>{label}</label>
            <div className="async-validating">
                <input {...input} type="file" value={""} onChange={handleChange} />
                {touched && error && <span>{error}</span>}
            </div>
        </div>
    );
};

const ImageUploaderForm = props => {
    const { uploadFile } = props;
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

function uploadFile(file) {
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

const mapDispatchToProps = dispatch =>
    bindActionCreators({ uploadFile }, dispatch);
const ImageUploaderComponent = reduxForm({
    form: "form" // a unique identifier for this form
    // asyncValidate,
    // asyncBlurFields: ["fileInput"]
})(ImageUploaderForm);

export default connect(null, mapDispatchToProps)(ImageUploaderComponent);
