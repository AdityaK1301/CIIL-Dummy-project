'use client'
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import Image from "next/image";

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    title: React.ReactNode;
    image: string;  
    description?: string;  
    link: string;
  }[];
  className?: string;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "w-full h-full realtive grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 py-5",
        className
      )}
    >
      {items.map((item, idx) => (
        <a
          href={item?.link}
          key={idx}
          className="relative group block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card>
            <CardImage src={item.image} alt={typeof item.title === 'string' ? item.title : 'icon'} />
            <CardTitle>{item.title}</CardTitle>
            {item.description && <CardDescription>{item.description}</CardDescription>}
          </Card>
        </a>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-8 overflow-hidden bg-[#561C24] border border-transparent dark:border-white/[0.1] group-hover:border-slate-100 relative z-20",
        className
      )}
    >
      <div className="relative z-50">
        <div className="p-4 flex flex-col items-center justify-center text-center">
          {children}
        </div>
      </div>
    </div>
  );
};

export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4 className={cn("text-zinc-100 font-bold tracking-wide mt-4 text-2xl", className)}>
      {children}
    </h4>
  );
};

export const CardImage = ({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) => {
  return (
    <div className={cn("w-24 h-24 rounded-full overflow-hidden mb-2", className)}>
      <img 
        src={src} 
        alt={alt}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p className={cn("text-zinc-400 text-sm mt-2 line-clamp-3", className)}>
      {children}
    </p>
  );
};