/*
 * @Description: 配置了nginx的反向代理
 * @Author: Zhong Kailong
 * @LastEditTime: 2021-03-27 00:00:35
 */
import { useRef,useEffect,useCallback } from 'react';

export const url = 'http://localhost:9001'  //后续配置nginx
export const demoUrl = 'http://localhost:7003'
export const uploadUrl = 'http://localhost:7001'


export function useDebounce(fn, delay, dep = []) {
  const { current } = useRef({ fn, timer: null });
  useEffect(function () {
    current.fn = fn;
  }, [fn]);
 
  return useCallback(function f(...args) {
    if (current.timer) {
      clearTimeout(current.timer);
    }
    current.timer = setTimeout(() => {
      current.fn.call(this, ...args);
    }, delay);
  }, dep)
}
