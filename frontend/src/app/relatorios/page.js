"use client";
import { useEffect, useRef, useState } from "react";
import ReportFilters from "./ReportFilters";
import ReportView from "./ReportView";
import { fetchDonations, exportElementToPdf } from "./reportClient";
import Navigation from "../components/navegation/navegation";
import MenuBar from "../components/menubar/menubar";

export default function RelatoriosPage() {
  const [filters, setFilters] = useState({ from: "", to: "", donor: "", receiver: "" });
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const reportRef = useRef();

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetchDonations(filters);
        setData(res);
      } catch (err) {
        setError(err.message || "Erro ao carregar doações");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [filters]);

  return (
    <>
      <Navigation />
      <div style={{ minHeight: "100vh", background: "#fff", marginLeft: 220 }}>
        <MenuBar />
        <main style={{ padding: 20, overflowX: "hidden" }}>
          <h1>Relatórios de Doações</h1>
          <ReportFilters onApply={(f) => setFilters(f)} initial={filters} />
          <div style={{ marginTop: 12 }}>
            <button onClick={() => exportElementToPdf(reportRef.current, "relatorio-doacoes.pdf")}>
              Exportar para PDF
            </button>
          </div>
          {loading && <p>Carregando...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
          <div style={{ marginTop: 16 }}>
            <ReportView ref={reportRef} data={data} />
          </div>
        </main>
      </div>
    </>
  );
}