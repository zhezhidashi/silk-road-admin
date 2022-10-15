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
				<el-button type="primary" @click="GetList()">提交</el-button>
			</el-form-item>
		</el-form>

		<div>
			<el-button type="primary" @click="AddPic">+新增</el-button>
			<el-button type="primary" @click="SortPic">图片排序</el-button>
		</div>
		<br />
		<common-table
			:tableData="TableData"
			:tableLabel="TableLabel"
			:config="config"
			:ShowDetails="true"
			:ShowEdit="true"
			:ShowDelete="true"
			:ShowUp="false"
			:ShowDown="false"
			:HandleWidth="'210'"
			@changePage="GetList"
			@details="SeeDetails"
			@edit="UpdatePic"
			@del="DeletePic"
		></common-table>
	</div>
</template>

<script>
import CommonForm from "../../components/CommonForm.vue";
import CommonTable from "../../components/CommonTable.vue";
import { postForm, getForm, TableDataMap, Swap } from "../../api/data";
export default {
	name: "PicDetails",
	components: {
		CommonForm,
		CommonTable,
	},
	data() {
		return {
			ExhibitionID: "",

			TableData: [],
			TableLabel: [
				{
					prop: "title_zh",
					label: "图片名称（中文）",
					width: 200,
				},
				{
					prop: "title_en",
					label: "图片名称（英文）",
					width: 200,
				},
				{
					prop: "title_other",
					label: "图片名称（小语种）",
					width: 200,
				},
				{
					prop: "intro_zh",
					label: "图片简介（中文）",
					width: 200,
				},
				{
					prop: "intro_en",
					label: "图片简介（外文）",
					width: 200,
				},
				{
					prop: "intro_other",
					label: "图片简介（小语种）",
					width: 200,
				},
			],
			config: {
				page: 1,
				total: 30,
				page_size: 200,
			},
		};
	},
	methods: {
		GetList() {
			this.TableData = [];

			let _this = this;
			let url = `/exhibition/detail?exhibition_id=${this.ExhibitionID}`;
			console.log("请求的url", url);

			getForm(url, function (res) {
				_this.config.total = 0;

				for (let item of res.data.pic_list) {
					let new_map = {
						pic_id: item.pic_id,
						title_zh: "N/A",
						title_en: "N/A",
						title_other: "N/A",
						intro_zh: "N/A",
						intro_en: "N/A",
						intro_other: "N/A",
						index: _this.config.total,
					};
					for (let title_item in item.title) {
						if (title_item === "ZH") {
							new_map.title_zh = item.title[title_item];
						} else if (title_item === "EN") {
							new_map.title_en = item.title[title_item];
						} else {
							new_map.title_other = item.title[title_item];
						}
					}
					for (let intro_item in item.intro) {
						if (intro_item === "ZH") {
							new_map.intro_zh = item.intro[intro_item];
						} else if (intro_item === "EN") {
							new_map.intro_en = item.intro[intro_item];
						} else {
							new_map.intro_other = item.intro[intro_item];
						}
					}
					_this.TableData.push(new_map);
					_this.config.total++;
				}
			});
		},

		AddPic() {
			let item = {
				path: "/AddPic",
				name: "AddPic",
				label: "添加展览-图片",
			};

			this.$router.push({
				path: item.path,
				query: {
					ExhibitionID: this.ExhibitionID,
				},
			});
			this.$store.commit("selectMenu", item);
		},

		UpdatePic(row) {
			let item = {
				path: "/UpdatePic",
				name: "UpdatePic",
				label: "更新展览-图片",
			};

			this.$router.push({
				path: item.path,
				query: {
					ExhibitionID: this.ExhibitionID,
					PicID: row.pic_id,
				},
			});
			this.$store.commit("selectMenu", item);
		},

		DeletePic(row) {
			let item = {
				path: "/DeletePic",
				name: "DeletePic",
				label: "删除展览-图片",
			};

			this.$router.push({
				path: item.path,
				query: {
					ExhibitionID: this.ExhibitionID,
					PicID: row.pic_id,
				},
			});
			this.$store.commit("selectMenu", item);
		},

		SeeDetails(row) {
			// 这里为了方便客户端的图片切换效果，因此 PictureID 用的是 index 而不是 pic_id
			let url = `https://dev.pacificsilkroad.cn/Pictures?ExhibitionID=${this.ExhibitionID}&PictureID=${row.index}`;
			window.open(url, "_blank");
		},

		SortPic() {
			let item = {
				path: "/SortPic",
				name: "SortPic",
				label: "排序展览-图片",
			};

			this.$router.push({
				path: item.path,
				query: {
					ExhibitionID: this.ExhibitionID,
				},
			});
			this.$store.commit("selectMenu", item);
		},
	},
	created() {
		this.ExhibitionID = this.$route.query.ExhibitionID;
		// 判断是否是从 “展览列表” 页面跳转过来的
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