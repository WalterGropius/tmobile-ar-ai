const HomePage = () => {
  const navigateToConnectionType = () => {
    window.location.hash = '#page=2';
  };

  return (
    <div>
      <p>Zyxel VMG3625-T50B</p>
      <img src="/zyxel.png"></img>
      <button onClick={navigateToConnectionType}>Start</button>
    </div>
  );
};

export default HomePage;
