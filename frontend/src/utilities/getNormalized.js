const getNormalized = (items) => {
  const result = items.reduce((acc, item) => {
    const id = item.id;
    acc.ids.push(id);
    acc.entities[id] = item;
    return acc;
  }, {entities: {}, ids: []});
  return result
}

export default getNormalized;