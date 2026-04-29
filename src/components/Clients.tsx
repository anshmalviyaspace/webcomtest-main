import { Marquee } from "@/components/ui/marquee";

const testimonials = [
  {
    quote:
      "WebCom Media transformed our digital presence. Their strategic approach and consistent results have been invaluable to our growth.",
    name: "Ansh",
    company: "Average",
  },
  {
    quote:
      "Working with WebCom Media has been a game-changer. Professional, reliable, and results-driven. Highly recommended!",
    name: "Aishwary Singh",
    company: "SXTHGR",
  },
  {
    quote:
      "Their honest communication and practical approach to digital world helped us achieve real growth. Great partners to have.",
    name: "Mann",
    company: "Kravic",
  },
  {
    quote:
      "From strategy to execution, WebCom Media delivers. They understand our business and help us achieve meaningful results.",
    name: "Shailesh Malviya",
    company: "Prabhat Digital Electronics",
  },
  {
    quote:
      "Excellent service and support. WebCom Media's team is responsive, knowledgeable, and committed to our success.",
    name: "Sumit Sharma",
    company: "Prabhat Digital Signage",
  },
];

function TestimonialCard({
  quote,
  name,
  company,
}: {
  quote: string;
  name: string;
  company: string;
}) {
  return (
    <div className="relative w-[min(22rem,calc(100vw-2.5rem))] shrink-0 rounded-2xl border border-border/60 bg-gradient-to-b from-background/90 via-background/75 to-background/60 p-6 shadow-[0_18px_40px_rgba(0,0,0,0.35)]">
      <p className="text-sm text-muted-foreground leading-relaxed mb-5">&ldquo;{quote}&rdquo;</p>
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/15 text-sm font-display font-semibold text-primary">
          {name.charAt(0)}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium text-foreground truncate">{name}</p>
          <p className="text-xs text-muted-foreground truncate">{company}</p>
        </div>
      </div>
    </div>
  );
}

const marqueeCards = testimonials.map((t) => (
  <TestimonialCard key={t.name} quote={t.quote} name={t.name} company={t.company} />
));

const Clients = () => {
  return (
    <section id="clients" className="py-10 md:py-28 bg-card overflow-hidden">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="max-w-lg mb-10 md:mb-12">
          <p className="text-xs font-medium tracking-widest text-muted-foreground uppercase mb-4">
            Testimonials
          </p>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4 text-balance">
            What Our Clients Say
          </h2>
          <p className="text-muted-foreground">Real feedback from brands we&apos;ve scaled.</p>
        </div>
      </div>

      <div className="relative flex flex-col gap-6 md:gap-8">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 sm:w-20 bg-gradient-to-r from-card to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 sm:w-20 bg-gradient-to-l from-card to-transparent" />

        <Marquee pauseOnHover className="[--duration:55s] [--gap:1.25rem]" repeat={4}>
          {marqueeCards}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:70s] [--gap:1.25rem]" repeat={4}>
          {marqueeCards}
        </Marquee>
      </div>
    </section>
  );
};

export default Clients;
