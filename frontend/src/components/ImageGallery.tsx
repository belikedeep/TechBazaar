// ImageGallery: Displays a gallery of product images

import React from "react";

type Props = {
    images: string[];
};

const ImageGallery: React.FC<Props> = ({ images }) => {
    return (
        <div>
            {/* TODO: Thumbnails and main image display */}
            {images.map((img, idx) => (
                <img key={idx} src={img} alt={`Product image ${idx + 1}`} />
            ))}
        </div>
    );
};

export default ImageGallery;