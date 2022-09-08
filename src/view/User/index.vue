<template>
	<div>
		<el-dialog
			:title="operateType === 'add' ? '新增用户' : '更新用户'"
			:visible.sync="isShow"
		>
			<common-form
				:formLabel="operateFormLabel"
				:form="operateForm"
				:inline="true"
				ref="form"
			></common-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="isShow = false">取消</el-button>
				<el-button type="primary" @click="confirm">确定</el-button>
			</div>
		</el-dialog>

		<div class="manage-header">
			<el-button type="primary" @click="AddUser">+新增</el-button>
		</div>
		<common-table
			:tableData="tableData"
			:tableLabel="tableLabel"
			:config="config"
			@changePage="GetList()"
			@edit="editUser"
			@del="delUser"
		></common-table>
	</div>
</template>
<script>
import CommonForm from "../../components/CommonForm.vue";
import CommonTable from "../../components/CommonTable.vue";
import { getUser, postUser } from "../../api/data";
export default {
	name: "User",
	components: {
		CommonForm,
		CommonTable,
	},
	data() {
		return {
			operateType: "add",
			isShow: false,
			operateFormLabel: [
				{
					model: "username",
					label: "用户名",
					type: "input",
				},
				{
					model: "password",
					label: "密码",
					type: "input",
				},
				{
					model: "AddPermission",
					label: "新增权限",
					type: "select",
					opts: [
						{ label: "是", value: 1 },
						{ label: "否", value: 0 },
					],
				},
				{
					model: "UpdatePermission",
					label: "修改权限",
					type: "select",
					opts: [
						{ label: "是", value: 1 },
						{ label: "否", value: 0 },
					],
				},
				{
					model: "DeletePermission",
					label: "删除权限",
					type: "select",
					opts: [
						{ label: "是", value: 1 },
						{ label: "否", value: 0 },
					],
				},
			],
			operateForm: {
				username: "",
				password: "",
				AddPermission: "",
				UpdatePermission: "",
				DeletePermission: "",
			},

			tableData: [],
			tableLabel: [
				{
					prop: "username",
					label: "用户名",
					width: 200,
				},
				{
					prop: "password",
					label: "密码",
					width: 200,
				},
				{
					prop: "AddPermissionLabel",
					label: "新增权限",
				},
				{
					prop: "UpdatePermissionLabel",
					label: "修改权限",
				},
				{
					prop: "DeletePermissionLabel",
					label: "删除权限",
				},
			],
			config: {
				page: 1,
				total: 30,
			},
		};
	},
	methods: {
		confirm() {
			if (this.operateType === "edit") {
				postUser("/user/updateUser", this.operateForm).then((res) => {
					console.log(res);
					this.isShow = false;
					this.GetList();
				});
			} else {
				postUser("/user/addUser", this.operateForm).then((res) => {
					console.log(res);
					this.isShow = false;
					this.GetList();
				});
			}
		},
		AddUser() {
			this.isShow = true;
			this.operateType = "add";
			this.operateForm = {
				username: "",
				password: "",
				AddPermission: "",
				UpdatePermission: "",
				DeletePermission: "",
			};
		},
		editUser(row) {
			this.operateType = "edit";
			this.isShow = true;
			this.operateForm = JSON.parse(JSON.stringify(row));
			// this.GetList();
		},
		delUser(row) {
			this.$confirm("此操作将永久删除该组件，是否继续？", "提示", {
				confirmButtonText: "确认",
				cancelButtonText: "取消",
				type: "warning",
			})
				.then(() => {
					const id = row.id;
					postUser("user/delUser", { id }).then(() => {
						this.$message({
							type: "success",
							message: "删除成功",
						});
						this.GetList();
					});
				})
				.catch(() => {
					this.$message({
						type: "info",
						message: "已取消删除",
					});
				});
		},
		GetList(name = "") {
			this.tableData = [];

			let inner_this = this;
			name ? (this.config.page = 1) : "";
			getUser({
				page: this.config.page,
				name,
			}).then(({ data: res }) => {
				// console.log('getUser 信息', res.list)
				for (let item of res.list) {
					inner_this.tableData.push({
						id: item.id,
						username: item.username,
						password: item.password,
						AddPermission: item.AddPermission,
						UpdatePermission: item.UpdatePermission,
						DeletePermission: item.DeletePermission,
						AddPermissionLabel:
							item.AddPermission === 1 ? "是" : "否",
						UpdatePermissionLabel:
							item.UpdatePermission === 1 ? "是" : "否",
						DeletePermissionLabel:
							item.DeletePermission === 1 ? "是" : "否",
					});
				}
				this.config.total = res.count;
			});
		},
	},
	created() {
		this.GetList();
	},
};
</script>
<style lang="less" scoped>
.manage-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
</style>
