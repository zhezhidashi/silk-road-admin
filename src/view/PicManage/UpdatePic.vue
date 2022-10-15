<template>
	<div>
		<!-- 更新相册-图片的一层字典的数据、编辑二层字典数据、增加二层字典数据 -->
		<el-dialog :title="'更新数据'" :visible.sync="isShow">
			<common-form
				:formLabel="
					OperateType === 'edit1'
						? OtherInfoLabel
						: OperateType === 'edit2'
						? UpdateTableData2Label
						: AddTableData2Label
				"
				:form="
					OperateType === 'edit1'
						? OtherInfo
						: OperateType === 'edit2'
						? UpdateTableData2
						: AddTableData2
				"
				:inline="true"
				ref="form"
			></common-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="isShow = false">取消</el-button>
				<el-button type="primary" @click="confirm">确定</el-button>
			</div>
		</el-dialog>
		<div class="manage-header">
			<el-button type="primary" @click="UpdateDataUp">更新数据</el-button>
		</div>

		<!-- 一层字典相关数据 -->
		<el-table :data="TableData1" style="width: 100%">
			<el-table-column prop="TypeName" label="数据类型">
			</el-table-column>
			<el-table-column prop="TypeData" label="数据值"> </el-table-column>
		</el-table>

		<hr />

		<!-- 增加二层字典数据的按钮 -->
		<div class="ButtonContainer">
			<div v-for="item in ButtonList" :key="item.id">
				<el-button
					class="AddButton"
					type="primary"
					@click="ClickButton(item)"
					>{{ item.name }}</el-button
				>
			</div>
		</div>

		<!-- 二层字典相关数据 -->
		<common-table
			:tableData="TableData2"
			:tableLabel="TableData2Label"
			:config="config"
			:ShowDetails="false"
			:ShowEdit="true"
			:ShowDelete="true"
			:ShowUp="false"
			:ShowDown="false"
			:HandleWidth="'150'"
			@edit="UpdateDataDown"
			@del="DeleteDataDown"
		></common-table>

		<!-- 提交按钮 -->
		<el-button
			type="primary"
			style="margin: 20px"
			@click="submitForm('ruleForm')"
			>提交展览-相册</el-button
		>
	</div>
</template>

