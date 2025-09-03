import React, { useState } from "react";
import { Modal, Input } from "antd";
import { Share2 } from "lucide-react";

const ShareModal = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const users = [
    { id: 1, name: "Mujtaba Zahidi", img: "https://via.placeholder.com/50" },
    { id: 2, name: "Ali Sher", img: "https://via.placeholder.com/50" },
    { id: 3, name: "Ahmad Ali", img: "https://via.placeholder.com/50" },
    { id: 4, name: "Musa Raza", img: "https://via.placeholder.com/50" },
    { id: 5, name: "Chaudhary Hasnain", img: "https://via.placeholder.com/50" },
  ];

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Share2 onClick={showModal} className="cursor-pointer" />

      <Modal
        title="Share"
        open={open}
        onCancel={handleCancel}
        footer={null}
        centered
        className="rounded-lg justify-center"
      >
        <Input
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-3 rounded-md"
        />

        <div className="max-h-48 overflow-y-auto">
          <div className="grid grid-cols-4 gap-3">
            {users
              .filter((u) =>
                u.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((user) => (
                <div
                  key={user.id}
                  className="flex flex-col items-center cursor-pointer hover:opacity-80"
                >
                  <img
                    src={user.img}
                    alt={user.name}
                    className="w-12 h-12 rounded-full border"
                  />
                  <p className="text-xs mt-1 text-center">{user.name}</p>
                </div>
              ))}
          </div>
        </div>

        <div className="mt-4">
          <Input.TextArea
            placeholder="Write a message..."
            rows={2}
            className="rounded-md"
          />
        </div>

        <button className="mt-3 w-full bg-blue-500 text-white py-2 rounded-md font-semibold hover:bg-blue-600">
          Send
        </button>
      </Modal>
    </>
  );
};

export default ShareModal;
