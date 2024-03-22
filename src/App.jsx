import { useState } from "react";

import "./App.css";



function FilterableProductTable({ productList }) {
  const [filterText, setFilterText] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);

  return (
    <div className="container">
      <SearchBar
        filterText={filterText}
        inStockOnly={inStockOnly}
        onFilterTextChange={setFilterText}
        onInStockOnlyChange={setInStockOnly}
      />
      <ProductTable
        productList={productList}
        filterText={filterText}
        inStockOnly={inStockOnly}
      />
    </div>
  );
}



function ProductCategoryRow({ category }) {
  return (
    <tr className="categoryRow">
      <th colSpan="2" className="categoryHeading">
        {category}
      </th>
    </tr>
  );
}



function ProductRow({ product }) {
  let rowClassName = "productRow";

  // Determining the row class based on the product category
  if (product.category === "Fruits") {
    rowClassName = "fruitRow";
  } else if (product.category === "Vegetables") {
    rowClassName = "vegetableRow";
  }

  const name = product.stocked ? (
    product.name
  ) : (
    <span className="redText">{product.name}</span>
  );

  return (
    <tr className={rowClassName}>
      <td className="productName">{name}</td>
      <td className="productPrice">{product.price}</td>
    </tr>
  );
}



function ProductTable({ productList, filterText, inStockOnly }) {
  const rows = [];
  let lastCategory = null;

  productList.forEach((product) => {
    if (product.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
      return;
    }
    if (inStockOnly && !product.stocked) {
      return;
    }
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category}
        />
      );
    }
    rows.push(<ProductRow product={product} key={product.name} />);
    lastCategory = product.category;
  });

  return (
    <div className="productTableContainer">
      <table className="productTable">
        <thead>
          <tr className="tableHeading">
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}



function SearchBar({
  filterText,
  inStockOnly,
  onFilterTextChange,
  onInStockOnlyChange,
}) {
  return (
    <form className="searchBar">
      <input
        type="text"
        value={filterText}
        placeholder="Search..."
        className="searchInput"
        onChange={(e) => onFilterTextChange(e.target.value)}
      />
      <label className="checkboxLabel">
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={(e) => onInStockOnlyChange(e.target.checked)}
        />{" "}
        Only show products in stock
      </label>
    </form>
  );
}

const productList = [
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" },
];

export default function App() {
  return <FilterableProductTable productList={productList} />;
}
