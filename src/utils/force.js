import * as d3 from 'd3';
import axios from 'axios';
import { Message } from 'view-design';
var width = document.body.clientWidth; // svg 宽度
var height = document.body.clientHeight; // svg 高度
var svg; // svg容器
var g;// svg内g容器
var nodes = []; // 节点数据集合
var edges = []; // 线数据集合
var colorScale; // 颜色比例尺
var forceSimulation; // 力模拟器
var links; // 线集合
var linksText; // 线上文本集合
var gs; // 点和点文字集合
var ifInit = false;
let labelArr = [
    '通用航空',
    '适航审定',
    '运输航空',
    '运输效率与经济效益',
    '规章发布',
    '节能减排',
    '航空安全与服务质量',
    '社会责任',
    '法规和信用体系建设',
    '教育与科技创新',
    '工会工作',
    '对外关系',
    '固定资产投资',
    '专业技术人员'
];
let colorArr = [
    '#FF4400',
    '#FF9999',
    '#CC0033',
    '#999966',
    '#3399CC',
    '#6666CC',
    '#99CC66',
    '#FF6666',
    '#99CC67',
    '#0099e4',
    '#ec91CC',
    '#bd9985',
    '#007eCC',
    '#8819ee'
];
// 关键函数，实时更新点、线位置    
function ticked() {
    links
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

    linksText
        .attr("x", d => (d.source.x + d.target.x) / 2)
        .attr("y", d => (d.source.y + d.target.y) / 2);

    gs.attr("transform", d => `translate(${d.x},${d.y})`);
}
// 准备拖动
function started(d, i) {
    if (!d3.event.active) {
        forceSimulation.alphaTarget(0.1).restart();
        //设置衰减系数，对节点位置移动过程的模拟，数值越高移动越快，数值范围[0，1]
    }
    d.fx = d.x;
    d.fy = d.y;
    d3.select(`.circleText_${i}`)
        .select('circle')
        .attr('stroke', '#333')
        .attr('stroke-width', '5px')
}
// 拖动
function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
}
// 结束拖动
function ended(d, i) {
    if (!d3.event.active) {
        forceSimulation.alphaTarget(0);
    }
    d.fx = null;
    d.fy = null;
    d3.select(`.circleText_${i}`)
        .select('circle')
        .attr('stroke', 'none')
        .attr('stroke-width', 'none')
}
// 初始化
function init() {
    if (ifInit) {
        return;
    }
    ifInit = true;
    width = width < 1280 ? 1280 : width;
    svg = d3.select(".myMap")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .call(d3.zoom() // zoom事件，缩放，移动svg图
            .scaleExtent([0.25, 1.5]) // 缩放范围
            .on('zoom', () => {
                d3.select('.svgCon')
                    .attr("transform", d3.event.transform)
            }))
        .on('dblclick.zoom', null);
    // 添加箭头
    svg.append('defs')
        .append('marker')
        .attr('id', 'marker')
        .attr("viewBox", '0 -5 10 10')
        .attr('markerWidth', 15)
        .attr('markerHeight', 30)
        .attr('refX', 17)
        .attr('refY', 0)
        .attr('orient', 'auto')
        .attr('markerUnits', 'userSpaceOnUse')
        .append('path')
        .attr('d', "M0,-5L10,0L0,5")
        .attr('fill', '#222')

    // 最外层的g，作为zoom事件操控容器
    g = svg.append("g").attr("class", 'svgCon')

    //设置一个color的颜色比例尺，为了让不同的扇形呈现不同的颜色
    colorScale = d3.scaleOrdinal()
        .domain(labelArr)
        .range(colorArr);

    // 力模拟器
    forceSimulation = d3.forceSimulation()
        .force("link", d3.forceLink())
        .force("center", d3.forceCenter())
        .force("charge", d3.forceManyBody().strength(-500))
        .force("collide", d3.forceCollide(50).strength(1).iterations(5))

    //生成节点数据
    forceSimulation.nodes(nodes)

    //生成边数据
    forceSimulation.force("link")
        .links(edges)
        .distance(250)
        .strength(1)

    //设置图形的中心位置
    forceSimulation.force("center")
        .x(width / 2)
        .y(height / 2);

    //绘制边
    links = g.append("g")
        .attr('class', 'linksCon')
        .selectAll("line")

    //边上文字
    linksText = g.append("g")
        .attr("class", 'linksTextCon')
        .selectAll("text")

    // 建立用来放在每个节点和对应文字的分组<g>
    gs = g.append("g")
        .attr("class", 'nodesCon')
        .selectAll(".circleText")


    forceSimulation.on("tick", ticked);
}

