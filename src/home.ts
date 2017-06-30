import {inject} from 'aurelia-framework'
import {Api}    from './api'

@inject(Api)
export class Home {
    api:            Api;
    apiResponse:    string;
    baseUrl:        string = `https://jsonplaceholder.typicode.com`;
    route:          string = `posts/1`;

    constructor(api: Api) {
        this.api = api;
    }

    activate() {
        this.getHttp();
    }

    getFetch() {
        this.api.getFetch(this.baseUrl, this.route).then((fulfilled) => {
            this.parseGet(fulfilled);
        });
    }

    getHttp() {
        this.api.getHttp(this.baseUrl, this.route).then((fulfilled) => {
            this.parseGet(fulfilled);
        });
    }

    parseGet(fulfilled) {
        let fulfilledString = ``;

        if (fulfilled.constructor === Array) {  // Check if the returned object is a single object or an array of objects
            for (let returnedObject of <any>fulfilled) {
                for (let property in returnedObject) {
                    fulfilledString += `<div>${property}: ${returnedObject[property]}</div>`;
                }

                fulfilledString += `<div><hr></div>`;
            }
        } else {
            for (let property in fulfilled) {
                fulfilledString += `<div>${property}: ${fulfilled[property]}</div>`;
            }
        }

        this.apiResponse = fulfilledString;
    }
}