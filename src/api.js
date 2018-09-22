import axios from "axios"

var serverUrl = 'https://toast-ser.run.goorm.io';

export default {
    get: function(res) {
        return new Promise(function(resolve, reject) {
            axios.get(serverUrl + res).then(resolve).catch(reject);
        });
    }
}