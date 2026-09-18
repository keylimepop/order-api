# API reference

The Order API is a service for creating and retrieving customer orders.

The base URL for the Order API is `http://localhost:3000`.

The API is intended for local development and testing. It is not currently deployed to a public URL.

The API is based on REST principles. It returns data in JSON format, and uses standard HTTP status codes.

This page has information about:

* endpoints
* HTTP status codes
* error responses
* the order status lifecycle

## Endpoints

| Endpoint                                                                      | URL                    |
| ----------------------------------------------------------------------------- | ---------------------- |
| [Create an order](#create-an-order)                                           | `POST /api/orders`     |
| [Get information about a single order](#get-information-about-a-single-order) | `GET /api/orders/{id}` |
| [Get orders](#get-orders)                                                     | `GET /api/orders`      |

## Create an order

Creates a new order.

The API automatically generates the order ID and sets the initial order status to `processing`.

### JSON body parameters for Create an order

The request body must be a JSON object.

| Parameter  | Type   | Required | Description                                                                                                         |
| ---------- | ------ | -------- | ------------------------------------------------------------------------------------------------------------------- |
| `customer` | string | Yes      | The name of the customer. Must not be empty or contain only whitespace. Leading and trailing whitespace is removed. |
| `total`    | number | Yes      | The total value of the order. Must be greater than 0.                                                               |

Do not include `id` or `status` in the request body. The API generates these values.

### Example request for Create an order

`POST /api/orders`

```json
{
  "customer": "Zack Aung",
  "total": 27.50
}
```

### Example response for Create an order

The API returns a `201 Created` response when the order is created successfully.

```json
{
  "id": "1003",
  "customer": "Zack Aung",
  "status": "processing",
  "total": 27.5
}
```

### Attributes you'll get in a Create an order response

| Attribute  | Type   | Description                          |
| ---------- | ------ | ------------------------------------ |
| `id`       | string | The unique ID assigned to the order. |
| `customer` | string | The name of the customer.            |
| `status`   | string | The current status of the order.     |
| `total`    | number | The total value of the order.        |

### Errors

The API returns `400 Bad Request` if the request contains invalid or missing fields.

If `customer` is missing, is not a string, or is empty or contains only whitespace:

```json
{
  "error": "customer must be a non-empty string"
}
```

If `total` is missing, is not a number, or is less than or equal to 0:

```json
{
  "error": "total must be a number greater than 0"
}
```

## Get information about a single order

Retrieves an order using its ID.

### Path parameters for Get information about a single order

| Parameter | Type   | Required | Description                             |
| --------- | ------ | -------- | --------------------------------------- |
| `id`      | string | Yes      | The unique ID of the order to retrieve. |

### Example request for Get information about a single order

`GET /api/orders/1001`

### Example response for Get information about a single order

The API returns a `200 OK` response when an order with the specified ID exists.

```json
{
  "id": "1001",
  "customer": "Alex Lee",
  "status": "shipped",
  "total": 42.5
}
```

### Attributes you'll get in a Get information about a single order response

| Attribute  | Type   | Description                      |
| ---------- | ------ | -------------------------------- |
| `id`       | string | The unique ID of the order.      |
| `customer` | string | The name of the customer.        |
| `status`   | string | The current status of the order. |
| `total`    | number | The total value of the order.    |

### Errors

If no order matches the specified ID, the API returns `404 Not Found`.

For example:

`GET /api/orders/9999`

```json
{
  "error": "Order not found"
}
```

## Get orders

Retrieves orders from the API.

You can use query parameters to filter orders by status and limit the number of results returned.

### Query parameters for Get orders

| Parameter | Type    | Required | Default | Description                                                                             |
| --------- | ------- | -------- | ------- | --------------------------------------------------------------------------------------- |
| `status`  | string  | No       | None    | Filters orders by status. Accepted values are `processing`, `shipped`, and `cancelled`. |
| `limit`   | integer | No       | `20`    | The maximum number of orders to return. Must be between 1 and 100.                      |

You can use `status` and `limit` separately or together.

If `status` is not provided, orders with any status are returned.

If `limit` is not provided, the API returns up to 20 orders.

### Example request for Get orders

To retrieve up to 10 orders with a `processing` status:

`GET /api/orders?status=processing&limit=10`

### Example response for Get orders

The API returns a `200 OK` response with an array of orders.

```json
[
  {
    "id": "1002",
    "customer": "Bertha King",
    "status": "processing",
    "total": 18
  }
]
```

If no orders match the specified filters, the API returns an empty array.

```json
[]
```

### Attributes you'll get in a Get orders response

Each item in the response contains the following attributes:

| Attribute  | Type   | Description                      |
| ---------- | ------ | -------------------------------- |
| `id`       | string | The unique ID of the order.      |
| `customer` | string | The name of the customer.        |
| `status`   | string | The current status of the order. |
| `total`    | number | The total value of the order.    |

### Errors

The API returns `400 Bad Request` if a query parameter is invalid.

If `status` is not one of the accepted values:

```json
{
  "error": "Invalid status"
}
```

If `limit` is not an integer between 1 and 100:

```json
{
  "error": "limit must be an integer between 1 and 100"
}
```

## Responses

The Order API uses HTTP status codes to show the outcome of a request.

### HTTP status codes

| HTTP status code    | Description                                    |
| ------------------- | ---------------------------------------------- |
| `200 - OK`          | Your request was successful.                   |
| `201 - Created`     | You created an order.                          |
| `400 - Bad Request` | Your request contains missing or invalid data. |
| `404 - Not Found`   | The order you tried to access does not exist.  |

## Error responses

If a request fails, the API returns a JSON response containing an `error` attribute.

For example:

```json
{
  "error": "Order not found"
}
```

Error descriptions are intended to help developers identify and correct problems with their requests.

## Order status lifecycle

Orders can have one of three statuses:

| Status       | Meaning                                                                                               |
| ------------ | ----------------------------------------------------------------------------------------------------- |
| `processing` | The order has been created and is being processed. This is the initial status assigned to new orders. |
| `shipped`    | The order has been shipped.                                                                           |
| `cancelled`  | The order has been cancelled.                                                                         |

The current API returns order status values but does not provide an endpoint for changing an order's status.

## Order attributes

The API uses the following attributes to represent an order.

| Attribute  | Type   | Description                      |
| ---------- | ------ | -------------------------------- |
| `id`       | string | The unique ID of the order.      |
| `customer` | string | The name of the customer.        |
| `status`   | string | The current status of the order. |
| `total`    | number | The total value of the order.    |
