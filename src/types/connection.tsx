export const CONNECTION_DESCRIPTIONS = {
  DSL: (
    <>
      DSL využívá kroucené dvojlinky, které jsou standardním typem telefonního kabelu, pro připojení k internetu.
      Rychlost DSL připojení se pohybuje od několika Mbps do desítek Mbps a může klesat s větší vzdáleností od
      distribučního bodu.
    </>
  ),
  OPTIC: (
    <>
      Optické kabely přenášejí data pomocí světelných impulsů, což umožňuje velmi vysoké rychlosti přenosu, dosahující
      až několik Gbps. Vzhled optického kabelu je tenký a flexibilní, s vysokou odolností vůči elektromagnetickému
      rušení.
    </>
  ),
  WAN: (
    <>
      Rychlost přenosu dat přes WAN kabely se liší podle použité technologie a může dosahovat od několika Mbps do Gbps.
      WAN spojení se používá pro připojení na velké vzdálenosti, například mezi městy nebo kontinenty.
    </>
  ),
} as const;

export type ConnectionType = keyof typeof CONNECTION_DESCRIPTIONS;
