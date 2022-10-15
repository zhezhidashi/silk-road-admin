<template>
	<div>
		<el-form ref="form" label-width="80px">
			<el-form-item label="展览编号">
				<el-input
					v-model="ExhibitionID"
					placeholder="请输入展览编号"
				></el-input>
			</el-form-item>

			<el-form-item class="manage-header">
				<el-button type="primary" @click="GetList()">查询</el-button>
				<el-button type="primary" @click="DeleteList()">删除</el-button>
			</el-form-item>
		</el-form>

		<hr />
		<!-- 一级数据 -->
		<el-table :data="TableData1" style="width: 100%">
			<el-table-column prop="TypeName" label="数据类型">
			</el-table-column>
			<el-table-column prop="TypeData" label="数据值"> </el-table-column>
		</el-table>
	</div>
</template>

<script>
import CommonForm from "../../components/CommonForm.vue";
import { postForm, getForm, TableDataMap } from "../../api/data";
export default {
	name: "DeleteExhibition",
	components: {
		CommonForm,
	},
	data() {
		return {
			// 档案主键
			ExhibitionID: "",

			// 一级数据
			TableData1: [],
		};
	},
	created() {
		this.ExhibitionID = this.$route.query.ExhibitionID;
		// 判断是否是从 “档案列表” 页面跳转过来的
		if (this.ExhibitionID != undefined) this.GetList();
	},
	methods: {
		//查询档案
		GetList() {
			let _this = this;
			let url = "/exhibition/detail?exhibition_id=" + this.ExhibitionID;
			console.log("请求的url", url);
			getForm(url, function (res) {
				_this.TableData1 = [];
				if (res.code === 400) {
					_this.$message({
						message: "数据不存在",
						type: "error",
					});
					return;
				}

				// 一级数据
				let Temp1 = ["title", "show_time"];

				for (let Type of Temp1) {
					_this.TableData1.push({
						Type,
						TypeName: TableDataMap[Type],
						TypeData: res.data[Type],
					});
				}

				// 二级数据
				let Temp2 = ["Introduction"];

				for (let Type of Temp2) {
					_this.TableData1.push({
						Type,
						TypeName: TableDataMap[Type],
						TypeData: res.data.intro[Type],
					});
				}
			});
		},
		// 删除档案
		DeleteList() {
			let DataForm = { exhibition_id: parseInt(this.ExhibitionID) };
			let _this = this;
			postForm("/exhibition/delete-exhibition", DataForm, function (res) {
				if (res.code === 0) {
					_this.$message({
						message: "提交成功",
						type: "success",
					});

					// 提交成功后退回列表界面
					let item = {
						path: "/ExhibitionDetails",
						name: "ExhibitionDetails",
						label: "展览列表",
					};
					_this.$router.push({
						path: item.path,
					});
					_this.$store.commit("selectMenu", item);
				} else if (res.code === 400) {
					_this.$message({
						message: "请求对象不存在",
						type: "error",
					});
				} else {
					_this.$message({
						message: "网络错误",
						type: "error",
					});
				}
			});
		},
	},
};
</script>

<style>
</style>