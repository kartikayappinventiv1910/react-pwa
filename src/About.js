// import axios from "axios";
import React, { useState, useEffect } from "react";
import { Table, Alert } from "react-bootstrap";

export default function About() {
  const [data, setData] = useState();
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();
  const [locstatus, setLocStatus] = useState();
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (!navigator.onLine) {
      setStatus("offline");
    } else {
      setStatus("online");
    }
  }, [status]);

  useEffect(() => {
    let url = "https://jsonplaceholder.typicode.com/posts";
    fetch(url)
      .then((response) => {
        response.json().then((result) => {
          console.warn("response", result);
          setData(result);
          // console.log(data,"data");
          // localStorage.setItem("ABOUTDATA", JSON.stringify(result));
        });
      })
      .catch((error) => {
        console.log(error);
        // let offlinedata = localStorage.getItem("ABOUTDATA");
        // setData(JSON.parse(offlinedata));
        // setStatus("offline");
        // alert("catch block")
      });
  }, []);

  useEffect(() => {
    getLocation();
  }, [lat, lng]);

  const getLocation = () => {
    console.log("inside getloc");
    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported by your browser");
    } else {
      setStatus("Locating...");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setStatus(null);
          setLat(position.coords.latitude);
          // console.log(lat);
          setLng(position.coords.longitude);
          // console.log(position.coords.latitude,lat,lng,"latitude");
        },
        () => {
          setStatus("Unable to retrieve your location");
        }
      );
    }
  };
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
          <tr onClick={getLocation}>
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
                  <td>{item.title}</td>
                  <td>{item.body}</td>
                  {/* <td>{item.address.street}</td> */}
                </tr>
              );
            })}
        </tbody>
      </Table>
    </div>
  );
}
