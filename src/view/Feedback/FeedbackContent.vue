<template>
	<div>
		<div style="font-size: 20px; line-height: 200%;">
			姓名: {{ Name }}<br />
			联系方式: {{ Contact }}<br />
			留言内容: {{ Content }}
		</div>
	</div>
</template>

<script>
export default {
	name: "FeedbackContent",
	data() {
		return {
			Name: "",
			Contact: "",
			Content: "",
		};
	},
	mounted() {
		this.Name = this.$route.query.Name;
		this.Contact = this.$route.query.Contact;
		this.Content = this.$route.query.Content;
	},
};
</script>

<style scoped>
</style>