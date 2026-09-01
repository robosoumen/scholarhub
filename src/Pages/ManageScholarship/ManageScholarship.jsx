import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const ManageScholarship = () => {
  const axiosSecure = useAxiosSecure();
  const scholarshipModalRef = useRef();
  const [selectedScholarship, setSelectedScholarship] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const { data: scholarships = [], refetch } = useQuery({
    queryKey: ["scholarships"],
    queryFn: async () => {
      const res = await axiosSecure.get("/scholarships");
      return res.data;
    },
  });

  console.log(scholarships);

  const openScholarshipModal = (scholarship) => {
    setSelectedScholarship(scholarship);
    reset(scholarship);
    scholarshipModalRef.current.showModal();
  };

  console.log("xxxxxxxxxxxxxxxxxx", selectedScholarship);

  const handleUpdateScholarship = (data) => {
    console.log("llllllllllllllllllllll", data);

    const updatedData = {
      applicationFees: data.applicationFees,
      city: data.city,
      country: data.country,
      deadLine: data.deadLine,
      degree: data.degree,
      image: data.image,
      posterUserEmail: data.posterUserEmail,
      scholarshipCategory: data.scholarshipCategory,
      scholarshipName: data.scholarshipName,
      serviceCharge: data.serviceCharge,
      subjectCategory: data.subjectCategory,
      tuitionFees: data.tuitionFees,
      universityName: data.universityName,
      worldRank: data.worldRank,
    };

    axiosSecure
      .patch(`/scholarship/${selectedScholarship._id}`, updatedData)
      .then((res) => {
        if (res.data.modifiedCount) {
          scholarshipModalRef.current.close();
          refetch();
          Swal.fire({
            title: "updated ",
            text: "update done",
            icon: "success",
          });
        }
      });
  };

  return (
    <div>
      <p>Manage Scholarship:{scholarships.length}</p>

      {/* table */}
      <div>
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Scholarship Name</th>
                <th>University Name</th>
                <th>Post Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {scholarships.map((scholarship, i) => (
                <tr key={scholarship._id}>
                  <th>{i + 1}</th>
                  <td>{scholarship.scholarshipName}</td>
                  <td>{scholarship.universityName}</td>
                  <td>{scholarship.scholarshipPostDate}</td>
                  <td>
                    <button
                      onClick={() => openScholarshipModal(scholarship)}
                      className="btn"
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* modal */}
      <dialog ref={scholarshipModalRef} className="modal">
        <div className="modal-box">
             {/* eslint-disable-next-line react-hooks/refs */}
          <form onSubmit={handleSubmit(handleUpdateScholarship)}>
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
              <div className="card-body">
                <fieldset className="fieldset">
                  <div>
                    <label className="label">Scholarship Name</label>
                    <input
                      {...register("scholarshipName", { required: true })}
                      type="text"
                      className="input w-full"
                      defaultValue={selectedScholarship?.scholarshipName}
                    />
                    {errors.scholarshipName?.type === "required" && (
                      <p className="text-red-600">
                        scholarship name must required
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="label">University Name</label>
                    <input
                      {...register("universityName", { required: true })}
                      type="text"
                      className="input w-full"
                      defaultValue={selectedScholarship?.universityName}
                    />
                    {errors.universityName?.type === "required" && (
                      <p className="text-red-600">
                        scholarship name must required
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="label">World Rank</label>
                    <input
                      {...register("worldRank", { required: true })}
                      type="number"
                      className="input w-full"
                      defaultValue={selectedScholarship?.WorldRank}
                    />
                    {errors.worldRank?.type === "required" && (
                      <p className="text-red-600">
                        scholarship name must required
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="label">Country</label>
                    <input
                      {...register("country", { required: true })}
                      type="text"
                      className="input w-full"
                      defaultValue={selectedScholarship?.country}
                    />
                    {errors.country?.type === "required" && (
                      <p className="text-red-600">
                        scholarship name must required
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="label">City</label>
                    <input
                      {...register("city", { required: true })}
                      type="text"
                      className="input w-full"
                      defaultValue={selectedScholarship?.city}
                    />
                    {errors.city?.type === "required" && (
                      <p className="text-red-600">
                        scholarship name must required
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="label">Degree</label>
                    <input
                      {...register("degree", { required: true })}
                      className="select w-full"
                      defaultValue={selectedScholarship?.degree}
                    />
                    {errors.degree?.type === "required" && (
                      <p className="text-red-600">
                        scholarship name must required
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="label">Scholarship Category</label>
                    <input
                      {...register("scholarshipCategory", { required: true })}
                      className="select w-full"
                      defaultValue={selectedScholarship?.scholarshipCategory}
                    ></input>
                    {errors.scholarshipCategory?.type === "required" && (
                      <p className="text-red-600">
                        scholarship name must required
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="label">Subject Category</label>
                    <input
                      {...register("subjectCategory", { required: true })}
                      className="select w-full"
                      defaultValue={selectedScholarship?.subjectCategory}
                    ></input>
                    {errors.subjectCategory?.type === "required" && (
                      <p className="text-red-600">
                        scholarship name must required
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="label">Tuition Fees</label>
                    <input
                      {...register("tuitionFees", { required: true })}
                      type="number"
                      className="input w-full"
                      defaultValue={selectedScholarship?.tuitionFees}
                    />
                    {errors.tuitionFees?.type === "required" && (
                      <p className="text-red-600">
                        scholarship name must required
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="label">Application Fees</label>
                    <input
                      {...register("applicationFees", { required: true })}
                      type="number"
                      className="input w-full"
                      defaultValue={selectedScholarship?.applicationFees}
                    />
                    {errors.applicationFees?.type === "required" && (
                      <p className="text-red-600">
                        scholarship name must required
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="label">Service Charge</label>
                    <input
                      {...register("serviceCharge", { required: true })}
                      type="number"
                      className="input w-full"
                      defaultValue={selectedScholarship?.serviceCharge}
                    />
                    {errors.serviceCharge?.type === "required" && (
                      <p className="text-red-600">
                        scholarship name must required
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="label">Deadline</label>
                    <input
                      {...register("deadLine", { required: true })}
                      type="date"
                      className="input w-full"
                      defaultValue={selectedScholarship?.deadline}
                    />
                    {errors.deadLine?.type === "required" && (
                      <p className="text-red-600">
                        scholarship name must required
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="label">Poster User Email</label>
                    <input
                      {...register("posterUserEmail", { required: true })}
                      type="email"
                      className="input w-full"
                      defaultValue={selectedScholarship?.posterUserEmail}
                      readOnly
                    />
                    {errors.posterUserEmail?.type === "required" && (
                      <p className="text-red-600">
                        scholarship name must required
                      </p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="label">Image URL</label>
                    <input
                      {...register("image", { required: true })}
                      type="text"
                      className="input w-full"
                      defaultValue={selectedScholarship?.image}
                    />
                    {errors.image?.type === "required" && (
                      <p className="text-red-600">
                        scholarship name must required
                      </p>
                    )}
                  </div>

                  <button className="btn btn-neutral mt-4">Update</button>
                </fieldset>
              </div>
            </div>
          </form>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ManageScholarship;
