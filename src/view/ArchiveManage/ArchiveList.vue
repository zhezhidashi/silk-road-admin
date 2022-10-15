<template>
	<div>
		<div class="manage-header">
			<el-button type="primary" @click="AddArchive">+新增</el-button>
		</div>
		<div class="common-table">
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
				@edit="UpdateArchive"
				@del="DeleteArchive"
				@up="UpArchive"
			></common-table>
		</div>
	</div>
</template>

<script>
import { getForm, postForm } from "../../api/data";
import CommonTable from "../../components/CommonTable.vue";
export default {
	name: "ArchiveList",
	components: {
		CommonTable,
	},
	data() {
		return {
			tableData: [],
			totalItem: [],
			tableLabel: [
				{
					prop: "title_zh",
					label: "中文题目",
					width: 300,
				},
				{
					prop: "intro_zh",
					label: "中文简介",
					width: 500,
				},
				{
					prop: "show_time",
					label: "展示时间",
					width: 220,
				},
			],
			config: {
				page: 1,
				total: 1,
				page_size: 15,
			},
		};
	},
	methods: {
		AddArchive() {
			let item = {
				path: "/AddArchive",
				name: "AddArchive",
				label: "添加档案",
			};

			this.$router.push({
				path: item.path,
			});
			console.log(item);
			this.$store.commit("selectMenu", item);
		},
		SeeDetails(row) {
			let url =
				"https://dev.pacificsilkroad.cn/ArchiveDetails?search_result_id=" +
				row.archive_id;
			window.open(url, "_blank");
		},
		UpdateArchive(row) {
			let item = {
				path: "/UpdateArchive",
				name: "UpdateArchive",
				label: "更新档案",
			};

			this.$router.push({
				path: item.path,
				query: {
					main_id: row.archive_id,
				},
			});
			console.log(item);
			this.$store.commit("selectMenu", item);
		},

		DeleteArchive(row) {
			let item = {
				path: "/DeleteArchive",
				name: "DeleteArchive",
				label: "删除档案",
			};

			this.$router.push({
				path: item.path,
				query: {
					main_id: row.archive_id,
				},
			});
			console.log(item);
			this.$store.commit("selectMenu", item);
		},
		Swap(a, b) {
			let tmp = a;
			a = b;
			b = tmp;
			return [a, b];
		},
		UpArchive(row) {
			if (row.index === 0) {
				this.$message({
					message: "已经是第一个了",
					type: "error",
				});
				return;
			}
			const res = this.Swap(
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
			postForm("/archive/update", _this.tableData[row.index], (res) => {
				postForm(
					"/archive/update",
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

		changePage(page) {
			this.$emit("changePage", page);
		},
		GetList() {
			this.tableData = [];
			this.totalItem = 0;
			let _this = this;
			let url = `/archive/list?&page_index=${this.config.page}&page_size=${this.config.page_size}`;
			console.log("请求url", url);
			getForm(url, function (res) {
				// console.log("res.data.list", res.data.list);
				for (let item of res.data.list) {
					let new_map = {
						title_zh: "N/A",
						intro_zh: "N/A",
						index: _this.totalItem,
						show_time: item.show_time,

						//下面这些不展示出来，但是修改顺序的时候需要
						archive_url: item.archive_url,
						begin_year: item.begin_year,
						end_year: item.end_year,
						file_size: item.file_size,
						from_url: item.from_url,
						intro: item.intro,
						language: item.language,
						location: item.location,

						// 小心这个地方，get 接口返回的 main_id，但是 post 要写成 archive_id，这接口真是斯巴拉西
						archive_id: item.main_id,
						mini_pic_url: item.mini_pic_url,
						organization: item.organization,
						page_count: item.page_count,
						tag_list: item.tag_list,
						title: item.title,
					};
					for (let item_id in item.title) {
						if (item_id === "ZH") {
							new_map.title_zh = item.title[item_id];
						}
					}

					for (let item_id in item.intro) {
						if (item_id === "ZH") {
							new_map.intro_zh = item.intro[item_id];
						}
					}
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
.common-table {
	height: calc(100%-62px);
	background-color: white;
	position: relative;
	.pager {
		position: absolute;
		bottom: 0;
		right: 20px;
	}
}
</style>