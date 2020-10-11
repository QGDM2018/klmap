export let getBarOptions = (data) => {
  let xArr = [], yArr = [];
  for (let item of data.data) {
    xArr.push(item.x);
    yArr.push(item.y);
  }
  return {
    animation: false,
    title: {
      text: data.title,
      bottom: '0',
      right: 'center',
      textStyle: {
        color: '#000' ,
      }
    },
    angleAxis: {
      max: function (value) {
        return value.max - value.max % 10 + 50;
      },
      axisLabel: {
        formatter: `{value}${data.unit}`
      }
    },
    radiusAxis: {
      type: 'category',
      data: xArr,
      axisLabel: {
        interval: 0
      },
      max: function (value) {
        return value.max + 1;
      }
    },
    polar: {},
    tooltip: {
      formatter: `{b} : {c} ${data.unit}`,
    },
    series: [{
      type: 'bar',
      data: yArr,
      coordinateSystem: 'polar',
    }],
  }
}

export let getPieOptions = (data) => {
  return {
    title: {
      text: data.title,
      left: 'center',
      bottom: '0'
    },
    tooltip: {
      formatter: '{b} : {c} ({d}%)',
    },
    color: ['#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3', '#fff','#991','#f40','#000'],
    series: [
      {
        type: 'pie',
        radius: ['30%', '50%'],
        avoidLabelOverlap: true,
        label: {
          show: true,
          fontSize: '13',
          color: '#000',
          formatter: '{b}:    \n {c} ({d}%)',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '16',
            fontWeight: 'bold',
            color: '#fff'
          }
        },
        labelLine: {
          show: true,
          length: 40,
          lineStyle: {
            width: 1,
            color: '#fff'
          }
        },
        data: data.data
      }
    ]
  }
}

export let getLineOptions = (data) => {
  let xArr = [], yArr = [];
  for (let item of data.data) {
    xArr.push(item.x);
    yArr.push(item.y);
  }
  return {
    animation: false,
    title: {
      text: data.title,
      right: 'center',
      top: '10'
    },
    grid: {
      left: 60,
      right: 60,
    },
    color: ['#749f83'],
    tooltip: {
      trigger: 'axis',
      formatter: `{b} : {c} ${data.unit}`,
    },
    xAxis: {
      data: xArr,
      boundaryGap: false,
      axisLabel: {
        color: '#112981',
        interval: 0,
      },
    },
    yAxis: {
      name: `单位 / ${data.unit}`,
      splitLine: {show: true},
      axisLabel: {
        color: '#f40',
        formatter: "{value}"
      }
    },
    series: [
      {
        type: 'line',
        showSymbol: true,
        data: yArr,
        markPoint: {
          data: [
            {type: 'max', name: '最大值'},
            {type: 'min', name: '最小值'}
          ]
        },
        markLine: {
          data: [
            {type: 'average', name: '平均值'}
          ]
        }
      }
    ]
  }
}


