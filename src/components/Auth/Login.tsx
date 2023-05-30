import { SubmitHandler, useForm } from "react-hook-form";
import styles from "./Login.module.css";
import { useState } from "react";
import DisplaySuccess from "./DisplaySuccess";
import DisplayErrors from "./DisplayErrors";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../store/store";
import { google, handleAuth, loginAsync } from "../../store/features/authSlice";
import Google from "./Google";
import { CredentialResponse, GoogleOAuthProvider } from "@react-oauth/google";

export interface ILoginFormValues {
  email: string;
  password: string;
}

const Login = () => {
  const { email } = useParams();
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ILoginFormValues>({
    mode: "onSubmit",
    defaultValues: {
      email: email
    }
  });

  const [errorsForm, setErrorsForm] = useState<string[]>([]);

  const onSubmit: SubmitHandler<ILoginFormValues> = (data) => {
    dispatch(loginAsync({ Email: data.email, Password: data.password }))
      .unwrap()
      .then(
        (res) => {
          navigate("/");
        },
        (err) => {
          setErrorsForm(err);
        }
      );
    reset();
  };

  const onGoogleSubmitClick = (resposne: CredentialResponse) => {
    dispatch(google({ IdToken: resposne.credential }))
      .unwrap()
      .then(
        (res) => {
          navigate("/");
        },
        (err) => {
          setErrorsForm(err);
        }
      );

    reset();
  };

  return (
    <>
      <div className={styles["form-card"]}>
        <div className={styles["form-row"]}>
          <div className={styles["form-img-wrapper"]}>
            <div className={styles["form-image"]}>
              <img src="./img/logo-no-background.png" alt="" />
            </div>
          </div>
          <div className={styles["form-wrapper"]}>
            <div className={styles["form"]}>
              <h3 className={styles["form-title"]}>Member login</h3>
              <DisplayErrors erorrs={errorsForm} />
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles["form-control"]}>
                  <div className={styles["input-box"]}>
                    <input
                      {...register("email", {
                        required: "Email is required!",
                        pattern: {
                          value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                          message: "Please enter a valid email"
                        }
                      })}
                      type="text"
                      required
                    />
                    <span>Email</span>
                  </div>
                  {errors?.email && (
                    <div style={{ color: "red" }}>{errors.email.message}</div>
                  )}
                </div>

                <div className={styles["form-control"]}>
                  <div className={styles["input-box"]}>
                    <input
                      {...register("password", {
                        required: "Password is required!",
                        pattern: {
                          value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,}$/,
                          message: "Please enter a valid password"
                        }
                      })}
                      type="password"
                      required
                    />
                    <span>Password</span>
                  </div>
                  {errors?.password && (
                    <div style={{ color: "red" }}>
                      {errors.password.message}
                    </div>
                  )}
                </div>

                <div className={styles["form-btns"]}>
                  <button className={styles["form-btn"]} type="submit">
                    Login
                  </button>
                  <p>or sign with</p>
                  <div className={styles["google-btn"]}>
                    <GoogleOAuthProvider clientId="146676323838-15sr4eu3nmqlhepgprq5gjmclkblpmuq.apps.googleusercontent.com">
                      <Google onGoogleSubmit={onGoogleSubmitClick} />
                    </GoogleOAuthProvider>
                  </div>
                </div>
              </form>
              <div
                className={styles["form-register-link"]}
                style={{ textAlign: "center" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
