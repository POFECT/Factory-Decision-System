import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';
import { useSpring, animated } from 'react-spring';

const MyD3Heatmap = ({ capacity , marginLeft}) => {
  // const xLabels = capacity ? capacity.map(item => item.firmPsFacTp) : [];
  // const yLabels = capacity ? capacity.map(item => item.processCd) : [];
  const data = capacity ? capacity.map(item => [Number(item.processCd) / 10, Number(item.firmPsFacTp), item.remainQty]) : [];
  const reshapedData = data.map(([x, y, value]) => [x, y, value]);


   const xLabels = ['1공장', '2공장', '3공장'];
  const yLabels = ['제강', '열연', '열연정정', '냉간압연', '1차소둔', '2차소둔', '도금', '정정', '빈값'];

  const xMax = Math.max(...reshapedData.map(([x]) => x));
  const yMax = Math.max(...reshapedData.map(([, y]) => y));

  const resultArray = Array.from({ length: xMax + 1 }, () => Array.from({ length: yMax + 1 }, () => 0));

  reshapedData.forEach(([x, y, value]) => {
    resultArray[x - 1][y - 1] = value;
  });

  const cleanedResultArray = resultArray.map(arr => arr.slice(0, -1));
console.log("))))))",cleanedResultArray)
  const transformedData = cleanedResultArray;
  // const xLabels = ['1공장', '2공장', '3공장'];
  // const yLabels = ['제강', '열연', '열연정정', '냉간압연', '1차소둔', '2차소둔', '도금', '정정', '빈값'];

  const [hoveredCell, setHoveredCell] = useState(null);
  const [clickedCell, setClickedCell] = useState(null);

  const fadeInAnimation = useSpring({
    opacity: hoveredCell !== null ? 0.9 : 1,
    from: { opacity: 0 },
    config: { duration: 500 },
  });

  useEffect(() => {
    const xSize = 100;
    const ySize = 70; 
    const textColor = "#000";

    const colorScale = d3.scaleSequential()
      .domain([0, d3.max(transformedData.flat())])
      .interpolator(d3.interpolateRgb('#e61919', '#F8E0E0'));

const svg = d3.select('#heatmap-svg')
  .attr('transform', `translate(${marginLeft}, 0)`); 

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
      .data(yLabels.flat())
      // .enter().append('text')
      .text(d => d !== 0 ? d : '')
      .attr('x', 0)
      .attr('y', (d, i) => i * ySize)
      // .style('text-anchor', 'end')
      // .style('text-anchor', 'start')
      // .style('dominant-baseline', 'middle')
      .style('fill', textColor)
      .attr('transform', `translate(-6, ${ySize / 1.5})`);
 svg.selectAll('.cellText')
      .data(transformedData.flat())
      .enter().append('text')
      .text(d => d !== 0 ? d : '')
      .attr('x', (d, i) => (i % xLabels.length) * xSize + xSize / 2)
      .attr('y', (d, i) => Math.floor(i / xLabels.length) * ySize + ySize / 2)
      .style('text-anchor', 'middle')
      .style('dominant-baseline', 'middle')
      .style('fill', textColor);
      
    const cells = svg.selectAll('.cell')
      .data(transformedData.flat())
      .enter().append('rect')
      .attr('class', 'cell')
      .attr('width', xSize)
      .attr('height', ySize)
      .attr('x', (d, i) => (i % xLabels.length) * xSize)
      .attr('y', (d, i) => Math.floor(i / xLabels.length) * ySize)
      .attr('rx', 4)
      .attr('ry', 4)
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
      .data(transformedData.flat())
      .enter().append('text')
      .text(d => d !== 0 ? d : '')
      .attr('x', (d, i) => (i % xLabels.length) * xSize + xSize / 2)
      .attr('y', (d, i) => Math.floor(i / xLabels.length) * ySize + ySize / 2)
      .style('text-anchor', 'middle')
      .style('dominant-baseline', 'middle')
      .style('fill', textColor);
  }, [transformedData, xLabels, yLabels, hoveredCell]);

  return (
    <animated.div style={fadeInAnimation}>
      <div>
        {/* <p>Hovered Cell: {hoveredCell}</p> */}
        <p>Clicked Cell: {clickedCell}</p>
      </div>
      <svg id="heatmap-svg" width={xLabels.length * 100} height={yLabels.length * 80}>
      </svg>
    </animated.div>
  );
};

export default MyD3Heatmap;
