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

		<div class="manage-header">
			<el-button type="primary" @click="SubmitSort"
				>提交排序结果</el-button
			>
		</div>
		<common-table
			:tableData="TableData"
			:tableLabel="TableLabel"
			:config="config"
			:ShowDetails="false"
			:ShowEdit="false"
			:ShowDelete="false"
			:ShowUp="true"
			:ShowDown="true"
			:HandleWidth="'150'"
			@up="PicUp"
			@down="PicDown"
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
			let url = "/exhibition/detail?exhibition_id=" + this.ExhibitionID;
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

						// 以下为提交用的字段
						title: item.title,
						intro: item.intro,
						pic_url: item.pic_url,
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

		UpActivity(row) {
			if (row.index === 0) {
				_this.$message({
					message: "已经是第一个了",
					type: "error",
				});
				return;
			}
			const res = this.Swap(
				this.tableData[row.index],
				this.tableData[row.index - 1]
			);
			this.tableData[row.index] = res[0];
			this.tableData[row.index - 1] = res[1];
		},

		DownActivity(row) {
			if (row.index + 1 === _this.config.total) {
				_this.$message({
					message: "已经是最后一个了",
					type: "error",
				});
				return;
			}
			const res = this.Swap(
				this.tableData[row.index],
				this.tableData[row.index + 1]
			);
			this.tableData[row.index] = res[0];
			this.tableData[row.index + 1] = res[1];
		},
		SubmitSort() {
			let _this = this;
			let DataForm = {
				exhibition_id: this.ExhibitionID,
				pic_list: [],
			};
			for (let item of this.TableData) {
				DataForm.pic_list.push({
					pic_id: item.pic_id,
					pic_url: item.pic_url,
					title: item.title,
					intro: item.intro,
					date: "",
					size: "",
					organization: "",
					archive_id: "",
				});
			}

            postForm("/exhibition/sort-pic", DataForm, function (res) {
				let item = {
					path: "/PicDetails",
					name: "PicDetails",
					label: "展览-图片详情",
				};

				_this.$router.push({
					path: item.path,
					query: {
						ExhibitionID: _this.ExhibitionID,
					},
				});
				_this.$store.commit("selectMenu", item);
			});
		},
	},
	created() {
		this.ExhibitionID = this.$route.query.ExhibitionID;
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