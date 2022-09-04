// 有关接口请求

import axios from "./axios";
import store from '../store'

export const baseUrl = '/api'


export const getData = () => {
    return axios.request(
        {
            url: '/home/getData',
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
    const TokenValue = store.state.user.token
    axios.request({
        url: baseUrl + requestUrl,
        method: 'post',
        data: params,
        headers: {
            token: TokenValue
        }
    }).then(({data: res}) => {
        console.log('postForm 的 response', res);

        if (res.code === 0) {
            alert("请求成功");
        } else if (res.code === 400) {
            alert("请求对象不存在");
        } else {
            alert("网络错误");
        }

        callback(res);
    })
}

// 向指定的 url 获取数据表单
export const getForm = (requestUrl, callback) => {
    axios.request({
        url: baseUrl + requestUrl,
        method: 'get'
    }).then(({data: res}) => {
        
        // if (res.code === 0) {
        //     alert("查询成功");
        // } else if (res.code === 400) {
        //     alert("查询对象不存在");
        // } else {
        //     alert("网络错误");
        // }

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
        if(res.code === 400) {
            alert("用户名或密码错误！")
        }
        else if (res.code === 0) {
            //登录成功
            console.log('admin成功登录')
            callback( {
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
                        // {
                        //     path: '/Content',
                        //     name: 'Content',
                        //     label: '内容浏览',
                        //     icon: 's-order'
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
                            name: 'ActivityManage',
                            label: '活动管理',
                            icon: 's-claim',
                            children: [
                                {
                                    path: '/ActivityDetails',
                                    name: 'ActivityDetails',
                                    label: '活动详情',
                                },
                                // {
                                //     path: '/AddActivity',
                                //     name: 'AddActivity',
                                //     label: '创建活动',
                                // },
                                // {
                                //     path: '/UpdateActivity',
                                //     name: 'UpdateActivity',
                                //     label: '修改活动',
                                // },
                                // {
                                //     path: '/DeleteActivity',
                                //     name: 'DeleteActivity',
                                //     label: '删除活动',
                                // },
                            ],
                        },
                        {
                            name: 'ExhibitionManage',
                            label: '展览管理',
                            icon: 'data-board',
                            children: [
                                {
                                    path: '/ExhibitionDetails',
                                    name: 'ExhibitionDetails',
                                    label: '展览详情',
                                },
                                // {
                                //     path: '/AddExhibition',
                                //     name: 'AddExhibition',
                                //     label: '创建展览',
                                // },
                                // {
                                //     path: '/UpdateExhibition',
                                //     name: 'UpdateExhibition',
                                //     label: '修改展览',
                                // },
                                // {
                                //     path: '/DeleteExhibition',
                                //     name: 'DeleteExhibition',
                                //     label: '删除展览',
                                // },
                            ],
                        },
                        {
                            name: 'AlbumManage',
                            label: '展览相册管理',
                            icon: 'notebook-1',
                            children: [
                                {
                                    path: '/AlbumDetails',
                                    name: 'AlbumDetails',
                                    label: '相册详情',
                                },
                                // {
                                //     path: '/AddAlbum',
                                //     name: 'AddAlbum',
                                //     label: '创建相册',
                                // },
                                // {
                                //     path: '/UpdateAlbum',
                                //     name: 'UpdateAlbum',
                                //     label: '修改相册',
                                // },
                                // {
                                //     path: '/DeleteAlbum',
                                //     name: 'DeleteAlbum',
                                //     label: '删除相册',
                                // },
                            ],
                        },
                        {
                            name: 'PicManage',
                            label: '展览相册图片管理',
                            icon: 'picture-outline-round',
                            children: [
                                {
                                    path: '/PicDetails',
                                    name: 'PicDetails',
                                    label: '相册-图片详情',
                                },
                                // {
                                //     path: '/AddPic',
                                //     name: 'AddPic',
                                //     label: '添加图片',
                                // },
                                {
                                    path: '/UpdatePic',
                                    name: 'UpdatePic',
                                    label: '更新图片',
                                },
                                // {
                                //     path: '/DeletePic',
                                //     name: 'DeletePic',
                                //     label: '删除图片',
                                // },
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
