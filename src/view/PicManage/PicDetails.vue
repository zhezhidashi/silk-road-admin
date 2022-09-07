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
				<el-button type="primary" @click="GetList()">提交</el-button>
			</el-form-item>
		</el-form>

		<div class="manage-header">
			<el-button type="primary" @click="AddPic">+新增</el-button>
		</div>
		<common-table
			:tableData="TableData"
			:tableLabel="TableLabel"
			:config="config"
			:ShowDetails="false"
			@changePage="GetList()"
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
			ExhibitionID: "",
			AlbumID: "",

			TableData: [],
			TableLabel: [
				{
					prop: "exhibition_id",
					label: "展览编号",
					width: 100,
				},
				{
					prop: "album_id",
					label: "相册编号",
					width: 150,
				},
				{
					prop: "pic_id",
					label: "图片编号",
					width: 150,
				},
				{
					prop: "title_zh",
					label: "图片中文名称",
					width: 200,
				},
				{
					prop: "title_en",
					label: "图片外文名称",
					width: 200,
				},
				{
					prop: "intro_zh",
					label: "图片中文简介",
					width: 200,
				},
				{
					prop: "intro_en",
					label: "图片外文简介",
					width: 200,
				},
			],
			config: {
				page: 1,
				total: 30,
			},
		};
	},
	methods: {
		AddPic() {
            let item = {
				path: "/AddPic",
				name: "AddPic",
				label: "添加相册-图片",
			};

			this.$router.push({
				path: item.path,
				query: {
					exhibition_id: this.ExhibitionID,
                    album_id: this.AlbumID
				},
			});
			console.log(item);
			this.$store.commit("selectMenu", item);
        },
		UpdatePic(row) {
            let item = {
				path: "/UpdatePic",
				name: "UpdatePic",
				label: "更新相册-图片",
			};

			this.$router.push({
				path: item.path,
				query: {
					exhibition_id: this.ExhibitionID,
                    album_id: this.AlbumID,
                    pic_id: row.pic_id,
				},
			});
			console.log(item);
			this.$store.commit("selectMenu", item);
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
					inner_this.GetList();
				});
			});
		},
		GetList() {
			this.TableData = [];

			let inner_this = this;
			let url =
				"exhibition/album-detail?exhibition_id=" +
				this.ExhibitionID +
				"&album_id=" +
				this.AlbumID;

            console.log(url);

			getForm(url, function (res) {
				inner_this.config.total = 0;

				for (let item in res.data.picture_dict) {
					let new_map = {
						exhibition_id: inner_this.ExhibitionID,
						album_id: inner_this.AlbumID,
						pic_id: item,
						title_zh: "N/A",
						title_en: "N/A",
						intro_zh: "N/A",
						intro_en: "N/A",
					};
					for (let title_item in res.data.picture_dict[item].title) {
						if (title_item === "ZH") {
							new_map.title_zh =
								res.data.picture_dict[item].title[title_item];
						} else {
							new_map.title_en =
								res.data.picture_dict[item].title[title_item];
						}
					}
					for (let intro_item in res.data.picture_dict[item].intro) {
						if (intro_item === "ZH") {
							new_map.intro_zh =
								res.data.picture_dict[item].intro[intro_item];
						} else {
							new_map.intro_en =
								res.data.picture_dict[item].intro[intro_item];
						}
					}
					inner_this.TableData.push(new_map);
					inner_this.config.total++;
				}
			});
		},
	},
	created() {
		this.ExhibitionID = this.$route.query.exhibition_id;
		this.AlbumID = this.$route.query.album_id;
		// 判断是否是从 “相册详情” 页面跳转过来的
		if (this.ExhibitionID != undefined) this.GetList();
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