export let testData = {
  'bar': {
    'title': '每年实例数量变化表',
    'data': [{'x': '2011年', 'y': 98}, {'x': '2012年', 'y': 102}, {'x': '2013年', 'y': 108}, {
      'x': '2014年',
      'y': 107
    }, {'x': '2015年', 'y': 110}, {'x': '2016年', 'y': 118}, {'x': '2017年', 'y': 121}, {'x': '2018年', 'y': 127}],
    'unit': '个'
  },
  'pie': {
    'title': '各个领域分布实体数占比',
    'data': [{'name': '运输航空', 'value': 11}, {'name': '通用航空', 'value': 6}, {
      'name': '运输效率与经济效益',
      'value': 2
    }, {'name': '航空安全与服务质量', 'value': 4}, {'name': '教育与科技创新', 'value': 3}, {
      'name': '专业技术人员',
      'value': 2
    }, {'name': '对外关系', 'value': 1}, {'name': '适航审定', 'value': 1}, {'name': '固定资产投资', 'value': 1}, {
      'name': '节能减排',
      'value': 1
    }, {'name': '法规和信用体系建设', 'value': 1}, {'name': '工会工作', 'value': 1}]
  },
  'lineArr': {
    'title': '详细数据展示',
    'dataArr': [{
      'title': '全行业运输总周转量',
      'data': [{'x': '2011年', 'y': 577.44}, {'x': '2012年', 'y': 610.32}, {'x': '2013年', 'y': 671.72}, {
        'x': '2014年',
        'y': 748.12
      }, {'x': '2015年', 'y': 851.65}, {'x': '2016年', 'y': 962.51}, {'x': '2017年', 'y': 1083.08}, {
        'x': '2018年',
        'y': 1206.53
      }],
      'unit': '亿吨公里'
    }, {
      'title': '全行业运输飞机期末在册架数',
      'data': [{'x': '2011年', 'y': 1764.0}, {'x': '2012年', 'y': 1941.0}, {'x': '2013年', 'y': 2145.0}, {
        'x': '2014年',
        'y': 2370.0
      }, {'x': '2015年', 'y': 2650.0}, {'x': '2016年', 'y': 2950.0}, {'x': '2017年', 'y': 3296.0}, {
        'x': '2018年',
        'y': 3639.0
      }],
      'unit': '架'
    }, {
      'title': '颁证运输机场',
      'data': [{'x': '2011年', 'y': 180.0}, {'x': '2012年', 'y': 183.0}, {'x': '2013年', 'y': 193.0}, {
        'x': '2014年',
        'y': 202.0
      }, {'x': '2015年', 'y': 210.0}, {'x': '2016年', 'y': 218.0}, {'x': '2017年', 'y': 229.0}, {
        'x': '2018年',
        'y': 235.0
      }],
      'unit': '个'
    }, {
      'title': '全行业在册运输飞机平均日利用率',
      'data': [{'x': '2011年', 'y': 9.26}, {'x': '2012年', 'y': 9.15}, {'x': '2013年', 'y': 9.53}, {
        'x': '2014年',
        'y': 9.51
      }, {'x': '2015年', 'y': 9.49}, {'x': '2016年', 'y': 9.41}, {'x': '2017年', 'y': 9.49}, {'x': '2018年', 'y': 9.36}],
      'unit': '小时'
    }, {
      'title': '固定资产投资总额',
      'data': [{'x': '2011年', 'y': 51.9}, {'x': '2012年', 'y': 1464.6}, {'x': '2013年', 'y': 1452.2}, {
        'x': '2014年',
        'y': 1508.2
      }, {'x': '2015年', 'y': 1566.1}, {'x': '2016年', 'y': 1700.0}, {'x': '2017年', 'y': 1806.9}, {
        'x': '2018年',
        'y': 1957.8
      }],
      'unit': '亿元'
    }, {
      'title': '颁证运输机场',
      'data': [{'x': '2011年', 'y': 180.0}, {'x': '2012年', 'y': 183.0}, {'x': '2013年', 'y': 193.0}, {
        'x': '2014年',
        'y': 202.0
      }, {'x': '2015年', 'y': 210.0}, {'x': '2016年', 'y': 218.0}, {'x': '2017年', 'y': 229.0}, {
        'x': '2018年',
        'y': 235.0
      }],
      'unit': '个'
    }, {
      'title': '民航其他系统固定资产投资总额',
      'data': [{'x': '2011年', 'y': 174.3}, {'x': '2012年', 'y': 186.8}, {'x': '2013年', 'y': 179.6}, {
        'x': '2014年',
        'y': 149.5
      }, {'x': '2015年', 'y': 95.5}, {'x': '2016年', 'y': 132.4}, {'x': '2017年', 'y': 0}, {'x': '2018年', 'y': 0}],
      'unit': '亿元'
    }, {
      'title': '全行业货邮运输量',
      'data': [{'x': '2011年', 'y': 557.5}, {'x': '2012年', 'y': 631.0}, {'x': '2013年', 'y': 0}, {
        'x': '2014年',
        'y': 594.1
      }, {'x': '2015年', 'y': 629.3}, {'x': '2016年', 'y': 668.0}, {'x': '2017年', 'y': 705.9}, {
        'x': '2018年',
        'y': 738.51
      }],
      'unit': '万吨'
    }, {
      'title': '直属院校共招收学生',
      'data': [{'x': '2011年', 'y': 16409.0}, {'x': '2012年', 'y': 18006.0}, {'x': '2013年', 'y': 18071.2}, {
        'x': '2014年',
        'y': 0
      }, {'x': '2015年', 'y': 20509.0}, {'x': '2016年', 'y': 20633.0}, {'x': '2017年', 'y': 21636.0}, {
        'x': '2018年',
        'y': 23119.0
      }],
      'unit': '人'
    }]
  }
}
