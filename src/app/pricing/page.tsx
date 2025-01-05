import { getSubscriptionPlans } from "@/actions/subscription-plans";
import PlanCard from "@/components/subcsciption/plan/plan-card";

const Pricing = async () => {
  const subscriptionPlans = await getSubscriptionPlans();

  return (
    <div className="wrapper py-10 space-y-8">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Choose the Best Plan for You!
        </h1>
        <p className="leading-7 [&:not(:first-child)]:mt-6 text-muted-foreground">
          Enjoy exclusive access to more questions and improve your skills.
          <br /> Join now and achieve success faster!
        </p>
      </div>
      <div className="flex gap-6 max-w-6xl mx-auto justify-center">
        {subscriptionPlans.map((subscriptionPlan) => (
          <PlanCard
            key={subscriptionPlan.uuid}
            subscriptionPlan={subscriptionPlan}
          />
        ))}
      </div>
    </div>
  );
};

export default Pricing;
