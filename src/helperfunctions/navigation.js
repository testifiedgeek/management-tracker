const navigate = (state, path, page, history, context) => {
  console.log("page: ", page);
  if (state === "push") {
    history.push(path);
    context.set_backpage(context.state.page);
    context.set_page(page);
  } else {
    history.goBack();
    context.set_page(page);
  }
};

export default navigate;
