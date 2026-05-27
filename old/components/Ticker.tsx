import { home } from "@/content/home";

export default function Ticker() {
  const words = home.ticker;
  const track = (
    <span>
      {words.map((word, i) => (
        <span key={i}>
          <em>{word}</em>
          {i < words.length - 1 && (
            <>
              {" "}<span className="star">✦</span>{" "}
            </>
          )}
        </span>
      ))}
      {" "}<span className="star">✦</span>{" "}
    </span>
  );

  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker-track">
        {track}
        {track}
      </div>
    </div>
  );
}
