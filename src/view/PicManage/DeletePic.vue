<template>
	<div>
		<el-form ref="form" label-width="80px">
			<el-form-item label="展览编号">
				<el-input
					v-model="ExhibitionID"
					placeholder="请输入展览编号"
				></el-input>
				<el-input
					v-model="PicID"
					placeholder="请输入图片编号"
				></el-input>
			</el-form-item>

			<el-form-item class="manage-header">
				<el-button type="primary" @click="GetList()">查询</el-button>
				<el-button type="primary" @click="DeleteList()">删除</el-button>
			</el-form-item>
		</el-form>

		<hr />
		<!-- 一层字典相关数据 -->
		<el-table :data="TableData1" style="width: 100%">
			<el-table-column prop="TypeName" label="数据类型">
			</el-table-column>
			<el-table-column prop="TypeData" label="数据值"> </el-table-column>
		</el-table>

		<hr />

		<!-- 二层字典相关数据 -->
		<el-table :data="TableData2" style="width: 100%">
			<el-table-column prop="TypeName" label="类型"> </el-table-column>
			<el-table-column prop="OptionName" label="语言"> </el-table-column>
			<el-table-column prop="Content" label="内容"> </el-table-column>
		</el-table>
	</div>
</template>

<script>
import CommonForm from "../../components/CommonForm.vue";
import { postForm, getForm, TableDataMap } from "../../api/data";
export default {
	name: "DeletePic",
	components: {
		CommonForm,
	},
	data() {
		return {
			// 展览主键
			ExhibitionID: "",
			PicID: "",

			// 展示数据相关 一层字典、二层字典
			TableData1: [],
			TableData2: [],
		};
	},
	created() {
		this.ExhibitionID = this.$route.query.ExhibitionID;
		this.PicID = this.$route.query.PicID;
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
                let data = res.data
				_this.TableData1 = [];
				_this.TableData2 = [];
				if (res.code === 400) {
					_this.$message({
						message: "展览不存在",
						type: "error",
					});
					return;
				}
				let FindPic = false;
				for (let item of data.pic_list) {
					if (item.pic_id !== _this.PicID) continue;
					FindPic = true;

					// 只有一层字典的有5个数据
					let Temp = ["pic_url"];
					for (let Type of Temp) {
						_this.TableData1.push({
							Type,
							TypeName: TableDataMap[Type],
							TypeData: item[Type],
						});
					}

					// 具有两层字典的有两个数据
					Temp = ["title", "intro"];
					for (let Type of Temp) {
						for (let map_item in item[Type]) {
							_this.TableData2.push({
								// 种类，语言，简介
								type: Type,
								option: map_item,
								Content: item[Type][map_item],
								TypeName: TableDataMap[Type],
								OptionName: TableDataMap[map_item],
							});
						}
					}
					break;
				}

				if (!FindPic) {
					_this.$message({
						message: "图片不存在",
						type: "error",
					});
					return;
				}
			});
		},
		// 删除档案
		DeleteList() {
			let DataForm = {
				exhibition_id: parseInt(this.ExhibitionID),
				pic_id: this.PicID,
			};
			let _this = this;
			postForm("/exhibition/delete-pic", DataForm, function (res) {
				if (res.code === 0) {
					_this.$message({
						message: "提交成功",
						type: "success",
					});

					// 提交成功后退回列表界面
					let item = {
						path: "/PicDetails",
						name: "PicDetails",
						label: "展览-图片列表",
					};

					_this.$router.push({
						path: item.path,
						query: {
							ExhibitionID: _this.ExhibitionID,
						},
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