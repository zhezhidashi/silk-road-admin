<template>
	<div class="AddArchive">
		<!-- 填写档案的其他信息 -->
		<common-form
			:formLabel="OtherInfoLabel"
			:form="OtherInfo"
			:inline="true"
			ref="form"
		></common-form>

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
import { postForm, TableDataMap } from "../../api/data";

export default {
	name: "AddExhibition",
	components: {
		CommonForm,
	},
	data() {
		return {
			// 新增的档案的主键
			ExhibitionID: "",

			// 展示 Table 相关
			tableData: [],

			// 档案其他相关信息
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
			],
			OtherInfo: {
				title: "",
				Introduction: "",
				PictureUrl: "",
			},
		};
	},
	methods: {
		// 提交档案
		submitForm() {
			// 需要提交的数据表单
			let DataForm = {};

			// 一级数据
			let Temp1 = ["title"];
			for (let item of Temp1) {
				DataForm[item] = this.OtherInfo[item];
			}
			// 二级数据
			let Temp2 = ["Introduction", "PictureUrl"];
			DataForm["intro"] = {};
			for (let item of Temp2) {
				DataForm["intro"][item] = this.OtherInfo[item];
			}

			let _this = this;
			// console.log("DataForm", DataForm);
			postForm("/exhibition/add-exhibition", DataForm, function (res) {
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
				_this.ExhibitionID = res.data.main_id;
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