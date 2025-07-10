import React from "react";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export function SidebarItem({
  icon,
  label,
  active = false,
  onClick,
}: SidebarItemProps) {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer text-sm font-medium ${
        active ? "bg-[#F5F6FA] text-black" : "text-[#393C4E] hover:bg-[#F5F6FA]"
      } transition-colors`}
      onClick={onClick}
    >
      {icon}
      <span>{label}</span>
    </div>
  );
}
