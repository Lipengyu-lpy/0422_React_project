//所有分类相关的请求都在此文件中发送
import request from '@/utils/request';
//BASE_URL就是请求下的公共路径
const BASE_URL  = "/admin/edu/subject";
/**
 * @author Lilian 作者
 * 
 */
// /**
//   /***/可以进行多行的注释 备注代码作者 各个参数 返回值等 工作中可用
//请求所有一级分类
export function reqAllNo1Subject(){
  return request({
      url:BASE_URL,
      method:"GET",
  });
}
/**
 * @author Lilian
 * @param {第几页} page
 * @param {页大小} pageSize
 */
// // 请求一级分类列表
export function reqNo1SubjectPagination(page,pageSize){
    return request({
        url:`${BASE_URL}/${page}/${pageSize}`,
        method:"GET",
    });
  }