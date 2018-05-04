import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import ImageUploader from "./ImageUploader";

const rootEl = document.getElementById("root");

ReactDOM.render(
    <Provider store={store}>
        <div style={{ padding: 15 }}>
            <h2>Trying to run async file validation</h2>
            <p>
                Upload a file, expected fimensions Z x B.
                <br />
                Sample file with dimensions that pass validation can be found{" "}
                <a href="https://images.pexels.com/photos/589810/pexels-photo-589810.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260">
                    here
                </a>
            </p>
            <ImageUploader />
        </div>
    </Provider>,
    rootEl
);
