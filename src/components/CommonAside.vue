<template>
	<el-menu
		default-active="1-4-1"
		class="el-menu-vertical-demo"
		background-color="#104890"
		text-color="#fff"
		active-text-color="#ffd04b"
		@open="handleOpen"
		@close="handleClose"
		:collapse="isCollapse"
        :unique-opened="true"
	>
		<h3>{{ isCollapse ? "后台" : "后台管理系统" }}</h3>
		<el-menu-item
			v-for="item in noChildren"
			:index="item.path"
			:key="item.path"
			@click="clickMenu(item)"
		>
			<i :class="'el-icon-' + item.icon"></i>
			<span slot="title">{{ item.label }}</span>
		</el-menu-item>

		<el-submenu
			v-for="item in hasChildren"
			:index="item.name"
			:key="item.name"
		>
			<template slot="title">
				<i :class="'el-icon-' + item.icon"></i>
				<span slot="title">{{ item.label }}</span>
			</template>
			<el-menu-item-group
				v-for="subItem in item.children"
				:index="subItem.path"
				:key="subItem.path"
			>
				<el-menu-item
					@click="clickMenu(subItem)"
					:index="subItem.name"
					:key="subItem.path"
				>
					<span slot="title">{{ subItem.label }}</span>
				</el-menu-item>
			</el-menu-item-group>
		</el-submenu>
	</el-menu>
</template>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
	width: 200px;
	min-height: 400px;
}

.el-menu {
	height: 100%;
	border: none;

	h3 {
		color: #fff;
		text-align: center;
		line-height: 48px;
	}
}
</style>

<script>
export default {
	data() {
		return {
			menu: [],
		};
	},
	methods: {
		handleOpen(key, keyPath) {
			console.log(key, keyPath);
		},
		handleClose(key, keyPath) {
			console.log(key, keyPath);
		},
		clickMenu(item) {
			this.$router.push({
				name: item.name,
			});
			console.log(item);
			this.$store.commit("selectMenu", item);
		},
	},
	computed: {
		noChildren() {
			return this.asyncMenu.filter((item) => !item.children);
		},
		hasChildren() {
			return this.asyncMenu.filter((item) => item.children);
		},
		isCollapse() {
			return this.$store.state.tab.isCollapse;
		},
		asyncMenu() {
			return this.$store.state.tab.menu;
		},
	},
};
</script>