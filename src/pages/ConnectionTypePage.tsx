import { CONNECTION_DESCRIPTIONS, ConnectionType } from '../types/connection';
import { Page } from '../types/page';

export const ConnectionTypePage = () => {
  const navigate = (page: Page, type: ConnectionType) => {
    window.location.hash = `#page=${page}&connection=${type}`;
  };

  // Retrieve the connection type from the URL hash
  const connectionType = (new URLSearchParams(window.location.hash.replace('#', '')).get('connection') ||
    '') as ConnectionType;

  return (
    <div>
      <div className="header">
        <h1>Vyberte typ připojení</h1>
      </div>
      <div className="buttons">
        <button onClick={() => navigate('connectionType', 'DSL')}>
          <h2>DSL</h2>
        </button>
        <button onClick={() => navigate('connectionType', 'OPTIC')}>
          <h2>OPTIC</h2>
        </button>
        <button onClick={() => navigate('connectionType', 'WAN')}>
          <h2>WAN</h2>
        </button>
      </div>
      <p>{CONNECTION_DESCRIPTIONS[connectionType]}</p>
      {connectionType ? (
        <div className="footer">
          <button onClick={() => navigate('home', connectionType || 'DSL')}>Zpět</button>
          <button onClick={() => navigate('connectionInfo', connectionType || 'DSL')}>Pokračovat</button>
        </div>
      ) : null}
    </div>
  );
};
