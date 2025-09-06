import { useState } from "react";
import axiosInstance from "./config";

export const useDelete = () => {
  const [showModal, setShowModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const handleDeleteClick = (item) => {
    setItemToDelete(item);
    setShowModal(true);
  };

  const handleDeleteConfirm = async (endpoint, updateStateCallback) => {
    setLoading(true);
    try {
      await axiosInstance.delete(endpoint);
    setToast({
        message: `${itemToDelete.title || "Item"} deleted successfully!`,
        type: "success",
      });
      if (updateStateCallback) {
        updateStateCallback(itemToDelete.id);
      }
    } catch (error) {
      console.error("Error deleting item:", error);

      setToast({
        message: "❌ Failed to delete item",
        type: "error",
      });
        } finally {
      setLoading(false);
      setShowModal(false);
      setItemToDelete(null);
      setTimeout(() => setToast(null), 3000);

    }
  };

  const handleDeleteCancel = () => {
    setShowModal(false);
    setItemToDelete(null);
  };

  return {
    showModal,
    itemToDelete,
    loading,
    toast,
    handleDeleteClick,
    handleDeleteConfirm,
    handleDeleteCancel,
  };
};
