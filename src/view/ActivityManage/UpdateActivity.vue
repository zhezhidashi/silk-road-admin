<template>
	<el-form
		:model="ruleForm"
		:rules="rules"
		ref="ruleForm"
		label-width="100px"
		class="demo-ruleForm"
	>
		<el-form-item label="活动编号" prop="activity_id">
			<el-input
				v-model="ruleForm.activity_id"
				placeholder="请输入活动编号"
			></el-input>
		</el-form-item>

		<el-form-item label="活动名称" prop="title">
			<el-input
				v-model="ruleForm.title"
				placeholder="请输入活动名称"
			></el-input>
		</el-form-item>

		<el-form-item label="活动时间" required>
			<el-col :span="11">
				<el-form-item prop="date">
					<el-date-picker
						type="date"
						placeholder="选择日期"
						value-format="yyyy-MM-dd"
						v-model="ruleForm.date"
						style="width: 100%"
					></el-date-picker>
				</el-form-item>
			</el-col>
		</el-form-item>

		<el-form-item label="活动封面" prop="cover_pic">
			<el-input
				v-model="ruleForm.cover_pic"
				placeholder="请输入活动封面的 URL"
			></el-input>
		</el-form-item>

		<el-form-item label="活动简介" prop="intro">
			<el-input
				v-model="ruleForm.intro"
				placeholder="请输入活动简介"
			></el-input>
		</el-form-item>

		<el-form-item>
			<el-button type="primary" @click="submitForm('ruleForm')"
				>提交</el-button
			>
			<el-button @click="resetForm('ruleForm')">重置</el-button>
		</el-form-item>

		<img :src="ruleForm.cover_pic" style="width=30px" />
	</el-form>
</template>

<script>
import { postForm } from "../../api/data";

export default {
	data() {
		return {
			ruleForm: {
				activity_id: "",
				title: "",
				date: "",
				cover_pic: "",
				intro: "",
			},
			rules: {
				activity_id: [
					{
						required: true,
						message: "请输入活动编号",
						trigger: "blur",
					},
					{
						min: 1,
						message: "至少 1 个字符",
						trigger: "blur",
					},
				],
				title: [
					{
						required: true,
						message: "请输入活动名称",
						trigger: "blur",
					},
					{
						min: 1,
						message: "至少 1 个字符",
						trigger: "blur",
					},
				],
				date: [
					{
						required: true,
						message: "请选择日期",
						trigger: "change",
					},
				],
				cover_pic: [
					{
						required: true,
						message: "请输入活动封面的 URL",
						trigger: "blur",
					},
					{
						min: 1,
						message: "至少 1 个字符",
						trigger: "blur",
					},
				],
				intro: [
					{
						required: true,
						message: "请输入活动简介",
						trigger: "blur",
					},
					{
						min: 1,
						message: "至少 1 个字符",
						trigger: "blur",
					},
				],
			},
		};
	},
	methods: {
		submitForm(formName) {
			// console.log("ruleForm", this.ruleForm);

            let inner_this = this;
			this.$refs[formName].validate((valid) => {
				if (valid) {
					postForm("/activity/update", this.ruleForm, function (res) {
					});
				} else {
					alert("error submit!!");
					return false;
				}
			});
		},
		resetForm(formName) {
			this.$refs[formName].resetFields();
		},
	},
};
</script>
