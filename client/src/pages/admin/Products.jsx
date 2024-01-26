import { Link } from "react-router-dom";
import productsList from "../../assets/productList";
import { Modal } from "../../widgets/Modal";
import { useState } from "react";

const Products = () => {

  const [deleteProductModal, setDeleteProductModal] = useState(false)
  const [productToDelete, setProductToDelete] = useState('')

  const onCloseDelete =()=>{
    setDeleteProductModal(false)
  }
  const openDelete =(name)=>{
    setDeleteProductModal(true)
    setProductToDelete(name)
  }

  return (
    <div className="container mx-auto">
      <div className="flex items-center my-4 justify-between flex-wrap">
        <h1 className="text-2xl font-bold mb-4">Product Management</h1>
        <Link to="/admin/products/new">
          <button className="hidden w-full lg:flex items-center justify-center gap-4 bg-purple-800 text-white rounded-lg p-2 hover:bg-purple-900 transition active:scale-95">
            <i className="text-lg fa-solid fa-plus"></i>
            <p className="text-lg font-bold">Ajouter un Produit</p>
          </button>
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 text-start border-b">Product Name</th>
              <th className="py-2 px-4 text-start border-b">Price</th>
              <th className="py-2 px-4 text-start border-b">Stock</th>
              <th className="py-2 px-4 text-start border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {productsList.map(({ name, price, images, stock }, index) => (
              <tr className="" key={index}>
                <td className="py-2 px-4 border-b flex items-center gap-3">
                  <img src={images[0]} className="w-10 h-10" alt="" />
                  {name}{" "}
                </td>
                <td className="py-2 px-4 border-b">${price} </td>
                <td className="py-2 px-4 border-b">{stock} </td>
                <td className="py-2 px-4 border-b">
                  <Link to={`/admin/products/${name}`}>
                    <button className="bg-blue-500 text-white px-2 py-1 rounded">
                    <i className="fa-solid fa-pen"></i>
                    </button>
                  </Link>
                  <button onClick={()=>openDelete(name)} className="bg-red-500 text-white px-2 py-1 rounded ml-2">
                  <i className="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={deleteProductModal} onClose={onCloseDelete} modalTitle="Sure to Delete ?" >

<div> Delete {productToDelete} </div>

      </Modal>
    </div>
  );
};

export default Products;
