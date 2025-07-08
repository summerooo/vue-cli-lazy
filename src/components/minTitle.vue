<template>
	<div class="titleContent">
		<img class="image" src="@/assets/images/home/title-bg.png" alt="" srcset="">
		<div class="title">
			<slot></slot>
		</div>

	</div>
</template>

<style lang="less" scoped>
.titleContent {
	display: flex;
	position: relative;
	height: 41px;
	.image {
		position: absolute;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
	}
	.title {
		margin-left: 50px;
		position: relative;
		font-weight: 600;
		font-size: 22px;
		color: #FFFFFF;
		text-shadow: 0px 2px 12px rgba(198,245,255,0.56);
		text-align: left;
		// background: linear-gradient(90deg, #FFDFC2 0%, #FFFFFF 100%);
	}
}
</style>