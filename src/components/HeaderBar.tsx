import { Event } from "../util/types";
import { FaShoppingCart, FaArrowLeft } from "react-icons/fa";
import "../styles/HeaderBar.scss";

function HeaderBar(props: {
  cart: Event[];
  showCart: boolean;
  searchQuery: string;
  setShowCart: (state: boolean) => void;
  setSearchQuery: (query: string) => void;
}) {
  return (
    <div className="headerBar">
      <div className="circle-lg"></div>
      <div className="circle-md"></div>
      {props.showCart ? (
        <FaArrowLeft
          className="backIcon"
          onClick={() => props.setShowCart(false)}
        ></FaArrowLeft>
      ) : (
        <input
          value={props.searchQuery}
          onChange={(e) => props.setSearchQuery(e.target.value.toLowerCase())}
          placeholder={"Suche..."}
        ></input>
      )}
      <div className="cartHeaderContainer">
        <FaShoppingCart
          className="cartIcon"
          onClick={() => props.setShowCart(true)}
        ></FaShoppingCart>
        <div className="cartBadge">{props.cart.length}</div>
      </div>
    </div>
  );
}

export default HeaderBar;
