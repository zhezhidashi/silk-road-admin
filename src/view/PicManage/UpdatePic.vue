<template>
	<el-form
		:model="ruleForm"
		:rules="rules"
		ref="ruleForm"
		label-width="100px"
		class="demo-ruleForm"
	>
		<el-form-item label="展览编号" prop="exhibition_id">
			<el-input
				v-model="ruleForm.exhibition_id"
				placeholder="请输入展览编号"
			></el-input>
		</el-form-item>

		<el-form-item label="相册编号" prop="album_id">
			<el-input
				v-model="ruleForm.album_id"
				placeholder="请输入相册编号"
			></el-input>
		</el-form-item>

        <el-form-item label="图片编号" prop="pic_id">
			<el-input
				v-model="ruleForm.pic_id"
				placeholder="请输入图片编号"
			></el-input>
		</el-form-item>

		<el-form-item label="图片名称" prop="title">
			<el-input
				v-model="ruleForm.title"
				placeholder="请输入图片名称"
			></el-input>
		</el-form-item>

		<el-form-item label="图片简介" prop="intro">
			<el-input
				v-model="ruleForm.intro"
				placeholder="请输入图片简介"
			></el-input>
		</el-form-item>

		<el-form-item label="图片地址" prop="pic_url">
			<el-input
				v-model="ruleForm.pic_url"
				placeholder="请输入图片地址"
			></el-input>
		</el-form-item>

		<el-form-item>
			<el-button type="primary" @click="submitForm('ruleForm')"
				>提交</el-button
			>
			<el-button @click="resetForm('ruleForm')">重置</el-button>
		</el-form-item>

        <img :src="ruleForm.pic_url"/>

	</el-form>
</template>

<script>
import { postForm } from "../../api/data";

export default {
	data() {
		return {
			ruleForm: {
				exhibition_id: "",
				album_id: "",
                pic_id: "",
				title: "",
				intro: "",
                pic_url: "",
			},
			rules: {
				exhibition_id: [
					{
						required: true,
						message: "请输入展览编号",
						trigger: "blur",
					},
					{
						min: 1,
						message: "至少 1 个字符",
						trigger: "blur",
					},
				],
				album_id: [
					{
						required: true,
						message: "请输入相册编号",
						trigger: "blur",
					},
					{
						min: 1,
						message: "至少 1 个字符",
						trigger: "blur",
					},
				],
                pic_id: [
					{
						required: true,
						message: "请输入图片编号",
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
						message: "请输入图片名称",
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
						message: "请输入图片简介",
						trigger: "blur",
					},
					{
						min: 1,
						message: "至少 1 个字符",
						trigger: "blur",
					},
				],
                pic_url: [
                    {
						required: true,
						message: "请输入图片地址",
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
					postForm(
						"/exhibition/update-pic",
						this.ruleForm,
						function (res) {
						}
					);
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
