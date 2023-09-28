import { createForm } from "@felte/solid";
import { Navigate } from "@solidjs/router";
import { RiSystemEyeLine, RiSystemEyeOffLine } from "solid-icons/ri";
import { Show, createSignal } from "solid-js";
import { useNavigate } from "solid-start";
import { useCurrentUser } from "~/components/contexts/user";
import { pb } from "~/services/pocketbase";

const Login = () => {
  const [showPassword, setShowPassword] = createSignal<boolean>(false);
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

            <div class="flex flex-col relative">
              <label>Contraseña</label>
              <input
                class="border rounded-md p-1 text-gray-800"
                type={showPassword() ? "text" : "password"}
                name="password"
              />

              <div
                class="absolute right-2 top-8 text-xl cursor-pointer hover:scale-105 transition-all duration-200 text-gray-800"
                onclick={() => setShowPassword((isShowing) => !isShowing)}
              >
                <Show when={showPassword()} fallback={<RiSystemEyeOffLine />}>
                  <RiSystemEyeLine />
                </Show>
              </div>
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
