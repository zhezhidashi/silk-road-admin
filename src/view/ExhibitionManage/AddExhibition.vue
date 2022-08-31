<template>
	<el-form
		:model="ruleForm"
		:rules="rules"
		ref="ruleForm"
		label-width="100px"
		class="demo-ruleForm"
	>

		<el-form-item label="展览名称" prop="title">
			<el-input
				v-model="ruleForm.title"
				placeholder="请输入展览名称"
			></el-input>
		</el-form-item>

		<el-form-item label="展览简介" prop="intro">
			<el-input
				v-model="ruleForm.intro"
				placeholder="请输入展览简介"
			></el-input>
		</el-form-item>

		<el-form-item>
			<el-button type="primary" @click="submitForm('ruleForm')"
				>提交</el-button
			>
			<el-button @click="resetForm('ruleForm')">重置</el-button>
		</el-form-item>

        <div>展览编号：{{exhibition_id}}</div>
	</el-form>
</template>

<script>
import { postForm } from "../../api/data";

export default {
	data() {
		return {
            exhibition_id: '',
			ruleForm: {
				title: "",
				intro: "",
			},
			rules: {
				title: [
					{
						required: true,
						message: "请输入展览名称",
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
						message: "请输入展览简介",
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
						"/exhibition/add-exhibition",
						this.ruleForm,
						function (res) {
                            inner_this.exhibition_id = res.data.main_id
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
