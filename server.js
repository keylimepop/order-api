const express = require("express");

const app = express();
app.use(express.json());

const orders = [
  {
    id: "1001",
    customer: "Alex Lee",
    status: "shipped",
    total: 42.50
  },
  {
    id: "1002",
    customer: "Bertha King",
    status: "processing",
    total: 18.00
  }
];

// Get all orders or filter orders by status and limit
app.get("/api/orders", (req, res) => {
  const { status, limit } = req.query;

  const validStatuses = ["processing", "shipped", "cancelled"];

  if (status && !validStatuses.includes(status)) {
    return res.status(400).json({
      error: "Invalid status"
    });
  }

  let parsedLimit = 20;

  if (limit !== undefined) {
    parsedLimit = Number(limit);

    if (!Number.isInteger(parsedLimit) || parsedLimit < 1 || parsedLimit > 100) {
      return res.status(400).json({
        error: "limit must be an integer between 1 and 100"
      });
    }
  }

  let filteredOrders = orders;

  if (status) {
    filteredOrders = orders.filter(order => order.status === status);
  }

  res.json(filteredOrders.slice(0, parsedLimit));
});

// Get a single order by ID
app.get("/api/orders/:id", (req, res) => {
  const order = orders.find(order => order.id === req.params.id);

  if (!order) {
    return res.status(404).json({
      error: "Order not found"
    });
  }

  res.json(order);
});

// Create a new order
app.post("/api/orders", (req, res) => {
  const { customer, total } = req.body;

  if (typeof customer !== "string" || customer.trim() === "") {
    return res.status(400).json({
      error: "customer must be a non-empty string"
    });
  }

  if (typeof total !== "number" || !Number.isFinite(total) || total <= 0) {
    return res.status(400).json({
      error: "total must be a number greater than 0"
    });
  }

  const newOrder = {
    id: String(orders.length + 1001),
    customer: customer.trim(),
    status: "processing",
    total
  };

  orders.push(newOrder);

  res.status(201).json(newOrder);
});

app.listen(3000, () => {
  console.log("Order API running at http://localhost:3000");
});