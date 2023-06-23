import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const EditContact = () => {
  const [data, setData] = useState({
    name: "",
    photo: "",
    mobile: "",
    email: "",
    company: "",
    title: "",
    group: "",
  });
  const [loading, setLoading] = useState(true);
  const [groups, setGroup] = useState();
  const [error, setError] = useState();
  const { contactId } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(` http://localhost:9000/contacts/${contactId}`)
      .then((response) => {
        setLoading(true);
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [contactId]);
  let { name, photo, mobile, email, company, title, group } = data;
  useEffect(() => {
    axios
      .get("http://localhost:9000/groups")
      .then((response) => {
        setGroup(response.data);
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  const updateHandler = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };
  const sendUpdateHandler = (event) => {
    event.preventDefault();
    console.log(event);
    axios
      .put(`http://localhost:9000/contacts/${contactId}`, data)
      .then(function (response) {
        navigate("/contacts/list", { replace: true });
        console.log(response);
      })
      .catch(function (error) {
        navigate("/contacts/edit", { replace: true });
        console.log(error);
      });
  };
  return (
    <React.Fragment>
      <section className="add-contact p-3">
        <div className="container">
          <div className="row ">
            <div className="col">
              <p className="h4 text-primary fw-bold ">Edit Contact</p>
              <p className="fst-italic">
                Labore in ad sint mollit ullamco ea eiusmod quis cillum aliqua.
              </p>
            </div>
            <div className="row align-items-center">
              <div className="col-md-4">
                <form onSubmit={sendUpdateHandler}>
                  <div className="mb-2">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Name"
                      name="name"
                      value={name}
                      required={true}
                      onChange={updateHandler}
                    />
                  </div>
                  <div className="mb-2">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Photo Url"
                      name="photo"
                      value={photo}
                      required={true}
                      onChange={updateHandler}
                    />
                  </div>{" "}
                  <div className="mb-2">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Mobile"
                      name="mobile"
                      value={mobile}
                      required={true}
                      onChange={updateHandler}
                    />
                  </div>
                  <div className="mb-2">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      name="email"
                      value={email}
                      required={true}
                      onChange={updateHandler}
                    />
                  </div>
                  <div className="mb-2">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Company"
                      name="company"
                      value={company}
                      required={true}
                      onChange={updateHandler}
                    />
                  </div>
                  <div className="mb-2">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Title"
                      name="title"
                      value={title}
                      required={true}
                      onChange={updateHandler}
                    />
                  </div>{" "}
                  <div className="mb-2">
                    <select
                      name="group"
                      required={true}
                      className="form-control"
                      onChange={updateHandler}
                      value={group}
                    >
                      <option>Select a Group</option>
                      {groups?.map((group) => {
                        return (
                          <option
                            key={group.id}
                            value={group.id}
                            required={true}
                          >
                            {group.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="mb-2">
                    <input
                      type="submit"
                      className="btn btn-primary"
                      value="Update"
                    />
                    <Link to={"/contacts/list"} className="btn btn-dark ms-2">
                      Close
                    </Link>
                  </div>
                </form>
              </div>
              <div className="col-md-6">
                <img src={data.photo} alt="" className="contact-img"></img>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default EditContact;
