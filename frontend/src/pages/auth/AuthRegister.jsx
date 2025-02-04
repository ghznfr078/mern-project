import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CommonForm from "@/components/common/CommonForm";
import { registerFormControlls } from "@/config";
import { registerUser } from "@/store/auth-slice/authSlice";
import { useToast } from "@/hooks/use-toast";

const initialState = {
  userName: "",
  email: "",
  password: "",
};

const AuthRegister = () => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { toast } = useToast();

  const onSubmit = async (e) => {
    e.preventDefault();

    const result = await dispatch(registerUser(formData));

    if (result.payload?.success) {
      toast({
        title: result.payload.message,
      });
      navigate("/auth/login");
    } else {
      toast({
        title: result.payload.message,
      });
    }
  };

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Create new Account
        </h1>
        <p className="mt-2">Already have an account?</p>
        <Link
          className="font-medium ml-2 text-primary hover:underline"
          to="/auth/login"
        >
          Login
        </Link>
      </div>
      <CommonForm
        formControlls={registerFormControlls}
        buttonText={"Sign Up"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default AuthRegister;
