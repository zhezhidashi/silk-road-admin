<template>
	<div class="common-table">
		<el-table :data="tableData" height="725" stripe>
			<el-table-column label="操作" :min-width="HandleWidth">
				<template slot-scope="scope">
					<el-button
						v-if="ShowDetails"
						size="mini"
						type="info"
						@click="handleDetails(scope.row)"
						>详情</el-button
					>
					<el-button v-if="ShowEdit" size="mini" @click="handleEdit(scope.row)"
						>编辑</el-button
					>
					<el-button
                        v-if="ShowDelete"
						size="mini"
						type="danger"
						@click="handleDelete(scope.row)"
						>删除</el-button
					>
					<el-button
						v-if="ShowUp"
						size="mini"
						type="primary"
						@click="handleUp(scope.row)"
						>上移</el-button
					>
                    <el-button
						v-if="ShowDown"
						size="mini"
						type="primary"
						@click="handleDown(scope.row)"
						>上移</el-button
					>
				</template>
			</el-table-column>
			<el-table-column
				show-overflow-tooltip
				v-for="item in tableLabel"
				:key="item.prop"
				:label="item.label"
				:width="item.width ? item.width : 125"
			>
				<template slot-scope="scope">
					<span style="margin-left: 10px">{{
						scope.row[item.prop]
					}}</span>
				</template>
			</el-table-column>
		</el-table>

		<el-pagination
			class="pager"
			:total="config.total"
			:current-page.sync="config.page"
			:page-size="config.page_size"
			@current-change="changePage"
			layout="prev,pager,next"
		></el-pagination>
	</div>
</template>
<script>
export default {
	name: "CommonTable",
	props: {
		tableData: Array,
		tableLabel: Array,
		config: Object,
		ShowDetails: Boolean,
        ShowEdit: Boolean,
        ShowDelete: Boolean,
		ShowUp: Boolean,
        ShowDown: Boolean,
        HandleWidth: String,
	},
	data() {
		return {};
	},
	methods: {
		handleDetails(row) {
			this.$emit("details", row);
		},
		handleEdit(row) {
			this.$emit("edit", row);
		},
		handleDelete(row) {
			this.$emit("del", row);
		},
		handleUp(row) {
			this.$emit("up", row);
		},
        handleDown(row){
            this.$emit("down", row);
        },
		changePage(page) {
			this.$emit("changePage", page);
		},
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
