export function loadRazorpay(): Promise<boolean> {
  return new Promise((resolve) => {
    if ((window as any).Razorpay) return resolve(true);
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export async function initiatePayment(opts: {
  subscriptionId: string;
  plan: string;
  user: any;
  onSuccess: (data: any) => void;
  onError: () => void;
}) {
  const loaded = await loadRazorpay();
  if (!loaded) {
    opts.onError();
    return;
  }

  const rzp = new (window as any).Razorpay({
    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    subscription_id: opts.subscriptionId,
    name: "Urli",
    description: `${opts.plan} Plan - 30-day free trial`,
    prefill: { name: opts.user?.name, email: opts.user?.email },
    theme: { color: "#2563eb" },
    handler: opts.onSuccess,
  });
  rzp.on("payment.failed", opts.onError);
  rzp.open();
}
