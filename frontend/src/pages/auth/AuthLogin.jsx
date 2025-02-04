import CommonForm from "@/components/common/CommonForm";
import { loginFormControlls } from "@/config";
import { useToast } from "@/hooks/use-toast";
import { loginUser } from "@/store/auth-slice/authSlice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const initialState = {
  email: "",
  password: "",
};

const AuthLogin = () => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { toast } = useToast();

  const onSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(loginUser(formData));

    if (result.payload?.success) {
      toast({
        title: result.payload.message,
      });
    } else {
      toast({
        title: result.payload.message,
        variant: "destructive",
      });
    }
  };
  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Sign In to your Account
        </h1>
        <p className="mt-2">Don't have an account?</p>
        <Link
          className="font-medium ml-2 text-primary hover:underline"
          to="/auth/register"
        >
          Register
        </Link>
      </div>
      <CommonForm
        formControlls={loginFormControlls}
        buttonText={"Sign In"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default AuthLogin;
