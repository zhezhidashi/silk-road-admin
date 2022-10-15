<template>
	<div>
		<el-form ref="form" label-width="80px">
			<el-form-item label="档案编号">
				<el-input
					v-model="ArchiveID"
					placeholder="请输入档案编号"
				></el-input>
			</el-form-item>

			<!-- 查询档案 -->
			<el-form-item class="manage-header">
				<el-button type="primary" @click="GetList()">查询</el-button>
			</el-form-item>
		</el-form>
		<hr />

		<!-- 更新档案的一层字典的数据、编辑二层字典数据、增加二层字典数据 -->
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
			:ShowDelete="true"
			:ShowEdit="true"
			:ShowUp="false"
            :ShowDown="false"
			:HandleWidth="'140'"
			@edit="UpdateDataDown"
			@del="DeleteDataDown"
		></common-table>

		<!-- 提交按钮 -->
		<el-button
			type="primary"
			style="margin: 20px"
			@click="submitForm('ruleForm')"
			>提交档案</el-button
		>
	</div>
</template>

<script>
import CommonForm from "../../components/CommonForm.vue";
import CommonTable from "../../components/CommonTable.vue";
import { postForm, getForm } from "../../api/data";
export default {
	name: "UpdateArchive",
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
			// 档案主键
			ArchiveID: "",

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
					prop: "intro",
					label: "简介",
					width: 600,
				},
			],

			// 数据存的是英文简称，展示数据要展示中文名称，下面这个映射就是存的英文简称与中文名称的对应关系
			TableDataMap: {
				title: "标题",
				language: "语言",
				location: "地点",
				intro: "简介",
				organization: "组织",
				tag_list: "关键词",
				begin_year: "开始年份",
				end_year: "结束年份",
				file_size: "文件大小",
				from_url: "图片来源",
				archive_url: "档案来源",
				mini_pic_url: "缩略图地址",
				page_count: "总页数",
				show_time: "展示时间",

				AR: "阿拉伯文",
				BE: "白俄罗斯文",
				BG: "保加利亚文",
				CA: "加泰罗尼亚文",
				CS: "捷克文",
				DA: "丹麦文",
				DE: "德文",
				EL: "希腊文",
				EN: "英文",
				ES: "西班牙文",
				ET: "爱沙尼亚文",
				FI: "芬兰文",
				FR: "法文",
				HR: "克罗地亚文",
				HU: "匈牙利文",
				IT: "意大利文",
				IW: "希伯来文",
				JA: "日文",
				KO: "朝鲜文",
				LT: "立陶宛文",
				MK: "马其顿文",
				NL: "荷兰文",
				NO: "挪威文",
				PL: "波兰文",
				PT: "葡萄牙文",
				RO: "罗马尼亚文",
				RU: "俄文",
				SK: "斯洛伐克文",
				SL: "斯洛文尼亚文",
				SQ: "阿尔巴尼亚文",
				SR: "塞尔维亚文",
				SV: "瑞典文",
				TH: "泰文",
				TR: "土耳其文",
				UK: "乌克兰文",
				ZH: "中文",
			},

			// 更新档案一层字典的数据
			OtherInfoLabel: [
				{
					model: "begin_year",
					label: "开始年份",
					type: "input",
				},
				{
					model: "end_year",
					label: "结束年份",
					type: "input",
				},
				{
					model: "file_size",
					label: "文件大小",
					type: "input",
				},
				{
					model: "from_url",
					label: "图片来源",
					type: "input",
				},
				{
					model: "archive_url",
					label: "档案来源",
					type: "input",
				},
				{
					model: "mini_pic_url",
					label: "缩略图地址",
					type: "input",
				},
				{
					model: "page_count",
					label: "页数总计",
					type: "input",
				},
				{
					model: "show_time",
					label: "展示时间",
					type: "input",
				},
			],
			OtherInfo: {
				begin_year: "",
				end_year: "",
				file_size: "",
				from_url: "",
				archive_url: "",
				mini_pic_url: "",
				page_count: "",
				show_time: "",
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
					name: "添加语言",
					ButtonKey: "language",
					ButtonName: "语言",
				},
				{
					id: 2,
					name: "添加地点",
					ButtonKey: "location",
					ButtonName: "地点",
				},
				{
					id: 3,
					name: "添加简介",
					ButtonKey: "intro",
					ButtonName: "简介",
				},
				{
					id: 4,
					name: "添加组织",
					ButtonKey: "organization",
					ButtonName: "组织",
				},
				{
					id: 5,
					name: "添加关键词",
					ButtonKey: "tag_list",
					ButtonName: "关键词",
				},
			],

			UpdateTableData2Label: [
				{
					model: "option",
					label: "选项",
					type: "select",
					opts: [
						{ label: "阿拉伯文", value: "AR" },
						{ label: "白俄罗斯文", value: "BE" },
						{ label: "保加利亚文", value: "BG" },
						{ label: "加泰罗尼亚文", value: "CA" },
						{ label: "捷克文", value: "CS" },
						{ label: "丹麦文", value: "DA" },
						{ label: "德文", value: "DE" },
						{ label: "希腊文", value: "EL" },
						{ label: "英文", value: "EN" },
						{ label: "西班牙文", value: "ES" },
						{ label: "爱沙尼亚文", value: "ET" },
						{ label: "芬兰文", value: "FI" },
						{ label: "法文", value: "FR" },
						{ label: "克罗地亚文", value: "HR" },
						{ label: "匈牙利文", value: "HU" },
						{ label: "意大利文", value: "IT" },
						{ label: "希伯来文", value: "IW" },
						{ label: "日文", value: "JA" },
						{ label: "朝鲜文", value: "KO" },
						{ label: "立陶宛文", value: "LT" },
						{ label: "马其顿文", value: "MK" },
						{ label: "荷兰文", value: "NL" },
						{ label: "挪威文", value: "NO" },
						{ label: "波兰文", value: "PL" },
						{ label: "葡萄牙文", value: "PT" },
						{ label: "罗马尼亚文", value: "RO" },
						{ label: "俄文", value: "RU" },
						{ label: "斯洛伐克文", value: "SK" },
						{ label: "斯洛文尼亚文", value: "SL" },
						{ label: "阿尔巴尼亚文", value: "SQ" },
						{ label: "塞尔维亚文", value: "SR" },
						{ label: "瑞典文", value: "SV" },
						{ label: "泰文", value: "TH" },
						{ label: "土耳其文", value: "TR" },
						{ label: "乌克兰文", value: "UK" },
						{ label: "中文", value: "ZH" },
					],
				},
				{
					model: "intro",
					label: "简介",
					type: "input",
				},
			],
			UpdateTableData2: {
				option: "",
				intro: "",
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
					opts: [
						{ label: "阿拉伯文", value: "AR" },
						{ label: "白俄罗斯文", value: "BE" },
						{ label: "保加利亚文", value: "BG" },
						{ label: "加泰罗尼亚文", value: "CA" },
						{ label: "捷克文", value: "CS" },
						{ label: "丹麦文", value: "DA" },
						{ label: "德文", value: "DE" },
						{ label: "希腊文", value: "EL" },
						{ label: "英文", value: "EN" },
						{ label: "西班牙文", value: "ES" },
						{ label: "爱沙尼亚文", value: "ET" },
						{ label: "芬兰文", value: "FI" },
						{ label: "法文", value: "FR" },
						{ label: "克罗地亚文", value: "HR" },
						{ label: "匈牙利文", value: "HU" },
						{ label: "意大利文", value: "IT" },
						{ label: "希伯来文", value: "IW" },
						{ label: "日文", value: "JA" },
						{ label: "朝鲜文", value: "KO" },
						{ label: "立陶宛文", value: "LT" },
						{ label: "马其顿文", value: "MK" },
						{ label: "荷兰文", value: "NL" },
						{ label: "挪威文", value: "NO" },
						{ label: "波兰文", value: "PL" },
						{ label: "葡萄牙文", value: "PT" },
						{ label: "罗马尼亚文", value: "RO" },
						{ label: "俄文", value: "RU" },
						{ label: "斯洛伐克文", value: "SK" },
						{ label: "斯洛文尼亚文", value: "SL" },
						{ label: "阿尔巴尼亚文", value: "SQ" },
						{ label: "塞尔维亚文", value: "SR" },
						{ label: "瑞典文", value: "SV" },
						{ label: "泰文", value: "TH" },
						{ label: "土耳其文", value: "TR" },
						{ label: "乌克兰文", value: "UK" },
						{ label: "中文", value: "ZH" },
					],
				},
				{
					model: "intro",
					label: "内容",
					type: "input",
				},
			],
			AddTableData2: {
				option: "",
				intro: "",
			},
			ButtonCopy: null,
		};
	},
	created() {
		this.ArchiveID = this.$route.query.main_id;
		// 判断是否是从 “档案列表” 页面跳转过来的
		if (this.ArchiveID != undefined) this.GetList();
	},
	methods: {
		//查询档案
		GetList() {
			let _this = this;
			let url = "/archive/detail?archive_id=" + this.ArchiveID;
			console.log("请求 url", url);
			getForm(url, function (res) {
				_this.TableData1 = [];
				_this.TableData2 = [];
				if (res.code === 400) {
					_this.$message({
						message: "数据不存在",
						type: "error",
					});
					return;
				}
				// 只有一层字典的有7个数据
				let Temp = [
					"begin_year",
					"end_year",
					"file_size",
					"from_url",
					"archive_url",
					"mini_pic_url",
					"page_count",
					"show_time",
				];

				for (let Type of Temp) {
					_this.TableData1.push({
						Type,
						TypeName: _this.TableDataMap[Type],
						TypeData: res.data[Type],
					});
				}

				console.log("TableData1", _this.TableData1);

				// 具有两层字典的有五个数据
				Temp = [
					"title",
					"language",
					"location",
					"intro",
					"organization",
				];
				for (let Type of Temp) {
					for (let item in res.data[Type]) {
						_this.TableData2.push({
							// 种类，语言，简介
							type: Type,
							option: item,
							intro: res.data[Type][item],
							TypeName: _this.TableDataMap[Type],
							OptionName: _this.TableDataMap[item],
						});
					}
				}

				// 还有一个 tag_list 列表
				for (let item of res.data.tag_list) {
					_this.TableData2.push({
						// 种类，语言，简介
						type: "tag_list",
						option: item.slice(0, 2),
						intro: item.slice(3),
						TypeName: _this.TableDataMap["tag_list"],
						OptionName: _this.TableDataMap[item.slice(0, 2)],
					});
				}
				_this.config.total = _this.TableData2.length;
			});
		},
		// 更新一层字典的数据
		confirm() {
			this.isShow = false;
			if (this.OperateType === "edit1") {
				// edit1 是修改只有一层字典的有7个数据
				this.TableData1 = [];
				let Temp = [
					"begin_year",
					"end_year",
					"file_size",
					"from_url",
					"archive_url",
					"mini_pic_url",
					"page_count",
					"show_time",
				];

				for (let Type of Temp) {
					this.TableData1.push({
						Type,
						TypeName: this.TableDataMap[Type],
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
							intro: this.UpdateTableData2.intro,
							TypeName: item.TypeName,
							OptionName:
								this.TableDataMap[this.UpdateTableData2.option],
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
					intro: this.AddTableData2.intro,
					TypeName: this.TableDataMap[NowType],
					OptionName: this.TableDataMap[this.AddTableData2.option],
				});
				this.config.total = this.TableData2.length;

				// console.log("edit3", this.TableData2);
			}
		},
		UpdateDataUp() {
			this.OperateType = "edit1";
			this.isShow = true;
			this.OtherInfo = {
				begin_year: this.TableData1[0].TypeData,
				end_year: this.TableData1[1].TypeData,
				file_size: this.TableData1[2].TypeData,
				from_url: this.TableData1[3].TypeData,
				archive_url: this.TableData1[4].TypeData,
				mini_pic_url: this.TableData1[5].TypeData,
				page_count: this.TableData1[6].TypeData,
				show_time: this.TableData1[7].TypeData,
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
				intro: "",
			};
		},

		// 提交档案
		submitForm() {
			// 需要提交的数据表单
			let DataForm = { archive_id: this.ArchiveID };

			for (let item of this.TableData1) {
				DataForm[item.Type] = item.TypeData;
			}

			DataForm["title"] = {};
			DataForm["language"] = {};
			DataForm["location"] = {};
			DataForm["intro"] = {};
			DataForm["organization"] = {};
			DataForm["tag_list"] = [];

			for (let item of this.TableData2) {
				if (item.type === "tag_list") {
					DataForm[item.type].push(item.option + ":" + item.intro);
				} else DataForm[item.type][item.option] = item.intro;
			}

			console.log("DataForm", DataForm);

			let _this = this;
			postForm("/archive/update", DataForm, function (res) {
				if (res.code === 0) {
					_this.$message({
						message: "提交成功",
						type: "success",
					});

					// 提交成功后退回列表界面
					let item = {
						path: "/ArchiveList",
						name: "ArchiveList",
						label: "档案列表",
					};
					_this.$router.push({
						path: item.path,
					});
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