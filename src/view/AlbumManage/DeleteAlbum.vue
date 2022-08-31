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

		<el-form-item>
			<el-button type="primary" @click="submitForm('ruleForm')"
				>提交</el-button
			>
			<el-button @click="resetForm('ruleForm')">重置</el-button>
		</el-form-item>

	</el-form>
</template>

<script>
import { postForm } from "../../api/data";

export default {
	data() {
		return {
			ruleForm: {
                exhibition_id: '',
                album_id: '',
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
						"/exhibition/delete-album",
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
