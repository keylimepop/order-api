# Order API

An API with endpoints for creating and retrieving customer orders.

## About this project

The Order API provides a small set of REST endpoints for working with customer orders.

The API currently supports:

* creating orders
* retrieving orders
* retrieving a single order by ID
* filtering orders by status
* limiting the number of orders returned

The API returns data in JSON format and uses standard HTTP status codes.

This project includes:

* an Express API
* an API reference written in Markdown
* an OpenAPI specification
* a Postman collection for testing the API

## Documentation

See the [API reference](docs/api-reference.md) for information about:

* endpoints
* request parameters and request bodies
* example requests and responses
* HTTP status codes
* error responses
* the order status lifecycle

The API specification is available in [`openapi.yaml`](openapi.yaml).

## Getting started

The API is intended for local development and testing. Continue below if you wish to run the API locally.

### Requirements

You will need:

* [Node.js](https://nodejs.org/)
* [Git](https://git-scm.com/)

### Install dependencies

Clone this repository and change to the project directory.

```bash
git clone https://github.com/keylimepop/order-api.git
cd order-api
```

Install the required dependencies:

```bash
npm install
```

### Start the server

Start the API with:

```bash
node server.js
```

The server will run at:

`http://localhost:3000`

You can now make requests to the API using a web browser, Postman, or another HTTP client.

For example:

`GET http://localhost:3000/api/orders`

## Testing with Postman

A Postman collection is included in [`postman/order-api.postman_collection.json`](postman/order-api.postman_collection.json). The collection contains ready-to-use requests for testing the API.

To use the collection:

1. Open Postman.
2. Import `postman/order-api.postman_collection.json`.
3. Start the Order API locally.
4. Send the requests in the collection.

The collection includes requests for:

* getting all orders
* getting an order by ID
* filtering orders
* creating an order

## Project structure

| File or directory       | Description                                            |
| ----------------------- | ------------------------------------------------------ |
| `docs/api-reference.md` | Developer-facing API reference                         |
| `openapi.yaml`          | OpenAPI specification for the API                      |
| `postman/`              | Postman collection for testing the API                 |
| `server.js`             | Express server and API implementation                  |
| `package.json`          | Project metadata and dependencies                      |
| `package-lock.json`     | Records the installed dependency versions              |
| `.gitignore`            | Specifies files and directories that Git should ignore |
