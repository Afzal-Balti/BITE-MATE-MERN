import React from "react";

function GoogleMapComponent() {
  return (
    <div
      style={{
        width: "100%",
        height: "800px",
        borderRadius: "20px",
        overflow: "hidden",
      }}
    >
      <iframe
        title="Google Map"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3454.469856680917!2d71.5249!3d30.1575!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDA5JzI3LjAiTiA3McKwMzEnMjkuNyJF!5e0!3m2!1sen!2s!4v1693214123456"
      ></iframe>
    </div>
  );
}

export default GoogleMapComponent;
