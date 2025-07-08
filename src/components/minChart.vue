<template>
	<div class="chart" id="chart"></div>
</template>
<script setup>
import { reactive, onMounted, inject, ref, nextTick } from 'vue'
import * as echarts from 'echarts'
const { modelValue } = defineProps({
	modelValue: {
		type: Array,
		default: '',
	},
})
let chart = null
const firstInit = () => {
	chart = echarts.init(document.getElementById('chart'))
	chart.setOption({
		grid: {
			top: '3%',
			right: '2%',
			left: '0%',
			bottom: '0',
			containLabel: true,
			lineStyle: {
				type: 'dashed', // 设置网格线为虚线
				width: 1,
				color: '#333'
			}
		},
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'shadow'
			}
		},
		xAxis: {
			axisLine: {
				lineStyle: {
					type: 'dashed', // 设置X轴为虚线
					width: 1,
					color: '#333'
				}
			},
			splitLine: {
				show: false, // 不显示网格线
			},
			data: ['GPT-4.0', 'Claude3.5', 'Deepseek', 'Grok2', 'Kimi'],
			axisLabel: {
				color: '#fff' // 设置X轴文字颜色为白色
			}
		},
		yAxis: {
			axisLine: {
				lineStyle: {
					type: 'dashed', // 设置Y轴为虚线
					width: 1,
					color: '#333'
				}
			},
			splitLine: {
				lineStyle: {
					type: 'dashed', // 设置Y轴网格线为虚线
					width: 1,
					color: '#333'
				}
			},
			axisTick: {
				show: false, // 隐藏 Y 轴刻度
			},
			axisLabel: {
				color: '#fff' // 设置Y轴文字颜色为白色
			}
		},
		// visualMap: {
		// 	show: false,
		// 	orient: 'horizontal',
		// 	left: 'center',
		// 	min: 1,
		// 	max: 5,
		// 	dimension: 0,
		// 	inRange: {
		// 		color: ['#efe1ec', '#bcccfa', '#1264f9', '#debffa', '#8f29f9'],
		// 	},
		// },
		series: [
			{
				type: 'bar',
				data: modelValue,

				barWidth: '30px',
				itemStyle: {
					// 设置柱状渐变色
					color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
						{
							offset: 0,
							color: '#F55209'
						},
						{
							offset: 1,
							color: 'rgba(252,170,78,0.18)'
						}
					])
				}
			},
		],
	})
}

nextTick(() => {
	firstInit()
  window.addEventListener('resize', () => {
		if (chart) chart.resize()
	})
})
</script>
<style lang="less" scoped>
.chart {
	width: 100%;
	height: 100%;
}
</style>