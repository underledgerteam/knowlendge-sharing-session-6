import { Fragment } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "src/components/Layout";
import HomePage from "src/pages/Home";
import NotFound from "src/pages/NotFound";
import BankPage from "src/pages/Bank";
import TokenPage from "src/pages/Token";
import NFTPage from "src/pages/NFT";

function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/bank" element={<BankPage />} />
            <Route path="/token" element={<TokenPage />} />
            <Route path="/nft" element={<NFTPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
};

export default App;