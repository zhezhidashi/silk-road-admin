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

		<el-form-item label="相册名称" prop="title">
			<el-input
				v-model="ruleForm.title"
				placeholder="请输入相册名称"
			></el-input>
		</el-form-item>

		<el-form-item label="相册简介" prop="intro">
			<el-input
				v-model="ruleForm.intro"
				placeholder="请输入相册简介"
			></el-input>
		</el-form-item>

		<el-form-item>
			<el-button type="primary" @click="submitForm('ruleForm')"
				>提交</el-button
			>
			<el-button @click="resetForm('ruleForm')">重置</el-button>
		</el-form-item>

        <div style="line-height: 300%">相册编号：{{album_id}}</div>
	</el-form>
</template>

<script>
import { postForm } from "../../api/data";

export default {
	data() {
		return {
            album_id: '',
			ruleForm: {
                exhibition_id: '',
				title: "",
				intro: "",
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
				title: [
					{
						required: true,
						message: "请输入相册名称",
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
						message: "请输入相册简介",
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
						"/exhibition/add-album",
						this.ruleForm,
						function (res) {
                            inner_this.album_id = res.data.main_id;
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
