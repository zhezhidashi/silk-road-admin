<template>
	<div>
		<el-dialog
			:title="operateType === 'add' ? '创建活动' : '修改活动'"
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
			<el-button type="primary" @click="AddActivity">+新增</el-button>
		</div>
		<common-table
			:tableData="tableData"
			:tableLabel="tableLabel"
			:config="config"
			:ShowDetails="true"
			:ShowEdit="true"
			:ShowDelete="true"
			:ShowUp="true"
            :ShowDown="false"
			:HandleWidth="'300'"
			@changePage="GetList()"
			@details="SeeDetails"
			@edit="UpdateActivity"
			@del="DeleteActivity"
			@up="UpActivity"
		></common-table>
	</div>
</template>

<script>
import CommonForm from "../../components/CommonForm.vue";
import CommonTable from "../../components/CommonTable.vue";
import { postForm, getForm, Swap } from "../../api/data";
export default {
	name: "ActivityDetails",
	components: {
		CommonForm,
		CommonTable,
	},
	data() {
		return {
			operateType: "add",
			isShow: false,
			totalItem: 0,
			operateFormLabel: [
				{
					model: "title",
					label: "活动名称",
					type: "input",
				},
				{
					model: "intro",
					label: "活动简介",
					type: "input",
				},
				{
					model: "cover_pic",
					label: "活动封面",
					type: "input",
				},
				{
					model: "date",
					label: "活动日期",
					type: "date",
				},
				{
					model: "show_time",
					label: "展示时间",
					type: "input",
				},
			],
			operateForm: {
				activity_id: "",
				title: "",
				intro: "",
				cover_pic: "",
				date: "",
			},
			tableData: [],
			tableLabel: [
				{
					prop: "title",
					label: "活动名称",
					width: 300,
				},
				{
					prop: "intro",
					label: "活动简介",
					width: 400,
				},

				{
					prop: "date",
					label: "活动日期",
					width: 120,
				},
				{
					prop: "show_time",
					label: "展示时间",
					width: 100,
				},
			],
			config: {
				page: 1,
				total: 30,
				page_size: 15,
			},
		};
	},
	methods: {
		confirm() {
			let _this = this;
			if (this.operateType === "add") {
				postForm("/activity/add", this.operateForm, function (res) {
					_this.isShow = false;
					if (res.code === 0) {
						_this.$message({
							message: "提交成功",
							type: "success",
						});
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
					_this.GetList();
				});
			} else {
				postForm("/activity/update", this.operateForm, function (res) {
					_this.isShow = false;
					if (res.code === 0) {
						_this.$message({
							message: "提交成功",
							type: "success",
						});
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
					_this.GetList();
				});
			}
		},
		SeeDetails(row) {
			let url =
				"https://dev.pacificsilkroad.cn/AcademicActivityDetails?academic_activity_id=" +
				row.activity_id;
			window.open(url, "_blank");
		},
		AddActivity() {
			this.isShow = true;
			this.operateType = "add";
			this.operateForm = {
				activity_id: "",
				title: "",
				intro: "",
				cover_pic: "",
				date: "",
				show_time: "",
			};
		},
		UpdateActivity(row) {
			this.operateType = "edit";
			this.isShow = true;
			console.log("row", row);
			this.operateForm = {
				activity_id: row.activity_id,
				title: row.title,
				intro: row.intro,
				cover_pic: row.cover_pic,
				date: row.date,
				show_time: row.show_time,
			};
			// console.log('row', row);
			// this.operateForm = JSON.parse(JSON.stringify(row));
			console.log("UpdateActivity", this.operateType);
			this.GetList();
		},
		DeleteActivity(row) {
			let _this = this;
			this.$confirm("此操作将永久删除该组件，是否继续？", "提示", {
				confirmButtonText: "确认",
				cancelButtonText: "取消",
				type: "warning",
			}).then(() => {
				postForm(
					"/activity/delete",
					{ activity_id: row.activity_id },
					function (res) {
						if (res.code === 0) {
							_this.$message({
								message: "提交成功",
								type: "success",
							});
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
						_this.GetList();
					}
				);
			});
		},
		UpActivity(row) {
			if (row.index === 0) {
				this.$message({
					message: "已经是第一个了",
					type: "error",
				});
				return;
			}
			const res = Swap(
				this.tableData[row.index].show_time,
				this.tableData[row.index - 1].show_time
			);
			this.tableData[row.index].show_time = res[0];
			this.tableData[row.index - 1].show_time = res[1];
			console.log(
				this.tableData[row.index].show_time,
				this.tableData[row.index - 1].show_time
			);
			let _this = this;
			postForm("/activity/update", _this.tableData[row.index], (res) => {
				postForm(
					"/activity/update",
					_this.tableData[row.index - 1],
					(res) => {
						if (res.code === 0) {
							_this.$message({
								message: "提交成功",
								type: "success",
							});
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
						_this.GetList();
					}
				);
			});
		},
		GetList() {
			this.tableData = [];
			this.totalItem = 0;
			let _this = this;
			let url = `/activity/list?&page_index=${this.config.page}&page_size=${this.config.page_size}`;
			console.log("发出请求", url);
			getForm(url, function (res) {
				for (let item of res.data.list) {
					let new_map = {
						activity_id: item.main_id,
						title: item.title,
						intro: item.intro,
						cover_pic: item.cover_pic,
						date: item.date,
						show_time: item.show_time,
						index: _this.totalItem,
					};
					_this.tableData.push(new_map);
					_this.totalItem++;
				}
				_this.config.total = res.data.total_items;
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