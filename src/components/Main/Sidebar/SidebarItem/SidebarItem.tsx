import React from 'react';
import './sidebarItem.css';

interface IProps {
  Icon?: React.FC;
  title: string;
}

const SidebarItem: React.FC<IProps> = ({ Icon, title }) => {
  return <div className="sidebar__item">{title}</div>;
};

export default SidebarItem;
