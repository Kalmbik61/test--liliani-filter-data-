import { useState, useEffect } from "react";
import { Pagination } from "@material-ui/lab";
import { Button } from "@material-ui/core";
import Box from "./Box";

import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [numberOfPages, setNumberOfPages] = useState(10);
  const [sort, setSort] = useState([]);
  const [sortBoolean, setSortBoolean] = useState(false);
  const [reset, setReset] = useState(false);
  useEffect(() => {
    fetchAllData();
  }, [reset]);
  useEffect(() => {
    setData(sort);
  }, [sortBoolean]);
  const fetchAllData = async () => {
    await fetch("https://jsonplaceholder.typicode.com/comments")
      .then((res) => res.json())
      .catch((error) => new Error("Some error", error))
      .then((res) => {
        setData(res);
        setNumberOfPages(res.length / perPage);
      });
  };
  const indexOfLastBox = currentPage * perPage;
  const indexOfFirstPost = indexOfLastBox - perPage;
  const currentBox = data.slice(indexOfFirstPost, indexOfLastBox);
  //filter
  const filterData = (filt) => {
    const sort = data.sort((a, b) => (a[filt] > b[filt] ? 1 : -1));
    setSort(sort);
    setSortBoolean(!sortBoolean);
  };
  return (
    <div className="App">
      Test Liliani
      <div className="container">
        <div className="filter">
          <Button
            variant="outlined"
            color="primary"
            onClick={() => filterData("name")}
          >
            Filter name
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => filterData("email")}
          >
            Filter email
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => filterData("postId")}
          >
            Filter postId
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setReset(!reset)}
          >
            Reset
          </Button>
        </div>
        <div>
          <p>
            Sum of boxes :<strong> {data.length}</strong>
          </p>
          <p>
            {" "}
            Box on page : <strong>{perPage}</strong>
          </p>
        </div>
        <div className="boxes">
          {currentBox.map(({ name, id, postId, body, email }) => {
            return (
              <Box
                key={id}
                postId={postId}
                email={email}
                body={body}
                name={name}
              />
            );
          })}
        </div>
        <Pagination
          count={numberOfPages}
          page={currentPage}
          onChange={(e, page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
}

export default App;
