import React, { useState } from "react";
import { Flex, Modal } from "antd";
import { MessageCircle } from "lucide-react";
import InputsComp from "../common/InputsComp";
import imageModal from "../../assets/Images/FoodImage3.jpg";
const CommentModal = () => {
  const [openResponsive, setOpenResponsive] = useState(false);
  return (
    <Flex vertical gap="middle" align="flex-start">
      <MessageCircle onClick={() => setOpenResponsive(true)} />

      <Modal
        className="ant-modal-content rounded-lg "
        open={openResponsive}
        onOk={() => setOpenResponsive(false)}
        onCancel={() => setOpenResponsive(false)}
        width={{
          xs: "90%",
          sm: "80%",
          md: "70%",
          lg: "60%",
          xl: "50%",
          xxl: "40%",
        }}
      >
        <div className="w-full  flex flex-row overflow-hidden">
          <div className="w-1/2  flex flex-col items-center justify-center p-6">
            <div className="w-full h-full  ">
              <img
                src={imageModal}
                className="w-full h-full object-cover"
              ></img>
            </div>
          </div>

          <div className="w-1/2 flex flex-col items-center justify-center p-6 ">
            <div className="w-full h-full  ">
              <div className="mt-5">
                <h2 className="font-bold">COMMENT</h2>
                <ul className="text-gray-700">
                  <li>comment 01</li>
                  <li>comment 01</li>
                  <li>comment 01</li>
                </ul>
              </div>

              <div className="mt-4">
                <h2 className="font-bold">COMMENT</h2>
                <li>comment 01</li>
                <li>comment 01</li>
                <li>comment 01</li>
                <li>comment 01</li>
                <li>comment 01</li>
                <li>comment 01</li>
                <li>comment 01</li>
              </div>

              <div className="w-full  mt-40 rounded-none">
                <div className="w-full flex items-center border-t border-gray-300 px-3 py-2">
                  <div className="mr-2">
                    <span className="text-2xl">😊</span>
                  </div>

                  <input
                    type="text"
                    placeholder="Add a comment..."
                    className="flex-1 outline-none text-sm placeholder-gray-400 p-4"
                  />

                  <button className="ml-2 text-blue-500 text-sm font-semibold hover:opacity-70">
                    Post
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </Flex>
  );
};
export default CommentModal;
