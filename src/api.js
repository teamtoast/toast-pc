import axios from "axios"

var serverUrl = 'https://api.toast-study.com';
//var serverUrl = 'http://localhost:8080';

export default {
    get: function(res, authorization = '') {
        return new Promise(function(resolve, reject) {
            if(authorization.length > 0) {
                axios.get(serverUrl + res, {
                    headers: {Authorization: authorization}
                }).then(resolve).catch(reject);
            }
            else {
                axios.get(serverUrl + res).then(resolve).catch(reject);
            }
        });
    },

    getParam: function(res,param) {
        return new Promise(function(resolve, reject) {
            axios.get(serverUrl + res + '/' + param).then(resolve).catch(reject);
        });
    },

    post: function (res,param) {
        return new Promise(function (resolve, reject) {
            axios.post(serverUrl + res, param).then(resolve).catch(reject);
        });
    },
}