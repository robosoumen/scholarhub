import { useForm } from "react-hook-form";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { imageUpload } from "../Authentication/utility/imageUpload";
import useAuth from "../../Hooks/useAuth";

const AddScholarship = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleAddScholarship = async (data) => {

    const scholarshipImage = data.image[0];

    const imageURL = await imageUpload(scholarshipImage);

    const scholarshipData = {
      ...data,
      image: imageURL,
    };

    axiosSecure.post("/scholarship", scholarshipData).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Scholarship uploaded successful",
          showConfirmButton: false,
          timer: 2500,
        });
        reset();
      }
    });
  };

  return (
    <div>
      <p>add scholarship form</p>

      <div>
        <form onSubmit={handleSubmit(handleAddScholarship)}>
          <fieldset className="fieldset">
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
              {/* Left Column */}
              <div className="space-y-2">
                <div>
                  <label className="label">Scholarship Name</label>
                  <input
                    {...register("scholarshipName", {required:true})}
                    type="text"
                    className="input w-full"
                    placeholder="Scholarship Name"
                  />
                  {
                    errors.scholarshipName?.type === 'required' && <p className='text-red-600'>scholarship name must required</p>
                  }
                </div>

                <div>
                  <label className="label">University Name</label>
                  <input
                    {...register("universityName", {required:true})}
                    type="text"
                    className="input w-full"
                    placeholder="University Name"
                  />
                  {
                    errors.universityName?.type === 'required' && <p className='text-red-600'>universityName name must required</p>
                  }
                </div>

                <div>
                  <label className="label">Image</label>
                  <input
                    {...register("image")}
                    type="file"
                    className="file-input w-full"
                    placeholder=" image "
                  />
                </div>

                <div>
                  <label className="label">Country Name</label>
                  <input
                    {...register("country", {required:true})}
                    type="text"
                    className="input w-full"
                    placeholder="Country Name"
                  />
                </div>

                <div>
                  <label className="label">City Name</label>
                  <input
                    {...register("city", {required:true})}
                    type="text"
                    className="input w-full"
                    placeholder="City Name"
                  />
                </div>

                <div>
                  <label className="label">World Rank</label>
                  <input
                    {...register("WorldRank", {required:true})}
                    type="text"
                    className="input w-full"
                    placeholder="World Rank"
                  />
                </div>

                <div>
                  <label className="label">Subject Category</label>
                  <input
                    {...register("subjectCategory", {required:true})}
                    type="text"
                    className="input w-full"
                    placeholder="Subject Category"
                  />
                </div>
              </div>

              {/* Right Column — now a sibling of Left Column, not nested inside it */}
              <div className="space-y-2">
                <div>
                  <label className="label">Scholarship Category</label>
                  <input
                    {...register("scholarshipCategory", {required:true})}
                    type="text"
                    className="input w-full"
                    placeholder="Scholarship Category"
                  />
                </div>

                <div>
                  <label className="label">Degree</label>
                  <input
                    {...register("degree", {required:true})}
                    type="text"
                    className="input w-full"
                    placeholder="Degree"
                  />
                </div>

                <div>
                  <label className="label">Tuition Fees</label>
                  <input
                    {...register("tuitionFees", {required:true})}
                    type="number"
                    className="input w-full"
                    placeholder="Tuition Fees"
                  />
                  {
                    errors.tuitionFees?.type === 'required' && <p className='text-red-600'>tuitionFees need to enter</p>
                  }
                </div>

                <div>
                  <label className="label">Application Fees</label>
                  <input
                    {...register("applicationFees", {required:true})}
                    type="number"
                    className="input w-full"
                    placeholder="Application Fees"
                  />
                  {
                    errors.applicationFees?.type === 'required' && <p className='text-red-600'>applicationFees must required</p>
                  }
                </div>

                <div>
                  <label className="label">Deadline</label>
                  <input
                    {...register("deadline", {required:true})}
                    type="text"
                    className="input w-full"
                    placeholder="Deadline"
                  />
                  {
                    errors.deadline?.type === 'required' && <p className='text-rose-600'>Deadline also Required For Scholarship</p>
                  }
                </div>
                <div>
                  <label className="label">Service Charge</label>
                  <input
                    {...register("serviceCharge", {required:true})}
                    type="text"
                    className="input w-full"
                    placeholder="Service Charge"
                  />
                </div>
                <div>
                  <label className="label">Poster User Email</label>
                  <input
                    {...register("posterUserEmail", {required:true})}
                    type="email"
                    defaultValue={user?.email}
                    className="input w-full"
                    placeholder="Poster User Email"
                  />
                </div>
              </div>
            </div>

            <button className="btn btn-neutral mt-4">Submit</button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default AddScholarship;
