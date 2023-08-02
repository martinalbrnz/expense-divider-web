import { createForm } from "@felte/solid";
import { Navigate } from "@solidjs/router";
import { useNavigate } from "solid-start";
import { useCurrentUser } from "~/components/contexts/user";
import { pb } from "~/services/pocketbase";

const Login = () => {
  const [user, { setCurrentUser }]: any = useCurrentUser();

  const navigate = useNavigate();

  const login = async (user: string, password: string) => {
    const authData = await pb
      .collection("users")
      .authWithPassword(user, password);

    if (authData.token) {
      setCurrentUser(pb.authStore.model);
      navigate("/", { replace: true });
    }
  };

  const { form } = createForm({
    onSubmit: (values) => {
      login(values.email, values.password);
    },
  });

  if (user()) {
    return <Navigate href="/" />;
  }
  return (
    <>
      <div class="flex items-center justify-center h-full">
        <div
          class="p-4 rounded shadow bg-primary-300 dark:bg-primary-950
            text-gray-800 dark:text-gray-300 font-medium
            w-2/3 max-w-sm"
        >
          <form ref={form} class="flex flex-col gap-6">
            <div class="flex flex-col">
              <label>Email o usuario</label>
              <input
                class="border rounded-md p-1 text-gray-800"
                type="text"
                name="email"
              />
            </div>

            <div class="flex flex-col">
              <label>Contraseña</label>
              <input
                class="border rounded-md p-1 text-gray-800"
                type="text"
                name="password"
              />
            </div>

            <button
              type="submit"
              class="bg-primary-600 p-2 rounded-md text-white font-semibold"
            >
              Ingresar
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
function useSignal(): [any, any] {
  throw new Error("Function not implemented.");
}
