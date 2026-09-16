/**
 * Dört kenarda yırtık/yanmış parşömen kenar efekti.
 * z-index: 0 — içerik (z-1) altında kalır, parşömenin gerçek kenarı gibi görünür.
 * pointer-events-none olduğu için etkileşimi engellemez.
 */
export function ParchmentEdges() {
  const fill = "#2a1005";

  // Üst kenar: viewBox 0 0 1440 52 — yırtık alt sınır ~34-50px bandında
  const topPath =
    "M0,0 L1440,0 L1440,34 " +
    "Q1404,26 1368,38 Q1332,50 1296,36 Q1260,22 1224,36 Q1188,50 1152,38 " +
    "Q1116,26 1080,38 Q1044,50 1008,36 Q972,22 936,36 Q900,50 864,38 " +
    "Q828,26 792,38 Q756,50 720,36 Q684,22 648,36 Q612,50 576,38 " +
    "Q540,26 504,38 Q468,50 432,36 Q396,22 360,36 Q324,50 288,38 " +
    "Q252,26 216,38 Q180,50 144,36 Q108,22 72,36 Q36,50 0,36 Z";

  // Alt kenar: viewBox 0 0 1440 52 — yırtık üst sınır ~2-18px bandında
  const bottomPath =
    "M0,52 L1440,52 L1440,18 " +
    "Q1404,26 1368,14 Q1332,2 1296,16 Q1260,30 1224,16 Q1188,2 1152,14 " +
    "Q1116,26 1080,14 Q1044,2 1008,16 Q972,30 936,16 Q900,2 864,14 " +
    "Q828,26 792,14 Q756,2 720,16 Q684,30 648,16 Q612,2 576,14 " +
    "Q540,26 504,14 Q468,2 432,16 Q396,30 360,16 Q324,2 288,14 " +
    "Q252,26 216,14 Q180,2 144,16 Q108,30 72,16 Q36,2 0,16 Z";

  // Sol kenar: viewBox 0 0 44 900 — yırtık sağ sınır ~10-30px bandında
  const leftPath =
    "M0,0 L0,900 L12,900 " +
    "Q22,864 10,828 Q0,792 14,756 Q28,720 14,684 " +
    "Q0,648 12,612 Q24,576 10,540 Q0,504 14,468 " +
    "Q28,432 14,396 Q0,360 12,324 Q22,288 10,252 " +
    "Q0,216 14,180 Q28,144 14,108 Q0,72 12,36 Q22,0 8,0 Z";

  // Sağ kenar: viewBox 0 0 44 900 — yırtık sol sınır ~14-32px bandında
  const rightPath =
    "M44,0 L44,900 L32,900 " +
    "Q22,864 34,828 Q44,792 30,756 Q16,720 30,684 " +
    "Q44,648 32,612 Q20,576 34,540 Q44,504 30,468 " +
    "Q16,432 30,396 Q44,360 32,324 Q22,288 34,252 " +
    "Q44,216 30,180 Q16,144 30,108 Q44,72 32,36 Q22,0 36,0 Z";

  return (
    /* z-0 → içerik z-[1] altında kalır, parşömen zeminin kenarı gibi görünür */
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Üst yırtık kenar */}
      <svg
        className="absolute inset-x-0 top-0 w-full"
        height="52"
        viewBox="0 0 1440 52"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="pg-top" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={fill} stopOpacity="0.9" />
            <stop offset="65%" stopColor={fill} stopOpacity="0.55" />
            <stop offset="100%" stopColor={fill} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path fill="url(#pg-top)" d={topPath} />
      </svg>

      {/* Alt yırtık kenar */}
      <svg
        className="absolute inset-x-0 bottom-0 w-full"
        height="52"
        viewBox="0 0 1440 52"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="pg-bot" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={fill} stopOpacity="0" />
            <stop offset="35%" stopColor={fill} stopOpacity="0.55" />
            <stop offset="100%" stopColor={fill} stopOpacity="0.9" />
          </linearGradient>
        </defs>
        <path fill="url(#pg-bot)" d={bottomPath} />
      </svg>

      {/* Sol yırtık kenar — sadece büyük ekranlarda */}
      <svg
        className="absolute bottom-0 left-0 top-0 hidden xl:block"
        width="44"
        viewBox="0 0 44 900"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="pg-left" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={fill} stopOpacity="0.9" />
            <stop offset="65%" stopColor={fill} stopOpacity="0.5" />
            <stop offset="100%" stopColor={fill} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path fill="url(#pg-left)" d={leftPath} />
      </svg>

      {/* Sağ yırtık kenar — sadece büyük ekranlarda */}
      <svg
        className="absolute bottom-0 right-0 top-0 hidden xl:block"
        width="44"
        viewBox="0 0 44 900"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="pg-right" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={fill} stopOpacity="0" />
            <stop offset="35%" stopColor={fill} stopOpacity="0.5" />
            <stop offset="100%" stopColor={fill} stopOpacity="0.9" />
          </linearGradient>
        </defs>
        <path fill="url(#pg-right)" d={rightPath} />
      </svg>
    </div>
  );
}
