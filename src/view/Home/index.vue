<template>
	<div>
		<router-link
			to="/OperationIntroduction"
			style="
				padding: 10px;
				width: 100px;
				height: 40px;
				background: red;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 17px;
				font-weight: bold;
				color: white;
				border-radius: 7px;
			"
		>
			操作说明
		</router-link>

		<el-row class="home" :gutter="20">
			<el-col :span="8" style="margin-top: 20px">
				<el-card shadow="hover">
					<div class="user">
						<img :src="userImg" />
						<div class="userinfo">
							<p class="name">Admin</p>
							<p class="access">超级管理员</p>
						</div>
					</div>
					<!-- <div class="login-info">
						<p>上次登录的时间：<span>2022-7-19</span></p>
						<p>上次登录的地点：<span>北京</span></p>
					</div> -->
				</el-card>
			</el-col>

			<el-col style="margin-top: 20px" :span="16">
				<el-card style="height: 287px">
					<div style="height: 240px" ref="RequestEcharts"></div>
				</el-card>
			</el-col>
		</el-row>
	</div>
</template>

<script>
import { getForm } from "../../api/data.js";
import * as echarts from "echarts";

export default {
	name: "home",
	data() {
		return {
			userImg: require("../../assets/images/user.png"),
			TargetUrl: [
				"/activity/list",
				"/activity/detail",
				"/archive/list",
				"/archive/detail",
				"/exhibition/list",
				"/exhibition/detail",
			],
			CountUrl: {
				"/activity/list": 0,
				"/activity/detail": 0,
				"/archive/list": 0,
				"/archive/detail": 0,
				"/exhibition/list": 0,
				"/exhibition/detail": 0,
			},
		};
	},
	methods: {
		// 获取表单数据
		GetData() {
			let _this = this;
			for (let target_url of this.TargetUrl) {
				let url = `/visit/count?&target_url=${target_url}`;
				console.log("请求的url", url);
				getForm(url, (res) => {
					if (res.code === 0) {
						_this.$message({
							message: "提交成功",
							type: "success",
						});
					} else {
						_this.$message({
							message: `${res.msg}`,
							type: "error",
						});
                        return;
					}

					_this.CountUrl[target_url] = res.data[target_url];
				});
			}
		},
	},
	mounted() {
		this.GetData();
	},
	watch: {
		CountUrl: {
			immediate: true,
			deep: true,
			handler() {
				this.$nextTick(() => {
					const CountUrl = {
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
							data: [
								"活动列表",
								"活动详情",
								"档案列表",
								"档案详情",
								"展览列表",
								"展览详情",
							],
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
								name: "访问量",
								data: [
									this.CountUrl["/activity/list"],
									this.CountUrl["/activity/detail"],
									this.CountUrl["/archive/list"],
									this.CountUrl["/archive/detail"],
									this.CountUrl["/exhibition/list"],
									this.CountUrl["/exhibition/detail"],
								],
								type: "bar",
							},
						],
					};

					const U = echarts.init(this.$refs.RequestEcharts);
					U.setOption(CountUrl);
				});
			},
		},
	},
};
</script>

<style>
</style>