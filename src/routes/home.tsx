import { format } from "date-fns";
import { For, createEffect } from "solid-js";
import { A, Title } from "solid-start";
import { useRegisters } from "~/components/contexts/registers";
import { useCurrentUser } from "~/components/contexts/user";
import ThemeToggle from "~/components/shared/ThemeToggle";
import { RoutesEnum } from "~/constants/routes";
import { currency } from "~/pipes/currency";
import { pb } from "~/services/pocketbase";

const Home = () => {
  const [registers, { setRegisters }]: any = useRegisters();
  const [user] = useCurrentUser();

  const fetchRecords = async () => {
    const records = await pb.collection("registers").getList(1, 5, {
      expand: "user_id,category",
      sort: "-date",
    });

    setRegisters(records.items);
  };

  createEffect(() => fetchRecords());

  return (
    <>
      <Title>Divisor de expensas - Inicio</Title>

      <div class="flex flex-col gap-4 m-4 text-gray-800 dark:text-gray-300">
        <div
          class="flex items-center justify-between gap-2
            bg-gray-200 dark:bg-gray-800
            p-4 rounded shadow"
        >
          <h2 class="font-medium">Hola, {user()?.name}!</h2>
          <div class="flex items-center justify-between gap-2">
            <h2>Tema de la aplicación</h2>
            <ThemeToggle />
          </div>
        </div>

        <div
          class="flex flex-col gap-2
            bg-gray-200 dark:bg-gray-800
            p-4 rounded shadow"
        >
          <h2 class="font-medium">Últimos 5 registros</h2>
          <For each={registers()}>
            {(register) => (
              <A
                href={`/${RoutesEnum.Registers}/${register.id}`}
                class="flex gap-4 items-center justify-between py-2 px-4
                    bg-white dark:bg-gray-600 rounded cursor-pointer
                    shadow-sm hover:shadow transition-all duration-200"
              >
                <div class="rounded-full overflow-hidden">
                  <img
                    src={pb.getFileUrl(
                      register.expand.user_id,
                      register.expand.user_id.avatar,
                      { thumb: "100x100" }
                    )}
                    alt={register.expand.user_id.username}
                    width={50}
                    height={50}
                  />
                </div>
                <div class="flex flex-1 flex-col sm:flex-row items-center justify-between">
                  <div class="flex flex-col gap-1 align-start justify-start sm:justify-center w-full">
                    <span class="text-sm">
                      {format(
                        new Date(register.date).getTime() +
                          (new Date(register.date).getTimezoneOffset() + 1) *
                            1000 *
                            60,
                        "dd/MM/yyyy"
                      )}
                    </span>
                    <span>
                      ({register.expand.category.label}) {register.description}
                    </span>
                  </div>
                  <div
                    class="flex items-center justify-start sm:justify-between w-full sm:w-40 text-xl"
                    classList={{
                      "text-green-600": register.type === "income",
                      "text-red-500": register.type === "expense",
                    }}
                  >
                    <span>$</span>
                    <span>
                      {register.type === "expense" && "-"}
                      {currency(register.amount)}
                    </span>
                  </div>
                </div>
              </A>
            )}
          </For>
        </div>

        <div
          class="flex flex-col gap-2
            bg-gray-200 dark:bg-gray-800
            p-4 rounded shadow"
        >
          <h2 class="font-medium">¿Cómo funciona el divisor?</h2>
          <span>
            Para empezar, se cargan los ingresos y gastos del mes en la sección
            "Registros". Al hacer click en un registro, se puede acceder a todos
            sus datos para su edición o eliminación.
          </span>
          <span>
            Hay dos tipos de división disponibles, "Equitativo" y
            "Proporcional".
          </span>
          <span>
            <span class="font-bold">Equitativo: </span>Se basa en que todas las
            partes tengan hagan una contribución igual, dividiendo el total de
            los gatos a la mitad. Hace el cálculo basado en lo que debería pagar
            cada uno y los gastos afrontados en el mes.
          </span>
          <span>
            <span class="font-bold">Proporcional: </span>Se basa en que cada
            parte contribuya de manera directamente proporcional a sus ingresos.
            Hace el cálculo basándose en los ingresos obtenidos por cada uno y
            los gastos afrontados en el mes, ponderando según la contribución
            porcentual a los ingresos.
          </span>
        </div>
      </div>
    </>
  );
};

export default Home;
