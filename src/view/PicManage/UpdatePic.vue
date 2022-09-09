<template>
	<div>
		<!-- <el-form ref="form" label-width="80px">
			<el-form-item label="展览编号">
				<el-input
					v-model="ExhibitionID"
					placeholder="请输入展览编号"
				></el-input>
			</el-form-item>
			<el-form-item label="相册编号">
				<el-input
					v-model="AlbumID"
					placeholder="请输入相册编号"
				></el-input>
			</el-form-item>
			<el-form-item label="图片编号">
				<el-input
					v-model="PicID"
					placeholder="请输入相册-图片编号"
				></el-input>
			</el-form-item>

			<el-form-item class="manage-header">
				<el-button type="primary" @click="GetList()">查询</el-button>
			</el-form-item>
		</el-form>
		<hr /> -->

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
			@edit="UpdateDataDown"
			@del="DeleteDataDown"
		></common-table>

		<!-- 提交按钮 -->
		<el-button
			type="primary"
			style="margin: 20px"
			@click="submitForm('ruleForm')"
			>提交图片-相册</el-button
		>
	</div>
</template>

<script>
import CommonForm from "../../components/CommonForm.vue";
import CommonTable from "../../components/CommonTable.vue";
import { postForm, getForm } from "../../api/data";
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
			// 展览主键、相册主键、相册-图片主键
			ExhibitionID: "",
			AlbumID: "",
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
					prop: "intro",
					label: "简介",
					width: 400,
				},
			],

			// 数据存的是英文简称，展示数据要展示中文名称，下面这个映射就是存的英文简称与中文名称的对应关系
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

			// 更新档案一层字典的数据
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
		this.ExhibitionID = this.$route.query.exhibition_id;
		this.AlbumID = this.$route.query.album_id;
		this.PicID = this.$route.query.pic_id;
		// 判断是否是从 “图片详情” 页面跳转过来的
		if (this.ExhibitionID != undefined) this.GetList();
	},
	methods: {
		//查询档案
		GetList() {
			let _this = this;
			let url =
				"/exhibition/album-detail?exhibition_id=" +
				this.ExhibitionID +
				"&album_id=" +
				this.AlbumID;

			getForm(url, function (res) {
				let data = res.data.picture_dict;
				console.log("data", data);
				_this.TableData1 = [];
				_this.TableData2 = [];
				if (res.code === 400) {
					alert("数据不存在");
					return;
				}

				// 记录是否找到该相册
				let flag = false;
				for (let item_id in data) {
					if (item_id === _this.PicID) {
						flag = true;

						// 只有一层字典的有5个数据
						let Temp = [
							"date",
							"size",
							"organization",
							"archive_id",
							"pic_url",
						];
						for (let Type of Temp) {
							_this.TableData1.push({
								Type,
								TypeName: _this.TableDataMap[Type],
								TypeData: data[item_id][Type],
							});
						}

						// 具有两层字典的有两个数据
						Temp = ["title", "intro"];
						for (let Type of Temp) {
							for (let item in data[item_id][Type]) {
								_this.TableData2.push({
									// 种类，语言，简介
									type: Type,
									option: item,
									intro: data[item_id][Type][item],
									TypeName: _this.TableDataMap[Type],
									OptionName: _this.TableDataMap[item],
								});
							}
						}

						break;
					}
				}
				if (!flag) {
					alert("数据不存在");
					return;
				}
				// console.log("TableData1", _this.TableData1);
				// console.log("TableData2", _this.TableData2);

				_this.config.total = _this.TableData2.length;
			});
		},

		// 更新一层字典的数据
		confirm() {
			this.isShow = false;
			if (this.OperateType === "edit1") {
				// edit1 是修改只有一层字典的有6个数据
				this.TableData1 = [];
				let Temp = [
					"date",
					"size",
					"organization",
					"archive_id",
					"pic_url",
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
				date: this.TableData1[0].TypeData,
				size: this.TableData1[1].TypeData,
				organization: this.TableData1[2].TypeData,
				archive_id: this.TableData1[3].TypeData,
				pic_url: this.TableData1[4].TypeData,
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
			let DataForm = { 
                exhibition_id: this.ExhibitionID,
                album_id: this.AlbumID,
                pic_id: this.PicID 
            };

			for (let item of this.TableData1) {
				DataForm[item.Type] = item.TypeData;
			}

			DataForm["title"] = {};
			DataForm["intro"] = {};

			for (let item of this.TableData2) {
				DataForm[item.type][item.option] = item.intro;
			}

            let _this = this;
			// console.log("DataForm", DataForm);
			postForm("/exhibition/update-pic", DataForm, function (res) {

                let item = {
					path: "/PicDetails",
					name: "PicDetails",
					label: "相册-图片详情",
				};

				_this.$router.push({
					path: item.path,
					query: {
						exhibition_id: _this.ExhibitionID,
						album_id: _this.AlbumID,
					},
				});
				console.log(item);
				_this.$store.commit("selectMenu", item);
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