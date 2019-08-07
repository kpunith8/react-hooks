import React, { useState } from "react";

const INITIAL_LIST = [
  {
    id: "0",
    title: "React with RxJS for State Management Tutorial",
    url: "https://www.robinwieruch.de/react-rxjs-state-management-tutorial/"
  },
  {
    id: "1",
    title: "A complete React with Apollo and GraphQL Tutorial",
    url: "https://www.robinwieruch.de/react-graphql-apollo-tutorial"
  }
];

const ItemList = () => {
  const [list, setList] = useState(INITIAL_LIST);

  const onRemoveItem = itemId => {
    const newList = list.filter(item => item.id !== itemId);

    setList(newList);
  };

  return (
    <ul>
      {list.map(item => (
        <li key={item.id}>
          <a href={item.url}>{item.title}</a>
          <button type="button" onClick={() => onRemoveItem(item.id)}>
            Remove
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ItemList;
