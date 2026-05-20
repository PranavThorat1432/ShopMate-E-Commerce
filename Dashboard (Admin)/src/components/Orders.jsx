import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "./Header";
import { deleteOrder, fetchAllOrders, updateOrderStatus } from "../store/slices/orderSlice";
import { Cross, MapPin, Phone, User, X } from "lucide-react";

const Orders = () => {

  const dispatch = useDispatch();
  const {loading, orders} = useSelector((state) => state.order);


  const [selectedStatus, setSelectedStatus] = useState({});
  const [filterByStatus, setFilterByStatus] = useState('All');
  const [previewImage, setPreviewImage] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState({ open: false, id: null });

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

  const handleStatusChange = (orderId, newStatus) => {
    setSelectedStatus(newStatus);
    dispatch(updateOrderStatus({ orderId, status: newStatus }));
  };

  const filteredOrders = filterByStatus === 'All' ? orders : orders?.filter(order => order.order_status === filterByStatus);

  const confirmDelete = () => {
    dispatch(deleteOrder(deleteConfirm.id));
    setDeleteConfirm({ open: false, id: null });
  };

  if(loading) {
    return <p className="p-10">Loading Orders...</p>
  }

  const statusArray = ['All', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

  return (
    <main className="p-2.5 pl-2.5 md:pl-68 w-full">
      {/* Header */}
      <div className="flex-1 md:p-6">
        <Header />
        <h1 className="text-2xl font-bold">All Orders</h1>
        <p className="text-sm text-gray-600 mb-6">Manage All Your Orders</p>
      </div>

      {/* Content */}
      {
        loading ? (
          <div className="w-40 h-40 mx-auto border-2 border-white border-t-transparent rounded-full animate-spin"/>
        ) : (
          <>
            <div className="flex justify-between items-center p-6">
              <select className="p-2 border rounded shadow-sm cursor-pointer" onChange={(e) => setFilterByStatus(e.target.value)}>
                {
                  statusArray.map(status => (
                    <option key={status}>{status}</option>
                  ))
                }
              </select>
            </div>

            {
              filteredOrders?.length > 0 ? (
                filteredOrders.map(order => (
                  <div key={order.id} className="bg-white shadow-lg rounded-lg p-6 mb-6 transition-all">
                    <div className="flex justify-between items-start flex-wrap gap-4">
                      <div>
                        <p>
                          <strong>Order ID: </strong>{order.id}
                        </p>
                        <p>
                          <strong>Status: </strong>{order.order_status || 'Processing'}
                        </p>
                        <p>
                          <strong>Placed on: </strong>{new Date(order.created_at).toLocaleString()}
                        </p>
                        <p>
                          <strong>Total Amount: </strong> ${order.total_price}
                        </p>
                      </div>

                      <div>
                        <select 
                          value={selectedStatus[order.id] || order.order_status} 
                          onChange={(e) => handleStatusChange(order.id, e.target.value)}
                          className="border p-2 rounded mb-2 cursor-pointer"
                        >
                          {
                            statusArray.map(status => (
                              <option key={status} value={status}>{status}</option>
                            ))
                          }
                        </select>

                        <button 
                          onClick={() => setDeleteConfirm({open: true, id: order.id})} 
                          className="ml-3 bg-red-500 hover:bg-red-600 transition-all duration-300 ease-in-out text-white px-3 py-1 cursor-pointer rounded" 
                        >
                          Delete
                        </button>
                      </div>
                    </div>

                    <div className="mt-4 ">
                      <h4 className="font-semibold text-lg mb-1">Shipping Info</h4>
                      <p className="flex items-center gap-1">
                        <User className="h-4 w-4"/>
                        <strong>Name: </strong>{order?.shipping_info?.full_name}
                      </p>
                      <p className="flex items-center gap-1">
                        <Phone className="h-3.5 w-3.5"/>
                        <strong>Phone: </strong>{order?.shipping_info?.phone}
                      </p>
                      <p className="flex items-center gap-1">
                        <MapPin className="h-4 w-4"/>
                        <strong>Address: </strong>{order?.shipping_info?.address}, {order?.shipping_info?.city}, {order?.shipping_info?.state} - {order?.shipping_info?.pincode}
                      </p>
                    </div>

                    <div className="mt-4">
                      <h4 className="font-semibold text-lg mb-2">Ordered Items</h4>
                      {
                        Array.isArray(order.order_items) && order.order_items.map(item => (
                          <div className="flex items-center gap-4 mb-2 border-b pb-2" key={item?.order_id}>
                            {
                              item?.image && (
                                <img 
                                  src={item.image} 
                                  alt={item.title} 
                                  className="w-16 h-16 object-cover cursor-pointer" 
                                  onClick={() => setPreviewImage(item.image)}
                                />
                              )
                            }
                            <div>
                              <p className="font-semibold">{item.title}</p>
                              <p>
                                  <strong>Qty:</strong> {item.quantity} 
                                | <strong>Price:</strong> ${item.price} 
                                | <strong>Total Price:</strong> ${item.quantity * item.price}</p>
                            </div>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-10">
                  <p className="text-gray-500 text-lg">No orders found</p>
                </div>
              )
            }

            {/* Image Preview */}
            {previewImage && (
              <div 
                className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" 
              >
                <div className="relative w-[90vw] h-[90vh]">
                  <X 
                    className="absolute top-4 right-4 text-white w-8 h-8 cursor-pointer bg-black/50 rounded-full p-1 z-10" 
                    onClick={(e) => {
                      e.stopPropagation();
                      setPreviewImage(null);
                    }}
                  />
                  <img 
                    src={previewImage} 
                    alt="preview" 
                    className="w-full h-full object-contain rounded-lg shadow-xl"
                  />
                </div>
              </div>
            )}

            {/* Delete Order Confirmation */}
            {deleteConfirm.open && (
              <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
                <div className="bg-white p-6 rounded shadow-lg text-center max-w-sm w-full">
                  <h3 className="text-lg font-semibold mb-4">Are you sure, you want to delete this order?</h3>
                  <div className="flex justify-self-center gap-4">
                    <button 
                      onClick={confirmDelete} 
                      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-all duration-200 ease-in-out cursor-pointer"
                    >
                      Yes, Delete!
                    </button>
                    
                    <button 
                      onClick={() => setDeleteConfirm({ open: false, id: null })} 
                      className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition-all duration-200 ease-in-out cursor-pointer"
                    >
                      No, Cancel!
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )
      }
    </main>
  );
};

export default Orders;
