import { getTryouts } from "@/actions/tryout";
import TryoutList from "@/components/tryout/tryout-list";

export default async function Tryout() {
  const tryouts = await getTryouts();

  return <TryoutList tryouts={tryouts} />;
}
