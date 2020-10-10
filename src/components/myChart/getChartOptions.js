export let getBarOptions = (data) => {
  return {
    animation: false,
    title: {
      text: 'ECharts 入门示例',
      bottom: '0',
      right: 'center'
    },
    angleAxis: {},
    radiusAxis: {
      type: 'category',
      data: ['周一', '周二', '周三', '周四'],
    },
    polar: {},
    tooltip: {
      formatter: '{b} : {c}',
    },
    series: [{
      type: 'bar',
      data: [1, 2, 3, 4],
      coordinateSystem: 'polar',
    }],
  }
}

export let getPieOptions = (data) => {
  return {
    title: {
      text: '同名数量统计',
      left: 'center',
      bottom: '30'
    },
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: ['30%', '50%'],
        avoidLabelOverlap: true,
        label: {
          show: true,
          fontSize: '12',
          color: '#000',
          formatter: '{b}:    \n {c} ({d}%)',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '16',
            fontWeight: 'bold',
          }
        },
        labelLine: {
          show: true,
          length: 40,
          lineStyle: {
            width: 4
          }
        },
        data: [
          {value: 335, name: '直接访问'},
          {value: 310, name: '邮件营销'},
          {value: 234, name: '联盟广告'},
          {value: 135, name: '视频广告'},
          {value: 1548, name: '搜索引擎'}
        ]
      }
    ]
  }
}

export let getLineOptions = (data) => {
  return {
    animation: false,
    title: {
      text: 'ECharts 入门示例',
      right: '40',
      top: '20'
    },
    color: ['#000000', '#749f83'],
    tooltip: {},
    xAxis: {
      data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
    },
    yAxis: {
      splitLine: {show: false}
    },
    series: [
      {
        type: 'line',
        showSymbol: false,
        data: [51, 20, 36, 10, 10, 20]
      },
      {
        type: 'bar',
        showSymbol: false,
        data: [51, 20, 36, 10, 10, 20]
      }
    ]
  }
}


export let testData = {
  bar: {
    // 柱状图
    title: '这是一个柱状图',
    data: [
      {
        x: 23, // x 轴
        y: 2, // y 轴
        otherAttr: '1',
      },
      {
        x: 11, // x 轴
        y: 64, // y 轴
        otherAttr: '1',
      },
      {
        x: 2, // x 轴
        y: 12, // y 轴
        otherAttr: '1',
      },
      {
        x: 42, // x 轴
        y: 8, // y 轴
        otherAttr: '1',
      },
    ]
  },
  pie: {
    // 饼状图
    title: '这是一个饼图',
    data: [
      {
        name: '第一类',
        value: '20',
        otherAttr: '第1类',
      },
      {
        name: '第二类',
        value: '120',
        otherAttr: '第2类',
      },
      {
        name: '第三类',
        value: '80',
        otherAttr: '第3类',
      }
    ]
  },
  lineArr: {
    // 折线图数组
    title: '这类折线图的标题', // 这类折线图的标题
    dataArr: [
      { // 第一个折线图
        title: '第一个折线图的标题', // 这个折线图的标题
        data: [
          {
            x: 1, // x 轴
            y: 2, // y 轴
            otherAttr: 'sabi'
          },
          {
            x: 12, // x 轴
            y: 23, // y 轴
            otherAttr: 'sabi'
          },
          {
            x: 12, // x 轴
            y: 23, // y 轴
            otherAttr: 'sabi'
          },
        ]
      },
      { // 第2个折线图
        title: '第2个折线图的标题', // 这个折线图的标题
        data: [
          {
            x: 1, // x 轴
            y: 2, // y 轴
            otherAttr: 'sabi'
          },
          {
            x: 12, // x 轴
            y: 23, // y 轴
            otherAttr: 'sabi'
          },
          {
            x: 12, // x 轴
            y: 23, // y 轴
            otherAttr: 'sabi'
          },
        ]
      },
      { // 第3个折线图
        title: '第3个折线图的标题', // 这个折线图的标题
        data: [
          {
            x: 1, // x 轴
            y: 2, // y 轴
            otherAttr: 'sabi'
          },
          {
            x: 12, // x 轴
            y: 23, // y 轴
            otherAttr: 'sabi'
          },
          {
            x: 12, // x 轴
            y: 23, // y 轴
            otherAttr: 'sabi'
          },
        ]
      },
      { // 第4个折线图
        title: '第4个折线图的标题', // 这个折线图的标题
        data: [
          {
            x: 1, // x 轴
            y: 2, // y 轴
            otherAttr: 'sabi'
          },
          {
            x: 12, // x 轴
            y: 23, // y 轴
            otherAttr: 'sabi'
          },
          {
            x: 12, // x 轴
            y: 23, // y 轴
            otherAttr: 'sabi'
          },
        ]
      },
      { // 第5个折线图
        title: '第5个折线图的标题', // 这个折线图的标题
        data: [
          {
            x: 1, // x 轴
            y: 2, // y 轴
            otherAttr: 'sabi'
          },
          {
            x: 12, // x 轴
            y: 23, // y 轴
            otherAttr: 'sabi'
          },
          {
            x: 12, // x 轴
            y: 23, // y 轴
            otherAttr: 'sabi'
          },
        ]
      },
    ]
  }
}
