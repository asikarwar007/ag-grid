import React, { useMemo, useState } from 'react';
import { AgGridReact } from "ag-grid-react"; // Import AgGridReact component from ag-grid-react

// Import necessary styles for ag-Grid
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import './App.css'; // Custom CSS file
import { ColDef } from 'ag-grid-community'; // Import ColDef type from ag-grid-community

import { CustomTextFilter } from "./CustomTextFilter"; // Import the custom filter component

function App() {
  // Memoized grid container style for consistent rendering
  const gridStyle = useMemo(() => ({ height: "100vh", width: "100vw" }), []);

  // Theme switcher to toggle between dark and light themes
  const theme = 'dark';

  // Sample row data for the grid, each object represents a row
  const [rowData] = useState([
    { symbol: "AAPL", expiry: "2024-10-15", strike: 145, type: "call", price: 3.5 },
    { symbol: "TSLA", expiry: "2024-10-15", strike: 250, type: "put", price: 8.0 },
  ]);

  interface StockDetails { symbol: string; expiry: string; strike: number; type: string; price: number }

  // Column definitions for the grid, specifying field names and making columns sortable
  const columnDefs: ColDef<StockDetails>[] = [
    {
      field: "symbol",
      filter: "agTextColumnFilter",
      filterParams: {
        filterOptions: ["contains", "startsWith", "endsWith"],
        defaultOption: "contains",
        filterPlaceholder: 'Enter symbol...'
      },
      headerName: "Stock Symbol",
    },
    {
      field: "expiry",
      filter: "agDateColumnFilter",
      filterParams: {
        maxNumConditions: 1, // Only one condition allowed
      },
      headerName: "Expiry Date",
    },
    {
      field: "strike",
      filter: "agNumberColumnFilter",
      filterParams: {
        numAlwaysVisibleConditions: 2, // Two conditions visible by default
        defaultJoinOperator: "OR",
      },
      headerName: "Strike Price",
    },
    {
      field: "type",
      headerName: "Option Type",
      filter: CustomTextFilter, // Assign custom filter component

      filterParams: {
        filterPlaceholder: (params: any) => {
          const { filterOption, placeholder } = params;
          return `${filterOption} ${placeholder}`; // filterOption + placeholder
        }
      }
    },
    {
      field: "price",
      filter: "agNumberColumnFilter",
      filterParams: {
        filterOptions: [
          "greaterThan",
          {
            displayKey: "greaterThanWithNulls",
            displayName: "Greater Than (with Nulls)",
            predicate: ([filterValue]: number[], cellValue: number) =>
              cellValue == null || cellValue > filterValue,
          },
        ],

      },
      headerName: "Option Price",
    },
  ];


  return (
    <div
      // Apply dynamic styles and theme class based on the selected theme
      style={gridStyle}
      className={`${theme === 'dark' ? 'ag-theme-quartz-dark' : 'ag-theme-alpine'}`}
    >
      {/* ag-Grid component that takes row data and column definitions */}
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}>
      </AgGridReact>
    </div>
  );
}

export default App;
