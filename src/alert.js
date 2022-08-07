import { useEffect } from "react";
import "./styles.css";

export default function Alert({ msg, type, removeAlert, list }) {
  useEffect(() => {
    const timeOut = setTimeout(() => {
      removeAlert();
    }, 3000);
    return () => clearTimeout(timeOut);
  }, [list]);
  return (
    <section className="alertBox">
      <p className={`alert alert-${type}`}>{msg}</p>
    </section>
  );
}
