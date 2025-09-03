import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Flex, Modal } from "antd";
import { MessageCircle } from "lucide-react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import ProfilePic from "../assets/Images/profile.png";

const CommentModal = ({ currentId }) => {
  const [openResponsive, setOpenResponsive] = useState(false);
  const [productData, setProductData] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [comment, setComment] = useState(null);
  const [comments, setComments] = useState([]);

  const api = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();
  const { id: routeId } = useParams();

  const normId = useCallback((id) => {
    if (!id) return "";
    if (typeof id === "string") return id;
    if (typeof id === "object" && id.$oid) return id.$oid;

    try {
      return String(id);
    } catch {
      return "";
    }
  }, []);

  const openForCurrentPost = () => {
    const raw = currentId ?? routeId;
    const id = normId(raw);
    if (!id) return;
    setSelectedId(id);
    setOpenResponsive(true);
    navigate(`/home/${id}`);
  };

  const CommentApis = async () => {
    try {
      const response = await axios.get(`${api}/products`);
      setProductData(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    CommentApis(selectedId);
  }, [api]);

  const selectedProduct = useMemo(() => {
    const id = selectedId || normId(currentId) || normId(routeId);

    return productData?.products?.find((p) => normId(p._id) === id);
  }, [productData, selectedId, currentId, routeId, normId]);

  const handlePostComment = async (id) => {
    if (!comment?.trim()) return;

    try {
      const response = await axios.post(`${api}/products/${id}/comment`, {
        comment,
      });

      setComments(response.data.commentBy);

      setComment("");
      console.log("response", response.data.comments);
    } catch (err) {
      console.error("Error posting comment:", err);
    }
  };

  return (
    <Flex vertical gap="middle" align="flex-start">
      <MessageCircle onClick={openForCurrentPost} className="cursor-pointer" />

      <Modal
        className="ant-modal-content rounded-lg cursor-pointer"
        open={openResponsive}
        onOk={() => setOpenResponsive(false)}
        onCancel={() => setOpenResponsive(false)}
        width={800}
      >
        <div className="w-full flex flex-row overflow-hidden">
          <div className="w-1/2 flex items-center 0 justify-center p-6">
            {selectedProduct ? (
              <img
                src={`${api}${selectedProduct.image}`}
                className="w-full h-full object-cover"
                alt="product"
              />
            ) : (
              <div className="text-sm text-gray-500">No product found.</div>
            )}
          </div>

          <div className="w-1/2 flex flex-col  overflow-hidden items-center justify-center p-6">
            <h2 className="font-bold mt-5">COMMENTS</h2>
            <div className="no-scrollbar w-full h-96   overflow-y-auto">
              <ul className="text-gray-700 overflow-hidden">
                {comments.length > 0 ? (
                  <div>
                    {comments.map((item) => {
                      return (
                        <div className="w-full flex flex-row gap-4">
                          <img src={ProfilePic} className="w-6 h-6" />
                          <p>{item}</p>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div>
                    <p>NO Comment Found</p>
                  </div>
                )}
              </ul>
            </div>
            <div className="w-full  mt-10  overflow-hidden ">
              <div className="w-full flex items-center border-t border-gray-300 px-3 py-2">
                <div className="mr-2">
                  <span className="text-2xl">😊</span>
                </div>
                <input
                  type="text"
                  value={comment || ""}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="flex-1 outline-none text-sm placeholder-gray-400 p-4"
                />

                <button
                  className="ml-2 text-blue-500 text-sm font-semibold hover:opacity-70"
                  onClick={() => handlePostComment(selectedProduct?._id)}
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </Flex>
  );
};

export default CommentModal;
