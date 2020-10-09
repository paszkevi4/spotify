import React from 'react';
import './sidebarItem.css';

interface IProps {
  icon?: object;
  title: string;
}

const SidebarItem: React.FC<IProps> = ({ icon, title }) => {
  return (
    <div className="sidebar__item">
      {icon}
      {title}
    </div>
  );
};

export default SidebarItem;
