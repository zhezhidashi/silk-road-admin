<template>
	<div class="AddArchive">
		<el-dialog :title="ButtonList[ButtonID].name" :visible.sync="isShow">
			<common-form
				:formLabel="ButtonFormLabel"
				:form="ButtonForm"
				:inline="true"
				ref="form"
			></common-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="isShow = false">取消</el-button>
				<el-button type="primary" @click="ButtonConfirm"
					>确定</el-button
				>
			</div>
		</el-dialog>

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

		<!-- 填写档案的其他信息 -->
		<common-form
			:formLabel="OtherInfoLabel"
			:form="OtherInfo"
			:inline="true"
			ref="form"
		></common-form>

		<!-- 展示 Button 对应的新增的数据 -->
		<el-table :data="tableData" style="width: 100%">
			<el-table-column prop="TypeName" label="类型"> </el-table-column>
			<el-table-column prop="OptionName" label="语言"> </el-table-column>
			<el-table-column prop="intro" label="简介"> </el-table-column>
		</el-table>

		<!-- 提交按钮 -->
		<el-button
			type="primary"
			style="margin: 20px"
			@click="submitForm('ruleForm')"
			>提交档案</el-button
		>
		<div>新增档案的编号是：{{ ArchiveID }}</div>
	</div>
</template>

<script>
import CommonForm from "../../components/CommonForm.vue";
import { postForm } from "../../api/data";

export default {
	name: "AddArchive",
	components: {
		CommonForm,
	},
	data() {
		return {
			isShow: false,
			// 新增的档案的主键
			ArchiveID: "",
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
					ButtonName: "添加关键词",
				},
			],
			// 记录当前按下按钮的编号
			ButtonID: 0,

			// 按下按钮对应的 Form
			ButtonFormLabel: [
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
			ButtonForm: {
				option: "",
				intro: "",
			},

			// 标题、语言、地点、简介、组织、关键词对应的 Data
			OptionData: {
				title: {},
				language: {},
				location: {},
				intro: {},
				organization: {},
				tag_list: {},
			},

			// 展示 Table 相关
			tableData: [],

			TableDataMap: {
				title: "标题",
				language: "语言",
				location: "地点",
				intro: "简介",
				organization: "组织",
				tag_list: "关键词",
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

			// 档案其他相关信息
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
			],
			OtherInfo: {
				begin_year: "",
				end_year: "",
				file_size: "",
				from_url: "",
				archive_url: "",
				mini_pic_url: "",
				page_count: "",
			},
		};
	},
	methods: {
		// 按下新增按钮
		ClickButton(item) {
			this.ButtonID = item.id;
			this.isShow = true;
			this.ButtonForm = {
				option: "",
				intro: "",
			};
		},
		//按下新增按钮中的提交按钮
		ButtonConfirm() {
			// 将收集到的 Form 数据填入 Data 中
			let OptionDataKey = this.ButtonList[this.ButtonID].ButtonKey;
			this.OptionData[OptionDataKey][this.ButtonForm.option] =
				this.ButtonForm.intro;

			// 关闭弹窗
			this.isShow = false;

			// 刷新 Table 的数据
			this.tableData = [];

			for (let item in this.OptionData) {
				for (let row in this.OptionData[item]) {
					this.tableData.push({
						type: item,
						option: row,
						intro: this.OptionData[item][row],
						TypeName: this.TableDataMap[item],
						OptionName: this.TableDataMap[row],
					});
				}
			}
		},

		// 提交档案
		submitForm() {
			// 需要提交的数据表单
			let DataForm = {};

			DataForm["title"] = {};
			DataForm["language"] = {};
			DataForm["location"] = {};
			DataForm["intro"] = {};
			DataForm["organization"] = {};
			DataForm["tag_list"] = [];

			for (let item of this.tableData) {
				if (item.type === "tag_list") {
					DataForm["tag_list"].push(item.option + ":" + item.intro);
				} else DataForm[item.type][item.option] = item.intro;
			}

			for (let item in this.OtherInfo) {
				DataForm[item.toString()] = this.OtherInfo[item];
			}

			let _this = this;
			// console.log("DataForm", DataForm);
			postForm("/archive/add", DataForm, function (res) {
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
				} else {
					_this.$message({
						message: `${res.msg}`,
						type: "error",
					});
				}
				_this.ArchiveID = res.data.main_id;
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