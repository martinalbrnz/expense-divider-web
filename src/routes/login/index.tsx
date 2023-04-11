import { createForm } from "@felte/solid";
import { Navigate, useNavigate } from "@solidjs/router";
import { login } from "~/services/pocketbase";

const Login = () => {
  const navigate = useNavigate();
  const { form } = createForm({
    onSubmit: (values, _) => {
      login(values.email, values.password).then((resp) => {
        if (resp.token) return <Navigate href={"/"} />;
      });
    },
  });

  if (localStorage.getItem("token")) {
    navigate("/user");
    return;
  } else
    return (
      <div class="flex items-center justify-center m-12">
        <form ref={form} class="flex flex-col gap-4">
          <div class="flex flex-col">
            <label>Email o usuario</label>
            <input class="border rounded-md p-1" type="text" name="email" />
          </div>

          <div class="flex flex-col">
            <label>Contraseña</label>
            <input class="border rounded-md p-1" type="text" name="password" />
          </div>

          <button
            type="submit"
            class="bg-slate-500 p-2 rounded-md text-white font-semibold"
          >
            Ingresar
          </button>
        </form>
      </div>
    );
};

export default Login;
