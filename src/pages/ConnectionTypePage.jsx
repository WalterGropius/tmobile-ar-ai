const ConnectionTypePage = () => {
  const navigate = (page, type) => {
    window.location.hash = `#page=${page}&connection=${type}`;
  };

  // Retrieve the connection type from the URL hash
  const connectionType = new URLSearchParams(window.location.hash.replace('#', '')).get('connection');

  return (
    <div className="buttons">
      <button onClick={() => navigate(3, 'DSL')}>DSL</button>
      <button onClick={() => navigate(3, 'Optic')}>Optika</button>
      <button onClick={() => navigate(3, 'WAN')}>WAN</button>
      
      <button onClick={() => navigate(4, connectionType || 'DSL')}>Go to Page 4</button>
    </div>
  );
};

export default ConnectionTypePage;
