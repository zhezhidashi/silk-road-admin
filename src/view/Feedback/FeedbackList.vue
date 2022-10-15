<template>
	<div>
		<common-table
			:tableData="tableData"
			:tableLabel="tableLabel"
			:config="config"
			:ShowDetails="true"
			:ShowEdit="false"
			:ShowDelete="false"
			:ShowUp="false"
			:ShowDown="false"
			:HandleWidth="'80'"
			@changePage="GetList()"
			@details="SeeDetails"
		></common-table>
	</div>
</template>

<script>
import CommonTable from "../../components/CommonTable.vue";
import { getForm } from "../../api/data";
export default {
	name: "FeedbackList",
	components: {
		CommonTable,
	},
	data() {
		return {
			tableData: [],
			tableLabel: [
				{
					prop: "name",
					label: "姓名",
					width: 100,
				},
				{
					prop: "contact",
					label: "联系方式",
					width: 300,
				},
				{
					prop: "feedback_content",
					label: "留言内容",
					width: 500,
				},
				{
					prop: "show_time",
					label: "留言时间",
					width: 250,
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
		SeeDetails(row) {
			this.$router.push({
				path: "/FeedbackContent",
				query: {
					Name: row.name,
					Contact: row.contact,
					Content: row.feedback_content,
				},
			});
		},
		GetList() {
			this.tableData = [];
			let _this = this;
			let url = `/feedback/list?&page_index=${this.config.page}&page_size=${this.config.page_size}`;
			console.log("请求的url", url);
			getForm(url, function (res) {
				for (let item of res.data.list) {
					let new_map = {
						name: item.name,
						contact: item.contact,
						feedback_content: item.feedback_content,
						show_time: item.show_time,
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