const HomePage = () => {
  const navigateToConnectionType = () => {
    window.location.hash = '#page=2';
  };

  return (
    
    <div className="page">
      <div className="header">
        <h1>Návod na instalaci v rozšířené realitě</h1>
      </div>
      <h2>Zyxel</h2><h3>VMG3625-T50B</h3>
      <img src="/zyxel.png"></img>
      <div className="footer">
      <button onClick={navigateToConnectionType}>Start</button>
      </div>
    </div>
  );
};

export default HomePage;
