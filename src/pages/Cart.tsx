import EventCard from "../components/EventCard";
import { Event } from "../util/types";
import "../styles/Cart.scss";

function Card(props: { cart: Event[]; removeFromCart: (item: Event) => void }) {
  return (
    <div className="cartContainer">
      <div className="cartGroupContainerHeader">
        <p>Warenkorb</p>
      </div>
      <div className="cartItemContainer">
        {props.cart.map((ev) => {
          return (
            <div className="eventCardWrapper">
              <EventCard
                removeFromCart={(item: Event) => props.removeFromCart(item)}
                key={ev._id}
                item={ev}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Card;
