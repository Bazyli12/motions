"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useResizeObserver, useWindowSize } from "usehooks-ts";
import {
    motion,
    useTransform,
    useScroll,
    useSpring,
    useInView,
    MotionValue,
    useAnimate,
} from "framer-motion";

const HorizontalScroll = () => {
    const targetRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress, scrollY } = useScroll({
        target: targetRef,
        offset: ["start start", "end end"],
    });

    const { width: windowWidth, height: windowHeight } = useWindowSize();
    const { width: containerWidth } = useResizeObserver({
        ref: containerRef,
        box: "border-box",
    });

    const spring = useSpring(scrollYProgress, {
        mass: 1.5,
        damping: 50,
        stiffness: 500,
    });

    const x = useTransform(
        spring,
        [0.15, 0.85],
        [0, -containerWidth! + windowWidth]
    );

    return (
        <section ref={targetRef} className="relative h-[300vh] bg-foreground">
            <div className="sticky top-0 flex h-[100vh] items-start overflow-hidden">
                <Indicator
                    windowHeight={windowHeight}
                    scrollYProgress={scrollYProgress}
                    scrollY={scrollY}
                    length={50}
                    targetRef={targetRef}
                />
                <motion.div
                    ref={containerRef}
                    style={{ x }}
                    className="flex h-full p-6 pb-48 gap-6"
                >
                    <div className="flex flex-col justify-between h-full w-[650px]">
                        <div className="flex flex-col">
                            <h1 className="text-white font-bold text-4xl tracking-tight leading-9 text-pretty mb-6 uppercase pr-6">
                                I should be incapable of drawing a single stroke
                                at the present moment; and yet I feel that I
                                never was a greater artist than now.
                            </h1>
                            <div className="flex gap-4">
                                <p className="text-neutral-200 text-pretty w-full leading-6">
                                    A wonderful serenity has taken possession of
                                    my entire soul, like these sweet mornings of
                                    spring which I enjoy with my whole heart. I
                                    am alone, and feel the charm of existence in
                                    this spot, which was created for the bliss
                                    of souls like mine.
                                </p>
                                <p className="text-neutral-200 text-pretty w-full leading-6">
                                    I am so happy, my dear friend, so absorbed
                                    in the exquisite sense of mere tranquil
                                    existence, that I neglect my talents.
                                </p>
                            </div>
                        </div>
                        <div className="text-neutral-500 h-64 w-full text-right">
                            Gregor then turned to look out the window at the
                            dull weather.
                        </div>
                    </div>
                    <div className="flex h-full items-start w-[400px]">
                        <Image
                            className="object-cover h-full object-[-20px]"
                            src={"/scroll-1.jpg"}
                            alt={""}
                            width={800}
                            height={1400}
                        />
                    </div>
                    <div className="w-[400px]">
                        <p className="w-1/2 uppercase text-neutral-500 font-medium leading-5 text-balance">
                            I ought to just try that with my boss. I&apos;d get
                            kicked out on the spot.
                        </p>
                    </div>
                    <div className="flex flex-col justify-between h-full w-[650px]">
                        <div className="flex flex-col">
                            <h1 className="text-white font-bold text-4xl tracking-tight leading-9 text-pretty mb-6 uppercase pr-6">
                                <p className="line-clamp-2">
                                    <span className="text-neutral-500">He</span>{" "}
                                    slid back into his former position. Getting
                                    up early all
                                </p>
                                <p className="pl-24">
                                    He thought, it makes you stupid.
                                </p>
                            </h1>
                            <div className="flex gap-4 pl-24">
                                <div className="text-neutral-200 text-pretty w-full leading-6">
                                    <p className="mb-4 text-balance">
                                        He must have tried it a hundred times,
                                        shut his eyes so that he wouldn&apos;t
                                        have to look at the floundering legs,
                                        and only stopped when he began to feel a
                                        mild, dull pain there that he had never
                                        felt before.
                                    </p>
                                    <div>
                                        I am alone, and feel the charm
                                        <p className="pl-24">
                                            of existence in this spot, which was
                                            created for the bliss of souls like
                                            mine.
                                        </p>
                                    </div>
                                </div>
                                <div className="text-pretty w-full leading-6 text-neutral-200">
                                    I am so happy, my dear friend, so absorbed
                                    in the exquisite sense of mere tranquil
                                    existence, that I neglect my talents.
                                </div>
                            </div>
                        </div>
                    </div>
                    <EndImage />
                </motion.div>
            </div>
        </section>
    );
};

