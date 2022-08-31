<template>
    <el-row class="home" :gutter="20">
        <el-col :span="8" style="margin-top:20px">
            <el-card shadow="hover">
                <div class="user">
                    <img :src="userImg" />
                    <div class="userinfo">
                        <p class="name">Admin</p>
                        <p class="access">超级管理员</p>
                    </div>
                </div>
                <div class="login-info">
                    <p>上次登录的时间：<span>2022-7-19</span></p>
                    <p>上次登录的地点：<span>北京</span></p>
                </div>
            </el-card>
            
        </el-col>

        <el-col style="margin-top:20px" :span="16">
            <el-card style="height:287px">
                <div style="height:240px" ref="userEcharts"></div>
            </el-card>
        </el-col>
    </el-row>

</template>

<script>
import { getData } from '../../api/data.js'
import * as echarts from 'echarts'

export default {
    name: "home",
    data() {
        return {
            userImg: require('../../assets/images/user.png'),

        }
    },
    mounted() {
        getData().then(res => {
            const { code, data } = res.data
            if (code === 20000) {
                
                //用户图
                const userOprion = {
                    legend: {
                        // 图例文字颜色
                        textStyle: {
                            color: "#333",
                        },
                    },
                    grid: {
                        left: "20%",
                    },
                    // 提示框
                    tooltip: {
                        trigger: "axis",
                    },
                    xAxis: {
                        type: "category", // 类目轴
                        data: data.userData.map(item => item.date),
                        axisLine: {
                            lineStyle: {
                                color: "#17b3a3",
                            },
                        },
                        axisLabel: {
                            interval: 0,
                            color: "#333",
                        },
                    },
                    yAxis: [
                        {
                            type: "value",
                            axisLine: {
                                lineStyle: {
                                    color: "#17b3a3",
                                },
                            },
                        },
                    ],
                    color: ["#2ec7c9", "#b6a2de"],
                    series: [
                        {
                            name: '新增用户',
                            data: data.userData.map(item => item.new),
                            type: "bar"
                        },
                        {
                            name: '活跃用户',
                            data: data.userData.map(item => item.active),
                            type: 'bar'
                        }
                    ],
                }

                const U = echarts.init(this.$refs.userEcharts)
                U.setOption(userOprion)
            }
            console.log(res)
        })
    }
}
</script>

<style>
</style>