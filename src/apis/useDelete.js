import { useState } from "react";
import axiosInstance from "./config";

export const useDelete = () => {
  const [showModal, setShowModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleDeleteClick = (item) => {
    setItemToDelete(item);
    setShowModal(true);
  };

  const handleDeleteConfirm = async (endpoint, updateStateCallback) => {
    setLoading(true);
    try {
      await axiosInstance.delete(endpoint);
      alert(`${itemToDelete.title || "Item"} deleted successfully!`);

      if (updateStateCallback) {
        updateStateCallback(itemToDelete.id);
      }
    } catch (error) {
      console.error("Error deleting item:", error);
      alert("Failed to delete item");
    } finally {
      setLoading(false);
      setShowModal(false);
      setItemToDelete(null);
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
    handleDeleteClick,
    handleDeleteConfirm,
    handleDeleteCancel,
  };
};
