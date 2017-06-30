import * as FetchClient from 'aurelia-fetch-client'; // Normally you probably wouldn't have Fetch and Http in the same file so it would just be `import {HttpClient} from 'aurelia-fetch-client'`
import {HttpClient}     from 'aurelia-http-client';

export class Api {
    fetchClient:    any;
    httpClient:     any;

    constructor() {
        this.fetchClient = new FetchClient.HttpClient();
        this.httpClient = new HttpClient();
    }

    getFetch(baseUrl, route) {
        return new Promise((resolve, reject) => {
            this.fetchClient.fetch(`${baseUrl}/${route}`)
                .then(response => response.json())
                .then(data => {
                    resolve(data);
                }); 
        });
    }

    getHttp(baseUrl, route) {
        return new Promise((resolve, reject) => {
            this.httpClient.createRequest(`${baseUrl}/${route}`)
                .asGet()
                .send()
                .then(
                    (fulfilled) => {
                        resolve(JSON.parse(fulfilled[`response`]));
                    },
                    (rejected) => {
                        let rejectedString = ``;

                        for (let property in rejected) {
                            rejectedString += `${property}: ${rejected[property]} \n`
                        }

                        let apiError: Error = new Error(`api.getJson() error: ${rejectedString}`);

                        throw apiError;
                    }
                ).catch(
                    (error) => {
                        console.log(error);
                    }
                ); 
        });
    }
}