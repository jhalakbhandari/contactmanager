import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const AddContact = () => {
  const [data, setData] = useState({
    name: "",
    photo: "",
    mobile: "",
    email: "",
    company: "",
    title: "",
    group: "",
  });
  const [dataIsValid, setDataIsValid] = useState(false);
  const [inputTouched, setInputTouched] = useState(false);
  const [loading, setLoading] = useState(true);
  const [groups, setGroup] = useState();
  const [error, setError] = useState();
  const navigate = useNavigate();
  let { name, photo, mobile, email, company, title, group } = data;
  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const inputIsValid = !dataIsValid && inputTouched;
  const submitHandler = (e) => {
    setInputTouched(!inputTouched);
    if (
      data.name.trim() === "" &&
      data.mobile.length === 10 &&
      data.email.includes("@") === "true"
    ) {
      setDataIsValid(!dataIsValid);
      console.log("done");
    }
    if (inputIsValid) {
      axios
        .post("http://localhost:9000/contacts", {
          name,
          photo,
          mobile,
          email,
          company,
          title,
          group,
        })
        .then(function (response) {
          navigate("/contacts/list", { replace: true });
          console.log(response.data);
        })
        .catch(function (error) {
          navigate("/contacts/add", { replace: true });
          console.log(error);
        });
    } else {
      e.preventDefault();
      return;
    }
  };
  useEffect(() => {
    axios
      .get("http://localhost:9000/groups")
      .then((response) => {
        setGroup(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return (
    <React.Fragment>
      <section className="add-contact p-3">
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="h4 text-success fw-bold ">Create Contact</p>
              <p className="fst-italic">
                Labore in ad sint mollit ullamco ea eiusmod quis cillum aliqua.
              </p>
            </div>
            <div className="row">
              <div className="col-md-4">
                <form onSubmit={submitHandler}>
                  {inputIsValid ? (
                    <div className="text-danger">
                      The form should satisfy following condition:{" "}
                      <div>- Name must not be empty</div>
                      <div>- Phone number must have 10 digits</div>
                      <div>- Email must include '@'</div>
                    </div>
                  ) : null}
                  <div className="mb-2">
                    <input
                      type="text"
                      name="name"
                      value={data.name}
                      onChange={changeHandler}
                      className="form-control"
                      placeholder="Name"
                    />
                  </div>
                  <div className="mb-2">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Photo Url"
                      required={true}
                      name="photo"
                      value={data.photo}
                      onChange={changeHandler}
                    />
                  </div>{" "}
                  <div className="mb-2">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Mobile"
                      name="mobile"
                      value={data.mobile}
                      onChange={changeHandler}
                      required={true}
                    />
                  </div>
                  <div className="mb-2">
                    <input
                      className="form-control"
                      placeholder="Email"
                      name="email"
                      value={data.email}
                      onChange={changeHandler}
                      required={true}
                    />
                  </div>
                  <div className="mb-2">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Company"
                      name="company"
                      value={data.company}
                      onChange={changeHandler}
                      required={true}
                    />
                  </div>
                  <div className="mb-2">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Title"
                      name="title"
                      value={data.title}
                      onChange={changeHandler}
                      required={true}
                    />
                  </div>
                  <div className="mb-2">
                    <select
                      className="form-control"
                      name="group"
                      value={data.group}
                      onChange={changeHandler}
                    >
                      <option>Select a Group</option>;
                      {groups?.map((group) => {
                        return (
                          <option key={group.id} value={group.id}>
                            {group.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="mb-2">
                    <input
                      type="submit"
                      className="btn btn-success"
                      value="Create"
                      required={true}
                    />
                    <Link to={"/contacts/list"} className="btn btn-dark ms-2">
                      Close
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default AddContact;
