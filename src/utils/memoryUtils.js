import storageUtils from './storageUtils';

const user = storageUtils.getUser()
export default {
  user, // 用来存储登录用户的信息，初始值为local中读取的user
  product: {}, // 需要查看的商品对象
}