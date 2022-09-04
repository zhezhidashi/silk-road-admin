<template>
	<div class="common-table">
		<el-table :data="tableData" height="725" stripe>
			<el-table-column
				show-overflow-tooltip
				v-for="item in tableLabel"
				:key="item.name"
				:label="item.label"
				:width="item.width ? item.width : 300"
			>
				<template slot-scope="scope">
					<span style="margin-left: 10px">{{
						scope.row[item.name]
					}}</span>
				</template>
			</el-table-column>

			<el-table-column label="操作" min-width="180">
				<template slot-scope="scope">
					<el-button size="mini" type="info" @click="SeeDetails(scope.row)"
						>详情</el-button
					>
					<el-button size="mini" @click="Edit(scope.row)"
						>编辑</el-button
					>
				</template>
			</el-table-column>
		</el-table>

		<el-pagination
			class="pager"
			:total="config.total"
			:current-page.sync="config.page"
			:page-size="15"
			@current-change="changePage"
			layout="prev,pager,next"
		></el-pagination>
	</div>
</template>

<script>
import { getForm } from "../../api/data";
export default {
	name: "ArchiveList",
	data() {
		return {
			tableData: [],
			tableLabel: [
				{
					name: "main_id",
					label: "档案编号",
					width: 80,
				},
				{
					name: "title_zh",
					label: "中文题目",
					width: 200,
				},
				{
					name: "title_en",
					label: "外文题目",
					width: 200,
				},
				{
					name: "intro_zh",
					label: "中文简介",
					width: 300,
				},
				{
					name: "intro_en",
					label: "外文简介",
					width: 300,
				},
			],
			config: {
				page: 1,
				total: 1,
			},
		};
	},
	methods: {
		SeeDetails(row) {
			let url =
				"https://dev.pacificsilkroad.cn/ArchiveDetails?search_result_id=" +
				row.main_id;
			window.open(url, "_blank");
		},
		Edit(row) {
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
		changePage(page) {
			this.$emit("changePage", page);
		},
		getList() {
			this.tableData = [];
			let inner_this = this;

			getForm("/archive/list?&page_size=2000000", function (res) {
				console.log("res.data.list", res.data.list);
				for (let item of res.data.list) {
					let new_map = {
						main_id: item.main_id,
						title_zh: "N/A",
						title_en: "N/A",
						intro_zh: "N/A",
						intro_en: "N/A",
					};
					for (let item_ in item.title) {
						if (item_ === "ZH") {
							new_map.title_zh = item.title[item_];
						} else {
							new_map.title_en = item.title[item_];
						}
					}

					for (let item_ in item.intro) {
						if (item_ === "ZH") {
							new_map.intro_zh = item.intro[item_];
						} else {
							new_map.intro_en = item.intro[item_];
						}
					}

					inner_this.tableData.push(new_map);
				}
				inner_this.config.total = inner_this.tableData.length;
			});
		},
	},
	created() {
		this.getList();
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