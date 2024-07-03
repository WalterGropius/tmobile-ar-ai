# Průvodce nastavením AR modemu

Tento projekt kombinuje rozšířenou realitu (AR) pomocí MindAR.js s detekcí portů a indikátorů založenou na umělé inteligenci využívající YOLOv7 a TensorFlow.js k vytvoření interaktivního průvodce nastavením modemu.

## Funkce

- Vizualizace kroků nastavení modemu pomocí rozšířené reality (AR)
- Detekce portů a indikátorů modemu založená na umělé inteligenci
- Podrobný průvodce instalací modemu
- Podpora různých typů připojení (DSL, WAN, OPTIKA)
- Zpětná vazba o stavu připojení v reálném čase

## Použité technologie

- React
- TypeScript
- MindAR.js pro rozšířenou realitu
- TensorFlow.js pro inferenci AI modelu
- YOLOv7 pro detekci objektů
- Three.js pro 3D renderování
- Material-UI pro komponenty uživatelského rozhraní

## Struktura projektu

Projekt je organizován do několika klíčových složek:

- `src/pages`: Obsahuje hlavní stránky aplikace, včetně domovské stránky, stránek pro výběr typu připojení a AR prohlížeče.
- `src/hooks`: Vlastní React hooks pro správu stavu a logiky aplikace.
- `src/ui`: Znovupoužitelné UI komponenty, jako jsou tlačítka, notifikace a stavové bannery.
- `src/types`: TypeScript definice typů pro celou aplikaci.

## Jak začít

1. Naklonujte repozitář
2. Nainstalujte závislosti pomocí `npm install`
3. Spusťte vývojový server pomocí `npm start`
4. Otevřete aplikaci ve vašem prohlížeči na `http://localhost:3000`

## Přispívání

Příspěvky jsou vítány! Prosím, přečtěte si nejprve naše pokyny pro přispívání.

## Licence

Tento projekt je licencován pod MIT licencí.
