import React from 'react';

const ImageDisplay = (props) => {
    const {picture, width} = props;

    const imgSrc = picture === ""
        ? `${process.env.PUBLIC_URL}/img/600x800.png`
        : picture;


    return (
        <img src={imgSrc} style={{width: width}}/>
    )
};

export default ImageDisplay;