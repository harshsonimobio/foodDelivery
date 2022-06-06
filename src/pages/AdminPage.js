import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import {
  collection,
  addDoc,
  getDocs,
  setDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import fireDB from "../fireConfig";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Modal, Tabs, Tab } from "react-bootstrap";
import { toast } from "react-toastify";
function AdminPage() {
  const [products, setProducts] = useState([]);
  const [restros, setRestros] = useState([])
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({
    name: "",
    price: 0,
    imageURL: "",
    category: "",
  });
  const [restro, setRestro] = useState({
    name: "",
    number: 0,
    imageURL: "",
    category: "",
  });

  const [show, setShow] = useState(false);
  const [add, setAdd] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showw, setShoww] = useState(false);
  const [addd, setAddd] = useState(false);
  const handleClosee = () => setShoww(false);
  const handleShoww = () => setShoww(true);
  
  //products
  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      setLoading(true);
      const users = await getDocs(collection(fireDB, "products"));
      const productsArray = [];
      users.forEach((doc) => {
        const obj = {
          id: doc.id,
          ...doc.data(),
        };

        productsArray.push(obj);
        setLoading(false);
      });

      setProducts(productsArray);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  //restros

  useEffect(() => {
    getRestros();
  }, []);

  async function getRestros() {
    try {
      setLoading(true);
      const users = await getDocs(collection(fireDB, "restros"));
      const restrosArray = [];
      users.forEach((doc) => {
        const obj = {
          id: doc.id,
          ...doc.data(),
        };

        restrosArray.push(obj);
        setLoading(false);
      });

      setRestros(restrosArray);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  // useEffect(() => {
  //   getOrdersData();
  // }, []);

  // async function getOrdersData() {
  //   try {
  //     setLoading(true);
  //     const result = await getDocs(collection(fireDB, "orders"));
  //     const ordersArray = [];
  //     result.forEach((doc) => {
  //       ordersArray.push(doc.data());
  //       setLoading(false);
  //     });
  //     console.log(ordersArray);
  //     setOrders(ordersArray);
  //   } catch (error) {
  //     console.log(error);
  //     setLoading(false);
  //   }
  // }


  //products
  const editHandler = (item) => {
    setProduct(item);
    setShow(true);
  };

  const updateProduct = async () => {
    try {
      setLoading(true);
      await setDoc(doc(fireDB, "products", product.id), product);

      handleClose();
      toast.success("Product updated successfully");
      window.location.reload();
    } catch (error) {
      toast.error("Product update failed");
      setLoading(false);
    }
  };

  const addProduct = async () => {
    try {
      setLoading(true);
      await addDoc(collection(fireDB, "products"), product);
      handleClose();
      toast.success("Product added successfully");
      window.location.reload();
    } catch (error) {
      toast.error("Product add failed");
      setLoading(false);
    }
  };

  const addHandler = () => {
    setAdd(true);
    handleShow();
  };

  const deleteProduct = async (item) => {
    try {
      setLoading(true);
      await deleteDoc(doc(fireDB, "products", item.id));
      toast.success("Product deleted successfully");
      getData();
    } catch (error) {
      toast.failed("Product delete failed");
      setLoading(false);
    }
  };

  //restros

  const editHandlerr = (item) => {
    setRestro(item);
    setShoww(true);
  };

  const updateRestro = async () => {
    try {
      setLoading(true);
      await setDoc(doc(fireDB, "restros", restro.id), restro);

      handleClosee();
      toast.success("Restaurent updated successfully");
      window.location.reload();
    } catch (error) {
      toast.error("Restaurent update failed");
      setLoading(false);
    }
  };

  const addRestro = async () => {
    try {
      setLoading(true);
      await addDoc(collection(fireDB, "restros"), restro);
      handleClosee();
      toast.success("Restaurent added successfully");
      window.location.reload();
    } catch (error) {
      toast.error("Restaurent add failed");
      setLoading(false);
    }
  };

  const addHandlerr = () => {
    setAddd(true);
    handleShoww();
  };

  const deleteRestro = async (item) => {
    try {
      setLoading(true);
      await deleteDoc(doc(fireDB, "restros", item.id));
      toast.success("Restaurent deleted successfully");
      getData();
    } catch (error) {
      toast.failed("Restaurent delete failed");
      setLoading(false);
    }
  };

  return (
    <Layout loading={loading}>
      <div className="allTabs">
      <Tabs
        // defaultActiveKey="products"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="products" title="Products">
          <div className="d-flex justify-content-between items">
            <h3>Products List</h3>
            <button onClick={addHandler}>ADD PRODUCT</button>
          </div>
          <table className="table mt-3">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item) => {
                return (
                  <tr>
                    <td>
                      <img src={item.imageURL} height="80" width="80" />
                    </td>

                    <td>{item.name}</td>
                    <td>{item.category}</td>
                    <td>{item.price}</td>
                    <td className="action update">
                     <button>
                      <FaEdit
                        onClick={() => editHandler(item)}
                        color="blue"
                        style={{cursor: "pointer"}}
                        size={20}
                      />
                      </button>
                      </td>
                      <td className="action deletee">
                        <button>
                        <FaTrash
                        color="red"
                        style={{cursor: "pointer"}}
                        size={20}
                        onClick={() => {
                          deleteProduct(item);
                        }}
                      />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>
                {add === true ? "Add a product" : "Edit Product"}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {" "}
              <div className="register-form">
                <input
                  type="text"
                  value={product.name}
                  className="form-control"
                  placeholder="name"
                  onChange={(e) =>
                    setProduct({ ...product, name: e.target.value })
                  }
                />
                <input
                  type="text"
                  value={product.imageURL}
                  placeholder="image url"
                  className="form-control"
                  onChange={(e) =>
                    setProduct({ ...product, imageURL: e.target.value })
                  }
                />
                <input
                  type="number"
                  value={product.price}
                  className="form-control"
                  placeholder="price"
                  onChange={(e) =>
                    setProduct({ ...product, price: e.target.value })
                  }
                />
                <input
                  type="text"
                  value={product.category}
                  className="form-control"
                  placeholder="category"
                  onChange={(e) =>
                    setProduct({ ...product, category: e.target.value })
                  }
                />

                <hr />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <button>Close</button>
              {add ? (
                <button onClick={addProduct}>SAVE</button>
              ) : (
                <button onClick={updateProduct}>SAVE</button>
              )}
            </Modal.Footer>
          </Modal>
        </Tab>



        <Tab eventKey="restros" title="Restaurents">
          <div className="d-flex justify-content-between">
            <h3>Restaurent List</h3>
            <button onClick={addHandlerr}>ADD Restaurent</button>
          </div>
          <table className="table mt-3">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Number</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {restros.map((item) => {
                return (
                  <tr>
                    <td>
                      <img src={item.imageURL} height="80" width="80" />
                    </td>

                    <td>{item.name}</td>
                    <td>{item.category}</td>
                    <td>{item.number}</td>
                    <td>
                      <FaTrash
                        color="red"
                        size={20}
                        onClick={() => {
                          deleteRestro(item);
                        }}
                      />

                      <FaEdit
                        onClick={() => editHandlerr(item)}
                        color="blue"
                        size={20}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <Modal showw={showw} onHide={handleClosee}>
            <Modal.Header closeButton>
              <Modal.Title>
                {addd === true ? "Add a Restaurent" : "Edit Restaurent"}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {" "}
              <div className="register-form">
                <input
                  type="text"
                  value={restro.name}
                  className="form-control"
                  placeholder="name"
                  onChange={(e) =>
                    setRestro({ ...restro, name: e.target.value })
                  }
                />
                <input
                  type="text"
                  value={restro.imageURL}
                  placeholder="image url"
                  className="form-control"
                  onChange={(e) =>
                    setRestro({ ...restro, imageURL: e.target.value })
                  }
                />
                <input
                  type="number"
                  value={restro.number}
                  className="form-control"
                  placeholder="number"
                  onChange={(e) =>
                    setRestro({ ...restro, number: e.target.value })
                  }
                />
                <input
                  type="text"
                  value={restro.category}
                  className="form-control"
                  placeholder="category"
                  onChange={(e) =>
                    setRestro({ ...restro, category: e.target.value })
                  }
                />

                <hr />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <button>Close</button>
              {addd ? (
                <button onClick={addRestro}>SAVE</button>
              ) : (
                <button onClick={updateRestro}>SAVE</button>
              )}
            </Modal.Footer>
          </Modal>
        </Tab>
      </Tabs>
      </div>
    </Layout>
  );
}

export default AdminPage;
