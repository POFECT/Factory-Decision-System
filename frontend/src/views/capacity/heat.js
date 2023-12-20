import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { useSpring, animated } from 'react-spring';

const Heatmap = dynamic(() => import('react-heatmap-grid'), { ssr: false });

const MyHeatmap = ({ capacity }) => {
  const data = [
    //  data
    [8, 9, 0],
    [4, 2, 0],
    [2, 3, 0],
    [3, 4, 5],
    [8, 5, 8],
    [3, 0, 11],
    [0, 6, 7],
    [11, 0, 0],
  ];

  console.log("Data:", data);

  console.log("Heat", capacity[0]?.remainQty);
  console.log("Heat", capacity);

  const xLabels = ['1공장', '2공장', '3공장'];
  const yLabels = ['제강', '열연', '열연정정', '냉간압연', '1차소둔', '2차소둔', '도금', '정정'];

  const options = {
    xLabels: xLabels,
    yLabels: yLabels,
  };

  const [hoveredCell, setHoveredCell] = useState(null);

  const fadeInAnimation = useSpring({
    opacity: hoveredCell !== null ? 0.9 : 1,
    from: { opacity: 0 },
    config: { duration: 500 },
  });

  return (
    <animated.div style={fadeInAnimation}>
      <Heatmap
        data={data}
        xLabels={options.xLabels}
        yLabels={options.yLabels}
        height='70px'
        cellRender={(x, y, value) => (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid #ddd',
              transition: 'background-color 0.3s ease',
              backgroundColor: hoveredCell === `${x}-${y}` ? '#D3D3D3' : 'transparent',
              height: '70px',
              color: value === 0 ? '#aaa' : '#000', // 
              fontWeight: 'bold', 
            }}
            key={`cell-${x}-${y}`}
            onMouseEnter={() => setHoveredCell(`${x}-${y}`)}
            onMouseLeave={() => setHoveredCell(null)}
          >
            {value}
          </div>
        )}
      />
    </animated.div>
  );
};

export default MyHeatmap;
