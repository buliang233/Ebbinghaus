<template>
	<div class="statistics">
		<swiper ref="mySwiper" :options="swiperOptions" class="swiper">
			<swiper-slide class="swiper-slide">
				<div id="main" style="width: 60vw;height:60vh;"></div>
			</swiper-slide>
			<swiper-slide class="swiper-slide">
				<div id="main1" style="width: 60vw;height:60vh;"></div>
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
						clickable: true,
					},
					effect: 'cube',
					data: '',
					dayAndTime: [],
					finished: 0,
					notfinished: 0,
					time: []
				}
			}
		},
		computed: {
			swiper() {
				return this.$refs.mySwiper.$swiper
			}
		},
		mounted() {
			this.getData()
			// 基于准备好的dom，初始化echarts实例
			var myChart = this.$echarts.init(document.getElementById('main'));
			var myChart1 = this.$echarts.init(document.getElementById('main1'));


			//图1,每日学习时长
			var dayandtime = []
			if (this.dayAndTime.length < 30) {
				dayandtime = this.dayAndTime
			} else {
				dayandtime = this.dayAndTime.splice(-30, 30)
			}

			var dateList = dayandtime.map(function(item) {
				return item[0];
			});
			var valueList = dayandtime.map(function(item) {
				return item[1];
			});

			var option = {
				backgroundColor: '#ffffff',
				// Make gradient line here
				visualMap: [{
					show: false,
					type: 'continuous',
					seriesIndex: 0,
					min: 0,
					max: 400
				}],
				title: [{
					left: 'center',
					text: '近三十天每日学习时长'
				}],
				tooltip: {
					trigger: 'axis'
				},
				xAxis: [{
					data: dateList
				}],
				yAxis: [{
					splitLine: {
						show: false
					}
				}],
				grid: [{
					bottom: '20%'
				}],
				series: [{
					type: 'line',
					showSymbol: false,
					data: valueList
				}]
			};

			//图2、复习完成情况统计
			var option1 = {
				backgroundColor: '#ffffff',
				title: [{
					left: 'center',
					text: '复习完成情况'
				}],
				tooltip: {
					trigger: 'item',
					formatter: '{a} <br/>{b}: {c} ({d}%)'
				},
				legend: {
					orient: 'vertical',
					left: 10,
					data: ['复习完成', '复习未完成']
				},
				series: [{
					name: '复习情况',
					type: 'pie',
					radius: ['50%', '70%'],
					avoidLabelOverlap: false,
					label: {
						show: false,
						position: 'center'
					},
					emphasis: {
						label: {
							show: true,
							fontSize: '30',
							fontWeight: 'bold'
						}
					},
					labelLine: {
						show: false
					},
					data: [{
							value: this.finished,
							name: '复习完成'
						},
						{
							value: this.notfinished,
							name: '复习未完成'
						},
					]
				}]
			};

			// 使用刚指定的配置项和数据显示图表。
			myChart.setOption(option);
			myChart1.setOption(option1);
		},
		methods: {
			getData() {
				this.data = JSON.parse(localStorage.getItem('data'))
				let dayAndTime = []
				let finish = 0
				let notfinish = 0
				for (let i = 0; i < this.data.length; i++) {
					let data1 = this.data[i].children
					let len = data1.length;
					for (let j = 0; j < len; j++) {
						// 计算学习时长
						if (data1[j].startTime === [] || data1[j].endTime === [] || data1[j].startTime.length !== data1[j].endTime.length) {
							this.data[i].children[j].time = 0
						} else {
							let time = 0
							for (let k = 0; k < data1[j].startTime.length; k++) {
								time += parseInt(data1[j].endTime[k]) - parseInt(data1[j].startTime[k])
							}
							this.data[i].children[j].time = Math.round(time / 1000 / 60)
						}
						//计算完成与未完成情况
						if (data1[j].isFinish === "true") {
							finish++
						} else if (data1[j].isFinish === "false") {
							notfinish++
						}
						// 计算dayAndTime
						let data2 = [data1[j].day, data1[j].time]
						dayAndTime.push(data2)
					}

				}
				this.dayAndTime = dayAndTime
				this.finished = finish
				this.notfinished = notfinish
			}
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