import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from './store';
import ImageUploaderComponent from './ImageUploaderComponent';
import {EXPECTED_IMAGE_HEIGHT, EXPECTED_IMAGE_WIDTH} from './asyncValidate';
import {Values} from 'redux-form-website-template';

const rootElement = document.getElementById("root");

ReactDOM.render(
    <Provider store={store}>
        <div style={{padding: 15}}>
            <h2>Async image validation</h2>
            <p>
                Upload an image, expected dimensions {EXPECTED_IMAGE_WIDTH} x {EXPECTED_IMAGE_HEIGHT}.
                <br/>
                Sample file that passes validation can be found&nbsp;
                <a href="https://images.pexels.com/photos/589810/pexels-photo-589810.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                   target="_blank">
                    here
                </a>.
            </p>
            <ImageUploaderComponent/>
            <Values form="form"/>
        </div>
    </Provider>,
    rootElement
);
