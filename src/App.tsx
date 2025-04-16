import type { FC } from "react";
import {
  Routes,
  Route,
  Outlet,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router";
import { TabBar } from "antd-mobile";
import { createAppKit } from "@reown/appkit/react";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { projectId, metadata, networks, wagmiAdapter } from "./config";

import { Home } from "./views/Home";
import { Me } from "./views/Me";
import { Detail } from "./views/Detail";
import { Login } from "./views/Login"

import createIcon from "./assets/tabbar/create_icon.png";
import indexIcon from "./assets/tabbar/index_icon.png";
import indexIconSelected from "./assets/tabbar/index_icon_selected.png";
import myIcon from "./assets/tabbar/my_icon.png";
import myIconSelected from "./assets/tabbar/my_icon_selected.png";

import { useCreateGame } from "./views/Detail";

const queryClient = new QueryClient();

const generalConfig = {
  projectId,
  networks,
  metadata,
  themeMode: "light" as const,
  themeVariables: {
    "--w3m-accent": "#000000",
  },
};

// Create modal
createAppKit({
  adapters: [wagmiAdapter],
  ...generalConfig,
  features: {
    analytics: true, // Optional - defaults to your Cloud configuration
    socials: false,
    email: false,
  },
  themeVariables: {
    "--w3m-accent": "#000000",
  },
});
const Bottom: FC = () => {
  const location = useLocation();
  const { pathname } = location;

  const navigate = useNavigate();
  const { createGame } = useCreateGame()
  const setRouteActive = async (value: string) => {
    if (value === "/chat") {
      await createGame('测试赛事', 
        BigInt(Math.floor(new Date('2025-04-25T00:00:00Z').getTime() / 1000)), 
        BigInt(Math.floor(new Date('2025-05-25T00:00:00Z').getTime() / 1000)))
      return;
    }
    navigate(value);
  };

  const tabs = [
    {
      key: "/home",
      title: (active: boolean) => (
        <span
          className={`text-[14px] ${active ? "text-[rgb(48,49,51)]" : "text-[rgb(96,98,102)]"
            }`}
        >
          赛事
        </span>
      ),
      icon: (active: boolean) => (
        <img
          src={active ? indexIconSelected : indexIcon}
          className="w-[27px] h-[27px]"
        />
      ),
    },
    {
      key: "/chat",
      icon: (
        <img
          src={createIcon}
          className="w-[55px] h-[55px] -translate-y-[35px]"
        />
      ),
    },
    {
      key: "/me",
      title: (active: boolean) => (
        <span
          className={`text-[14px] ${active ? "text-[rgb(48,49,51)]" : "text-[rgb(96,98,102)]"
            }`}
        >
          我
        </span>
      ),
      icon: (active: boolean) => (
        <img
          src={active ? myIconSelected : myIcon}
          className="w-[27px] h-[27px]"
        />
      ),
    },
  ];

  return (
    <div className="h-[100vh] flex flex-col justify-between">
      <div className="flex-1 pb-[50px]">
        <Outlet />
      </div>
      <div className="fixed bottom-0 left-0 right-0 bg-white z-10">
        <TabBar
          activeKey={pathname}
          onChange={(value) => setRouteActive(value)}
        >
          {tabs.map((item) => (
            <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
          ))}
        </TabBar>
      </div>
    </div>
  );
};

function App() {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<Bottom />}>
            <Route index element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<Home />} />
            <Route path="/me" element={<Me />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/detail" element={<Detail />} />
        </Routes>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default App
