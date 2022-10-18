/**
 * @author heart
 * @description 网络请求接口
 * @Date 2022-07-01
 * @see https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API
 * @see https://www.ruanyifeng.com/blog/2020/12/fetch-tutorial.html
 */

import { objectToParams } from './shard';
enum requestType {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

const successCode = [200, 0];

type params = Record<string, any>;

type postType = 'application/x-www-form-urlencoded' | 'application/json' | 'multipart/form-data';

type responseType = string | Record<string, any>;

type defaultType = Record<string, any>;

interface requestParams {
  code: string | number;
}

// type requestBodyType = ArrayBuffer | Blob | FormData | string | Record<string, any>

const baseUrl = 'http://localhost:3363/';

function isSpecifyResponseType(contentType: string, reg: RegExp): boolean {
  return reg.test(contentType);
}
// TODO: Blob ArrayBuffer formData 的判断
// function isResponseText(contentType: string): boolean {
//   return isSpecifyResponseType(contentType, /text\/html/)
// }

function isResponseJson(contentType: string): boolean {
  return isSpecifyResponseType(contentType, /application\/json/);
}

function request<T extends responseType>(url = '', data: RequestInit = { method: 'GET' }): Promise<T> {
  const pathUrl = baseUrl + url;
  return new Promise((resolve, reject) => {
    fetch(pathUrl, data)
      .then((response) => {
        const ContentType = response.headers.get('content-type') || '';
        if (isResponseJson(ContentType)) {
          return response.json();
        }
        return response.text();
      })
      .then((jsonData) => {
        // 全局状态判断
        try {
          const val: T & requestParams = jsonData;
          // 判断状态码
          if (successCode.includes(Number(val.code))) {
            resolve(val);
          } else {
            // 失败之后的判断等
            return reject(val);
          }
        } catch (e) {
          // string
          console.log(pathUrl, jsonData, e);
          resolve(jsonData);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  });
}

function requestMethod<T extends responseType>(url: string, type: requestType, requestInit: RequestInit): Promise<T> {
  return request(url, Object.assign({ method: type }, requestInit));
}

export function Get<T extends responseType = defaultType>(url: string, params?: params, requestInit: RequestInit = {}): Promise<T> {
  const enCodeParams = objectToParams(params);
  const fullPath = url + `?${enCodeParams}`;
  return requestMethod(fullPath, requestType.GET, requestInit);
}

function postRequest<T extends responseType>(url: string, requestInit: RequestInit = {}, ContentType?: postType): Promise<T> {
  requestInit.headers = Object.assign({}, requestInit.headers || {}, { 'Content-Type': ContentType });
  return request(url, Object.assign({ method: requestType.POST }, requestInit));
}

export function Post<T extends responseType = defaultType>(url: string, params?: params, requestInit: RequestInit = {}): Promise<T> {
  try {
    requestInit.body = JSON.stringify(params);
  } catch (err) {
    console.log('Post params error:', err);
  }
  return postRequest(url, requestInit, 'application/json');
}

export function FormDataPost<T extends responseType = defaultType>(url: string, params?: params, requestInit: RequestInit = {}): Promise<T> {
  // formData形式
  return postRequest(url, requestInit, 'application/x-www-form-urlencoded');
}
export function MultiPost<T extends responseType = defaultType>(url: string, params?: params, requestInit: RequestInit = {}): Promise<T> {
  // new FormData形式
  return postRequest(url, requestInit, 'multipart/form-data');
}
