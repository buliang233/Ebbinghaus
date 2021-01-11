<template>
	<div class="statistics">
		<swiper ref="mySwiper" :options="swiperOptions" class="swiper">
			<swiper-slide class="swiper-slide">
				<div id="main" style="width: 60vw;height:60vh;"></div>
			</swiper-slide>
			<swiper-slide class="swiper-slide">
				<div id="main1" style="width: 60vw;height:60vh;"></div>
			</swiper-slide>
			<swiper-slide class="swiper-slide">
				<div id="main2" style="width: 60vw;height:60vh;"></div>
			</swiper-slide>
			<div class="swiper-pagination" slot="pagination"></div>
		</swiper>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				swiperOptions: {
					pagination: {
						el: '.swiper-pagination',
						clickable :true,
					},
					effect : 'cube',
				}
			}
		},
		computed: {
			swiper() {
				return this.$refs.mySwiper.$swiper
			}
		},
		mounted() {
			// 基于准备好的dom，初始化echarts实例
			var myChart = this.$echarts.init(document.getElementById('main'));
			var myChart1 = this.$echarts.init(document.getElementById('main1'));
			var myChart2 = this.$echarts.init(document.getElementById('main2'));
			// 指定图表的配置项和数据
			var option = {
				backgroundColor: '#ffffff',
				title: {
					text: 'ECharts 入门示例'
				},
				tooltip: {},
				legend: {
					data: ['销量']
				},
				xAxis: {
					data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
				},
				yAxis: {},
				series: [{
					name: '销量',
					type: 'bar',
					data: [5, 20, 36, 10, 10, 20]
				}]
			};

			// 使用刚指定的配置项和数据显示图表。
			myChart.setOption(option);
			myChart1.setOption(option);
			myChart2.setOption(option);
		}
	}
</script>

<style lang="stylus" scoped>
	.statistics{
		margin 20px
		.swiper{
			.swiper-slide{
				display flex
				justify-content center
				align-items center
			}
		}
		
	}
</style>
