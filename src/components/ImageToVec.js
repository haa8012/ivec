import React, { Fragment } from 'react';
import potrace from 'potrace';
import htmlToImage from 'html-to-image';
import download from 'downloadjs';
import svgToDataURL from 'svg-to-dataurl';

const ImageToVec = ({ fileURL, threshold, background, color, setSVG }) => {
  var trace = new potrace.Potrace();

  trace.setParameters({
    threshold,
    color,
    background,
    steps: 3,
    turdSize: 0
    // steps: [40, 85, 135, 180]
  });

  trace.loadImage(fileURL, function(err) {
    if (err) throw err;

    setSVG(svgToDataURL(trace.getSVG()));
  });

  const saveImage = async format => {
    try {
      var node = document.querySelector('[data-testid="left-image"]');
      const currentStyle = node.getAttribute('style');

      node.setAttribute(
        'style',
        'clip: none; display: block; height: 100%; object-fit: cover; position: absolute; width: 100%;'
      );

      if (format === 'png') {
        await htmlToImage.toPng(node).then(async dataUrl => {
          download(dataUrl, 'image.png');
        });
      } else if (format === 'svg') {
        await htmlToImage.toSvgDataURL(node).then(async dataUrl => {
          download(dataUrl, 'image.svg');
        });
      } else if (format === 'jpg') {
        await htmlToImage.toJpeg(node).then(async dataUrl => {
          download(dataUrl, 'image.jpg');
        });
      }
      node.setAttribute('style', currentStyle);
    } catch (error) {
      console.log("Couldn't save image, ", error);
    }
  };

  return (
    <Fragment>
      <div>
        <div
          class='dropdown'
          style={{ background: background, float: 'right', zIndex: 1 }}
        >
          <button class='dropbtn'>
            Download {}
            <i class='fa fa-caret-down'></i>
          </button>
          <div class='dropdown-content'>
            <div
              className='lnk'
              href=''
              onClick={() => {
                saveImage('svg');
              }}
            >
              SVG
            </div>
            <div
              className='lnk'
              href=''
              onClick={() => {
                saveImage('png');
              }}
            >
              PNG
            </div>
            <div
              className='lnk'
              href=''
              onClick={() => {
                saveImage('jpg');
              }}
            >
              JPG
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ImageToVec;
