import React, { useEffect, useState, useContext } from "react";
import styles from "../styles/Main.css";
import axios from "axios";

const Main = ({
  allProducts,
  setAllProducts,
  countProducts,
  setCountProducts,
  total,
  setTotal,
}) => {
  // HAGO FUNCION PARA CALCULAR DESCUENTO Y DESPUES GUARDARLO
  const [descuento, setDescuento] = useState(0);

  function calcularDescuento(precio_original, porcentaje_descuento) {
    let info = Math.floor(precio_original * porcentaje_descuento) / 100;
    let precioActualizado = precio_original - info;
    setDescuento(precioActualizado);
  }

  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");

  // FUNCION PARA QUE CADA VEZ QUE TOCO ENTER O CLICKEO EL BOTON SE BUSQUE LA PALABRA EN LA API Y ME DE LA LISTA EN LA PAGINA
  const searchBook = async () => {
    const url = await fetch(
      "https://www.googleapis.com/books/v1/volumes?q=" +
        search +
        "&key=AIzaSyA6SaT23KNiiA6DnUfUQTvFeyAcQEkwnSU" +
        "&maxResults=40"
    );
    const info = await url.json();
    const items = info.items;
    items.map((producto) => {
      producto["quantity"] = 1;
    });
    setBooks(items);
  };

  // TRAIGO LOS DATOS DEL API y los paso a otra variable para hacerle el .map y añadir al carrito luego
  const dataBooks = books;

  // AÑADO EL PRODUCTO AL CARRITO
  const onAddBook = (book) => {
    // consigo el precio del libro
    let amount = book.saleInfo.listPrice && book.saleInfo.listPrice.amount;
    // actualizo la cantidad , le sumo 1
    setCountProducts(countProducts + 1);

    if (allProducts.find((item) => item.id === book.id)) {
      // si ya existe , en vez de añadirlo devuelta, le sumo solamente la cantidad + 1
      const books = allProducts.map((item) =>
        item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
      );

      let precio = Math.trunc(amount);
      let sumaSinDecimal = Math.trunc(total + precio + book.quantity);
      setTotal(sumaSinDecimal);
      setCountProducts(countProducts + book.quantity);
      return setAllProducts([...books]);
    }
    let precio = Math.trunc(amount);
    let sumaSinDecimal = Math.trunc(total + precio);
    // sino existe lo agrego al array
    setTotal(sumaSinDecimal);
    setCountProducts(countProducts + book.quantity);
    setAllProducts([...allProducts, book]);
  };

  return (
    <>
      <div className="contenedor-buscador">
        <form onSubmit={(e) => e.preventDefault()}>
        <h2>Busca el libro que quieras</h2>
          <input
            type="text"
            className="form_input"
            placeholder="Pone el nombre del libro a buscar y luego presiona enter"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="calcular" onClick={searchBook}>
            Buscar Libro
          </button>
        </form>
      </div>
      <main>
        {Array.isArray(dataBooks) ? (
          dataBooks.map((item) => {
            let thumbnail =
              item.volumeInfo.imageLinks &&
              item.volumeInfo.imageLinks.smallThumbnail;
            let amount =
              item.saleInfo.listPrice && item.saleInfo.listPrice.amount;
            if (thumbnail != undefined && amount != undefined) {
              return (
                <div key={item.volumeInfo.title} className="card_container">
                  <div className="card">
                    <div className="img" onClick={() => putActualProduct(item)}>
                      <img className="imagen" src={thumbnail} alt="" />
                    </div>
                    <p>{item.volumeInfo.title} </p>
                    {
                      <div className="price">
                        <p className="left">${Math.trunc(amount)} </p>
                      </div>
                    }
                    <button onClick={() => onAddBook(item)}>
                      <img src="https://parspng.com/wp-content/uploads/2022/12/cartpng.parspng.com-2.png"></img>
                      ADD TO CART
                    </button>
                  </div>
                </div>
              );
            }
          })
        ) : (
          <p></p>
        )}
        {dataBooks === undefined ? (
          <p>No hay libros con ese nombre</p>
        ) : (
          <p></p>
        )}
      </main>
      <div className="form_container">
        <form
          className="form"
          onSubmit={(e) => {
            e.preventDefault();
            let precioTotal = e.target[0].value;
            let descuento = e.target[1].value;
            calcularDescuento(precioTotal, descuento);
          }}
        >
          <h3 className="form_h2">Calcular Descuento</h3>
          <div className="input-group">
            <label className="form_label">Precio Total</label>
            <input
              className="form_input"
              type="number"
              placeholder="PrecioTotal"
            ></input>
          </div>
          <div className="input-group">
            <label className="form_label">Descuento a Realizar</label>
            <input
              max="99"
              className="form_input"
              type="number"
              placeholder="PrecioTotal"
            ></input>
          </div>
          <button className="calcular" type="submit">
            Calcular
          </button>
          <h5>Total con el descuento: ${descuento}</h5>
        </form>
      </div>
    </>
  );
};

export default Main;
