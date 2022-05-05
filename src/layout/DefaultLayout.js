const DefaultLayout = ({ children }) => (
  <div className="default-container">
    <div className="main">{children}</div>

    <style jsx>{`
      .default-container {
        padding: 5px 5px;
        text-align: center;
        max-width: 900px;
        margin: 0 auto;
      }
    `}</style>
  </div>
);

export default DefaultLayout;
