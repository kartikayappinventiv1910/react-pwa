// import axios from "axios";
import React, { useState, useEffect } from "react";
import { Table, Alert } from "react-bootstrap";

export default function User() {
  const [data, setData] = useState();
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (!navigator.onLine) {
      setStatus("offline");
    } else {
      setStatus("online");
    }
  }, [status]);

  useEffect(() => {
    let url = "https://jsonplaceholder.typicode.com/users";
    // let url = "https://jsonplaceholder.typicode.com/posts";

    fetch(url)
      .then((response) => {
        response.json().then((result) => {
          console.warn("response", result);
          setData(result);
          // console.log(data,"data");
          // localStorage.setItem("USERSDATA", JSON.stringify(result));
        });
      })
      .catch((error) => {
        console.log(error);
        // let offlinedata = localStorage.getItem("USERSDATA");
        // setData(JSON.parse(offlinedata));
        // setStatus("offline");
        // alert("catch block")
      });
  }, []);
  return (
    <div>
      <div>
        {status === "offline" ? (
          <Alert variant="warning">
            This is a warning - check your internet connection
          </Alert>
        ) : null}
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((item, i) => {
              return (
                <tr key={i}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.address.street}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </div>
  );
}
