interface Props {
  gradientSuffix?: string;
}

export default function PortraitSVG({ gradientSuffix = "1" }: Props) {
  const s = gradientSuffix;
  return (
    <svg
      viewBox="0 0 400 500"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Portret van Michel"
      style={{
        position:  "absolute",
        inset:     0,
        width:     "100%",
        height:    "100%",
        display:   "block",
        animation: "portrait-float 9s ease-in-out infinite",
      }}
    >
      <defs>
        <radialGradient id={`halo-${s}`} cx="50%" cy="42%" r="60%">
          <stop offset="0%"   stopColor="#f0b341" stopOpacity="0.95" />
          <stop offset="55%"  stopColor="#d65a1f" stopOpacity="0.62" />
          <stop offset="100%" stopColor="#d65a1f" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`hair-${s}`} x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%"   stopColor="#f1d68a" />
          <stop offset="100%" stopColor="#b88f3e" />
        </linearGradient>
        <linearGradient id={`skin-${s}`} x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%"   stopColor="#f6d9b6" />
          <stop offset="100%" stopColor="#dbb088" />
        </linearGradient>
        <linearGradient id={`iris-${s}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="#67a7e0" />
          <stop offset="100%" stopColor="#2f6ba8" />
        </linearGradient>
      </defs>

      <circle cx="200" cy="210" r="190" fill={`url(#halo-${s})`} />
      <circle cx="338" cy="92" r="5" fill="#fff" opacity="0.9" />
      <text x="58" y="80" fontFamily="Instrument Serif, serif" fontSize="22" fill="#f0b341" opacity="0.85">✦</text>

      <g style={{ transformOrigin: "200px 230px", animation: "portrait-sway 7.5s ease-in-out infinite" }}>
        <path d="M118 210 C 88 260 84 340 102 400 C 118 440 152 458 200 458 C 248 458 282 440 298 400 C 316 340 312 260 282 210 Z" fill={`url(#hair-${s})`} />
        <path d="M150 360 Q 175 420 200 432 Q 225 420 250 360" stroke="#8d6a2a" strokeWidth="2.5" fill="none" opacity="0.45" />
        <path d="M168 380 Q 185 415 200 422" stroke="#8d6a2a" strokeWidth="1.5" fill="none" opacity="0.35" />
        <path d="M232 380 Q 215 415 200 422" stroke="#8d6a2a" strokeWidth="1.5" fill="none" opacity="0.35" />
      </g>

      <path d="M40 500 L 40 430 Q 40 388 92 376 Q 146 364 200 364 Q 254 364 308 376 Q 360 388 360 430 L 360 500 Z" fill="#3b3b32" />
      <path d="M180 364 L 200 396 L 220 364" stroke="#1a1815" strokeWidth="3.5" fill="none" strokeLinejoin="round" />
      <path d="M104 410 Q 100 460 110 498" stroke="#4f4f43" strokeWidth="2" fill="none" opacity="0.7" />

      <path d="M172 304 L 172 372 Q 200 386 228 372 L 228 304 Z" fill={`url(#skin-${s})`} />
      <path d="M172 348 Q 200 362 228 348 L 228 372 Q 200 386 172 372 Z" fill="#c89870" opacity="0.5" />

      <ellipse cx="110" cy="226" rx="15" ry="25" fill={`url(#skin-${s})`} />
      <ellipse cx="290" cy="226" rx="15" ry="25" fill={`url(#skin-${s})`} />
      <ellipse cx="110" cy="229" rx="6" ry="12" fill="#a87a52" opacity="0.55" />
      <ellipse cx="290" cy="229" rx="6" ry="12" fill="#a87a52" opacity="0.55" />

      <ellipse cx="200" cy="222" rx="96" ry="112" fill={`url(#skin-${s})`} />
      <path d="M286 200 Q 300 250 290 295 Q 270 322 240 326 Q 274 280 286 200 Z" fill="#c7986c" opacity="0.22" />

      <path d={`M104 205 C 88 138 130 90 178 84 Q 200 82 222 84 C 270 90 312 138 296 205 C 290 178 268 168 250 170 Q 280 142 260 124 Q 230 105 200 105 Q 170 105 140 124 Q 120 142 150 170 C 132 168 110 178 104 205 Z`} fill={`url(#hair-${s})`} />
      <path d="M152 142 Q 175 134 200 142 Q 224 152 246 172 Q 218 168 188 170 Q 162 170 152 142 Z" fill="#caa14a" />
      <path d="M150 130 Q 200 110 250 130" stroke="#fbeab5" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.85" />

      <path d="M104 205 Q 100 235 112 254 Q 124 244 128 218 Z" fill={`url(#hair-${s})`} />
      <path d="M296 205 Q 300 235 288 254 Q 276 244 272 218 Z" fill={`url(#hair-${s})`} />

      <path d="M152 200 Q 170 192 192 198" stroke="#9c7530" strokeWidth="5.5" fill="none" strokeLinecap="round" />
      <path d="M248 200 Q 230 192 208 198" stroke="#9c7530" strokeWidth="5.5" fill="none" strokeLinecap="round" />

      <g style={{ transformOrigin: "200px 226px", animation: "portrait-blink 6s infinite" }}>
        <ellipse cx="172" cy="226" rx="13" ry="9.5" fill="#fffaf0" />
        <ellipse cx="228" cy="226" rx="13" ry="9.5" fill="#fffaf0" />
        <circle cx="172" cy="226" r="7.6" fill={`url(#iris-${s})`} />
        <circle cx="228" cy="226" r="7.6" fill={`url(#iris-${s})`} />
        <circle cx="172" cy="226" r="3.4" fill="#0a0a0a" />
        <circle cx="228" cy="226" r="3.4" fill="#0a0a0a" />
        <circle cx="174.6" cy="223" r="1.9" fill="#fff" />
        <circle cx="230.6" cy="223" r="1.9" fill="#fff" />
        <circle cx="170" cy="229" r="0.9" fill="#fff" opacity="0.7" />
        <circle cx="226" cy="229" r="0.9" fill="#fff" opacity="0.7" />
      </g>

      <path d="M200 240 C 197 262 200 274 209 279 Q 200 284 195 280" stroke="#bc8e62" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M168 298 Q 200 324 232 298" stroke="#9c4234" strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M180 299 Q 192 290 200 293 Q 208 290 220 299" stroke="#b8675a" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.55" />

      <ellipse cx="140" cy="262" rx="18" ry="11" fill="#e89888" opacity="0.4" />
      <ellipse cx="260" cy="262" rx="18" ry="11" fill="#e89888" opacity="0.4" />
      <ellipse cx="155" cy="236" rx="9" ry="5" fill="#fff" opacity="0.16" />
      <ellipse cx="245" cy="236" rx="9" ry="5" fill="#fff" opacity="0.16" />
    </svg>
  );
}
