import { createReadStream, existsSync } from 'fs';
import * as FormData from 'form-data';
import { request, type RequestOptions } from 'http';
export function isExistFile(path: string) {
  try {
    return existsSync(path);
  } catch (e: unknown) {
    throw new Error('file is not exist:' + e);
  }
}
interface fileParams {
  httpOptions: string | RequestOptions;
  readFilePath: string;
}
export function uploadFile({ httpOptions, readFilePath }: fileParams) {
  return new Promise((resolve, reject) => {
    if (!httpOptions || !readFilePath) {
      console.log('error upload file options');
      reject(null);
      return;
    }

    const form = new FormData();
    const resImpl = request(Object.assign({}, httpOptions, { headers: form.getHeaders() }));
    form.append('file', createReadStream(readFilePath));
    form.pipe(resImpl);

    resImpl.on('response', (res) => {
      console.log('file upload success', res.statusCode);
      resolve(null);
    });

    resImpl.on('error', (err) => {
      console.log('http request error:', err);
      reject(err);
    });
  });
}
