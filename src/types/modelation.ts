export const STEP = {
  start: 'start',
  arFront: 'arFront',
  arBack: 'arBack',
  aiFront: 'aiFront',
  aiBackCab: 'aiBackCab',
  aiBackPow:"aiBackPow",
  cableAnim: 'cableAnim',
  powerAnim: 'powerAnim',
  finish: 'finish',
} as const;

export const WARNING_MESSAGE_BY_TYPE = {
  FLIP: 'Otočte modem na DRUHOU stranu.',
  POW: 'Zapněte modem(je vypnutý)',
  INCOMP: 'Na tomto zařízení není podpora AR(rozšířené realita)',
  AI: 'Chyba AI analýzy',
} as const;

export type Step = keyof typeof STEP;

export type StepInfoItem = {
  title: string;
  subtitle: string;
  list: string[];
};

export type Detection = {
  xPos: number;
  label: string;
  score: number;
};


export type ModelationArFrontPageProps = {
  loaded: boolean;
}

/*
AR

0.ar starts loading... 
step = start
drawercontents(start)

1.ar back target
step = back
drawercontents(back, <IndicatorInfoList {...InfoList['BACK']} />)
   AR info zezadu modemu 
   InfoModal
 
2. step = cableanim
drawercontents(cableanim)
ar show cable anim in location based on ConnectionType 
   Modal zapojeni <- ConnectionType

3.ar show power cable anim in its location 
step = poweranim
drawercontents(poweranim)
  Power || Modal zapojeni <- ConnectionType
--> next (pause ar)

AI

4.
step = aiback
drawercontents(aiback)
check if connection is correct
if not check two more times if not say whats wrong or continue
  AI kontrola zezadu 3x bad -> AR

5.AR
step = arfront
drawercontents(arfront,<IndicatorInfoList {...InfoList['FRONT']} />)
->ar unpause
  AR zepredu
   || co je co (indikatory) if(i pressedDown) -> Modal z docu

6.AI
step = aifront
drawercontents(aifront)
execute model 3 times 
check indicators  
AI kontrola zepredu 3x bad -> FinBad
AI kontrola zepredu  good -> Fin

FinBad
drawercontents(finbad)
Bohuzel to nejde
zkusit znovu
zavolat podporu
*/
