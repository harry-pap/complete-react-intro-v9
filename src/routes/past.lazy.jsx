import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import getPastOrders from "../api/getPastOrders.js";
import getPastOrder from "../api/getPastOrder.js";
import Modal from "../Modal";
import { createLazyFileRoute } from "@tanstack/react-router";
import priceConverter from "../useCurrency.jsx";
import ErrorBoundary from "../ErrorBoundary.jsx";

export const Route = createLazyFileRoute("/past")({
  component: ErrorBoundaryWrappedPastOrderRoutes,
});

function ErrorBoundaryWrappedPastOrderRoutes(
  // props,
) {
  return (
    <ErrorBoundary>
      {/* If we did have props, we would pass through them this way */}
      {/*<PastOrdersRoute {...props}/>*/}
      <PastOrdersRoute />
    </ErrorBoundary>
  );
}

function PastOrdersRoute() {
  // uncomment the line below to test the Error Boundaries
  // throw new Error("Boom");
  const [page, setPage] = useState(1);
  const [focusedOrder, setFocusedOrder] = useState();
  const { isLoading, data } = useQuery({
    queryKey: ["past-orders", page],
    queryFn: () => getPastOrders(page),
    // expire every 30 seconds
    staleTime: 10_000,
  });

  // below is the way to rename to a different variable (as isLoading already exists)
  const { isLoading: isLoadingPastOrder, data: pastOrderData } = useQuery({
    queryKey: ["past-order", focusedOrder],
    queryFn: () => getPastOrder(focusedOrder),
    staleTime: 86400000, // one day in ms
    enabled: !!focusedOrder, // don't make an API if there's no focused order
  });

  if (isLoading)
    return (
      <div className="past-orders">
        <h2>LOADING...</h2>
      </div>
    );

  return (
    <div className="past-orders">
      <table>
        <thead>
          <tr>
            <td>ID</td>
            <td>Date</td>
            <td>Time</td>
          </tr>
        </thead>
        <tbody>
          {data.map((order) => (
            <tr key={order.order_id}>
              <td>
                <button onClick={() => setFocusedOrder(order.order_id)}>
                  {order.order_id}
                </button>
              </td>
              <td>{order.date}</td>
              <td>{order.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pages">
        <button disabled={page <= 1} onClick={() => setPage(page - 1)}>
          Previous
        </button>
        {/* Bad, but ok */}
        <button disabled={data.length < 10} onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>
      {focusedOrder ? (
        <Modal>
          <h2>Order #{focusedOrder}</h2>
          {!isLoadingPastOrder ? (
            <table>
              <thead>
                <tr>
                  <td>Image</td>
                  <td>Name</td>
                  <td>Size</td>
                  <td>Quantity</td>
                  <td>Price</td>
                  <td>Total</td>
                </tr>
              </thead>
              <tbody>
                {pastOrderData.orderItems.map((pizza) => (
                  <tr key={`${pizza.pizzaTypeId}_${pizza.size}`}>
                    <td>
                      <img src={pizza.image} alt={pizza.name} />
                    </td>
                    <td>{pizza.name}</td>
                    <td>{pizza.size}</td>
                    <td>{pizza.quantity}</td>
                    <td>{priceConverter(pizza.price)}</td>
                    <td>{priceConverter(pizza.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p> Loading ... lol </p>
          )}
          <button onClick={() => setFocusedOrder(null)}>Close</button>
        </Modal>
      ) : null}
    </div>
  );
}
