<template>
	<div>
		<div class="manage-header">
			<el-button type="primary" @click="AddExhibition">+新增</el-button>
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
				:HandleWidth="'300'"
				@changePage="GetList()"
				@details="SeeDetails"
				@edit="UpdateExhibition"
				@del="DeleteExhibition"
				@up="UpExhibition"
			></common-table>
		</div>
	</div>
</template>

<script>
import { getForm, postForm, Swap } from "../../api/data";
import CommonTable from "../../components/CommonTable.vue";
export default {
	name: "ExhibitionDetails",
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
		AddExhibition() {
			let item = {
				path: "/AddExhibition",
				name: "AddExhibition",
				label: "添加展览",
			};

			this.$router.push({
				path: item.path,
			});

			console.log(item);
			this.$store.commit("selectMenu", item);
		},
		SeeDetails(row) {
			let item = {
				path: "/PicDetails",
				name: "PicDetails",
				label: "展览-图片详情",
			};

			this.$router.push({
				path: item.path,
				query: {
					ExhibitionID: row.exhibition_id,
				},
			});
			console.log(item);
			this.$store.commit("selectMenu", item);
		},
		UpdateExhibition(row) {
			let item = {
				path: "/UpdateExhibition",
				name: "UpdateExhibition",
				label: "更新展览",
			};

			this.$router.push({
				path: item.path,
				query: {
					ExhibitionID: row.exhibition_id,
				},
			});
			console.log(item);
			this.$store.commit("selectMenu", item);
		},

		DeleteExhibition(row) {
			let item = {
				path: "/DeleteExhibition",
				name: "DeleteExhibition",
				label: "删除展览",
			};

			this.$router.push({
				path: item.path,
				query: {
					ExhibitionID: row.exhibition_id,
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
		UpExhibition(row) {
			if (row.index === 0) {
				alert("已经是第一个了");
				return;
			}
			const res = Swap(
				this.tableData[row.index].show_time,
				this.tableData[row.index - 1].show_time
			);
			this.tableData[row.index].show_time = res[0];
			this.tableData[row.index - 1].show_time = res[1];

			let _this = this;
			postForm("/exhibition/update-exhibition", _this.tableData[row.index], (res) => {
				postForm(
					"/exhibition/update-exhibition",
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
			let url = `/exhibition/list?&page_index=${this.config.page}&page_size=${this.config.page_size}`;
			console.log("请求url", url);
			getForm(url, function (res) {
				// console.log("res.data.list", res.data.list);
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