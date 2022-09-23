import EventCard from "../components/EventCard";
import { Event } from "../util/types";
import "../styles/Cart.scss";
import { FaShoppingBasket } from "react-icons/fa";

function Card(props: { cart: Event[]; removeFromCart: (item: Event) => void }) {
  return (
    <div className="cartContainer">
      <div className="cartGroupContainerHeader">
        <p>Warenkorb</p>
      </div>

      {props.cart.length > 0 ? (
        <div className="cartItemContainer">
          {props.cart.map((ev) => {
            return (
              <div key={ev._id} className="eventCardWrapper">
                <EventCard
                  removeFromCart={(item: Event) => props.removeFromCart(item)}
                  key={ev._id}
                  item={ev}
                />
              </div>
            );
          })}
        </div>
      ) : (
        <div className="noData">
          <div className="noDataContainer">
            <div className="circle-lg" />
            <div className="circle-md" />
            <div className="noDataTextWrapper">
              <FaShoppingBasket className="noDataIcon"></FaShoppingBasket>
              <p className="noDataText"> Sie haben keine Events im Warenkorb</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Card;
