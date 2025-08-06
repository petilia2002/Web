import React, { useState } from "react";
import {
  useGetGoodsQuery,
  useAddProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
} from "./store/goodsApi";
import "./App.css";

function App() {
  const [count, setCount] = useState("");
  const [product, setProduct] = useState("");

  const {
    data = [],
    error: fetchError,
    isLoading: isFetchLoading,
    isError: isFetchError,
  } = useGetGoodsQuery(count);

  const [
    addProduct,
    { error: addError, isLoading: isAddLoading, isError: isAddError },
  ] = useAddProductMutation();

  const [deleteProduct, { error: deleteError }] = useDeleteProductMutation();
  const [updateProduct, { error: updateError }] = useUpdateProductMutation();

  async function addHandler() {
    if (product) {
      // try {
      //   const data = await addProduct({ name: product }).unwrap();
      //   console.log(data);
      // } catch (err) {
      //   console.log(err);
      // } finally {
      //   setProduct("");
      // }

      const result = await addProduct({ name: product, completed: false });
      if (result.error) {
        console.log("Ошибка!", result.error);
      } else {
        console.log("Успешно!", result.data);
      }
      setProduct("");
    }
  }

  async function deleteHandler(goodId) {
    await deleteProduct(goodId);
  }

  async function updateHandler(id, completed) {
    await updateProduct({ id, completed: !completed });
  }

  if (isFetchLoading) {
    return <h3>Loading...</h3>;
  }

  return (
    <div className="app">
      <select value={count} onChange={(e) => setCount(e.target.value)}>
        <option value="">all</option>
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
      </select>
      <input
        type="text"
        placeholder="Название товара"
        value={product}
        onChange={(e) => setProduct(e.target.value)}
      />
      <button onClick={addHandler}>Добавить</button>
      {isAddLoading && <span>Loading..</span>}
      {isAddError && <span>Error: {addError.data}</span>}
      <ul>
        {data.map((item) => (
          <div key={item.id} className={"goodContainer"}>
            <li
              className={item.completed ? "good completed" : "good"}
              onClick={() => updateHandler(item.id, item.completed)}
            >
              {item.name}
            </li>
            <span onClick={() => deleteHandler(item.id)}>&times;</span>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default App;
