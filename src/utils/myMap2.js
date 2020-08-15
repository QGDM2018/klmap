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
let ctrlClick = false; // 控制点击频率
let httpUrl =
    process.env.NODE_ENV === "production"
        ? process.env.VUE_APP_URL
        : '/localHttp';
let labelArr = [
    '民航',
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
    '#fffeee',
    '#521eee',
    '#FF3333',
    '#FFAA33',
    '#FFFF77',
    '#CCFF33',
    '#00DD00',
    '#00BBFF',
    '#CCBBFF',
    '#9F88FF',
    '#FF3EFF',
    '#770077',
    '#880000',
    '#CC6600',
    '#FF88C2'
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
    d3.select(`.myMap2 .circleText_${i}`)
        .select('circle')
        .attr('stroke-width', '4px')
    d3.select(`.myMap2 .circleText_${i}`)
        .select('text')
        .attr('fill', '#f40')
        .attr("font-size", 20)
}
// 拖动
function dragged(d, i) {
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
    d3.select(`.myMap2 .circleText_${i}`)
        .select('circle')
        .attr('stroke-width', '2px')
    d3.select(`.myMap2 .circleText_${i}`)
        .select('text')
        .attr('fill', '#000')
        .attr("font-size", 16)
}
// 初始化
function init() {
    width = width < 1680 ? 1680 : width;
    svg = d3.select(".myMap2")
        .attr("width", width)
        .attr("height", height)
        .call(d3.zoom() // zoom事件，缩放，移动svg图
            .scaleExtent([0.25, 1.5]) // 缩放范围
            .on('zoom', () => {
                d3.select('.myMap2 .svgCon')
                    .attr("transform", d3.event.transform)
            }))
        .on('dblclick.zoom', null);
    // 添加箭头
    svg.append('defs')
        .append('marker')
        .attr('id', 'marker2')
        .attr("viewBox", '0 -5 10 10')
        .attr('markerWidth', 25)
        .attr('markerHeight', 25)
        .attr('refX', 19)
        .attr('refY', 0)
        .attr('orient', 'auto')
        .attr('markerUnits', 'userSpaceOnUse')
        .append('path')
        .attr('d', "M0, -5 L10, 0 L0, 5")
        .attr('fill', '#666')

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
        .force("charge", d3.forceManyBody().strength(-1500))
        .force("collide", d3.forceCollide(50).strength(1).iterations(5))

    //生成节点数据
    forceSimulation.nodes(nodes)

    //生成边数据
    forceSimulation.force("link")
        .links(edges)
        .distance(150)
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
    // 新建一个<g>
    let new_gs = gs
        .data(nodes, d => d.id)
        .enter()
        .append("g")
        .attr('test_id', d => d.id)
        .attr('class', (d, i) => `circleText_${i}`)
        .attr("cursor", 'pointer')
        .call(d3.drag()
            .on("start", started)
            .on("drag", dragged)
            .on("end", ended)
        )

    // 在<g>里绘制节点
    new_gs.append("circle")
        .attr("r", 25)
        .attr('stroke', '#333')
        .attr('stroke-width', '2px')
        .attr("fill", d => colorScale(d.label))
        .attr("fill-opacity", "1")
        .on('mouseenter', function (d, i) {
            d3.select(`.myMap2 .circleText_${i} .tooltips`)
                .attr('display', '')
        })
        .on('mouseleave', function (d, i) {
            d3.select(`.myMap2 .circleText_${i} .tooltips`)
                .attr('display', 'none')
        })

    // 在<g>里写入文字
    new_gs.append("text")
        .attr("x", 0)
        .attr("y", -40)
        .attr("dy", 10)
        .attr('fill', '#000')
        .attr("font-size", 16)
        .attr("text-anchor", 'middle')
        .attr('class', (d, i) => `text_${i}`)
        .text(d => d.name)

    // 在<g>里写入悬浮框
    let tooltipsCon = new_gs.append("g")
        .attr('class', 'tooltips')
        .attr('transform', 'translate(-120, -215)')
        .attr('display', 'none')

    tooltipsCon.append('path')
        .attr('fill', 'rgba(1,1,1, 0.5)')
        .attr('transform', ' scale(0.6)')
        .attr('d', 'M 32.1,42.7 54.5,257 185,257 193,269 200,282 207,269 214,257 342,257 368,23.9 Z')

    tooltipsCon.append('foreignObject')
        .attr("x", 35)
        .attr("y", 30)
        .attr("width", 170)
        .attr('height', 120)
        .attr('class', 'd3_tipsCon')
        .html(d => `
            <p class="d3_tips"> 
                <span class="left">label：</span>
                <span class="right">${d.label ? d.label : '暂无'}</span>
            </p>
            <p class="d3_tips"> 
                <span class="left">value：</span>
                <span class="right">${d.value ? d.value : '暂无'}</span>
            </p>
        `)

    gs = new_gs.merge(gs); // 合并
    forceSimulation.nodes(nodes);
}
// 生成新的线
function addEdges(newEdge) {
    edges.push(newEdge);
    // 写入新的line
    links = links
        .data(edges, (d) => {
            return `${d.source.name}-${d.target.name}-${d.relation}`
        })
        .enter()
        .append("line")
        .attr('class', (d, i) => `link_${i}`)
        .attr("stroke", '#666')
        .attr("stroke-width", 2)
        .style('marker-end', "url(#marker2)")
        .merge(links);
    // 给line写入新的text
    linksText = linksText
        .data(edges, (d) => {
            return `${d.source.name}-${d.target.name}-${d.relation}`
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
            d3.select(`.myMap2 .link_${i}`)
                .attr('stroke-width', 4)
                .attr('stroke', '#f40')
        })
        .on("mouseout", function (d, i) {
            d3.select(this).attr("font-size", 16)
            d3.select(`.myMap2 .link_${i}`)
                .attr('stroke-width', 2)
                .attr('stroke', '#666')
        }).merge(linksText);
    forceSimulation.force('link').links(edges);

}
// 查找指定id的点在数组nodes的位置
function findNodesIndex(id) {
    let i;
    let len = nodes.length;
    for (i = 0; i < len; i++) {
        if (nodes[i].id == id) {
            break;
        }
    }
    return i;
}
// 画全部线条
function drawAll() {
    init();
    let node_d = { id: 0, name: "民用航空", label: "民航", clicked: true };
    addNodes(node_d);
    axios.get(`${httpUrl}/graph/`)
        .then(res => {
            if (res.data.code == 100) {
                let graph = res.data.data.graph;
                let len = graph.length;
                for (let i = 0; i < len; i++) {
                    let target = findNodesIndex(graph[i].end_node.id);
                    let source = findNodesIndex(graph[i].start_node.id);
                    if (target == nodes.length) {
                        // 该点未画，则在svg新画这个点
                        addNodes({
                            clicked: true,
                            ...graph[i].end_node
                        })
                    }
                    // 连线
                    addEdges({
                        source: source,
                        target: target,
                        relation: graph[i].relationship
                    })
                }
                forceSimulation.alpha(1).restart();
            } else {
                Message.warning(res.data.msg);
            }
        })
        .catch(err => {
            console.error(err)
            ctrlClick = false;
        })
}

export default {
    drawAll
}