import { home } from "@/content/home";

export default function Footer() {
  const f = home.footer;
  return (
    <footer className="site-footer">
      <div className="logo-big">Michel.</div>
      <div>
        <div>{f.copy}</div>
        <div>{f.kvk}</div>
      </div>
      <div>
        <div>{f.address}</div>
        <div>{f.city}</div>
      </div>
      <div className="col-end">
        <div>{f.built}</div>
        <div>{f.tech}</div>
      </div>
    </footer>
  );
}
