const HomePage = () => {
  const navigateToConnectionType = () => {
    window.location.hash = '#page=2';
  };

  return (
    <div className="page">
      <p>Zyxel VMG3625-T50B</p><button onClick={navigateToConnectionType}>Start</button>
      <img src="/zyxel.png"></img>
      
    </div>
  );
};

export default HomePage;
