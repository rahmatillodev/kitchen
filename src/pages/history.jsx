import React, { useEffect, useState } from "react";
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
import CheckModal from "../components/history/checkModal";
import { useOrderStore } from "../stores/useOrderStore";


export default function HistoryPage() {
  const { allOrders, fetchCompletedOrders } = useOrderStore();

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchCompletedOrders(currentPage);
  }, [currentPage]);

  const completedOrders = allOrders?.results?.data ?? [];
  const totalCount = allOrders?.count ?? 0;
  const totalPages = Math.ceil(totalCount / 10);

  const loading = !allOrders; 

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Buyurtmalar tarixi</h2>

      {!loading && (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Stol</TableHead>
                <TableHead>Odamlar</TableHead>
                <TableHead>Vaqti</TableHead>
                <TableHead>Umumiy</TableHead>
                <TableHead>Harakatlar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {completedOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>#{order.id}</TableCell>
                  <TableCell>{order.table ?? "-"}</TableCell>
                  <TableCell>{order.client_count ?? "-"}</TableCell>
                  <TableCell> {new Date(order.created_time).toLocaleString()}</TableCell>
                  <TableCell>
                    {parseFloat(order.total_price)?.toLocaleString("uz-UZ") ?? "-"} so'm
                  </TableCell>
                  <TableCell className="space-x-2">
                    {/* Batafsil Modal */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSelectedOrder(order)}
                        >
                          Batafsil
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Buyurtma tafsilotlari</DialogTitle>
                        </DialogHeader>
                        {selectedOrder?.id === order.id && (
                          <div className="space-y-2 text-sm">
                            <p>Stol: {selectedOrder.table ?? "-"}</p>
                            <p>Odamlar soni: {selectedOrder.client_count ?? "-"}</p>
                            <p>Vaqti: {new Date(selectedOrder.created_time).toLocaleString()}</p>
                            <hr />
                            {selectedOrder.items?.length ? (
                              selectedOrder.items.map((item, i) => (
                                <div
                                  key={i}
                                  className="flex justify-between items-center"
                                >
                                  <span>
                                    {item.menu_name ?? "Noma'lum"} × {item.quantity ?? 0}
                                  </span>
                                  <span>
                                    {(
                                      parseFloat(item.current_price) * item.quantity
                                    ).toLocaleString()} so'm
                                  </span>
                                </div>
                              ))
                            ) : (
                              <p>Elementlar mavjud emas</p>
                            )}
                            <hr />
                            <div className="flex justify-between font-semibold">
                              <span>Umumiy:</span>
                              <span>
                                {parseFloat(selectedOrder.total_price)?.toLocaleString()} so'm
                              </span>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>

                    {/* Chekni ko‘rish */}
                    <CheckModal
                      order={order}
                      trigger={
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => setSelectedOrder(order)}
                        >
                          Chekni ko‘rish
                        </Button>
                      }
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {totalPages && (
            <div className="flex justify-end mt-6 gap-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <Button
                  key={i}
                  variant={currentPage === i + 1 ? "default" : "outline"}
                  className="w-10 h-10 p-0"
                  onClick={() => setCurrentPage(i + 1)}
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