const Indicator = ({
    windowHeight,
    length,
    scrollY,
    scrollYProgress,
    targetRef,
}: {
    windowHeight: number;
    length: number;
    scrollY: MotionValue<number>;
    scrollYProgress: MotionValue<number>;
    targetRef: React.RefObject<HTMLDivElement>;
}) => {
    return (
        <div className="absolute flex left-0 bottom-0 w-full gap-6 text-white p-6 z-10">
            <h1 className="font-bold text-9xl/[80%] tracking-tighter">FSSTS</h1>
            <div className="flex w-full justify-between items-end">
                {[...Array(length)].map((_, i) => (
                    <Line
                        key={i}
                        index={i}
                        length={length}
                        scrollY={scrollY}
                        scrollYProgress={scrollYProgress}
                        targetRef={targetRef}
                        windowHeight={windowHeight}
                    />
                ))}
            </div>
        </div>
    );
};

const Line = ({
    windowHeight,
    index,
    length,
    scrollY,
    scrollYProgress,
    targetRef,
}: {
    windowHeight: number;
    index: number;
    length: number;
    scrollY: MotionValue<number>;
    scrollYProgress: MotionValue<number>;
    targetRef: React.RefObject<HTMLDivElement>;
}) => {
    const oneIndicator = 1 / length;

    const value = useTransform(
        scrollYProgress,
        [
            index * oneIndicator - oneIndicator,
            index * oneIndicator,
            index * oneIndicator + oneIndicator,
        ],
        [0, 1, index === length - 1 ? 1 : 0]
    );

    const backgroundColor = useTransform(value, (v) =>
        v > 0.5 ? "rgba(255, 255, 255, 1)" : "rgba(255, 255, 255, 0.5)"
    );

    const height = useTransform(value, [0, 1], ["25%", "50%"]);

    return (
        <motion.div
            style={{
                height,
            }}
            onClick={() => {
                if (targetRef.current === null) return;
                window.scrollTo({
                    top:
                        targetRef.current?.getBoundingClientRect().top +
                        scrollY.get() +
                        index *
                            (targetRef.current?.getBoundingClientRect().height /
                                length) -
                        index * (windowHeight / length),
                    behavior: "smooth",
                });
            }}
            className="cursor-pointer w-px px-4"
        >
            <motion.div
                style={{ backgroundColor }}
                className="h-full w-px"
            ></motion.div>
        </motion.div>
    );
};

const EndImage = () => {
    const [scope, animate] = useAnimate();
    const inView = useInView(scope, { amount: "all" });

    useEffect(() => {
        animate([
            [
                "#image",
                {
                    filter: inView
                        ? "grayscale(0%) blur(0)"
                        : "grayscale(90%) blur(2px)",
                },
                { duration: 0.3, ease: "easeInOut" },
            ],
        ]);
    }, [inView]);

    return (
        <div
            ref={scope}
            className="z-20 h-full w-[calc(100vw-48px)] flex justify-start items-start bg-white/10 overflow-hidden"
        >
            <motion.div id="image" className="w-full h-full bg-white">
                <Image
                    className="w-full h-full object-cover"
                    src={"/scroll-2.jpg"}
                    alt={""}
                    width={1920}
                    height={1080}
                />
            </motion.div>
        </div>
    );
};

export default HorizontalScroll;
