import React, { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import AppGuard from 'src/layouts/AppGuard';
import Loadable from 'src/components/Loadable';
import WindowLayout from 'src/layouts/WindowLayout';

const LearnMorePage = Loadable(lazy(() => import('src/pages/learn-more')));
const TestPage = Loadable(lazy(() => import('src/pages/test')));
const HomePage = Loadable(lazy(() => import('src/pages/home')));

function MainRoute() {
  return (
    <Routes>
      <Route path="/" element={<AppGuard />}>
        <Route path="/" element={<WindowLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/learn-more" element={<LearnMorePage />} />
          <Route path="/test" element={<TestPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default MainRoute;
