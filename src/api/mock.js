import Mock from 'mockjs'
import homeApi from './mockServeData/home'
import userApi from './mockServeData/user'

Mock.mock('/home/getData', homeApi.getStatisticalData)
Mock.mock(/user\/addUser/, 'post', userApi.createUser)
Mock.mock(/user\/updateUser/, 'post', userApi.updateUser)
Mock.mock(/user\/getUser/,'get', userApi.getUserList)
Mock.mock(/user\/delUser/, 'post', userApi.deleteUser)
