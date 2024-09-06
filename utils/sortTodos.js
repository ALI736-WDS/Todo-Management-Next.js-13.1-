function sortTodos(todos) {
  const sortedData = {};
  todos.map((todo) => {
    //agr ghesmate todo.status tuye sortedData vojud nadasht, besazesh
    if (!sortedData[todo.status]) sortedData[todo.status] = [];

    //agar vojud dasht, todo ro push kon
    sortedData[todo.status].push(todo);
  });

  return sortedData;
}

export { sortTodos };
