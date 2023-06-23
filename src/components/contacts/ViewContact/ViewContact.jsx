import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
const ViewContact = () => {
  const { contactId } = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    axios
      .get(` http://localhost:9000/contacts/${contactId}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [contactId]);
  let { company, email, group, mobile, name, title, photo } = data;
  return (
    <React.Fragment>
      <section className="view-contact-intro p-3">
        <div className="row">
          <div className="col">
            <p className="h3 text-warning fw-bold">View Contact</p>
            <p className="fst-italic">
              Et do culpa ad cillum exercitation sint officia pariatur amet
              fugiat culpa dolore. Qui mollit mollit eiusmod ipsum.
              Reprehenderit enim adipisicing minim mollit laborum. Irure sunt ex
              pariatur proident nisi incididunt aute proident non ullamco.
            </p>
          </div>
        </div>
      </section>
      <section className="view-contact m-3">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-4">
              <img src={photo} className="contact-img" alt="" />
            </div>
            <div className="col-md-8">
              <ul className="list-group">
                <li className="list-group-item list-group-item-action">
                  Name:<span className="fw-bold">{name}</span>
                </li>
                <li className="list-group-item list-group-item-action">
                  Mobile:<span className="fw-bold">{mobile}</span>
                </li>
                <li className="list-group-item list-group-item-action">
                  Email:
                  <span className="fw-bold">{email}</span>
                </li>
                <li className="list-group-item list-group-item-action">
                  Company:
                  <span className="fw-bold">{company}</span>
                </li>
                <li className="list-group-item list-group-item-action">
                  Title:
                  <span className="fw-bold">{title}</span>
                </li>
                <li className="list-group-item list-group-item-action">
                  Group:
                  <span className="fw-bold">{group}</span>
                </li>
              </ul>
            </div>
            <div className="row">
              <div className="col">
                <Link to={"/contacts/list"} className="btn btn-warning">
                  Back
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default ViewContact;
