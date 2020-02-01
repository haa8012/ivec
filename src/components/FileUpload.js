import React, { Fragment, useState, useEffect } from 'react';
import ImageToVec from './ImageToVec';
import ColorPicker from './ColorPicker';
import loadIcon from './loading.gif';
import ReactCompareImage from 'react-compare-image';
import palette from 'image-palette';
import pixels from 'image-pixels';
import exchange from './exchange.svg';
import 'rc-collapse/assets/index.css';
import Collapse, { Panel } from 'rc-collapse';
import skaler from 'skaler';

const FileUpload = () => {
  const [filename, setFilename] = useState('');
  const [fileURL, setFileURL] = useState('');
  const [threshold, setThreshold] = useState(120);
  const [valueBack, setBackValue] = useState({ r: 0, g: 0, b: 0, a: 1 });
  const [valueColor, setColorValue] = useState({
    r: 255,
    g: 255,
    b: 255,
    a: 1
  });
  const [loaded, setLoaded] = useState(false);
  const [valueBackRGB, setBackValueRGB] = useState({ r: 0, g: 0, b: 0, a: 1 });
  const [valueColorRGB, setColorValueRGB] = useState({
    r: 255,
    g: 255,
    b: 255,
    a: 1
  });
  const [svg, setSVG] = useState(null);
  const [rendering, setRendering] = useState(false);

  useEffect(() => {}, [rendering]);

  //   const resizeImage = async img => {
  //     const image = await jimp.read(img);
  //     return image.resize(1200, jimp.AUTO);
  //     // return getBase64Async(imgCurr.getMIME());
  //   };

  const hexToRgbA = hex => {
    var c;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
      c = hex.substring(1).split('');
      if (c.length === 3) {
        c = [c[0], c[0], c[1], c[1], c[2], c[2]];
      }
      c = '0x' + c.join('');
      return (
        // 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',1)'
        { r: (c >> 16) & 255, g: (c >> 8) & 255, b: c & 255, a: 1 }
      );
    }
    throw new Error('Bad Hex');
  };
  const rgbToHex = (r, g, b) =>
    '#' +
    [r, g, b]
      .map(x => {
        const hex = x.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      })
      .join('');

  const onChange = async e => {
    setFilename(e.target.files[0].name);
    if (e.target.files[0]) {
      const imgSize = (e.target.files[0].size / 1048576).toFixed(2);
      let pixel;

      if (imgSize > 3) {
        const file = await skaler(e.target.files[0], {
          scale: 0.7 / Math.log(25)
        });
        console.log(URL.createObjectURL(file));

        setFileURL(URL.createObjectURL(file));
        pixel = await pixels(URL.createObjectURL(file));
      } else {
        setFileURL(URL.createObjectURL(e.target.files[0]));
        pixel = await pixels(URL.createObjectURL(e.target.files[0]));
      }

      let { colors, amount } = palette(pixel, 2);
      let cb = colors[amount.indexOf(Math.max(...amount))];
      let cf = colors[amount.indexOf(Math.min(...amount))];

      setBackValue(rgbToHex(cb[0], cb[1], cb[2]));
      setColorValue(rgbToHex(cf[0], cf[1], cf[2]));

      setColorValueRGB({
        r: cf[0],
        g: cf[1],
        b: cf[2],
        a: 1
      });

      setBackValueRGB({
        r: cb[0],
        g: cb[1],
        b: cb[2],
        a: 1
      });

      setLoaded(true);

      setRendering(true);
    }
  };

  return (
    <Fragment>
      <Collapse accordion={true}>
        <Panel
          header='Upload file'
          headerClass='my-header-class'
          onClick={e => {
            console.log('panel changed...', e);
          }}
        >
          {/* <div className='sub-container'> */}
          {/* <div className='header'>Upload File </div> */}

          <label for='file-upload' class='custom-file-upload'>
            <div
              style={{
                background: 'transparent',
                //   position: 'absolute',
                //   top: 200,
                left: '50%',
                margin: 'auto',
                textAlign: 'center',
                transform: 'translate(-50%, -50%)'
              }}
            >
              <i
                class='fa fa-cloud-upload'
                style={{ fontSize: 40, color: '#ccc', paddingRight: 10 }}
              ></i>
              <div style={{ marginRight: 20 }}>
                Drop image here or click to upload
              </div>
            </div>

            <input id='file-upload' type='file' onChange={onChange}></input>
          </label>

          <div style={{ color: '#646c7f', fontSize: 12 }}>{filename}</div>
          {/* </div> */}
        </Panel>
        <Panel header='Preview'>
          {loaded ? (
            <div id='workArea'>
              <div
                className='sub-container'
                style={{ display: fileURL ? 'block' : 'none' }}
              >
                <div className='header'>Settings </div>
                <div className=''>
                  <div className='settings'>
                    <div className='set-elm'>
                      <label for='background'>Background </label>

                      <ColorPicker
                        setBackValue={setBackValue}
                        val={1}
                        initColor={valueBackRGB}
                      />

                      <div
                        onClick={() => {
                          setBackValue(valueColor);
                          setColorValue(valueBack);
                          setColorValueRGB(hexToRgbA(valueBack));
                          setBackValueRGB(hexToRgbA(valueColor));
                        }}
                        style={{
                          width: 20,
                          height: 10,
                          alignSelf: 'flex-start',
                          marginLeft: 50
                        }}
                      >
                        <img
                          src={exchange}
                          style={{ background: 'gery' }}
                          alt=''
                        />
                      </div>
                      <label for='color'>Color </label>
                      <ColorPicker
                        setColorValue={setColorValue}
                        val={2}
                        initColor={valueColorRGB}
                      />
                    </div>

                    <div className='set-elm'>
                      <label for='threshold'>Threshold </label>
                      <div
                        style={{
                          // borderBottom: 'none',
                          background: `linear-gradient(to left, ${valueColor}, ${valueBack})`,
                          borderRadius: 15,
                          width: '100%',
                          display: 'flex',
                          alignSelf: 'flex-end',
                          border: '1px solid #7E7E7E'
                        }}
                      >
                        <input
                          type='range'
                          id='customRange'
                          min={0}
                          max={255}
                          style={{ width: '100%', height: 15 }}
                          defaultValue={threshold}
                          onChange={e => {
                            setThreshold(e.target.value);
                          }}
                        />
                      </div>
                      <input
                        className='input'
                        id='threshold'
                        name='threshold'
                        type={Number}
                        min={0}
                        max={255}
                        style={{ width: 40 }}
                        value={threshold}
                        onChange={e => {
                          if (+e.target.value > 255) {
                            setThreshold(255);
                            return;
                          }
                          setThreshold(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div
                className='sub-container'
                style={{ display: fileURL ? 'block' : 'none' }}
              >
                <div className='header'>Preview</div>
                <img
                  id='load'
                  alt=''
                  src={loadIcon}
                  style={{
                    display: rendering ? 'block' : 'none',
                    width: 180,
                    height: 150,
                    // position: 'fixed',
                    // top: 300,
                    margin: 'auto',
                    textAlign: 'center',
                    zIndex: 2
                  }}
                />

                <ImageToVec
                  fileURL={fileURL}
                  threshold={+threshold}
                  background={valueBack}
                  color={valueColor}
                  setSVG={setSVG}
                />
                <div
                  onLoad={e => {
                    setRendering(false);
                  }}
                >
                  <ReactCompareImage
                    leftImage={svg}
                    rightImage={fileURL}
                    id='result'
                  />
                </div>
                <div
                  style={{
                    paddingTop: 50,
                    float: 'right',
                    zIndex: 2,
                    height: 50,
                    display: 'inline'
                  }}
                ></div>
              </div>
            </div>
          ) : null}
        </Panel>
      </Collapse>
      <footer style={{ height: 50 }}></footer>
    </Fragment>
  );
};

export default FileUpload;
