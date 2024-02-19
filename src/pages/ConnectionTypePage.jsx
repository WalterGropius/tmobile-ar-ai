const ConnectionTypePage = () => {
  const selectConnectionType = (type) => {
    window.location.hash = `#page=3&connection=${type}`;
  };

  return (
    <div className="buttons">
      <button onClick={() => selectConnectionType('DSL')}>DSL</button>
      <button onClick={() => selectConnectionType('Optic')}>Optika</button>
      <button onClick={() => selectConnectionType('WAN')}>WAN</button>
     
    </div>
  );
};

export default ConnectionTypePage;
