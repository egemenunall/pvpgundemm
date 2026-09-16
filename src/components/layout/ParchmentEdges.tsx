/**
 * Dört kenarda yırtık/yanmış parşömen kenar efekti.
 * pointer-events-none olduğu için etkileşimi engellemez.
 * z-index: 45 — header (z-40) üstünde, dialog (z-50) altında.
 */
export function ParchmentEdges() {
  const fill = "#2a1005";

  // Üst kenar: yırtık alt sınır
  const topPath =
    "M0,0 L1440,0 L1440,42 " +
    "Q1430,35 1420,44 Q1410,54 1400,44 Q1390,32 1380,46 Q1370,56 1360,44 " +
    "Q1350,30 1340,44 Q1330,58 1320,44 Q1310,30 1300,44 Q1290,56 1280,44 " +
    "Q1270,32 1260,44 Q1250,58 1240,44 Q1230,30 1220,44 Q1210,56 1200,44 " +
    "Q1190,32 1180,46 Q1170,58 1160,44 Q1150,30 1140,44 Q1130,56 1120,44 " +
    "Q1110,30 1100,44 Q1090,58 1080,44 Q1070,32 1060,44 Q1050,56 1040,44 " +
    "Q1030,30 1020,46 Q1010,58 1000,44 Q990,30 980,44 Q970,56 960,44 " +
    "Q950,32 940,44 Q930,58 920,44 Q910,30 900,44 Q890,56 880,44 " +
    "Q870,32 860,46 Q850,58 840,44 Q830,30 820,44 Q810,56 800,44 " +
    "Q790,32 780,44 Q770,58 760,44 Q750,30 740,44 Q730,56 720,44 " +
    "Q710,32 700,46 Q690,58 680,44 Q670,30 660,44 Q650,56 640,44 " +
    "Q630,32 620,44 Q610,58 600,44 Q590,30 580,44 Q570,56 560,44 " +
    "Q550,32 540,46 Q530,58 520,44 Q510,30 500,44 Q490,56 480,44 " +
    "Q470,32 460,44 Q450,58 440,44 Q430,30 420,44 Q410,56 400,44 " +
    "Q390,32 380,46 Q370,58 360,44 Q350,30 340,44 Q330,56 320,44 " +
    "Q310,32 300,44 Q290,58 280,44 Q270,30 260,44 Q250,56 240,44 " +
    "Q230,32 220,46 Q210,58 200,44 Q190,30 180,44 Q170,56 160,44 " +
    "Q150,32 140,44 Q130,58 120,44 Q110,30 100,44 Q90,56 80,44 " +
    "Q70,32 60,46 Q50,58 40,44 Q30,30 20,44 Q10,56 0,44 Z";

  // Alt kenar: yırtık üst sınır
  const bottomPath =
    "M0,70 L1440,70 L1440,28 " +
    "Q1430,35 1420,26 Q1410,16 1400,26 Q1390,38 1380,24 Q1370,14 1360,26 " +
    "Q1350,40 1340,26 Q1330,12 1320,26 Q1310,40 1300,26 Q1290,14 1280,26 " +
    "Q1270,38 1260,26 Q1250,12 1240,26 Q1230,40 1220,26 Q1210,14 1200,26 " +
    "Q1190,38 1180,24 Q1170,12 1160,26 Q1150,40 1140,26 Q1130,14 1120,26 " +
    "Q1110,40 1100,26 Q1090,12 1080,26 Q1070,38 1060,26 Q1050,14 1040,26 " +
    "Q1030,40 1020,24 Q1010,12 1000,26 Q990,40 980,26 Q970,14 960,26 " +
    "Q950,38 940,26 Q930,12 920,26 Q910,40 900,26 Q890,14 880,26 " +
    "Q870,38 860,24 Q850,12 840,26 Q830,40 820,26 Q810,14 800,26 " +
    "Q790,38 780,26 Q770,12 760,26 Q750,40 740,26 Q730,14 720,26 " +
    "Q710,38 700,24 Q690,12 680,26 Q670,40 660,26 Q650,14 640,26 " +
    "Q630,38 620,26 Q610,12 600,26 Q590,40 580,26 Q570,14 560,26 " +
    "Q550,38 540,24 Q530,12 520,26 Q510,40 500,26 Q490,14 480,26 " +
    "Q470,38 460,26 Q450,12 440,26 Q430,40 420,26 Q410,14 400,26 " +
    "Q390,38 380,24 Q370,12 360,26 Q350,40 340,26 Q330,14 320,26 " +
    "Q310,38 300,26 Q290,12 280,26 Q270,40 260,26 Q250,14 240,26 " +
    "Q230,38 220,24 Q210,12 200,26 Q190,40 180,26 Q170,14 160,26 " +
    "Q150,38 140,26 Q130,12 120,26 Q110,40 100,26 Q90,14 80,26 " +
    "Q70,38 60,24 Q50,12 40,26 Q30,40 20,26 Q10,14 0,26 Z";

  // Sol kenar: yırtık sağ sınır
  const leftPath =
    "M0,0 L0,900 L14,900 " +
    "Q24,888 14,876 Q4,864 16,852 Q28,840 14,828 Q0,816 16,804 " +
    "Q32,792 16,778 Q0,764 14,752 Q28,740 14,728 Q0,716 16,704 " +
    "Q32,692 16,678 Q0,664 14,652 Q24,640 14,628 Q4,616 16,604 " +
    "Q28,592 14,580 Q0,568 16,556 Q32,544 16,530 Q0,516 14,504 " +
    "Q28,492 14,480 Q0,468 16,456 Q32,444 16,430 Q0,416 14,404 " +
    "Q24,392 14,380 Q4,368 16,356 Q28,344 14,332 Q0,320 16,308 " +
    "Q32,296 16,282 Q0,268 14,256 Q28,244 14,232 Q0,220 16,208 " +
    "Q32,196 16,182 Q0,168 14,156 Q24,144 14,132 Q4,120 16,108 " +
    "Q28,96 14,84 Q0,72 16,60 Q32,48 16,34 Q0,20 10,0 Z";

  // Sağ kenar: yırtık sol sınır
  const rightPath =
    "M50,0 L50,900 L36,900 " +
    "Q26,888 36,876 Q46,864 34,852 Q22,840 36,828 Q50,816 34,804 " +
    "Q18,792 34,778 Q50,764 36,752 Q22,740 36,728 Q50,716 34,704 " +
    "Q18,692 34,678 Q50,664 36,652 Q26,640 36,628 Q46,616 34,604 " +
    "Q22,592 36,580 Q50,568 34,556 Q18,544 34,530 Q50,516 36,504 " +
    "Q22,492 36,480 Q50,468 34,456 Q18,444 34,430 Q50,416 36,404 " +
    "Q26,392 36,380 Q46,368 34,356 Q22,344 36,332 Q50,320 34,308 " +
    "Q18,296 34,282 Q50,268 36,256 Q22,244 36,232 Q50,220 34,208 " +
    "Q18,196 34,182 Q50,168 36,156 Q26,144 36,132 Q46,120 34,108 " +
    "Q22,96 36,84 Q50,72 34,60 Q18,48 34,34 Q50,20 40,0 Z";

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[45] overflow-hidden"
      aria-hidden="true"
    >
      {/* Üst yırtık kenar */}
      <svg
        className="absolute inset-x-0 top-0 w-full"
        height="70"
        viewBox="0 0 1440 70"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="pg-top" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={fill} stopOpacity="1" />
            <stop offset="75%" stopColor={fill} stopOpacity="0.85" />
            <stop offset="100%" stopColor={fill} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path fill="url(#pg-top)" d={topPath} />
      </svg>

      {/* Alt yırtık kenar */}
      <svg
        className="absolute inset-x-0 bottom-0 w-full"
        height="70"
        viewBox="0 0 1440 70"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="pg-bot" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={fill} stopOpacity="0" />
            <stop offset="25%" stopColor={fill} stopOpacity="0.85" />
            <stop offset="100%" stopColor={fill} stopOpacity="1" />
          </linearGradient>
        </defs>
        <path fill="url(#pg-bot)" d={bottomPath} />
      </svg>

      {/* Sol yırtık kenar — sadece büyük ekranlarda */}
      <svg
        className="absolute bottom-0 left-0 top-0 hidden xl:block"
        width="50"
        viewBox="0 0 50 900"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="pg-left" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={fill} stopOpacity="1" />
            <stop offset="75%" stopColor={fill} stopOpacity="0.85" />
            <stop offset="100%" stopColor={fill} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path fill="url(#pg-left)" d={leftPath} />
      </svg>

      {/* Sağ yırtık kenar — sadece büyük ekranlarda */}
      <svg
        className="absolute bottom-0 right-0 top-0 hidden xl:block"
        width="50"
        viewBox="0 0 50 900"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="pg-right" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={fill} stopOpacity="0" />
            <stop offset="25%" stopColor={fill} stopOpacity="0.85" />
            <stop offset="100%" stopColor={fill} stopOpacity="1" />
          </linearGradient>
        </defs>
        <path fill="url(#pg-right)" d={rightPath} />
      </svg>
    </div>
  );
}
