const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const asyncValidate = (values /*, dispatch */) => {
    return sleep(1000).then(() => {
        // simulate server latency
        console.log("async validating", values);
    });
};

export default asyncValidate;
