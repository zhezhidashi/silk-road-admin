<template>
	<div>
		<div class="Title">操作说明</div>

		<div class="Text" style="font-weight: bold">
			需要强调，添加“简介”等文段时，如果存在分段，一定要在段落末尾添加"\n"符号。比如：
		</div>
		<img src="OperationIntroduction01.png" style="height: 100px" />
		<br />
        
        <div class="Text">网页可能存在Bug，发现后请及时与开发人员联系，谢谢！</div>
        <br />

		<div class="Header1">1. 上传图片</div>
		<div class="Text">
			上传图片必须为 .jpg
			格式。图片上传完成后，图片会显示绿色的“√”和图片的网址。上传过程请不要刷新页面，否则会丢失信息。<br />
			注：测试服网速较慢，上传图片后请耐心等待。长时间没有上传成功后请重新上传。
		</div>
		<br />

		<div class="Header1">2. 搜索内容管理</div>
		<div class="Text">
			点击左侧一级菜单“档案管理”，然后点击二级菜单“档案列表”。可以看到所有档案的信息。<br />
			点击页面左上角“新增”，可以添加新档案。
			点击“详情”，可以跳转到该档案的详情页。
			点击“编辑”，可以修改该档案信息。
			点击“删除”，会跳转档案详细信息的新页面。再次点击该页面的“删除”，会删除该档案。
		</div>
		<br />

		<div class="Header1">3. 学术活动管理</div>
		<div class="Text">
			学术活动管理和搜索内容管理很类似，也是“新增”、“详情”、“编辑”、“删除”四个功能
		</div>
		<br />

		<div class="Header1">4. 在线展览管理</div>
		<div class="Text">此结构按照 “展览-相册-图片”三层结构设计。</div>
		<div class="Header2">(1) 展览管理</div>
		<div class="Text">
			新增、编辑、删除功能和上述类似。“详情”会跳转至该展览详情页，包含该展览下的所有相册的列表。
		</div>

		<br />

		<div class="Header2">(2) 相册管理</div>
		<div class="Text">
			新增、编辑、删除功能和上述类似。“详情”会跳转至该相册详情页，包含该相册下的所有图片的列表。<br />
			如在某展览下添加一相册，需要点击该展览词条的“详情”，然后在跳转的详情页面添加新相册。
		</div>
		<br />

		<div class="Header2">(3) 图片管理</div>
		<div class="Text">功能和“相册管理”是类似的。</div>
		<br />
	</div>
</template>

<script>
export default {
	name: "OperationIntroduction",
	data() {
		return {};
	},
};
</script>

<style scoped>
.Title {
	display: flex;
	justify-content: center;
	font-size: 28px;
	font-weight: bold;
	padding: 10px;
}
.Header1 {
	font-size: 24px;
	font-weight: bold;
	padding: 8px;
}
.Header2 {
	font-size: 20px;
	font-weight: bold;
	padding: 6px;
}
.Text {
	font-size: 16px;
	padding: 4px;
	line-height: 150%;
}
</style>