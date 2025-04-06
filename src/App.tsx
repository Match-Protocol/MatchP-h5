import { Routes, Route, Outlet, Navigate } from "react-router";

import type { FC } from "react";
import { TabBar } from "antd-mobile";
import { useNavigate, useLocation } from "react-router";

import { Home } from "./views/Home";
import { Chat } from "./views/Chat";
import { Me } from "./views/Me";

import createIcon from "./assets/tabbar/create_icon.png";
import indexIcon from "./assets/tabbar/index_icon.png";
import indexIconSelected from "./assets/tabbar/index_icon_selected.png";
import myIcon from "./assets/tabbar/my_icon.png";
import myIconSelected from "./assets/tabbar/my_icon_selected.png";

const Bottom: FC = () => {
  const location = useLocation();
  const { pathname } = location;

  const navigate = useNavigate();

  const setRouteActive = (value: string) => {
    if(value === "/chat") return;
    navigate(value);
  };

  const tabs = [
    {
      key: "/home",
      title: (active: boolean) => (
        <span
          className={`text-[14px] ${
            active ? "text-[rgb(48,49,51)]" : "text-[rgb(96,98,102)]"
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
          className="w-[55px] h-[55px] -translate-y-[45px]"
        />
      ),
    },
    {
      key: "/me",
      title: (active: boolean) => (
        <span
          className={`text-[14px] ${
            active ? "text-[rgb(48,49,51)]" : "text-[rgb(96,98,102)]"
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
      <Outlet />
      <TabBar activeKey={pathname} onChange={(value) => setRouteActive(value)}>
        {tabs.map((item) => (
          <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
        ))}
      </TabBar>
    </div>
  );
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Bottom />}>
        <Route index element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/me" element={<Me />} />
      </Route>
    </Routes>
  );
}

export default App;
