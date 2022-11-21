/**
 * @author cc-heart
 * @description 公共API
 * @Date 2022-11-14
 */

import { Get, Post } from '../utils/request';

export function getUploadToken() {
  return Get<{ token: string }>('api/common/getUploadToken');
}

export function getPreviewPath<T extends params>(params: T) {
  return Post<{ path: string }>('api/user/getFilePath', params);
}

export function getUserInfo() {
  return Get('api/user/getUserInfo');
}
