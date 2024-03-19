import { lazy, Suspense } from "react";
import { Sidebar, LoadingDots } from "../../components";
import { Tabs } from "@mantine/core";
const RecoverPhotos = lazy(() => import("../../components/RecoverPhotos"));
const RecoverCategories = lazy(
  () => import("../../components/RecoverCategories"),
);

export function RecoverComponent() {
  document.title = "Recover";
  return (
    <div className="flex h-full w-full">
      <Sidebar />
      <div className="flex w-full flex-col p-4 pl-8">
        <h1 className="mb-4 text-2xl font-semibold ">Recover</h1>
        <Tabs defaultValue="photos">
          <Tabs.List>
            <Tabs.Tab value="photos">Photos</Tabs.Tab>
            <Tabs.Tab value="categories">Albums</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="photos">
            <RecoverPhotos />
          </Tabs.Panel>
          <Tabs.Panel value="categories">
            <RecoverCategories />
          </Tabs.Panel>
        </Tabs>
      </div>
    </div>
  );
}

export default function RecoverDashboard() {
  return (
    <Suspense fallback={<LoadingDots />}>
      <RecoverComponent />;
    </Suspense>
  );
}
