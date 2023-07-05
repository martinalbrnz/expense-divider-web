import { createForm } from "@felte/solid";
import { Navigate } from "@solidjs/router";
import { useAuth } from "~/components/contexts/auth";
import { AuthUser } from "~/models/authUser.model";

const Login = () => {
  const [auth, { login }]: any = useAuth();

  const { form } = createForm({
    onSubmit: (values, _) => {
      login(values.email, values.password).then((resp: AuthUser) => {
        if (resp.token) login(resp);
        console.log("login", resp);
      });
    },
  });

  if (auth()) {
    return <Navigate href="/user" />;
  } else
    return (
      <div class="flex items-center justify-center m-12">
        <div class="bg-white p-4 rounded shadow border border-sky-100">
          <form ref={form} class="flex flex-col gap-4">
            <div class="flex flex-col">
              <label>Email o usuario</label>
              <input class="border rounded-md p-1" type="text" name="email" />
            </div>

            <div class="flex flex-col">
              <label>Contraseña</label>
              <input
                class="border rounded-md p-1"
                type="text"
                name="password"
              />
            </div>

            <button
              type="submit"
              class="bg-slate-500 p-2 rounded-md text-white font-semibold"
            >
              Ingresar
            </button>
          </form>
        </div>
      </div>
    );
};

export default Login;
