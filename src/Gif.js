import React from "react";

class Gif extends React.Component {
  render() {
    const { images } = this.props;
    return (
      <video
        className="grid-item video"
        autoPlay
        loop
        src={images.original.mp4}
      />
    );
  }
}

export default Gif;
