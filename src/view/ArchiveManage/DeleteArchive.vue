<template>
	<div>
		<el-form ref="form" label-width="80px">
			<el-form-item label="档案编号">
				<el-input
					v-model="ArchiveID"
					placeholder="请输入档案编号"
				></el-input>
			</el-form-item>

			<el-form-item class="manage-header">
				<el-button type="primary" @click="GetList()">查询</el-button>
				<el-button type="primary" @click="DeleteList()">删除</el-button>
			</el-form-item>
		</el-form>
        
        <hr/>
		<!-- 一层字典相关数据 -->
		<el-table :data="TableData1" style="width: 100%">
			<el-table-column prop="TypeName" label="数据类型">
			</el-table-column>
			<el-table-column prop="TypeData" label="数据值"> </el-table-column>
		</el-table>

		<hr />

		<!-- 二层字典相关数据 -->
		<el-table :data="TableData2" style="width: 100%">
			<el-table-column prop="TypeName" label="类型"> </el-table-column>
			<el-table-column prop="OptionName" label="语言"> </el-table-column>
			<el-table-column prop="intro" label="简介"> </el-table-column>
		</el-table>
	</div>
</template>

<script>
import CommonForm from "../../components/CommonForm.vue";
import { postForm, getForm } from "../../api/data";
export default {
	name: "DeleteArchive",
	components: {
		CommonForm,
	},
	data() {
		return {
			// 档案主键
			ArchiveID: "",

			// 展示数据相关 一层字典、二层字典
			TableData1: [],
			TableData2: [],

			// 数据存的是英文简称，展示数据要展示中文名称，下面这个映射就是存的英文简称与中文名称的对应关系
			TableDataMap: {
				title: "标题",
				language: "语言",
				location: "地点",
				intro: "简介",
				organization: "组织",
				begin_year: "开始年份",
				end_year: "结束年份",
				file_size: "文件大小",
				pic_url: "图片来源",
				from_url: "档案来源",
				page_count: "总页数",

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

		};
	},
	methods: {
        //查询档案
		GetList() {
			let inner_this = this;
			getForm(
				"/archive/detail?archive_id=" + this.ArchiveID,
				function (res) {
                    inner_this.TableData1 = [];
                    inner_this.TableData2 = [];
                    if(res.code === 400){
                        alert('数据不存在');
                        return;
                    }
					// 只有一层字典的有6个数据
					let Temp = [
						"begin_year",
						"end_year",
						"file_size",
						"pic_url",
						"from_url",
						"page_count",
					];

					for (let Type of Temp) {
						inner_this.TableData1.push({
							TypeName: inner_this.TableDataMap[Type],
							TypeData: res.data[Type],
						});
					}

					console.log("TableData1", inner_this.TableData1);

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
							inner_this.TableData2.push({
								// 种类，语言，简介
								type: Type,
								option: item,
								intro: res.data[Type][item],
								TypeName: inner_this.TableDataMap[Type],
								OptionName: inner_this.TableDataMap[item],
							});
						}
					}
				}
			);
		},
        // 删除档案
        DeleteList(){
            let DataForm = {"archive_id": parseInt(this.ArchiveID)};
            postForm("/archive/delete", DataForm, function (res) {});
        }
	},
};
</script>

<style>
</style>