<template>
	<div>
		<el-dialog
			:title="operateType === 'add' ? '创建展览' : '修改展览'"
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
			<el-button type="primary" @click="AddExhibition">+新增</el-button>
		</div>
		<common-table
			:tableData="tableData"
			:tableLabel="tableLabel"
			:config="config"
			@changePage="getList()"
			@edit="UpdateExhibition"
			@del="DeleteExhibition"
		></common-table>
	</div>
</template>

<script>
import CommonForm from "../../components/CommonForm.vue";
import CommonTable from "../../components/CommonTable.vue";
import { postForm, getForm } from "../../api/data";
export default {
	name: "ExhibitionDetails",
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
					model: "title",
					label: "展览名称",
					type: "input",
				},
				{
					model: "intro",
					label: "展览简介",
					type: "input",
				},
			],
			operateForm: {
				exhibition_id: "",
				title: "",
				intro: "",
			},
			tableData: [],
			tableLabel: [
				{
					prop: "exhibition_id",
					label: "展览编号",
					width: 100,
				},
				{
					prop: "title",
					label: "展览名称",
					width: 250,
				},
				{
					prop: "intro",
					label: "展览简介",
					width: 350,
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
			let inner_this = this;
			if (this.operateType === "add") {
				postForm("/exhibition/add-exhibition", this.operateForm, function (res) {
					inner_this.isShow = false;
					inner_this.getList();
				});
			} else {
				postForm("/exhibition/update-exhibition", this.operateForm, function (res) {
					inner_this.isShow = false;
					inner_this.getList();
				});
			}
		},
		AddExhibition() {
			this.isShow = true;
			this.operateType = "add";
			this.operateForm = {
				title: "",
				intro: "",
			};
		},
		UpdateExhibition(row) {
			this.operateType = "edit";
			this.isShow = true;
			console.log("row", row);
			this.operateForm = {
				exhibition_id: row.exhibition_id,
				title: row.title,
				intro: row.intro,
			};
			// console.log('row', row);
			// this.operateForm = JSON.parse(JSON.stringify(row));
			// console.log("UpdateExhibition", this.operateType);
			this.getList();
		},
		DeleteExhibition(row) {
			let inner_this = this;
			this.$confirm("此操作将永久删除该组件，是否继续？", "提示", {
				confirmButtonText: "确认",
				cancelButtonText: "取消",
				type: "warning",
			}).then(() => {
				postForm("/exhibition/delete-exhibition", {'exhibition_id': row.exhibition_id}, function (res) {
                    inner_this.getList();
				});
			});
		},
		getList() {
			this.config.loading = true;

			this.tableData = [];

			let inner_this = this;
			getForm("/exhibition/list?page_size=99999999", function (res) {
				// console.log(res, "res");

				for (let item of res.data.list) {
					let new_map = {
						exhibition_id: item.main_id,
						title: item.title,
						intro: item.intro,
					};
					inner_this.tableData.push(new_map);
				}
				inner_this.config.total = res.data.total_items;
				inner_this.config.loading = false;
			});
		},
	},
	created() {
		this.getList();
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