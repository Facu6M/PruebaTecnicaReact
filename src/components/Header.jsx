import React, { useState } from 'react';
import styles from "../styles/Header.css";
import cart from "../assets/shopping-cart.png";
import iconDelete from "../assets/icon-delete.svg"

const Header = ({
    allProducts,
    setAllProducts,
    total,
    setTotal,
    countProducts,
    setCountProducts,

}) => {

    const [active, setActive] = useState(false);
    const [openHamburger, setOpenHamburger] = useState(false)

    const onDeleteProduct = (product) => {
      const results = allProducts.filter((item) => item.id !== product.id);
      let amount= product.saleInfo.listPrice && product.saleInfo.listPrice.amount;

      let precio = Math.trunc(amount)
      setTotal(total - precio * product.quantity);
      setCountProducts(countProducts - product.quantity);
      setAllProducts(results);
    };

    const onCleanCart = () => {
      setAllProducts([]);
      setTotal(0);
      setCountProducts(0);
    };


// BUTTON BUY
     const onBuy= () => {
        alert(`you just buy ${countProducts} products, for a total amount of $${total}`)
      setAllProducts([]);
      setTotal(0);
      setCountProducts(0);
   }


  return (
    <header>
            <a href='#' className='logo'><img src="https://cdn-icons-png.flaticon.com/512/4277/4277048.png" ></img></a>
        <h1>Bienvenido a Mi Tienda de Libros</h1>
        <nav>
            <ul className='navlist'>
                <li><a href='#'>Inicio</a></li>
                <li><a href='#'>Catalogo</a></li>
                <li><a href='#'>Contacto</a></li>
                </ul>
            </nav>
            <img
        className={`nav_hamburguer ${openHamburger == true ? "inactive" : ""}`}
        src="https://icon-library.com/images/hamburger-menu-icon-png/hamburger-menu-icon-png-11.jpg"
        onClick={() => {
          setOpenHamburger(!openHamburger);
        }}></img>
           <div
                className={`modal-navbar-div ${
                  openHamburger == false ? "" : "modal-active"
                }`}
                id="modal"
              >
                <nav className="modal-navbar">
                  <img
                    onClick={() => {
                      setOpenHamburger(!openHamburger);
                    }}
                    className="modal-navbar_close"
                    src="https://cdn3.iconfinder.com/data/icons/pyconic-icons-1-2/512/close-512.png"
                  />
                  <ul className="modal-navbar_items">
                    <li>
                      <a
                        onClick={() => {
                          setOpenHamburger(!openHamburger);
                        }}
                        href="/#"
                        className="modal-navbar__link signup"
                      >
                        Inicio
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={() => {
                          setOpenHamburger(!openHamburger);
                        }}
                        href="/#"
                        className="modal-navbar__link signup"
                      >
                        Catalogo
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={() => {
                          setOpenHamburger(!openHamburger);
                        }}
                        href="/#"
                        className="modal-navbar__link signup"
                      >
                        Contacto
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>

            <div className="container-icon" >
        <div className="container-cart-icon" onClick={() => setActive(!active)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="icon-cart"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
          <div className="count-products">
            <span id="contador-productos">{countProducts}</span>
          </div>
        </div>
</div>
                <div
          className={`container-cart-products
          ${active ? "" : "hidden-cart"}
          `}
        >
          {allProducts.length ? (
            <>
              <div className="row-product">
                {allProducts.map((product) => (
                  <div className="cart-product" key={product.id}>
                    <div className="info-cart-product">
                      <span className="cantidad-producto-carrito">
                        {product.quantity}
                      </span>
                      <p className="titulo-producto-carrito">
                    {product.volumeInfo.title}
                      </p>
                      <span className="precio-producto-carrito">
                        ${Math.trunc(product.saleInfo.listPrice.amount)}
                      </span>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="icon-close"
                      onClick={() => onDeleteProduct(product)}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                ))}
              </div>

              <div className="cart-total">
                <h3>Total:</h3>
                <span className="total-pagar">${total}</span>
              </div>

<div className="btn_ctn">
              <button className="btn-clear-all" onClick={onCleanCart}>
                cancel order
              </button>


          <button className="btn-" onClick={() => onBuy()} >
                buy order
              </button>



            </div>

            </>
          ) : (
            <p className="cart-empty">The cart is empty</p>
          )}
          </div>
        </header>
  )
}

export default Header
