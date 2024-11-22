import { getSubscriptionPlans } from "@/actions/subscription";
import PlanCard from "@/components/subcsciption/plan-card";

const Pricing = async () => {
  const plans = await getSubscriptionPlans();

  return (
    <div className="wrapper py-10 space-y-8">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 tracking-tight leading-tight md:leading-[3.5rem]">
          Pilih Paket Terbaik untuk Anda!
        </h1>
        <p className="text-base leading-relaxed text-muted-foreground">
          Nikmati akses eksklusif ke lebih banyak soal dan tingkatkan kemampuan
          Anda. Bergabunglah&nbsp;sekarang dan raih kesuksesan lebih cepat!
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto gap-6">
        {plans.map((plan) => (
          <PlanCard key={plan.uuid} plan={plan} />
        ))}
      </div>
    </div>
  );
};

export default Pricing;
