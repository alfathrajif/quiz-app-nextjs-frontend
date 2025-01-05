import { getTryouts } from "@/actions/tryout";
import UserTryouts from "@/components/client-page/user-tryouts";

export default async function Tryout() {
  const tryouts = await getTryouts();

  return <UserTryouts tryouts={tryouts} />;
}
