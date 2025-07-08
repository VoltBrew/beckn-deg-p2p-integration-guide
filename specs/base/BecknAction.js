const fs = require('fs');
const yaml = require('js-yaml');
const {join} = require('path');
const axios = require('axios');
const util = require('util');

exports = module.exports = class BecknAction {

    #baseUrl;
    #schema;

    constructor(baseUrl, schema = 'trade_1.1.0.yaml.noexist') {
        this.#baseUrl = baseUrl;
        this.#schema = schema;
    }


    get name() {
        return this.constructor.name;
    }

    get params() {
        return this.constructor.params;
    }

    build(params) {
        const specs = {
            name: this.name,
            params: this.params,
            baseUrl: this.#baseUrl,
            data: params,
            body: this.constructor.body(params)
        };
        console.log(specs);
        this.specs = specs;
        console.log(JSON.stringify(this.specs.body, null, 4))
        return this;
    }

    makeCall() {
        return axios.post(this.#baseUrl + '/' + this.specs.name, this.specs.body, {
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(response => {
            console.log('Response:', response.data);
            return response.data;
        }).catch(error => {
            console.error('Error making POST request:', error.message);

            if (error.response) {
                console.error('Response Error Body:', util.inspect(error.response.data, {depth: null, colors: true}));
            }
        });
    }

    static randomStr(str) {
        return str.replace(/[a-z]/g, function (c) {
            return Math.floor(Math.random() * 16).toString(16);
        }).toUpperCase();
    }

}