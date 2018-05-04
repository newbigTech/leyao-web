/**
* Created by cycold on 2016-12-06
* http://stackoverflow.com/questions/13752984/html5-file-api-downloading-file-from-server-and-saving-it-in-sandbox
*/

export function downloadFile(url) {
  return new Promise(function(resolve, reject) {
    let xhr = new XMLHttpRequest()
    xhr.open('GET', url, true)
    xhr.responseType = "blob"
    xhr.onreadystatechange = function () { 
      if (xhr.readyState == 4) {
        resolve(xhr.response)
      } else {
        reject(new Error(xhr.response))
      }
    }
    xhr.send(null)
  })
}

export function _downloadFile(url, success) {
    var xhr = new XMLHttpRequest(); 
    xhr.open('GET', url, true); 
    xhr.responseType = "blob";
    xhr.onreadystatechange = function () { 
        if (xhr.readyState == 4) {
            if (success) success(xhr.response);
        }
    };
    xhr.send(null);
}
