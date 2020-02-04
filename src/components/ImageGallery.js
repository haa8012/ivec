import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import reactCSS from 'reactcss';
import { __esModule } from 'rc-collapse';

function ImageGallery({ colNum }) {
  //   const [images, setImages] = useState();
  const colCalc = (1 / colNum) * 100 - 1;

  const styles = reactCSS({
    default: { image: { width: 'auto', maxWidth: 200 } }
  });

  const importAll = r => {
    return r.keys().map(r);
  };

  const getImgs = importAll(
    require.context('../images/', false, /\.(png|jpe?g|svg)$/)
  );
  console.log(getImgs);
  const imgs = () => {
    let all = [];

    for (let index = 0; index <= colNum; index++) {
      all.push(
        <div
          className='column'
          //   style={{
          //     flex: colCalc + '%',
          //     maxWidth: colCalc + '%',
          //     padding: '0 4px'
          //   }}
        >
          {getImgs.slice(index * colNum, index * colNum + colNum).map(i => (
            <div className='card' style={{ width: '100%' }}>
              <img src={i} alt='' style={{ width: '100%' }} />
              <div style={{ background: 'white', padding: '0.01em 16px' }}>
                <p style={{ fontSize: '12px' }}>Photo</p>
              </div>
            </div>
          ))}
        </div>
      );
    }
    return all;
  };

  return <div className='row'>{imgs()}</div>;
}

export default ImageGallery;
