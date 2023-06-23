import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
function ContactList() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    axios
      .get(" http://localhost:9000/contacts")
      .then((response) => {
        setData(response.data);
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  //DELETE
  let clickDelete = (id) => {
    axios.delete(`http://localhost:9000/contacts/${id}`).then((response) => {
      axios
        .get(" http://localhost:9000/contacts")
        .then((response) => {
          setData(response.data);
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
          setError(err);
        })
        .finally(() => {
          setLoading(false);
        });
    });
  };
  return (
    <React.Fragment>
      <section className="contact-search p-3">
        <div className="container">
          <div className="grid">
            <div className="row">
              <div className="col">
                <p className="h3 fw-bold">
                  User Contact Manager
                  <Link to={"/contacts/add"} className="btn btn-primary ms-2">
                    <i className="fa fa-plus-circle me-2" /> New
                  </Link>
                </p>
                <p className="fst-italic">
                  lorem dcbkankjenkjfncqeakjhkjbwKJHBK
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <form className="row"></form>
              </div>
            </div>
          </div>
        </div>
      </section>
      {loading ? (
        <div>Loading</div>
      ) : (
        data?.map((info) => {
          return (
            <React.Fragment>
              <section className="contact-list">
                <div className="container">
                  <div className="row ">
                    <div className="col-md-6">
                      <div className="card">
                        <div className="card-body">
                          <div className="row align-items-center d-flex justify-content-around">
                            <div className="col-md-4">
                              <img
                                src={info.photo}
                                alt=""
                                className="img-fluid contact-img"
                              />
                            </div>
                            <div className="col-md-7">
                              <ul className="list-group">
                                <li className="list-group-item list-group-item-action">
                                  Name:
                                  <span className="fw-bold">{info.name}</span>
                                </li>
                                <li className="list-group-item list-group-item-action">
                                  Mobile:
                                  <span className="fw-bold">{info.mobile}</span>
                                </li>
                                <li className="list-group-item list-group-item-action">
                                  Email:
                                  <span className="fw-bold">{info.email}</span>
                                </li>
                              </ul>
                            </div>
                            <div className="col-md-1 d-flex flex-column align-items-center ">
                              <Link
                                to={`/contacts/view/${info.id}`}
                                className="btn btn-warning my-1"
                              >
                                <i className="fa fa-eye"></i>
                              </Link>
                              <Link
                                to={`/contacts/edit/${info.id}`}
                                className="btn btn-primary my-1"
                              >
                                <i className="fa fa-pen"></i>
                              </Link>
                              <button
                                to={"/contacts/view/:contactId"}
                                className="btn btn-danger my-1"
                                onClick={() => clickDelete(info.id)}
                              >
                                <i className="fa fa-trash"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </React.Fragment>
          );
        })
      )}
    </React.Fragment>
  );
}

export default ContactList;
