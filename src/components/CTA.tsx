import { useState, useRef } from "react";
import { ArrowRight, CheckCircle, Bot, BarChart3, Workflow, Zap, ChevronLeft, ChevronRight, Clock, Calendar } from "lucide-react";
import { ShineBorder } from "@/registry/magicui/shine-border";
import { motion, useInView } from "motion/react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isBefore,
  startOfDay,
} from "date-fns";

/* ── Config ── */
const CONTACT_EMAIL = "webcommedia1@gmail.com";

const TIME_SLOTS = [
  "9:00 AM", "10:00 AM", "11:00 AM",
  "12:00 PM", "2:00 PM",  "3:00 PM",
  "4:00 PM",  "5:00 PM",
];

const benefits = [
  "A full map of where AI can replace manual work in your marketing",
  "A custom automation blueprint built for your business model",
  "Clarity on your current ad spend efficiency and ROAS potential",
  "A reliable partner who builds systems, not just runs campaigns",
];

const auditItems = [
  { icon: Bot,       label: "AI Readiness Assessment" },
  { icon: Workflow,  label: "Automation Opportunity Map" },
  { icon: BarChart3, label: "Paid Media Audit" },
  { icon: Zap,       label: "Quick-Win Action Plan" },
];

/* ── Mini calendar ── */
const MiniCalendar = ({
  selected,
  onSelect,
}: {
  selected: Date | null;
  onSelect: (d: Date) => void;
}) => {
  const [viewMonth, setViewMonth] = useState(new Date());
  const today = startOfDay(new Date());

  const days = eachDayOfInterval({
    start: startOfWeek(startOfMonth(viewMonth), { weekStartsOn: 1 }),
    end:   endOfWeek(endOfMonth(viewMonth),     { weekStartsOn: 1 }),
  });

  return (
    <div className="select-none">
      {/* Month nav */}
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={() => setViewMonth(subMonths(viewMonth, 1))}
          className="w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-colors"
          aria-label="Previous month"
        >
          <ChevronLeft size={14} />
        </button>
        <span className="text-sm font-medium text-foreground font-display">
          {format(viewMonth, "MMMM yyyy")}
        </span>
        <button
          onClick={() => setViewMonth(addMonths(viewMonth, 1))}
          className="w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-colors"
          aria-label="Next month"
        >
          <ChevronRight size={14} />
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 mb-1">
        {["Mo","Tu","We","Th","Fr","Sa","Su"].map((d) => (
          <div key={d} className="text-center text-[10px] font-mono-data text-muted-foreground/60 py-1">
            {d}
          </div>
        ))}
      </div>

      {/* Day cells */}
      <div className="grid grid-cols-7 gap-y-0.5">
        {days.map((day) => {
          const isPast      = isBefore(day, today);
          const isToday     = isSameDay(day, today);
          const isSelected  = selected ? isSameDay(day, selected) : false;
          const isThisMonth = isSameMonth(day, viewMonth);
          const isWeekend   = day.getDay() === 0 || day.getDay() === 6;
          const disabled    = isPast || isWeekend;

          return (
            <button
              key={day.toISOString()}
              disabled={disabled}
              onClick={() => !disabled && onSelect(day)}
              className={`
                relative h-8 w-full rounded-lg text-xs font-medium transition-all duration-150
                ${!isThisMonth ? "opacity-20 pointer-events-none" : ""}
                ${disabled && isThisMonth ? "opacity-30 cursor-not-allowed" : ""}
                ${isSelected
                  ? "bg-primary text-primary-foreground shadow-[0_0_12px_hsla(259,95%,65%,0.5)]"
                  : isToday && !disabled
                  ? "border border-primary/50 text-primary"
                  : !disabled
                  ? "text-foreground hover:bg-primary/15 hover:text-primary"
                  : "text-muted-foreground"
                }
              `}
            >
              {format(day, "d")}
              {isToday && !isSelected && (
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

/* ── Main CTA ── */
const CTA = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [booked, setBooked]             = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-80px" });

  const canBook = selectedDate !== null && selectedTime !== null;

  const handleSchedule = () => {
    if (!canBook) return;

    const dateStr = format(selectedDate!, "EEEE, MMMM d, yyyy");
    const subject = encodeURIComponent(`AI Audit Request — ${dateStr} at ${selectedTime}`);
    const body    = encodeURIComponent(
      `Hi WebCom Media,\n\nI'd like to book a free AI Audit call.\n\nPreferred date: ${dateStr}\nPreferred time: ${selectedTime} (IST)\n\n[Add any additional details or questions here]\n\nLooking forward to speaking with you.`
    );

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    setBooked(true);
  };

  return (
    <section id="cta" className="py-16 md:py-32 bg-card relative overflow-hidden">
      {/* Background glow */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 100%, hsla(259,95%,65%,0.12), transparent 65%), radial-gradient(ellipse 50% 40% at 80% 20%, hsla(311,95%,76%,0.08), transparent 60%)",
        }}
      />

      <div className="container px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div ref={headerRef} className="text-center mb-12 md:mb-16">
          <motion.div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 mb-6"
            initial={{ opacity: 0, y: 16 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-mono-data text-primary tracking-widest uppercase">Free AI Audit Call</span>
          </motion.div>
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground text-balance leading-[1.1] max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 24 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Find out exactly how AI can transform your marketing in 15 minutes.
          </motion.h2>
        </div>

        {/* Three-column grid */}
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto items-start">

          {/* Col 1 — Benefits */}
          <div className="flex flex-col gap-6">
            <p className="text-muted-foreground text-base leading-relaxed">
              By the end of this call, you'll have a clear picture of where AI fits in your business — and a concrete first step to start automating your growth.
            </p>
            <div className="space-y-3">
              {benefits.map((b, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <CheckCircle size={16} className="text-primary mt-0.5 shrink-0" />
                  <p className="text-sm text-muted-foreground">{b}</p>
                </div>
              ))}
            </div>
            <div className="pt-2">
              <p className="text-xs text-muted-foreground">
                Or email directly:{" "}
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary hover:underline">
                  {CONTACT_EMAIL}
                </a>
              </p>
            </div>
          </div>

          {/* Col 2 — Calendar + time picker */}
          <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-background/60 p-5 sm:p-6">
            <ShineBorder
              shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
              borderWidth={1}
              duration={14}
              className="z-0"
            />
            <div className="relative z-10">

              {/* Calendar header */}
              <div className="flex items-center gap-2 mb-4">
                <Calendar size={14} className="text-primary" />
                <p className="text-xs font-mono-data tracking-widest text-muted-foreground uppercase">
                  Pick a date
                </p>
              </div>

              <MiniCalendar selected={selectedDate} onSelect={setSelectedDate} />

              {/* Time slots */}
              {selectedDate && (
                <div className="mt-5 pt-5 border-t border-border/40">
                  <div className="flex items-center gap-2 mb-3">
                    <Clock size={14} className="text-primary" />
                    <p className="text-xs font-mono-data tracking-widest text-muted-foreground uppercase">
                      Pick a time (IST)
                    </p>
                  </div>
                  <div className="grid grid-cols-4 gap-1.5">
                    {TIME_SLOTS.map((slot) => (
                      <button
                        key={slot}
                        onClick={() => setSelectedTime(slot)}
                        className={`
                          px-1 py-2 rounded-lg text-[10px] sm:text-xs font-mono-data font-medium transition-all duration-150
                          ${selectedTime === slot
                            ? "bg-primary text-primary-foreground shadow-[0_0_10px_hsla(259,95%,65%,0.4)]"
                            : "border border-border/50 text-muted-foreground hover:border-primary/40 hover:text-primary hover:bg-primary/10"
                          }
                        `}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Selected summary */}
              {canBook && (
                <div className="mt-4 px-3 py-2.5 rounded-xl bg-primary/10 border border-primary/20">
                  <p className="text-xs text-primary font-mono-data">
                    📅 {format(selectedDate!, "EEE, MMM d")} · {selectedTime}
                  </p>
                </div>
              )}

              {/* CTA button */}
              <button
                onClick={handleSchedule}
                disabled={!canBook}
                className={`
                  mt-4 w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl
                  text-sm font-medium transition-all duration-200
                  ${canBook
                    ? "bg-primary text-primary-foreground hover:-translate-y-px hover:shadow-[0_0_25px_hsla(259,95%,65%,0.5)] active:scale-[0.98] cursor-pointer"
                    : "bg-muted text-muted-foreground cursor-not-allowed opacity-50"
                  }
                `}
              >
                {booked ? "✓ Email opened — hit send!" : "Schedule Your AI Audit"}
                {!booked && <ArrowRight size={15} />}
              </button>

              {booked && (
                <p className="mt-2 text-center text-xs text-muted-foreground">
                  Your email client opened with the details pre-filled.
                </p>
              )}

              <p className="mt-3 text-center text-[10px] text-muted-foreground/60 font-mono-data">
                Weekdays only · Mon–Fri
              </p>
            </div>
          </div>

          {/* Col 3 — What's included */}
          <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-background/60 p-5 sm:p-6">
            <ShineBorder
              shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
              borderWidth={1}
              duration={18}
              className="z-0"
            />
            <div className="relative z-10">
              <p className="text-xs font-mono-data tracking-widest text-muted-foreground uppercase mb-5">
                What's included
              </p>
              <div className="space-y-4">
                {auditItems.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 group">
                    <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-all duration-300">
                      <item.icon size={16} className="text-primary" />
                    </div>
                    <p className="text-sm font-medium text-foreground">{item.label}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-5 border-t border-border/40 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse shrink-0" />
                  <span className="text-xs font-mono-data text-muted-foreground">Spots available this week</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  We take on a limited number of new clients each month to ensure quality.
                </p>
                <div className="pt-1 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  <span className="text-xs font-mono-data text-muted-foreground">15-minute call · No commitment</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CTA;
