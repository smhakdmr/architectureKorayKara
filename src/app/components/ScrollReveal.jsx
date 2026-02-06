"use client";

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const ScrollReveal = ({
    children,
    direction = 'up',
    delay = 0,
    duration = 0.6,
    distance = 40,
    once = true
}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once, margin: '-80px' });

    const directionMap = {
        up: { y: distance, x: 0 },
        down: { y: -distance, x: 0 },
        left: { y: 0, x: distance },
        right: { y: 0, x: -distance },
    };

    const { x, y } = directionMap[direction] || directionMap.up;

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y, x }}
            animate={isInView ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, y, x }}
            transition={{
                duration,
                ease: [0.25, 0.1, 0.25, 1],
                delay
            }}
        >
            {children}
        </motion.div>
    );
};

export default ScrollReveal;
