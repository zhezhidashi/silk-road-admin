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
				@recovery="RecoveryExhibition"
			></common-table>
		</div>
	</div>
</template>

<script>
import { getForm, postForm, Swap } from "../../api/data";
import CommonTable from "../../components/CommonTable.vue";
export default {
	name: "RecoveryExhibition",
	components: {
		CommonTable,
	},
	data() {
		return {
			tableData: [],
			totalItem: [],
			tableLabel: [
				{
					prop: "title",
					label: "展览题目",
					width: 200,
				},
				{
					prop: "Introduction",
					label: "展览简介",
					width: 600,
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
		// 恢复展览
		RecoveryExhibition(row) {
			let _this = this;
			postForm(
				"/exhibition/recovery-exhibition",
				{ exhibition_id: row.exhibition_id },
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

		// 获取展览列表
		GetList() {
			this.tableData = [];
			this.totalItem = 0;
			let _this = this;
			let url = `/exhibition/rubbish_bin?&page_index=${this.config.page}&page_size=${this.config.page_size}`;
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
						title: item.title,
						index: _this.totalItem,
						show_time: item.show_time,
						Introduction: item.intro.Introduction,

						//下面这些不展示出来，但是修改顺序的时候需要
						exhibition_id: item.main_id,
						intro: item.intro,
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