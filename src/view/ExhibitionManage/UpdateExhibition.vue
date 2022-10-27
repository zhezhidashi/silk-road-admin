<template>
	<div>
		<el-form ref="form" label-width="80px">
			<el-form-item label="展览编号">
				<el-input
					v-model="ExhibitionID"
					placeholder="请输入展览编号"
				></el-input>
			</el-form-item>

			<!-- 查询展览 -->
			<el-form-item class="manage-header">
				<el-button type="primary" @click="GetList()">查询</el-button>
			</el-form-item>
		</el-form>
		<hr />

		<!-- 更新展览的一级数据 -->
		<el-dialog :title="'更新数据'" :visible.sync="isShow">
			<common-form
				:formLabel="OtherInfoLabel"
				:form="OtherInfo"
				:inline="true"
				ref="form"
			></common-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="isShow = false">取消</el-button>
				<el-button type="primary" @click="confirm">确定</el-button>
			</div>
		</el-dialog>
		<div class="manage-header">
			<el-button type="primary" @click="UpdateExhibition"
				>更新数据</el-button
			>
		</div>

		<!-- 一级数据 -->
		<el-table :data="TableData1" style="width: 100%">
			<el-table-column prop="TypeName" label="数据类型">
			</el-table-column>
			<el-table-column prop="TypeData" label="数据值"> </el-table-column>
		</el-table>

		<hr />

		<!-- 提交按钮 -->
		<el-button
			type="primary"
			style="margin: 20px"
			@click="submitForm('ruleForm')"
			>提交展览</el-button
		>
	</div>
</template>

<script>
import CommonForm from "../../components/CommonForm.vue";
import CommonTable from "../../components/CommonTable.vue";
import { postForm, getForm, TableDataMap, ListContain } from "../../api/data";
export default {
	name: "UpdateExhibition",
	components: {
		CommonForm,
		CommonTable,
	},
	data() {
		return {
			isShow: false,
			// 展览主键
			ExhibitionID: "",

			// 展示数据相关 一级数据
			TableData1: [],

			// 更新档案一级数据
			OtherInfoLabel: [
				{
					model: "title",
					label: "展览标题",
					type: "input",
				},
				{
					model: "Introduction",
					label: "展览简介",
					type: "input",
				},
				{
					model: "PictureUrl",
					label: "封面图片",
					type: "input",
				},
				{
					model: "show_time",
					label: "排序时间",
					type: "input",
				},
			],
			OtherInfo: {
				title: "",
				Introduction: "",
				PictureUrl: "",
				show_time: "",
			},
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
				if (res.code === 0) {
					// _this.$message({
					// 	message: "提交成功",
					// 	type: "success",
					// });
				} else {
					_this.$message({
						message: `${res.msg}`,
						type: "error",
					});
                    return;
				}

				_this.TableData1 = [];

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
				let Temp2 = ["Introduction", "PictureUrl"];

				for (let Type of Temp2) {
					_this.TableData1.push({
						Type,
						TypeName: TableDataMap[Type],
						TypeData: res.data.intro[Type],
					});
				}
			});
		},
		// 更新一级数据
		confirm() {
			this.isShow = false;
			this.TableData1 = [];
			let Temp = ["title", "show_time", "Introduction", "PictureUrl"];
			console.log("更新的数据", this.OtherInfo);
			for (let Type of Temp) {
				this.TableData1.push({
					Type,
					TypeName: TableDataMap[Type],
					TypeData: this.OtherInfo[Type],
				});
			}
		},
		UpdateExhibition() {
			this.isShow = true;

			// Other 有一个作用是填写弹窗中的数据，弹窗数据修改都是作用到了 OtherInfo 上面
			this.OtherInfo = {
				title: this.TableData1[0].TypeData,
				show_time: this.TableData1[1].TypeData,
				Introduction: this.TableData1[2].TypeData,
				PictureUrl: this.TableData1[3].TypeData,
			};
		},

		// 提交档案
		submitForm() {
			// 需要提交的数据表单
			let DataForm = {
				exhibition_id: this.ExhibitionID,
				intro: {},
			};

			// 一级数据
			let Temp1 = ["title", "show_time"];

			// 二级数据
			let Temp2 = ["Introduction", "PictureUrl"];

			for (let item of this.TableData1) {
				if (ListContain(Temp1, item.Type))
					DataForm[item.Type] = item.TypeData;
				else if (ListContain(Temp2, item.Type))
					DataForm.intro[item.Type] = item.TypeData;
			}

			let _this = this;
			postForm("/exhibition/update-exhibition", DataForm, function (res) {
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
				} else {
					_this.$message({
						message: `${res.msg}`,
						type: "error",
					});
				}
			});
		},
	},
};
</script>

<style scoped>
.ButtonContainer {
	display: flex;
}
.AddButton {
	margin: 20px;
}
</style>