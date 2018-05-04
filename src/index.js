import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from './store';
import ImageUploader from './ImageUploader';
import {EXPECTED_IMAGE_HEIGHT, EXPECTED_IMAGE_WIDTH} from './asyncValidate';

const rootElement = document.getElementById("root");

ReactDOM.render(
    <Provider store={store}>
        <div style={{padding: 15}}>
            <h2>Async image validation</h2>
            <p>
                Upload a file, expected dimensions {EXPECTED_IMAGE_WIDTH} x {EXPECTED_IMAGE_HEIGHT}.
                <br/>
                Sample file that passes validation can be found{" "}
                <a href="https://images.pexels.com/photos/589810/pexels-photo-589810.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                   target="_blank">
                    here
                </a>
            </p>
            <ImageUploader/>
        </div>
    </Provider>,
    rootElement
);
