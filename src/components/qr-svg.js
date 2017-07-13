import React from 'react';
import PropTypes from 'prop-types';

const QRCodeImpl = require('qr.js/lib/QRCode');
const ErrorCorrectLevel = require('qr.js/lib/ErrorCorrectLevel');

const imagePosition = (qrSize, imageSize) => (qrSize - imageSize) / 2;

const isImageAreaForSize = (qrSize, imageSize) => (col, row) => {
  const min = imagePosition(qrSize, imageSize);
  const max = min + imageSize;
  return (col >= min && col < max && row >= min && row < max);
}

export function QRCode({
    value = '',
    level = 'L',
    bgColor = '#FFFFFF',
    fgColor = '#000000',
    imageSize = 7,
    image,
    ...otherProps
} = {}) {
    // adapted from https://github.com/zpao/qrcode.react/blob/master/src/index.js
    const qrcode = new QRCodeImpl(-1, ErrorCorrectLevel[level]);
    qrcode.addData(value);
    qrcode.make();

    const cells = qrcode.modules;
    const position = imagePosition(cells.length, imageSize);
    const isImageArea = isImageAreaForSize(cells.length, imageSize);

    return (<svg shapeRendering="crispEdges" viewBox={[0, 0, cells.length, cells.length].join(' ')} {...otherProps}>
        {
            cells.map((row, rowIndex) =>
                row.map((cell, colIndex) => {
                  if (isImageArea(colIndex, rowIndex)) {
                    return null;
                  }
                  return (<rect height={1}
                        style={{ fill: cell ? fgColor : bgColor }}
                        width={1}
                        x={colIndex}
                        y={rowIndex}
                    />)
                }))
        }
        <g transform={`translate(${position} ${position})`}>{image}</g>
    </svg>);
}

QRCode.propTypes = {
    bgColor: PropTypes.string,
    fgColor: PropTypes.string,
    image: PropTypes.element,
    imageSize: PropTypes.number,
    level: PropTypes.oneOf(['L', 'M', 'Q', 'H']),
    size: PropTypes.number,
    value: PropTypes.string.isRequired,
};
