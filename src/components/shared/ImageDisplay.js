import React from 'react';

const ImageDisplay = (props) => {
    const {picture, css} = props;
    const imgSrc = picture === ""
        ? `${process.env.PUBLIC_URL}/img/600x800.png`
        : picture;


    return (
        <img src={imgSrc} className="img-fluid" style={css}/>
    )
};

export default ImageDisplay;