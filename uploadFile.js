const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const {promisify} = require('util');

function buildForm(forms, fileForms) {

  const form = new FormData();
    for (const [key, value] of forms) {
        form.append(key, value);
    }
    for (const [key, value] of fileForms) {
        form.append(key, fs.createReadStream(value));
    }
    console.log(form);

    return form
}

async function getFormHeaders (form, defHeader) {
  console.log("headerObj", defHeader);
  const getLen = promisify(form.getLength).bind(form);
  const len = await getLen();
  
  return {
    ...form.getHeaders(defHeader),
    'Content-Length': len
  }
}

async function uploadFile(url, forms, fileForms, rawData) {
    console.log(url);
    console.log(forms);
    console.log(fileForms);
    const form = buildForm(forms, fileForms);
    const headers = await getFormHeaders(form, objToHeaderStrMap(rawData));
    console.log(headers);
    return axios.post(url, form, {headers: headers,maxContentLength: Infinity})
}

function objToHeaderStrMap(obj){
  let strMap = new Object();
  for (let k of Object.keys(obj)) {
    if(str1.startsWith('_')))
      strMap[k.substring(1)] = obj[k];
  }
  return strMap;
}


module.exports = uploadFile;

