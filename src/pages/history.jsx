import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { mockOrders } from "../infrastructure/mock/mockData";
import CheckModal from "../components/history/checkModal";

const formatDate = (iso) =>
  iso
    ? new Date(iso).toLocaleString("uz-UZ", {
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

export default function HistoryPage() {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = mockOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(mockOrders.length / ordersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Buyurtmalar tarixi</h2>

      {mockOrders.length === 0 ? (
        <p className="text-gray-500 text-sm">
          Hozircha hech qanday buyurtma mavjud emas.
        </p>
      ) : (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Stol</TableHead>
                <TableHead>Odamlar</TableHead>
                <TableHead>Vaqti</TableHead>
                <TableHead>Umumiy</TableHead>
                <TableHead>To'liq ma'lumot</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.tableNumber ?? "-"}</TableCell>
                  <TableCell>{order.peopleCount ?? "-"}</TableCell>
                  <TableCell>{formatDate(order.createdAt)}</TableCell>
                  <TableCell>
                    {order.finalTotal !== undefined && order.finalTotal !== null
                      ? order.finalTotal.toLocaleString()
                      : "-"}{" "}
                    so'm
                  </TableCell>
                  <TableCell className="space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          onClick={() => setSelectedOrder(order)}
                        >
                          Batafsil
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Buyurtma tafsilotlari</DialogTitle>
                        </DialogHeader>
                        {selectedOrder && (
                          <div className="space-y-2">
                            <div className="text-sm">
                              Stol: {selectedOrder.tableNumber ?? "-"}
                            </div>
                            <div className="text-sm">
                              Odamlar soni: {selectedOrder.peopleCount ?? "-"}
                            </div>
                            <div className="text-sm">
                              Vaqti: {formatDate(selectedOrder.createdAt)}
                            </div>
                            <hr className="my-2" />
                            <div className="space-y-1">
                              {selectedOrder.items &&
                              selectedOrder.items.length > 0 ? (
                                selectedOrder.items.map((item) => (
                                  <div
                                    key={item.id}
                                    className="flex justify-between text-sm"
                                  >
                                    <span>
                                      {item.name ?? "Noma'lum"} ×{" "}
                                      {item.qty ?? 0}
                                    </span>
                                    <span>
                                      {item.price && item.qty
                                        ? (item.price * item.qty).toLocaleString()
                                        : "0"}{" "}
                                      so'm
                                    </span>
                                  </div>
                                ))
                              ) : (
                                <p>Buyurtma elementlari mavjud emas.</p>
                              )}
                            </div>
                            <hr className="my-2" />
                            <div className="flex justify-between font-semibold text-sm">
                              <span>Umumiy:</span>
                              <span>
                                {selectedOrder.finalTotal !== undefined &&
                                selectedOrder.finalTotal !== null
                                  ? selectedOrder.finalTotal.toLocaleString()
                                  : "0"}{" "}
                                so'm
                              </span>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>

                    <CheckModal
                      order={order}
                      trigger={
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => setSelectedOrder(order)}
                        >
                          Chekni ko'rish
                        </Button>
                      }
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-end mt-6 gap-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <Button
                  key={i + 1}
                  variant={currentPage === i + 1 ? "default" : "outline"}
                  onClick={() => paginate(i + 1)}
                  className="w-10 h-10 p-0"
                >
                  {i + 1}
                </Button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
