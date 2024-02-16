const HomePage = () => {
  const navigateToConnectionType = () => {
    window.location.hash = '#page=2';
  };

  return (
    <div>
      <p>Vítejte v AR návodu zapojení modemu....</p>
      <button onClick={navigateToConnectionType}>Start</button>
    </div>
  );
};

export default HomePage;
