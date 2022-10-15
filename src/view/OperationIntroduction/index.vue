<template>
	<div>
		<div class="Title">操作说明</div>

		<div class="Text" style="font-weight: bold">
			需要强调，添加“××简介”文段时，如果存在分段，一定要在段落末尾添加"$$$"符号。比如（已用红框圈出）：
		</div>
		<img src="OperationIntroduction01.png" style="height: 100px" />
		<br />
        
        <div class="Text">网页可能存在Bug，发现后请及时与开发人员联系，谢谢！</div>
        <br />

		<div class="Header1">1. 上传图片</div>
		<div class="Text">
			上传图片必须为 .jpg
			格式。图片上传完成后，图片会显示绿色的“√”和图片的网址。上传过程请不要刷新页面，否则会丢失信息。<br />
            一定要保存好图片的网址，因为后续的操作都需要用到图片的网址。<br />
			注：测试服网速较慢，上传图片后请耐心等待。长时间没有上传成功后请重新上传。强烈建议白天使用网站，晚上网速非常慢。
		</div>
		<br />

		<div class="Header1">2. 内容管理-档案列表</div>
		<div class="Text">
			点击左侧一级菜单“内容”，然后点击二级菜单“档案列表”。可以看到所有档案的信息。<br />
			点击页面左上角“新增”，可以添加新档案。“排序时间”无需理会，其含义会在此操作手册最后说明。<br />
			点击“详情”，可以跳转到该档案的详情页。<br />
			点击“编辑”，可以修改该档案信息。<br />
			点击“删除”，会跳转档案详细信息的新页面。再次点击该页面的“删除”，会删除该档案。<br />
            点击“上移”，可以调整档案顺序。<br />
		</div>
		<br />

		<div class="Header1">3. 内容管理-学术活动列表</div>
		<div class="Text">
			学术活动管理和搜索内容管理很类似，也是“新增”、“详情”、“编辑”、“删除”、“上移”五个功能
		</div>
		<br />

		<div class="Header1">4. 内容管理-展览列表</div>
		<div class="Text">此结构按照 “展览-图片”两层层结构设计。</div>
		<div class="Header2">(1) 展览管理</div>
		<div class="Text">
			新增、编辑、删除、上移功能和上述类似。“详情”会跳转至该展览的“展览-图片列表”，包含该展览下的所有图片的列表。
		</div>

		<br />
		<div class="Header2">(2) 图片管理</div>
            “展览-图片列表”最上方有一个输入“展览编号”并提交的功能。这个功能一般用不到，不过可以输入展览编号找到该展览（展览编号是该展览在数据库中的主键）。
            详情、新增、编辑、删除功能和上述类似。 <br />
            需要注意的是“图片排序”功能，这个功能和其他的“上移”方式调整顺序并不一样。这个图片的排序是图片在数组中的位置，并非按照“排序时间”排序。<br/>
            点击“图片排序”，会跳转至新界面，在这里可以自由调整图片顺序，但是最后请务必点击“提交排序结果”，否则图片排序不会生效。<br />
		<div class="Text">
            
        </div>
		<br />
        
        <div class="Header1">5. “排序时间”的含义</div>
        <div class="Text">
            此功能用于排序。如果细心观察，会发现列表的内容按照“排序时间”从晚到早排序。如果想要调整顺序，也可以直接修改“排序时间”。<br />
            由于网速不稳定，可能会引起“上移”功能失效。如果“上移”功能失效，可以直接修改“排序时间”来调整顺序。<br />
            排序时间的格式，可以百度搜索“UTC时间的格式”，不过除了字母"T"外，其他的含义应该还挺好猜的。
        </div>
        
        <br/>
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