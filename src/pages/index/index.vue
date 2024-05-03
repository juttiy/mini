<template>
	<view class="content">
		<view class="btn-wrapper">
			<navigator
				url="/pages/eryuan/index"
				open-type="navigate"
				hover-class="navigator-hover"
			>
				<button type="primary">解一元二次方程</button>
			</navigator>
			<navigator
				url="/pages/juzheng/index"
				open-type="navigate"
				hover-class="navigator-hover"
			>
				<button type="primary">矩阵的计算</button>
			</navigator>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>
	.content{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.btn-wrapper{
		width: 80%;
	}
	.btn-wrapper button{
		margin-top: 20px;
	}
</style>
