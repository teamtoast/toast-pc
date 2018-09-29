import axios from "axios"

// var serverUrl = 'https://toast-ser.run.goorm.io';
var serverUrl = 'http://localhost:8080';

export default {
    get: function(res) {
        return new Promise(function(resolve, reject) {
            axios.get(serverUrl + res).then(resolve).catch(reject);
        });
    },

    getParam: function(res,param) {
        return new Promise(function(resolve, reject) {
            axios.get(serverUrl + res + '/' + param).then(resolve).catch(reject);
        });
    }
}