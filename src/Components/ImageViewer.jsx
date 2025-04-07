import image from "../assets/cell_image.png";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import React, { useRef, useEffect, useState } from "react";

const previewSize = 192; // Width of the preview thumbnail
const previewHeight = 250; // Height of the preview thumbnail

const ImageViewer = () => {
  const imgRef = useRef(null);
  const lensRef = useRef(null);
  const wrapperRef = useRef(null);

  const [lensStyle, setLensStyle] = useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
  });

  const handleTransform = ({ state }) => {
    const { scale, positionX, positionY } = state;
    const img = imgRef.current;

    if (!img || !img.naturalWidth || !img.naturalHeight) return;

    const naturalWidth = img.naturalWidth;
    const naturalHeight = img.naturalHeight;

    const previewRatioX = previewSize / naturalWidth;
    const previewRatioY = previewHeight / naturalHeight;

    const visibleWidth = naturalWidth / scale;
    const visibleHeight = naturalHeight / scale;

    const offsetX = Math.max(0, -positionX / scale);
    const offsetY = Math.max(0, -positionY / scale);

    const maxOffsetX = naturalWidth - visibleWidth;
    const maxOffsetY = naturalHeight - visibleHeight;

    const clampedX = Math.min(offsetX, maxOffsetX);
    const clampedY = Math.min(offsetY, maxOffsetY);

    const lensWidth = visibleWidth * previewRatioX;
    const lensHeight = visibleHeight * previewRatioY;

    setLensStyle({
      width: `${lensWidth}px`,
      height: `${lensHeight}px`,
      left: `${clampedX * previewRatioX}px`,
      top: `${clampedY * previewRatioY}px`,
    });
  };

  const data = {
    RBC: [
      { type: "Angled Cells", count: 222, percentage: "67%" },
      { type: "Borderline Ovalocytes", count: 50, percentage: "20%" },
      { type: "Burr Cells", count: 87, percentage: "34%" },
      { type: "Fragmented Cells", count: 2, percentage: "0.12%" },
      { type: "Ovalocytes", count: "", percentage: "" },
      { type: "Rounded RBC", count: "", percentage: "" },
      { type: "Teardrops", count: "", percentage: "" },
    ],
    WBC: [
      { type: "Basophil", count: 222, percentage: "67%" },
      { type: "Eosinophil", count: 50, percentage: "20%" },
      { type: "Lymphocyte", count: 87, percentage: "34%" },
      { type: "Monocyte", count: 2, percentage: "0.12%" },
    ],
    Platelets: {
      count: 222,
      percentage: 222,
    },
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <div className="bg-blue-800 h-[50px] w-full text-black flex items-center justify-start px-4">
        <span></span>
      </div>

      <div className="flex h-full">
        {/* Left Side (Info or menu) */}
        <div className="w-1/4 bg-white shadow px-6 py-4 overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">Sample Types</h2>
          <table className="w-full text-sm border border-black">
            <thead className="bg-green-100 font-semibold border-b border-black">
              <tr>
                <th colSpan="3" className="text-center border-b border-black">
                  RBC
                </th>
              </tr>
              <tr>
                <th className="border-r border-black">Type</th>
                <th className="border-r border-black">Count</th>
                <th>Percentage</th>
              </tr>
            </thead>
            <tbody>
              {data.RBC.map((item, index) => (
                <tr key={index}>
                  <td className="border border-black">{item.type}</td>
                  <td className="border border-black">{item.count}</td>
                  <td className="border border-black">{item.percentage}</td>
                </tr>
              ))}
            </tbody>
            <thead className="bg-green-100 font-semibold border-b border-black">
              <tr>
                <th colSpan="3" className="text-center border-b border-black">
                  WBC
                </th>
              </tr>
              <tr>
                <th className="border-r border-black">Type</th>
                <th className="border-r border-black">Count</th>
                <th>Percentage</th>
              </tr>
            </thead>
            <tbody>
              {data.WBC.map((item, index) => (
                <tr key={index}>
                  <td className="border border-black">{item.type}</td>
                  <td className="border border-black">{item.count}</td>
                  <td className="border border-black">{item.percentage}</td>
                </tr>
              ))}
            </tbody>
            <thead className="bg-green-100 font-semibold border-b border-black">
              <tr>
                <th colSpan="3" className="text-center border-b border-black">
                  Platelets
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-black">Count</td>
                <td className="border border-black" colSpan="2">
                  {data.Platelets.count}
                </td>
              </tr>
              <tr>
                <td className="border border-black">Percentage</td>
                <td className="border border-black" colSpan="2">
                  {data.Platelets.percentage}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Right Side (Image Viewer) */}
        <div className="w-3/4 bg-gray-200 flex flex-col items-center justify-center relative">
          <TransformWrapper
            initialScale={1}
            minScale={0.5}
            maxScale={10}
            onZoom={handleTransform}
            onPanning={handleTransform}
            onZoomStop={handleTransform}
            onPanningStop={handleTransform}
            ref={wrapperRef}
          >
            {({ zoomIn, zoomOut, resetTransform }) => (
              <>
                {/* Zoom Controls */}
                <div className="absolute top-4 right-4 space-x-2 z-10">
                  <button
                    onClick={zoomIn}
                    className="px-2 py-1 bg-white shadow rounded"
                  >
                    +
                  </button>
                  <button
                    onClick={zoomOut}
                    className="px-2 py-1 bg-white shadow rounded"
                  >
                    -
                  </button>
                  <button
                    onClick={resetTransform}
                    className="px-2 py-1 bg-white shadow rounded"
                  >
                    Reset
                  </button>
                </div>

                {/* Preview Thumbnail */}
                <div className="absolute top-4 right-4 bg-white shadow rounded z-10">
                  <div
                    className="relative overflow-hidden"
                    style={{
                      width: `${previewSize}px`,
                      height: `${previewHeight}px`,
                      border: "0.5px solid #e5e7eb",
                    }}
                  >
                    <img
                      ref={imgRef}
                      src={image}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <div
                      ref={lensRef}
                      className="absolute"
                      style={{
                        ...lensStyle,
                        position: "absolute",
                        backgroundColor: "transparent",
                        border: "2px solid blue",
                        boxShadow: "inset 0 0 0 1px white",
                        pointerEvents: "none",
                      }}
                    ></div>
                  </div>
                </div>

                {/* Image Viewer */}
                <TransformComponent>
                  <img
                    src={image}
                    alt="Zoomable"
                    className="max-w-full max-h-[95vh] rounded shadow"
                  />
                </TransformComponent>
              </>
            )}
          </TransformWrapper>
        </div>
      </div>
    </div>
  );
};

export default ImageViewer;
