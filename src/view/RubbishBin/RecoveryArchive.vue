<template>
	<div>
		<div class="common-table">
			<common-table
				:tableData="tableData"
				:tableLabel="tableLabel"
				:config="config"
				:ShowDetails="false"
				:ShowEdit="false"
				:ShowDelete="false"
				:ShowUp="false"
				:ShowDown="false"
				:ShowRecovery="true"
				:HandleWidth="'80'"
				@changePage="GetList()"
				@recovery="RecoveryArchive"
			></common-table>
		</div>
	</div>
</template>

<script>
import { getForm, postForm, Swap } from "../../api/data";
import CommonTable from "../../components/CommonTable.vue";
export default {
	name: "RecoveryArchive",
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
					label: "排序时间",
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
		// 恢复档案
		RecoveryArchive(row) {
			let _this = this;
			postForm(
				"/archive/recovery",
				{ archive_id: row.archive_id },
				function (res) {
					if (res.code === 0) {
						_this.$message({
							message: "提交成功",
							type: "success",
						});
					} else {
						_this.$message({
							message: `${res.msg}`,
							type: "error",
						});
					}
					_this.GetList();
				}
			);
		},

		// 获取档案列表
		GetList() {
			this.tableData = [];
			this.totalItem = 0;
			let _this = this;
			let url = `/archive/rubbish_bin?&page_index=${this.config.page}&page_size=${this.config.page_size}`;
			console.log("请求url", url);
			getForm(url, function (res) {
				if (res.code === 0) {
					// _this.$message({
					// 	message: "提交成功",
					// 	type: "success",
					// });
				} else {
					_this.$message({
						message: `${res.msg}`,
						type: "error",
					});
                    return;
				}
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