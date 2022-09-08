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
				@changePage="GetList()"
				@details="SeeDetails"
				@edit="UpdateArchive"
				@del="DeleteArchive"
			></common-table>
		</div>
	</div>
</template>

<script>
import { getForm } from "../../api/data";
import CommonTable from "../../components/CommonTable.vue";
export default {
	name: "ArchiveList",
	components: {
		CommonTable,
	},
	data() {
		return {
			tableData: [],
			tableLabel: [
				{
					prop: "main_id",
					label: "档案编号",
					width: 80,
				},
				{
					prop: "title_zh",
					label: "中文题目",
					width: 200,
				},
				{
					prop: "title_en",
					label: "外文题目",
					width: 200,
				},
				{
					prop: "intro_zh",
					label: "中文简介",
					width: 300,
				},
				{
					prop: "intro_en",
					label: "外文简介",
					width: 300,
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
				row.main_id;
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
					main_id: row.main_id,
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
					main_id: row.main_id,
				},
			});
			console.log(item);
			this.$store.commit("selectMenu", item);
		},

		changePage(page) {
			this.$emit("changePage", page);
		},
		GetList() {
			this.tableData = [];
			let _this = this;
            let url = `/archive/list?&page_index=${this.config.page}&page_size=${this.config.page_size}`
			getForm(url, function (res) {
				console.log("res.data.list", res.data.list);
				for (let item of res.data.list) {
					let new_map = {
						main_id: item.main_id,
						title_zh: "N/A",
						title_en: "N/A",
						intro_zh: "N/A",
						intro_en: "N/A",
					};
					for (let item_id in item.title) {
						if (item_id === "ZH") {
							new_map.title_zh = item.title[item_id];
						} else {
							new_map.title_en = item.title[item_id];
						}
					}

					for (let item_id in item.intro) {
						if (item_id === "ZH") {
							new_map.intro_zh = item.intro[item_id];
						} else {
							new_map.intro_en = item.intro[item_id];
						}
					}
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