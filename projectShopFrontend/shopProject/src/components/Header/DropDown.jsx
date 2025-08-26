import React from "react";
import { Button, Dropdown, Space } from "antd";
import { FaUser } from "react-icons/fa";

const items = [
  {
    key: "1",
    label: (
      <a target="_blank" href="/logout" className="primary px-5">
        Log Out
      </a>
    ),
  },
];

const DropDown = ({ username }) => (
  <Space direction="vertical">
    <Space wrap>
      <Dropdown menu={{ items }} placement="bottom">
        <a
          href="#"
          className="  text-white-500 hover:text-black  transition flex items-center gap-2"
        >
          <FaUser className="hover:text-yellow-300" />
          {` Hi ${username} 👋 `}
        </a>
      </Dropdown>
    </Space>
  </Space>
);

export default DropDown;
