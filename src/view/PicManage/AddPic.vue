<template>
	<div class="AddPic">
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

		<!-- 填写图片的其他信息 -->
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
			>提交相册-图片</el-button
		>
	</div>
</template>

<script>
import CommonForm from "../../components/CommonForm.vue";
import { postForm } from "../../api/data";

export default {
	name: "AddPic",
	components: {
		CommonForm,
	},
	data() {
		return {
			isShow: false,
			// 展览、相册、新增的图片主键
			ExhibitionID: "",
			AlbumID: "",
			PicID: "",
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

			// 标题、简介对应的 Data
			OptionData: {
				title: {},
				intro: {},
			},

			// 展示 Table 相关
			tableData: [],

			TableDataMap: {
				title: "标题",
				intro: "简介",
				date: "日期",
				size: "尺寸",
				organization: "组织",
				archive_id: "档案编号",
				pic_url: "图片地址",
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
					model: "date",
					label: "日期",
					type: "date",
				},
				{
					model: "size",
					label: "尺寸",
					type: "input",
				},
				{
					model: "organization",
					label: "组织",
					type: "input",
				},
				{
					model: "archive_id",
					label: "档案编号",
					type: "input",
				},
				{
					model: "pic_url",
					label: "图片地址",
					type: "input",
				},
			],
			OtherInfo: {
				date: "",
				size: "",
				organization: "",
				archive_id: "",
				pic_url: "",
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

		// 提交图片
		submitForm() {
			// 需要提交的数据表单
			let DataForm = {};
			DataForm["exhibition_id"] = this.ExhibitionID;
			DataForm["album_id"] = this.AlbumID;
			DataForm["title"] = {};
			DataForm["intro"] = {};

			for (let item of this.tableData) {
				DataForm[item.type][item.option] = item.intro;
			}

			for (let item in this.OtherInfo) {
				DataForm[item.toString()] = this.OtherInfo[item];
			}

			// let inner_this = this;
			// console.log("DataForm", DataForm);
			postForm(
				"/exhibition/add-pic-to-album",
				DataForm,
				function (res) {}
			);
		},
	},
    created() {
        this.ExhibitionID = this.$route.query.exhibition_id;
        this.AlbumID = this.$route.query.album_id;
    }
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