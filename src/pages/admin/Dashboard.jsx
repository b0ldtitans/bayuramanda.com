import { Sidebar } from "../../components";

export default function Dashboard() {
  document.title = "Dashboard";
  return (
    <div className="flex w-full h-full">
      <Sidebar />
      <div className="flex flex-col w-full p-4 pl-8">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <div className="flex flex-row justify-between gap-x-4"></div>
      </div>
    </div>
  );
}
