<template>
	<div>
		<el-form ref="form" label-width="80px">
			<el-form-item label="展览编号">
				<el-input
					v-model="ExhibitionID"
					placeholder="请输入展览编号"
				></el-input>
			</el-form-item>

			<el-form-item class="manage-header">
				<el-button type="primary" @click="getList()">提交</el-button>
			</el-form-item>
		</el-form>

		<el-dialog
			:title="operateType === 'add' ? '创建相册' : '修改相册'"
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
			<el-button type="primary" @click="AddAlbum">+新增</el-button>
		</div>

		<common-table
			:tableData="tableData"
			:tableLabel="tableLabel"
			:config="config"
			@changePage="getList()"
            @details="SeeDetails"
			@edit="UpdateAlbum"
			@del="DeleteAlbum"
		></common-table>
	</div>
</template>

<script>
import CommonForm from "../../components/CommonForm.vue";
import CommonTable from "../../components/CommonTable.vue";
import { postForm, getForm } from "../../api/data";
export default {
	name: "AlbumDetails",
	components: {
		CommonForm,
		CommonTable,
	},
	data() {
		return {
			operateType: "add",
			isShow: false,
			ExhibitionID: "",
			operateFormLabel: [
				{
					model: "title",
					label: "相册名称",
					type: "input",
				},
				{
					model: "intro",
					label: "相册简介",
					type: "input",
				},
			],
			operateForm: {
				exhibition_id: "",
				album_id: "",
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
					prop: "album_id",
					label: "相册编号",
					width: 200,
				},
				{
					prop: "title",
					label: "相册名称",
					width: 200,
				},
				{
					prop: "intro",
					label: "相册简介",
					width: 300,
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
				postForm(
					"/exhibition/add-album",
					this.operateForm,
					function (res) {
						inner_this.isShow = false;
						inner_this.getList();
					}
				);
			} else {
				postForm(
					"/exhibition/update-album",
					this.operateForm,
					function (res) {
						inner_this.isShow = false;
						inner_this.getList();
					}
				);
			}
		},
        SeeDetails(row){
            let item = {
				path: "/PicDetails",
				name: "PicDetails",
				label: "相册-图片详情",
			};

			this.$router.push({
				path: item.path,
				query: {
					exhibition_id: row.exhibition_id,
                    album_id: row.album_id,
				},
			});
			console.log(item);
			this.$store.commit("selectMenu", item);
        },
		AddAlbum() {
			this.isShow = true;
			this.operateType = "add";
			this.operateForm = {
				album_id: "",
				title: "",
				intro: "",
			};
		},
		UpdateAlbum(row) {
			this.operateType = "edit";
			this.isShow = true;
			console.log("row", row);
			this.operateForm = {
				exhibition_id: row.exhibition_id,
				album_id: row.album_id,
				title: row.title,
				intro: row.intro,
			};

			console.log("UpdateAlbum", this.operateType);
			this.getList();
		},
		DeleteAlbum(row) {
			let inner_this = this;
			this.$confirm("此操作将永久删除该组件，是否继续？", "提示", {
				confirmButtonText: "确认",
				cancelButtonText: "取消",
				type: "warning",
			}).then(() => {
				let params = {
					exhibition_id: row.exhibition_id,
					album_id: row.album_id,
				};
				postForm("/exhibition/delete-album", params, function (res) {
					inner_this.getList();
				});
			});
		},
		getList() {

			this.tableData = [];

			let inner_this = this;
			getForm(
				"/exhibition/all-album?exhibition_id=" + this.ExhibitionID,
				function (res) {
					console.log("res.data", res.data);

					inner_this.config.total = 0;
					for (let item in res.data) {
						console.log("res.data.item", res.data[item]);
						let new_map = {
							exhibition_id: inner_this.ExhibitionID,
							album_id: item,
							title: res.data[item]["title"],
							intro: res.data[item]["intro"],
						};
						console.log("new_map", new_map);
						inner_this.tableData.push(new_map);
						inner_this.config.total++;
					}
				}
			);
		},
	},
    created(){
        this.ExhibitionID = this.$route.query.exhibition_id;
        // 判断是否是从 “展览详情” 页面跳转过来的
        if(this.ExhibitionID != undefined) this.getList();
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