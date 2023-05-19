import React, { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import AppGuard from 'src/layouts/AppGuard';
import Loadable from 'src/components/Loadable';
import FlexLayout from 'src/layouts/FlexLayout';

const LearnMorePage = Loadable(lazy(() => import('src/pages/learn-more')));
const TestPage = Loadable(lazy(() => import('src/pages/test')));
const HomePage = Loadable(lazy(() => import('src/pages/home')));

function MainRoute() {
  return (
    <Routes>
      <Route path="/" element={<AppGuard />}>
        <Route path="/" element={<FlexLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/learn-more" element={<LearnMorePage />} />
          <Route path="/test" element={<TestPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default MainRoute;
