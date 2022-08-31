// 上传图片相关
<template>
	<el-upload
		class="upload-demo"
		:file-list="fileList"
        action=""
		list-type="picture"
		:http-request="upload"
		:multiple="true"
	>
		<el-button slot="trigger" size="small" type="primary">
			选取文件
		</el-button>

		<div slot="tip" class="el-upload__tip">
			只能上传jpg文件，且不超过500kb
		</div>
	</el-upload>
</template>


<script>
import { postForm, baseUrl } from "../../api/data.js";

export default {
	name: "Picture",
	data() {
		return {
			fileList: [],
		};
	},
	created() {},
	methods: {
		upload(f) {
			// 设置图片上传所需信息
			let formData = new FormData();
			formData.append("file_obj", f.file, f.file.name);

			// post 请求上传图片
			let inner_this = this;

			postForm("/file/upload/img", formData, function (res) {
				if (res.code === 0) {
					//上传成功之后 显示图片
					console.log("fileList", inner_this.fileList);
					const ImgUrl = "https://dev.pacificsilkroad.cn/img-service" + res.data;
					console.log("ImgUrl", ImgUrl);
					inner_this.fileList.push({
						name: ImgUrl,
						url: ImgUrl,
					});
				} else {
					alert(res.msg);
				}
			});
		},
	},
};
</script>


<style>
</style>