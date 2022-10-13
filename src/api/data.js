// 有关接口请求

import axios from "./axios";
import store from '../store'

export const baseUrl = '/api'


export const getData = () => {
    return axios.request(
        {
            url: '/home/getData',
            method: 'get',

        }
    )
}

// 得到 User 的信息（目前仍是 mock 模拟）
export const getUser = (params) => {
    return axios.request({
        url: "/user/getUser",
        method: 'get',
        params
    })
}

export const postUser = (url, params) => {
    return axios.request({
        url,
        method: 'post',
        data: params
    })
}

// 向指定的 url 提交数据表单
export const postForm = (requestUrl, params, callback) => {
    console.log('postForm 的表单', requestUrl, params)

    store.commit('getToken')
    const TokenValue = store.state.user.token;
    axios.request({
        url: baseUrl + requestUrl,
        method: 'post',
        data: params,
        headers: {
            token: TokenValue
        }
    }).then(({ data: res }) => {
        console.log('postForm 的 response', res);
        callback(res);
    })
}

// 向指定的 url 获取数据表单
export const getForm = (requestUrl, callback) => {
    store.commit('getToken')
    const TokenValue = store.state.user.token
    axios.request({
        url: baseUrl + requestUrl,
        method: 'get',
        headers: {
            token: TokenValue
        }
    }).then(({ data: res }) => {
        console.log('getForm 的 response', res);
        callback(res)
    })
}

// 加载菜单
export const getMenu = (params, callback) => {
    axios.request({
        url: baseUrl + '/account/admin/login',
        method: 'post',
        data: params
    }).then(({ data: res }) => {

        // code 为 0 表示管理员登录
        if (res.code === 400) {
            alert("用户名或密码错误！")
        }
        else if (res.code === 0) {
            //登录成功
            console.log('admin成功登录')
            callback({
                // 返回响应码、菜单、token、message
                code: 0,
                data: {
                    menu: [
                        {
                            path: '/home',
                            name: 'home',
                            label: '首页',
                            icon: 's-home',
                        },
                        {
                            path: '/Picture',
                            name: 'Picture',
                            label: '图片管理',
                            icon: 'picture',
                        },
                        // {
                        //     path: '/user',
                        //     name: 'user',
                        //     label: '用户管理',
                        //     icon: 'user',
                        // },
                        {
                            name: 'ArchiveManage',
                            label: '档案管理',
                            icon: 'folder-opened',
                            children: [
                                {
                                    path: '/ArchiveList',
                                    name: 'ArchiveList',
                                    label: '档案列表',
                                },
                                {
                                    path: '/AddArchive',
                                    name: 'AddArchive',
                                    label: '添加档案',
                                },
                                {
                                    path: '/UpdateArchive',
                                    name: 'UpdateArchive',
                                    label: '更新档案',
                                },
                                {
                                    path: '/DeleteArchive',
                                    name: 'DeleteArchive',
                                    label: '删除档案',
                                },
                            ],
                        },
                        {
                            name: 'Content',
                            label: '内容管理',
                            icon: 's-order',
                            children: [
                                {
                                    path: '/ActivityDetails',
                                    name: 'ActivityDetails',
                                    label: '学术活动详情',
                                },
                                {
                                    path: '/ExhibitionDetails',
                                    name: 'ExhibitionDetails',
                                    label: '展览详情',
                                },
                                {
                                    path: '/AlbumDetails',
                                    name: 'AlbumDetails',
                                    label: '展览-相册详情',
                                },
                                {
                                    path: '/PicDetails',
                                    name: 'PicDetails',
                                    label: '展览-相册-图片详情',
                                },
                            ],
                        },
                        {
                            name: 'Feedback',
                            label: '用户留言',
                            icon: 's-comment',
                            children: [
                                {
                                    path: '/FeedbackList',
                                    name: 'FeedbackList',
                                    label: '用户留言列表',
                                },
                                {
                                    path: '/FeedbackContent',
                                    name: 'FeedbackContent',
                                    label: '用户留言内容',
                                },
                            ],
                        },
                    ],
                    token: res.data,
                    message: '获取成功'
                }
            })
        }

    })
}
