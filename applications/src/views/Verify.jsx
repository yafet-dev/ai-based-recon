import { useState, useEffect } from "react";
import { useParams } from "react-router";
import toast from "react-hot-toast";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";

const Verify = () => {
  const navigate = useNavigate();
  const { token } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_API}/users/verify/${token}`
        );
        if (response.ok) {
          const responseData = await response.json();
          toast.success("Verification succesfully completed");
          navigate("/signin");
        } else {
          const errorData = await response.json();
          toast.error(errorData.message || "Verification failed");
        }
      } catch (error) {
        toast.error("An error occurred during verification");
      }
    };

    fetchData();
  }, [token]);

  return <Loading />;
};

export default Verify;
