<template>
	<div>
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
			@recovery="RecoveryActivity"
		></common-table>
	</div>
</template>

<script>
import CommonTable from "../../components/CommonTable.vue";
import { postForm, getForm } from "../../api/data";
export default {
	name: "RecoveryActivity",
	components: {
		CommonTable,
	},
	data() {
		return {
			totalItem: 0,
			tableData: [],
			tableLabel: [
				{
					prop: "title",
					label: "活动名称",
					width: 300,
				},
				{
					prop: "intro",
					label: "活动简介",
					width: 400,
				},

				{
					prop: "date",
					label: "活动日期",
					width: 120,
				},
				{
					prop: "show_time",
					label: "排序时间",
					width: 100,
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
		// 恢复学术活动
		RecoveryActivity(row) {
			let _this = this;
			postForm(
				"/activity/recovery",
				{ activity_id: row.activity_id },
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

		// 获取学术活动列表
		GetList() {
			this.tableData = [];
			this.totalItem = 0;
			let _this = this;
			let url = `/activity/rubbish_bin?&page_index=${this.config.page}&page_size=${this.config.page_size}`;
			console.log("发出请求", url);
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
                    return ;
				}

				for (let item of res.data.list) {
					let new_map = {
						activity_id: item.main_id,
						title: item.title,
						intro: item.intro,
						cover_pic: item.cover_pic,
						date: item.date,
						show_time: item.show_time,
						index: _this.totalItem,
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
.manage-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
</style>