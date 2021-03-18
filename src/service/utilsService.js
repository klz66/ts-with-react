/*
 * @Description: 
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-03-18 19:38:50
 */
import http from '@/utils/request'
import {uploadUrl} from '@/utils/utils';

export async function uploadImg(params) {
  http.post(`${uploadUrl}/eduoss/fileoss`,params)
}
