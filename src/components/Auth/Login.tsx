import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup"
import { useAppDispatch, useAppSelector } from "../../store/store";
import { login } from "../../store/features/authSlice";
import Google from "./Google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

export interface LoginFormValues {
    username: string;
    password: string;
}
const Login = () => {
    const { loading } = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const initialValues: LoginFormValues = {
        username: "",
        password: "",
    };


    const validationSchema = Yup.object().shape({
        email: Yup.string().required("This field is required!").email("This should be email type!"),
        password: Yup.string().required("This field is required!"),
    });

    const handleLogin = (formValue: LoginFormValues) => {
        const { password, username: email } = formValue;
        dispatch(login({ Password: password, Email: email }))
        navigate("/");
    }

    return (
        <div>
            <div className="social-logins">
                <GoogleOAuthProvider clientId="146676323838-15sr4eu3nmqlhepgprq5gjmclkblpmuq.apps.googleusercontent.com">
                    <Google />
                </GoogleOAuthProvider>
            </div>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleLogin}
            >
                <Form>
                    <div>
                        <label htmlFor="email">Email</label>
                        <Field name="email" type="text" />
                        <ErrorMessage name="email" component="div" />
                    </div>

                    <div>
                        <label htmlFor="password">Password</label>
                        <Field name="password" type="password" />
                        <ErrorMessage name="password" component="div" />
                    </div>

                    <div>
                        <button type="submit" disabled={loading}>
                            Login
                        </button>
                    </div>
                </Form>
            </Formik>
        </div>
    );
}

export default Login;