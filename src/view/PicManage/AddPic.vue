<template>
	<div class="AddPic">
		<el-upload
			class="upload-demo"
			:file-list="fileList"
			action=""
			list-type="picture"
			:http-request="upload"
			:multiple="false"
		>
			<el-button slot="trigger" size="small" type="primary">
				选取文件
			</el-button>

			<div slot="tip" class="el-upload__tip">只能上传jpg文件</div>
		</el-upload>

		<hr />

		<!-- 填写图片的其他信息 -->
		<common-form
			:formLabel="OtherInfoLabel"
			:form="OtherInfo"
			:inline="true"
			ref="form"
		></common-form>

		<hr />

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

		<!-- 展示 Button 对应的新增的数据 -->
		<el-table :data="tableData" style="width: 100%">
			<el-table-column prop="TypeName" label="类型"> </el-table-column>
			<el-table-column prop="OptionName" label="语言"> </el-table-column>
			<el-table-column prop="Content" label="内容"> </el-table-column>
		</el-table>

		<!-- 提交按钮 -->
		<el-button
			type="primary"
			style="margin: 20px"
			@click="submitForm('ruleForm')"
			>提交展览-图片</el-button
		>
	</div>
</template>

<script>
import CommonForm from "../../components/CommonForm.vue";
import { postForm, TableDataMap, LanguageOption } from "../../api/data";

export default {
	name: "AddPic",
	components: {
		CommonForm,
	},
	data() {
		return {
			isShow: false,
			// 展览、新增的图片主键
			ExhibitionID: "",
			PicID: "",

			// 上传图片的信息
			fileList: [],

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
					opts: LanguageOption,
				},
				{
					model: "content",
					label: "内容",
					type: "input",
				},
			],
			ButtonForm: {
				option: "",
				content: "",
			},

			// 标题、简介对应的 Data
			OptionData: {
				title: {},
				intro: {},
			},

			// 展示 Table 相关
			tableData: [],

			// 档案其他相关信息
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
		};
	},
	methods: {
		// 上传图片
		upload(f) {
			// 设置图片上传所需信息
			let formData = new FormData();
			formData.append("file_obj", f.file, f.file.name);

			// post 请求上传图片
			let _this = this;

			postForm("/file/upload/img", formData, function (res) {
				if (res.code === 0) {
					_this.$message({
						message: `${f.file.name} 提交成功`,
						type: "success",
					});

					//上传成功之后 显示图片
					console.log("fileList", _this.fileList);
					const ImgUrl =
						"http://162.105.209.20/img-service" + res.data;
					console.log("ImgUrl", ImgUrl);

					_this.OtherInfo.pic_url = ImgUrl;

					_this.fileList.push({
						name: ImgUrl,
						url: ImgUrl,
					});
				} else {
					_this.$message({
						message: `${res.msg}`,
						type: "error",
					});
				}
			});
		},

		// 按下新增按钮
		ClickButton(item) {
			this.ButtonID = item.id;
			this.isShow = true;
			this.ButtonForm = {
				option: "",
				content: "",
			};
		},
		//按下新增按钮中的提交按钮
		ButtonConfirm() {
			// 将收集到的 Form 数据填入 Data 中
			let OptionDataKey = this.ButtonList[this.ButtonID].ButtonKey;
			this.OptionData[OptionDataKey][this.ButtonForm.option] =
				this.ButtonForm.content;

			// 关闭弹窗
			this.isShow = false;

			// 刷新 Table 的数据
			this.tableData = [];
			// console.log('this.OptionData', this.OptionData)

			for (let item in this.OptionData) {
				for (let row in this.OptionData[item]) {
					this.tableData.push({
						type: item,
						option: row,
						Content: this.OptionData[item][row],
						TypeName: TableDataMap[item],
						OptionName: TableDataMap[row],
					});
				}
			}
		},

		// 提交图片
		submitForm() {
			// 需要提交的数据表单
			console.log("tableData", this.tableData);

			let DataForm = {};
			DataForm["exhibition_id"] = this.ExhibitionID;
			(DataForm["date"] = ""),
				(DataForm["size"] = ""),
				(DataForm["organization"] = ""),
				(DataForm["archive_id"] = ""),
				(DataForm["title"] = {});
			DataForm["intro"] = {};

			for (let item of this.tableData) {
				DataForm[item.type][item.option] = item.Content;
			}

			for (let item in this.OtherInfo) {
				DataForm[item.toString()] = this.OtherInfo[item];
			}

			let _this = this;
			// console.log("DataForm", DataForm);
			postForm(
				"/exhibition/add-pic-to-exhibition",
				DataForm,
				function (res) {
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
				}
			);
		},
	},
	created() {
		this.ExhibitionID = this.$route.query.ExhibitionID;
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