import { FC, useState } from "react";
import "./styles.css";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel as ReactCarousel } from "react-responsive-carousel";
import React from "react";
import { Icon } from "@mui/material";
import { IoHomeOutline } from "react-icons/io5";
import { IoApps } from "react-icons/io5";
import { IoDuplicateOutline } from "react-icons/io5";
import { IoHeartOutline } from "react-icons/io5";
import { IoMenu } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";

import SidebarMenuIcon from './sidebar menu svg/SidebarMenuIcon';

const menuItems = [
  {
    name: "Home",
    icon: <IoHomeOutline />,
  },
  {
    name: "Apps",
    icon: <IoApps />,
  },
  {
    name: "Create",
    icon: <IoDuplicateOutline />,
  },
  {
    name: "Favourites",
    icon: <IoHeartOutline />,
  },
];

const tabs = [<IoMenu />, <IoSettingsOutline />];

type NavProps = {
  activeTab: number;
  onTabClicked: (tab: number) => void;
  isOpen: boolean;
  toggleSidebar: () => void;
};

const Nav: FC<NavProps> = ({ activeTab, onTabClicked, isOpen, toggleSidebar }) => (
  <header className="tabs">
    <button onClick={toggleSidebar}>
      <SidebarMenuIcon />
    </button>
    {tabs.map((tab, index) => (
      <button
        key={tab}
        type="button"
        onClick={() => onTabClicked(index)}
        className={`${activeTab === index ? "active" : ""}`}
      >
        <Icon>{tab}</Icon>
      </button>
    ))}
    <div
      className="underline"
      style={{
        translate: `${activeTab * 150}% 0`,
      }}
    />
  </header>
);

type ButtonProps = {
  name: string;
  icon?: string;
};

const NavButton: FC<ButtonProps> = ({ name, icon }) => (
  <button type="button">
    {icon}
    <span>{name}</span>
  </button>
);

export const Sidebar = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const handleTabClicked = (index: number) => setActiveTab(index);

  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button className="button-sidebar" onClick={toggleSidebar}>
        {isOpen ? <SidebarMenuIcon /> : <SidebarMenuIcon />}
      </button>
      <aside className={`sidebar ${isOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <div>
          <Nav activeTab={activeTab} onTabClicked={handleTabClicked} isOpen={isOpen} toggleSidebar={toggleSidebar} />

          <ReactCarousel
            className="react-carousel"
            showArrows={false}
            showStatus={false}
            showThumbs={false}
            showIndicators={false}
            swipeable={true}
            emulateTouch={true}
            selectedItem={activeTab}
            onChange={handleTabClicked}
          >
            <div>
              {menuItems.map((item) => (
                <NavButton name={item.name} icon={item.icon} />
              ))}
            </div>
            {/* <div>
            <form>
              <div className="textbox">
                <span className="material-symbols-outlined">account_circle</span>
                <input placeholder="Name" type="text" required />
              </div>
              <div className="textbox">
                <span className="material-symbols-outlined">lock</span>
                <input placeholder="Password" type="password" required />
              </div>
              <div className="textbox">
                <span className="material-symbols-outlined">email</span>
                <input placeholder="Email" type="text" required />
              </div>
            </form>
          </div> */}
            <div>
              <form>
                <div className="row">
                  <div className="switch-label">Dark Mode</div>
                  <span className="switch">
                    <input id="switch-round" type="checkbox" />
                    <label htmlFor="switch-round"></label>
                  </span>
                </div>
                <div className="row">
                  <div className="switch-label">Accessibility Mode</div>
                  <span className="switch">
                    <input id="switch-round" type="checkbox" />
                    <label htmlFor="switch-round"></label>
                  </span>
                </div>
                <div className="row">
                  <div className="switch-label">Quirks Mode</div>
                  <span className="switch">
                    <input id="switch-round" type="checkbox" />
                    <label htmlFor="switch-round"></label>
                  </span>
                </div>
              </form>
            </div>
          </ReactCarousel>
        </div>
      </aside>
    </div>
  );
};
