<template>
	<div>
		<el-form ref="form" label-width="80px">
			<el-form-item label="展览编号">
				<el-input
					v-model="ExhibitionID"
					placeholder="请输入展览编号"
				></el-input>
			</el-form-item>
			<el-form-item label="相册编号">
				<el-input
					v-model="AlbumID"
					placeholder="请输入展览编号"
				></el-input>
			</el-form-item>

			<el-form-item class="manage-header">
				<el-button type="primary" @click="getList()">提交</el-button>
			</el-form-item>
		</el-form>

		<el-dialog
			:title="operateType === 'add' ? '创建' : '修改'"
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
			<el-button type="primary" @click="AddPic">+新增</el-button>
		</div>
		<common-table
			:tableData="tableData"
			:tableLabel="tableLabel"
			:config="config"
			@changePage="getList()"
			@edit="UpdatePic"
			@del="DeletePic"
		></common-table>
	</div>
</template>

<script>
import CommonForm from "../../components/CommonForm.vue";
import CommonTable from "../../components/CommonTable.vue";
import { postForm, getForm } from "../../api/data";
export default {
	name: "PicDetails",
	components: {
		CommonForm,
		CommonTable,
	},
	data() {
		return {
			operateType: "add",
			isShow: false,
			ExhibitionID: "",
			AlbumID: "",
			operateFormLabel: [
				{
					model: "title",
					label: "图片名称",
					type: "input",
				},
				{
					model: "intro",
					label: "图片简介",
					type: "input",
				},
				{
					model: "pic_url",
					label: "图片地址",
					type: "input",
				},
			],
			operateForm: {
				exhibition_id: "",
				album_id: "",
				pic_id: "",
				title: "",
				intro: "",
				picture_url: "",
			},
			tableData: [],
			tableLabel: [
				{
					prop: "exhibition_id",
					label: "展览编号",
					width: 100,
				},
				{
					prop: "album_id",
					label: "相册编号",
					width: 200,
				},
				{
					prop: "pic_id",
					label: "图片编号",
					width: 200,
				},
				{
					prop: "title",
					label: "图片名称",
					width: 200,
				},
				{
					prop: "intro",
					label: "图片简介",
					width: 300,
				},
				{
					prop: "pic_url",
					label: "图片地址",
					width: 320,
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
				this.operateForm["exhibition_id"] = this.ExhibitionID;
				this.operateForm["album_id"] = this.AlbumID;
				postForm(
					"/exhibition/add-pic-to-album",
					this.operateForm,
					function (res) {
                        console.log('添加图片的response', res)
						inner_this.isShow = false;
						inner_this.getList();
					}
				);
			} else {
				postForm(
					"/exhibition/update-pic",
					this.operateForm,
					function (res) {
						inner_this.isShow = false;
						inner_this.getList();
					}
				);
			}
		},
		AddPic() {
			this.isShow = true;
			this.operateType = "add";
			this.operateForm = {
				title: "",
				intro: "",
				pic_url: "",
			};
		},
		UpdatePic(row) {
			this.operateType = "edit";
			this.isShow = true;
			console.log("row", row);
			this.operateForm = row;
			// console.log('row', row);
			// this.operateForm = JSON.parse(JSON.stringify(row));
			console.log("UpdatePic", this.operateType);
			this.getList();
		},
		DeletePic(row) {
			let inner_this = this;
			this.$confirm("此操作将永久删除该组件，是否继续？", "提示", {
				confirmButtonText: "确认",
				cancelButtonText: "取消",
				type: "warning",
			}).then(() => {
				let params = {
					exhibition_id: inner_this.ExhibitionID,
					album_id: inner_this.AlbumID,
					pic_id: row.pic_id,
				};
				postForm("/exhibition/delete-pic", params, function (res) {
					inner_this.getList();
				});
			});
		},
		getList() {
			this.config.loading = true;

			this.tableData = [];

			let inner_this = this;
			getForm(
				"exhibition/album-detail?exhibition_id=" +
					this.ExhibitionID +
					"&album_id=" +
					this.AlbumID,
				function (res) {

					inner_this.config.total = 0;
					for (let item in res.data.picture_dict) {
						let new_map = {
							exhibition_id: inner_this.ExhibitionID,
							album_id: inner_this.AlbumID,
							pic_id: item,
							title: res.data["picture_dict"][item]["title"],
							intro: res.data["picture_dict"][item]["intro"],
							pic_url: res.data["picture_dict"][item]["pic_url"],
						};
						inner_this.tableData.push(new_map);
						inner_this.config.total++;
					}
					inner_this.config.loading = false;
				}
			);
		},
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