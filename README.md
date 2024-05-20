## Stock App

Stock App is a robust web application designed to manage and visualize a company's stock information. This application provides administrators with an intuitive interface to update, add, edit, and delete products in the company's stock. Additionally, it offers advanced visualization of stock movements through graphical representations, making inventory management more efficient and insightful.

## Live Demo
Check out the live demo of the application [here](https://stock-app-becoo.netlify.app/).

## Features

- **Stock Management**: Efficiently manage the company's stock information.
- **CRUD Operations**: Add, update, edit, and delete products with ease.
- **Data Visualization**: Visualize stock movements through interactive graphs.
- **User-Friendly Interface**: Designed for ease of use and intuitive navigation.

## Installation
To get started with the Stock App, follow these steps:

1. Clone the repository to your computer:
```
git clone https://github.com/BecooOn/stock-app.git

```
2. Navigate to the project directory
```
cd stock-app
```
3. Install the required packages
```
yarn install
```
4. Start the application
```
yarn start
```
5. Open the browser and navigate to http://localhost:3000

## Usage

1. **Admin Panel**: Access the admin panel to manage the company's stock information.
2. **Product Management**: Add, update, edit, or delete products as needed.
3. **Graphical Insights**: Use the graphing tools to visualize stock movements.
4. **User Management**: Manage user accounts and configure authorization settings.


## Project Skeleton

```
Stock App(folder)
|
|----readme.md    
SOLUTION
├── public
│     ├── index.html
│     ├── favicon.png
│     ├── logo.png
│     ├── manifest.json
│     └── robots.txt
├── src
│   ├── App.js
│   ├── app
│   │   └── store.jsx
│   ├── assets
│   │   ├── data.png
│   │   ├── loading.gif
│   │   ├── logo.png
│   │   └── loading.gif
│   ├── components
│   │   ├── brandComponents
│   │   │   ├── BrandModal.jsx
│   │   │   └── UpdateBrandModal.jsx
│   │   ├── firmComponents
│   │   │   ├── FirmModal.jsx
│   │   │   ├── FirmModalForm.jsx
│   │   │   ├── UpdateFirmModal.jsx
│   │   │   └── UpdateFirmModalForm.jsx
│   │   ├── homeComponents
│   │   │   ├── Charts.jsx
│   │   │   └── KPICards.jsx
│   │   ├── productComponents
│   │   │   ├── ProductModal.jsx
│   │   │   └── ProductTable.jsx
│   │   ├── purchasesComponents
│   │   │   ├── PurchasesModal.jsx
│   │   │   └── PurchasesTable.jsx
│   │   ├── salesComponents
│   │   │   ├── SalesModal.jsx
│   │   │   └── SalesTable.jsx
│   │   ├── DataFetchMessages.jsx
│   │   ├── MenuListComp.jsx
│   │   └── RegisterForm.jsx
│   ├── index.css
│   ├── index.js
│   ├── features
│   │   ├── authSlice.jsx
│   │   └── getDataSlice.jsx
│   ├── helper
│   │   └── ToastNotify.js
│   ├── pages
│   │   ├── Brands.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Firms.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── NotFound.jsx
│   │   ├── Products.jsx
│   │   ├── Purchases.jsx
│   │   ├── Register.jsx
│   │   ├── Sales.jsx
│   │   └── UpdateUser.jsx
│   ├── router
│   │   ├── AppRouter.jsx
│   │   └── PrivateRouter.jsx
│   ├── services
│   │   ├── useApiRequest.js
│   │   ├── useAxios.js
│   │   └── useStockRequest.js
│   └── styles
│       └── globalStyle.js
├── LICENSE
├── package.json
├── tailwind.config.js
└── yarn.lock
```

## Technologies I used

- **React**: A JavaScript library for building user interfaces.
- **Redux** Toolkit: Provides a standardized way to write Redux logic, including store configuration and slice management.
- **React Redux**: Official React bindings for Redux.
- **Axios**: Promise-based HTTP client for making API requests.
- **React Router DOM**: Declarative routing for React applications.
- **Material UI**: A popular React UI framework with pre-styled components.
- **Formik**: Form management library for React.
- **Yup**: JavaScript schema builder for value parsing and validation.
- **React Toastify**: Library for creating beautiful toast notifications.
- **Redux Persist**: Persist and rehydrate a Redux store.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
- **MUI X Data Grid**: Powerful data grid component from Material UI.
- **MUI X Charts**: Charting library from Material UI.
- **@tremor/react**: React components for building dashboards and data visualizations.

## Dev Tools

- Redux DevTools: A browser extension that allows developers to inspect every action and state change in their Redux application.

## Contributions

I welcome contributions! If you find any bugs, have suggestions, or want to contribute, please open an issue or send a pull request. Your feedback and contributions are greatly appreciated.
