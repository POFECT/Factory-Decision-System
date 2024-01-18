import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';
import { useSpring, animated } from 'react-spring';

const MyD3Heatmap = ({ capacity }) => {
  // const xLabels = capacity ? capacity.map(item => item.firmPsFacTp) : [];
  // const yLabels = capacity ? capacity.map(item => item.processCd) : [];
  // const data = capacity ? capacity.map(item => [Number(item.processCd) / 10, Number(item.firmPsFacTp), item.remainQty]) : [];

  const data = capacity ? capacity.map(item => [Number(item.processCd) / 10, Number(item.firmPsFacTp), (item.remainQty/item.planQty)]) : [];
  const reshapedData = data.map(([x, y, value]) => [x, y, value]);

  const xLabels = ['1공장', '2공장', '3공장'];
  const yLabels = ['제강', '열연', '열연정정', '냉간압연', '1차소둔', '2차소둔', '도금', '정정',];

  const xMax = Math.max(...reshapedData.map(([x]) => x));
  const yMax = Math.max(...reshapedData.map(([, y]) => y));

  const resultArray = Array.from({ length: xMax + 1 }, () => Array.from({ length: yMax + 1 }, () => 0));

  reshapedData.forEach(([x, y, value]) => {
    resultArray[x - 1][y - 1] = value;
  });

  const cleanedResultArray = resultArray.map(arr => arr.slice(0, -1));
  const transformedData = cleanedResultArray;


  const cellData = [
    ["1제강", "2제강", ""],
    ["1열연", "2열연", ""],
    ["1열연정정", "2열연정정", ""],
    ["1PCM", "2PCM", "3PCM"],
    ["1CAL", "2CAL", "3CAL"],
    ["1ACL", "", "3ACL"],
    ["", "2EGL", "3EGL"],
    ["1RCL", "", ""]
  ];

  const legendData = ["여유", "보통", "부하"];

  const [hoveredCell, setHoveredCell] = useState(null);
  const [clickedCell, setClickedCell] = useState(null);

  const fadeInAnimation = useSpring({
    opacity: hoveredCell !== null ? 0.9 : 1,
    from: { opacity: 0 },
    config: { duration: 500 },
  });

  useEffect(() => {
    const xSize = 130;
    const ySize = 70;
    const textColor = "#000";
    const legendWidth = 90;
    const legendHeight = 30;

    const colorScale = d3.scaleSequential()
      .domain([0, d3.max(transformedData.flat())])
      .interpolator(d3.interpolateRgb('#e61919', '#F8E0E0'));

    const legendColorScale = d3.scaleSequential()
      .domain([0, legendData.length - 1])
      .interpolator(d3.interpolateRgb('#F8E0E0', '#e61919'));

    const svg = d3.select('#heatmap-svg')
      .attr('transform', 'translate(-30, 0)');

    svg.selectAll('*').remove();

    svg.selectAll('.xLabel')
      .data(xLabels.flat())
      .enter().append('text')
      .text(d => d !== 0 ? d : '')
      .attr('x', (d, i) => i * xSize)
      .attr('y', 0)
      .style('text-anchor', 'middle')
      .attr('transform', `translate(${xSize / 2}, -6)`);

    svg.selectAll('.yLabel')
      .data(yLabels)
      .enter().append('text')
      .text(d => d !== 0 ? d : '').raise()
      .attr('x', 155)
      .attr('y', (d, i) => i * (ySize) + 110)
      .style('text-anchor', 'end')
      // .style('text-anchor', '')
      // .style('dominant-baseline', 'middle')
      .style('pointer-events', 'none')
      .style('font-size', '13px')

      .style('fill', textColor)
      .attr('transform', `translate(-6, ${ySize / 1.5})`);

    const legend = svg.selectAll('.legend')
      .data(legendData)
      .enter().append('rect')
      .attr('class', 'legend')
      .attr('width', legendWidth)
      .attr('height', 15)
      .attr('x', (d, i) => i * legendWidth + 215)
      .attr('y', yLabels.length * ySize - 530)
      .style('fill', (d, i) => legendColorScale(i));

    svg.selectAll('.legendText')
      .data(legendData)
      .enter().append('text')
      .attr('class', 'legendText')
      .text(d => d)
      .attr('x', (d, i) => (i * legendWidth + legendWidth / 2) + 205)
      .attr('y', yLabels.length * ySize + 30 - 530)
      .style('font-size', '14px')

      .style('dominant-baseline', 'middle')
      .style('fill', textColor);



    const cells = svg.selectAll('.cell')
      .lower()
      .data(transformedData.flat())
      .enter().append('rect')
      .attr('class', 'cell')
      .attr('width', xSize)
      .attr('height', ySize)
      .attr('x', (d, i) => (i % xLabels.length) * xSize + 165)
      .attr('y', (d, i) => Math.floor(i / xLabels.length) * ySize + 110)
      .attr('rx', 3)
      .attr('ry', 3)
      .style('fill', d => d === 0 ? 'none' : colorScale(d))
      .on('mouseover', (event, d) => {
        setHoveredCell(d);
        d3.select(event.target).style('opacity', 0.7);
      })

      .on('mouseout', (event) => {
        setHoveredCell(null);
        d3.select(event.target).style('opacity', hoveredCell !== null ? 0.9 : 1);
      })
      .on('click', (event, d) => {
        setClickedCell(d);
      });


    svg.selectAll('.cellText')
      .data(cellData.flat())
      .enter().append('text')
      .text(d => d !== 0 ? d : '')
      .attr('x', (d, i) => (i % xLabels.length) * xSize + xSize / 2 + 165)
      .attr('y', (d, i) => Math.floor(i / xLabels.length) * ySize + ySize / 2 + 110)
      .style('text-anchor', 'middle')
      .style('dominant-baseline', 'middle')
      .style('font-size', '14px')

      .style('fill', textColor);
  }, [transformedData, cellData, xLabels, yLabels, hoveredCell]);

  return (
    <>
    <p style={{fontSize:19,  }}>선택된 공장의 잔여량: <span style={{ color: 'blue' }}>{clickedCell}(ton)</span></p>
      <animated.div style={{ fadeInAnimation, display: 'flex' }}>
        <div>
          {/* <p>Hovered Cell: {hoveredCell}</p> */}
        </div>
        <svg id="heatmap-svg" width={1200} height={yLabels.length * 90}>
        </svg>
      </animated.div>
    </>
  );
};

export default MyD3Heatmap;
