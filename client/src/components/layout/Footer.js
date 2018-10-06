import React from "react";

export default () => {
  return (
    <footer className="footer bg-dark" style={{ "z-index": "1030" }}>
      <div className="container">
        <p className="mb-0" style={{ 'textAlign': 'center'}}>
          <span className="text-white">
            Copyright &copy; {new Date().getFullYear()} ExpoMan
          </span>
        </p>
      </div>
    </footer>
  );
};
