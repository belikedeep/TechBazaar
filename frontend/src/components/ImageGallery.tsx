// ImageGallery: Displays a gallery of product images

import React from "react";

type Props = {
    images: string[];
};

const ImageGallery: React.FC<Props> = ({ images }) => {
    const [mainIdx, setMainIdx] = React.useState(0);
    if (!images || images.length === 0) return null;
    return (
        <div>
            <div className="flex items-center justify-center mb-4">
                <img
                    src={images[mainIdx]}
                    alt={`Main product image`}
                    className="w-full max-w-lg h-auto object-cover rounded"
                    style={{ aspectRatio: "1/1" }}
                />
            </div>
            {images.length > 1 && (
                <div className="flex gap-2 justify-center">
                    {images.map((img, idx) => (
                        <img
                            key={idx}
                            src={img}
                            alt={`Thumbnail ${idx + 1}`}
                            className={`w-16 h-16 object-cover rounded cursor-pointer border-2 ${mainIdx === idx ? "border-purple-600" : "border-transparent"}`}
                            onClick={() => setMainIdx(idx)}
                            style={{ transition: "border 0.2s" }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ImageGallery;