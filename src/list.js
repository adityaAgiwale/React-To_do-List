import { BiEditAlt } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import "./styles.css";

export default function List({ list, removeItem, editItem }) {
  return (
    <section>
      {list.map((item) => {
        const { id, title } = item;
        return (
          <article key={id} className="list-component">
            <p className="list__item">{title}</p>
            <div className="button__section">
              <button className="edit__button" onClick={() => editItem(id)}>
                <BiEditAlt />
              </button>
              <button
                className="delete__button"
                onClick={() => removeItem(id, title)}
              >
                <AiOutlineDelete />
              </button>
            </div>
          </article>
        );
      })}
    </section>
  );
}