<script>
import CommonForm from "../../components/CommonForm.vue";
import CommonTable from "../../components/CommonTable.vue";
import {
	postForm,
	getForm,
	TableDataMap,
	LanguageOption,
} from "../../api/data";
export default {
	name: "UpdatePic",
	components: {
		CommonForm,
		CommonTable,
	},
	data() {
		return {
			isShow: false,
			config: {
				page: 1,
				total: 15,
				page_size: 100,
			},
			OperateType: "",
			// 展览主键、展览-图片主键
			ExhibitionID: "",
			PicID: "",

			// 展示数据相关 一层字典、二层字典
			TableData1: [],
			TableData2: [],
			TableData2Label: [
				{
					prop: "TypeName",
					label: "类型",
					width: 200,
				},
				{
					prop: "OptionName",
					label: "语言",
					width: 200,
				},
				{
					prop: "Content",
					label: "内容",
					width: 400,
				},
			],

			// 更新档案一层字典的数据
			OtherInfoLabel: [
				{
					model: "pic_url",
					label: "图片地址",
					type: "input",
				},
			],
			OtherInfo: {
				pic_url: "",
			},

			// 按钮列表
			ButtonList: [
				{
					id: 0,
					name: "添加标题",
					ButtonKey: "title",
					ButtonName: "标题",
				},
				{
					id: 1,
					name: "添加简介",
					ButtonKey: "intro",
					ButtonName: "简介",
				},
			],

			UpdateTableData2Label: [
				{
					model: "option",
					label: "选项",
					type: "select",
					opts: LanguageOption,
				},
				{
					model: "Content",
					label: "内容",
					type: "input",
				},
			],
			UpdateTableData2: {
				option: "",
				Content: "",
			},
			// 修改TableData2 需要的辅助变量
			TableData2RowCopy: "",

			//新增TableData2
			// 按下按钮对应的 Form
			AddTableData2Label: [
				{
					model: "option",
					label: "选项",
					type: "select",
					opts: LanguageOption,
				},
				{
					model: "Content",
					label: "内容",
					type: "input",
				},
			],
			AddTableData2: {
				option: "",
				Content: "",
			},
			ButtonCopy: null,
		};
	},
	created() {
		this.ExhibitionID = this.$route.query.ExhibitionID;
		this.PicID = this.$route.query.PicID;
		// 判断是否是从 “图片列表” 页面跳转过来的
		if (this.ExhibitionID != undefined) this.GetList();
	},
	methods: {
		//查询档案
		GetList() {
			let _this = this;
			let url = "/exhibition/detail?exhibition_id=" + this.ExhibitionID;
			console.log("请求的url", url);

			getForm(url, function (res) {
				let data = res.data;
				// console.log("data", data);
				_this.TableData1 = [];
				_this.TableData2 = [];
				if (res.code === 400) {
					_this.$message({
						message: "展览不存在",
						type: "error",
					});
					return;
				}

				let FindPic = false;
				for (let item of data.pic_list) {
					if (item.pic_id !== _this.PicID) continue;
					FindPic = true;

					// 只有一层字典的有5个数据
					let Temp = ["pic_url"];
					for (let Type of Temp) {
						_this.TableData1.push({
							Type,
							TypeName: TableDataMap[Type],
							TypeData: item[Type],
						});
					}

					// 具有两层字典的有两个数据
					Temp = ["title", "intro"];
					for (let Type of Temp) {
						for (let map_item in item[Type]) {
							_this.TableData2.push({
								// 种类，语言，简介
								type: Type,
								option: map_item,
								Content: item[Type][map_item],
								TypeName: TableDataMap[Type],
								OptionName: TableDataMap[map_item],
							});
						}
					}
					break;
				}

				if (!FindPic) {
					_this.$message({
						message: "图片不存在",
						type: "error",
					});
					return;
				}

				_this.config.total = _this.TableData2.length;
			});
		},

		// 更新一层字典的数据
		confirm() {
			this.isShow = false;
			if (this.OperateType === "edit1") {
				// edit1 是修改只有一层字典的有6个数据
				this.TableData1 = [];
				let Temp = ["pic_url"];

				for (let Type of Temp) {
					this.TableData1.push({
						Type,
						TypeName: TableDataMap[Type],
						TypeData: this.OtherInfo[Type],
					});
				}
			} else if (this.OperateType === "edit2") {
				// edit2 是修改二层字典的数据
				let TableCopy = this.TableData2;
				this.TableData2 = [];
				for (let item of TableCopy) {
					if (item === this.TableData2RowCopy) {
						this.TableData2.push({
							// 种类，语言，简介
							type: item.type,
							option: this.UpdateTableData2.option,
							Content: this.UpdateTableData2.Content,
							TypeName: item.TypeName,
							OptionName:
								TableDataMap[this.UpdateTableData2.option],
						});
					} else this.TableData2.push(item);
				}
				this.config.total = this.TableData2.length;
			} else if (this.OperateType === "edit3") {
				// edit3 是新增二层字典的数据
				let NowType = this.ButtonCopy.ButtonKey;
				let TableData2Copy = this.TableData2;
				this.TableData2 = [];

				for (let item of TableData2Copy) {
					if (
						NowType === item.type &&
						this.AddTableData2.option === item.option
					)
						continue;
					this.TableData2.push(item);
				}

				this.TableData2.push({
					// 种类，语言，简介
					type: NowType,
					option: this.AddTableData2.option,
					Content: this.AddTableData2.Content,
					TypeName: TableDataMap[NowType],
					OptionName: TableDataMap[this.AddTableData2.option],
				});
				this.config.total = this.TableData2.length;

				// console.log("edit3", this.TableData2);
			}
		},
		UpdateDataUp() {
			this.OperateType = "edit1";
			this.isShow = true;
			this.OtherInfo = {
				pic_url: this.TableData1[0].TypeData,
			};
		},

		// 更新二级字典数据
		UpdateDataDown(row) {
			this.OperateType = "edit2";
			this.TableData2RowCopy = row;
			this.isShow = true;

			this.UpdateTableData2 = JSON.parse(JSON.stringify(row));
		},

		// 删除二级字典数据
		DeleteDataDown(row) {
			let TableCopy = this.TableData2;
			this.TableData2 = [];
			for (let item of TableCopy) {
				if (item === row) continue;
				this.TableData2.push(item);
			}
			this.config.total = this.TableData2.length;
		},

		// 按下新增按钮
		ClickButton(item) {
			this.OperateType = "edit3";
			this.ButtonCopy = item;
			this.isShow = true;
			this.AddTableData2 = {
				option: "",
				Content: "",
			};
		},

		// 提交档案
		submitForm() {
			// 需要提交的数据表单
			let DataForm = {
				exhibition_id: this.ExhibitionID,
				pic_id: this.PicID,
				date: "",
				size: "",
				organization: "",
				archive_id: "",
			};

			for (let item of this.TableData1) {
				DataForm[item.Type] = item.TypeData;
			}

			DataForm["title"] = {};
			DataForm["intro"] = {};

			for (let item of this.TableData2) {
				DataForm[item.type][item.option] = item.Content;
			}

			let _this = this;
			postForm("/exhibition/update-pic", DataForm, function (res) {
				if (res.code === 0) {
					_this.$message({
						message: "提交成功",
						type: "success",
					});

					let item = {
						path: "/PicDetails",
						name: "PicDetails",
						label: "相册-图片列表",
					};

					_this.$router.push({
						path: item.path,
						query: {
							ExhibitionID: _this.ExhibitionID,
						},
					});
					console.log(item);
					_this.$store.commit("selectMenu", item);
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
			});
		},
	},
};
</script>

<style scoped>
.ButtonContainer {
	display: flex;
}
.AddButton {
	margin: 20px;
}
</style>