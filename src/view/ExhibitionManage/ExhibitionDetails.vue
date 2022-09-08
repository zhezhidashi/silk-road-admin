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
            :ShowDetails="true"
			@changePage="GetList()"
            @details="SeeDetails"
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
                page_size: 15,
			},
		};
	},
	methods: {
		confirm() {
			let _this = this;
			if (this.operateType === "add") {
				postForm("/exhibition/add-exhibition", this.operateForm, function (res) {
					_this.isShow = false;
					_this.GetList();
				});
			} else {
				postForm("/exhibition/update-exhibition", this.operateForm, function (res) {
					_this.isShow = false;
					_this.GetList();
				});
			}
		},
        SeeDetails(row){
            let item = {
				path: "/AlbumDetails",
				name: "AlnumDetails",
				label: "相册详情",
			};

			this.$router.push({
				path: item.path,
				query: {
					exhibition_id: row.exhibition_id,
				},
			});
			console.log(item);
			this.$store.commit("selectMenu", item);
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
			this.GetList();
		},
		DeleteExhibition(row) {
			let _this = this;
			this.$confirm("此操作将永久删除该组件，是否继续？", "提示", {
				confirmButtonText: "确认",
				cancelButtonText: "取消",
				type: "warning",
			}).then(() => {
				postForm("/exhibition/delete-exhibition", {'exhibition_id': row.exhibition_id}, function (res) {
                    _this.GetList();
				});
			});
		},
		GetList() {
            
			this.tableData = [];
			let _this = this;
            let url = `/exhibition/list?&page_index=${this.config.page}&page_size=${this.config.page_size}`

			getForm(url, function (res) {

				for (let item of res.data.list) {
					let new_map = {
						exhibition_id: item.main_id,
						title: item.title,
						intro: item.intro,
					};
					_this.tableData.push(new_map);
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