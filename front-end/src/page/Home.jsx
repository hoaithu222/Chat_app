import { Outlet } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center  ">
      <p>Home</p>
      <Outlet />
    </div>
  );
}
