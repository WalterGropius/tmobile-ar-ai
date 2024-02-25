const CONNECTION_DESCRIPTIONS = {
  DSL: [
    `
  DSL využívá kroucené dvojlinky, které jsou standardním typem
  telefonního kabelu, pro připojení k internetu.

  Rychlost DSL připojení se pohybuje od několika Mbps do desítek Mbps a
  může klesat s větší vzdáleností od distribučního bodu.
`
  ],
  OPTIC: [
    `
          Optické kabely přenášejí data pomocí světelných impulsů, což umožňuje
          velmi vysoké rychlosti přenosu, dosahující až několik Gbps.

          Vzhled optického kabelu je tenký a flexibilní, s vysokou odolností
          vůči elektromagnetickému rušení.
  `
  ],
  WAN: `
          Rychlost přenosu dat přes WAN kabely se liší podle použité technologie
          a může dosahovat od několika Mbps do Gbps.

        WAN spojení se používá pro připojení na velké vzdálenosti, například
        mezi městy nebo kontinenty.
`
};

const ConnectionTypePage = () => {
  const navigate = (page, type) => {
    window.location.hash = `#page=${page}&connection=${type}`;
  };

  // Retrieve the connection type from the URL hash
  const connectionType = new URLSearchParams(
    window.location.hash.replace("#", "")
  ).get("connection");


  return (
    <div>
      <div className="header">
        <h1>Vyberte typ připojení</h1>
      </div>
      <div className="buttons">
        <button onClick={() => navigate(2, "DSL")}>
          <h2>DSL</h2>
        </button>
        <button onClick={() => navigate(2, "OPTIC")}>
          <h2>OPTIC</h2>
        </button>
        <button onClick={() => navigate(2, "WAN")}>
          <h2>WAN</h2>
        </button>
      </div>
    <p>{CONNECTION_DESCRIPTIONS[connectionType]}</p>
      {connectionType ? <div className="footer">
        <button onClick={() => navigate(3, connectionType || "DSL")}>
          Pokračovat
        </button>
      </div> : null }
    </div>
  );
};

export default ConnectionTypePage;
