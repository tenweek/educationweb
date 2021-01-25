import React from 'react';

/**
 * Java Rest API 服务器地址
 * @type {string}
 */
// 则通楼服务器
const baseUrl = `http://localhost:8081`;
// 华师服务器
// const baseUrl = 'http://192.168.11.199:8081';
// const baseUrl = 'http://records.zczc.nercel.cn';


let token = null;

async function myFetch(url, init) {

  if (init){
    if ( !init.headers ){
      init.headers = getHeader();
    }
  } else {
    init={headers: getHeader()};
  }

  let response = await fetch(url, init);
  let result = await response.json();

  if (result.status !== 0){
    console.log('Fetch Error: ', result.message);
    throw new Error(result.message);
  }
  return result.data ;
}


function getHeader() {
  const headers = new Headers();
  headers.append('Content-Type','application/json');
  headers.append('Accept','application/json');
  if (token){
    headers.append('token',token);
  }
  return headers;
}


/**
 * 查看用户充值记录（已审核通过的）
 */

export async function getBlockRecordList() {
  const url = baseUrl + '/integration/records';
  let response;
  try {
    response = await myFetch(url);
  } catch (e) {
    console.log(e);
  }
  // console.log(response);
  return response;
}

export async function getClassList() {
  const url = baseUrl + '/integration/classes';
  let response;
  try {
    response = await myFetch(url);
  } catch (e) {
    console.log(e);
  }

  return response;
}

export async function getResourceList() {
  const url = baseUrl + '/integration/resource';
  let response;
  try {
    response = await myFetch(url);
  } catch (e) {
    console.log(e);
  }
  return response;
}

export async function getClassHistory(id) {
  const url = baseUrl + '/integration/class/' + id;
  let response;
  try {
    response = await myFetch(url);
  } catch (e) {
    console.log(e);
  }
  return response;
}

export async function getResourceDownloadHistory(id) {
  const url =  baseUrl + '/integration/resourceDownload/' + id;
  let response;
  try {
    response = await myFetch(url);
  } catch (e) {
    console.log(e);
  }
  return response;
}

export async function getResourceLinkHistory(id) {
  const url =  baseUrl + '/integration/resourceLink/' + id;
  let response;
  try {
    response = await myFetch(url);
  } catch (e) {
    console.log(e);
  }
  return response;
}

export async function getClassByCond(attr, cond) {
  const url = baseUrl + '/integration/class/search/' + attr + '=' + cond;
  let response;
  try {
    response = await myFetch(url);
  } catch (e) {
    console.log(e);
  }
  return response;
}

export async function getResourceByCond(attr, cond) {
  const url = baseUrl + '/integration/resource/search/' + attr + '=' + cond;
  let response;
  try {
    response = await myFetch(url);
  } catch (e) {
    console.log(e);
  }
  return response;
}

export async function updateClass(classID, read) {
  const url = baseUrl + `/integration/updateclass?classID=${classID}&read=${read}`;
  let response;
  try {
    response = await myFetch(url, { method: 'POST' });
  } catch (e) {
    console.log(e);
  }
  return response;

}