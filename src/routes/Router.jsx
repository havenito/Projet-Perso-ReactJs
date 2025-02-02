import { Routes, Route } from "react-router";
import Home from "../pages/Home";
import FetchPersos from "../components/FetchPersos/FetchPersos";
import FetchRegions from "../components/FetchRegions/FetchRegions";
import RegionDetails from "../components/RegionsDetails/RegionsDetails";
import NotFoundPage from "../pages/NotFoundPage";
import Contact from "../components/Contact/Contact";
import PersosDetails from "../components/PersosDetails/PersosDetails";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/persos" element={<FetchPersos />} />
      <Route path="/regions" element={<FetchRegions />} />
      <Route path="/regions/:regionId" element={<RegionDetails />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/champion/:id" element={<PersosDetails />} />
    </Routes>
  );
}