// 生成新的点
function addNodes(newNode) {
    nodes.push(newNode);
    console.log(nodes.length)
    // 新建一个<g>
    let new_gs = gs
        .data(nodes, d => d.id)
        .enter()
        .append("g")
        .attr('class', (d, i) => `circleText_${i}`)
        .attr("cursor", 'pointer')
        .call(d3.drag()
            .on("start", started)
            .on("drag", dragged)
            .on("end", ended)
        )
        .on('click', function (d, i) {
            if (!d.clicked) {
                d.clicked = true;
                clickFun(i, d.id);
            }
        })
    // 在<g>里绘制节点
    new_gs.append("circle")
        .attr("r", (d, i) => 12)
        .attr("fill", d => colorScale(d.label))

    // 在<g>里写入文字
    new_gs.append("text")
        .attr("x", 0)
        .attr("y", -25)
        .attr("dy", 10)
        .attr('fill', '#000')
        .attr("font-size", 16)
        .attr("text-anchor", 'middle')
        .attr('class', (d, i) => `text_${i}`)
        .text(d => d.name)
    gs = new_gs.merge(gs); // 合并
    forceSimulation.nodes(nodes);
}
// 生成新的线
function addEdges(newEdge) {
    edges.push(newEdge);
    // 写入新的line
    links = links
        .data(edges, (d) => {
            return `${d.source.name}-${d.target.name}`
        })
        .enter()
        .append("line")
        .attr('class', (d, i) => `link_${i}`)
        .attr("stroke", '#222')
        .attr("stroke-width", 2)
        .style('marker-end', "url(#marker)")
        .merge(links);
    // 给line写入新的text
    linksText = linksText
        .data(edges, (d) => {
            return `${d.source.name}-${d.target.name}`
        })
        .enter()
        .append("text")
        .attr('fill', '#000')
        .attr("font-size", 16)
        .attr("cursor", 'pointer')
        .text(function (d) {
            return d.relation;
        })
        .on("mouseover", function (d, i) {
            d3.select(this).attr("font-size", 25)
            d3.select(`.link_${i}`)
                .attr('stroke-width', 4)
                .attr('stroke', '#888')
        })
        .on("mouseout", function (d, i) {
            d3.select(this).attr("font-size", 16)
            d3.select(`.link_${i}`)
                .attr('stroke-width', 2)
                .attr('stroke', '#222')
        }).merge(linksText);
    forceSimulation.force('link').links(edges);
    
}
// 点击一个点
let tsstid = 999;
function clickFun(source, id) {
    // axios.get(`/api/graph/${id}/`)
    //     .then(res => {
    //         if (res.data.code == 100) {
    //             let graph = res.data.data.graph;
    //             let len = graph.length;
    //             let test = {
    //                 end_node: { id: 14, name: "通用航空", label: "通用航空" },
    //                 relationship: "包含",
    //                 start_node: { id: 0, name: "民用航空", label: "民航" }
    //             };
    //             console.log(graph[26])
    //             for (let i = 0; i < 30; i++) {
                    
    //                 addNodes({
    //                     clicked: false,
    //                     ...graph[i].end_node
    //                 })
    //                 addEdges({
    //                     source: source,
    //                     target: nodes.length - 1,
    //                     relation: graph[i].relationship
    //                 })
    //             }
    //             forceSimulation.alpha(1).restart();
    //         } else {
    //             Message.warning(res.data.msg);
    //         }
    //     })
    // return;
    for (let i = 0; i < 12; i++) {
        addNodes({
            name: '测试' + nodes.length,
            id: nodes.length + 2,
            label: '民航',
            clicked: false
        })
        addEdges({
            source: source,
            target: nodes.length - 1,
            relation: '测试2'
        })
    }
    forceSimulation.alpha(1).restart();

}
// 删除被点击的点的父节点的其他图谱
function delPreMap(source, id) {

}
// 获取该点的下一级图谱
function getNextMap() {

}

export default {
    init,
    ifInit,
    nodes,
    edges,
    addNodes,
    addEdges
}