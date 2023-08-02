import { Navigate } from "solid-start";
import { useCurrentUser } from "~/components/contexts/user";
import { RoutesEnum } from "~/constants/routes";

export default function Landing() {
  const [user] = useCurrentUser();

  if (user()) {
    return <Navigate href={RoutesEnum.Home} />;
  }

  return (
    <>
      <div class="p-10 transition-colors duration-500"></div>
    </>
  );
}
