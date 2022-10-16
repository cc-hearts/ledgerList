/**
 * @author heart
 * @description 自动化构建
 * @Date 2022-10-16
 */
import { join } from 'path';
import { createWriteStream, mkdirSync } from 'fs';
import { exec } from 'child_process';
import { isExistFile, uploadFile } from './ci.utils';
import { tar, gzip } from 'compressing';
import * as pump from 'pump';
const zipFileName = 'distZip';
const distName = 'dist';
const distZipFileName = 'dist.tgz';
const httpOptions = {
  hostname: '127.0.0.1',
  port: '4000',
  path: '/v1/upload',
  method: 'POST',
};
exec('npm run build', async (error: unknown, stdout: any) => {
  if (error) {
    console.log(error);
    return;
  }
  console.log(stdout);
  const zipFilePath = join(process.cwd(), `/${zipFileName}`);
  // 将dist 构建到distZip文件中
  if (!isExistFile(zipFilePath)) {
    console.log('distZip is not exist');
    try {
      await mkdirSync(zipFilePath);
    } catch (e) {
      throw new Error(`create ${zipFileName} file fail`);
    }
  }
  // 打包
  const tarStream = new tar.Stream();
  const fromPath = join(process.cwd(), `/${distName}`);
  tarStream.addEntry(fromPath);
  const distStream = createWriteStream(join(zipFilePath, `/${distZipFileName}`));
  pump(tarStream, new gzip.FileStream(), distStream, (err) => {
    if (err) {
      console.log('error:' + err);
      return;
    }
    console.log(`${distZipFileName} create success`);
    // 上传
    uploadFile({ httpOptions, readFilePath: join(zipFilePath, `/${distZipFileName}`) });
  });
});
