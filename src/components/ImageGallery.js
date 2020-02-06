import React, { useState, useEffect } from 'react';
import ModalImage from 'react-modal-image';

function ImageGallery({ colNum }) {
  const importAll = r => {
    return r.keys().map(r);
  };

  const getImgs = importAll(
    require.context('../images/', false, /\.(png|jpe?g|svg)$/)
  );
  // console.log(getImgs);

  // const imgs = getImgs.map(i => (
  //   <div className='card'>
  //     <img src={i} alt='' style={{ width: '100%' }} />
  //     <div style={{ background: 'white', padding: '0.01em 16px' }}>
  //       <p style={{ fontSize: '12px' }}>Photo</p>
  //     </div>
  //   </div>
  // ));

  // return <div className='cards'>{imgs}</div>;

  //https://medium.com/@MilesOfRoses/css-image-gallery-for-pictures-with-different-aspect-ratios-a20ffecb75d5
  // the best solution to create a good looking image grid
  const imgs = getImgs.map(i => (
    <div>
      <ModalImage small={i} medium={i} showRotate={true} alt='' className='' />
      {/* <img src={i} alt='' /> */}
    </div>
  ));

  return <div className='images-wrapper'>{imgs}</div>;
}

export default ImageGallery;

{
  /* <div style={{ position: 'relative', top: -35, display: 'block' }}>
        <div
          style={{
            background: 'white',
            width: 50,
            height: 20,
            marginBottom: 5,
            marginLeft: 5,
            opacity: 0.5
          }}
        ></div>
        <div style={{ paddingLeft: 5, opacity: 1 }}>Photo...</div>
      </div> */
}

// Old code

// import React, { useState, useEffect } from 'react';
// import ReactDOM from 'react-dom';
// import reactCSS from 'reactcss';
// import { __esModule } from 'rc-collapse';

// function ImageGallery({ colNum }) {
//   //   const [images, setImages] = useState();
//   const colCalc = (1 / colNum) * 100 - 1;

//   const styles = reactCSS({
//     default: { image: { width: 'auto', maxWidth: 200 } }
//   });

//   const importAll = r => {
//     return r.keys().map(r);
//   };

//   const getImgs = importAll(
//     require.context('../images/', false, /\.(png|jpe?g|svg)$/)
//   );
//   console.log(getImgs);
//   const imgs = () => {
//     let all = [];

//     for (let index = 0; index <= colNum; index++) {
//       all.push(
//         <div
//           className='column'
//           //   style={{
//           //     flex: colCalc + '%',
//           //     maxWidth: colCalc + '%',
//           //     padding: '0 4px'
//           //   }}
//         >
//           {getImgs.slice(index * colNum, index * colNum + colNum).map(i => (
//             <div className='card' style={{ width: '100%' }}>
//               <img src={i} alt='' style={{ width: '100%' }} />
//               <div style={{ background: 'white', padding: '0.01em 16px' }}>
//                 <p style={{ fontSize: '12px' }}>Photo</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       );
//     }
//     return all;
//   };

//   return <div className='row'>{imgs()}</div>;
// }

// export default ImageGallery;
