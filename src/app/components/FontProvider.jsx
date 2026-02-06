"use client";

import { useEffect, useState } from "react";

const VALID_FONTS = ["playfair", "cormorant", "lora", "merriweather", "roboto"];
const DEFAULT_FONT = "playfair";

const FontProvider = () => {
    const [fontKey, setFontKey] = useState(null);

    useEffect(() => {
        const loadFontPreference = async () => {
            try {
                const response = await fetch("/api/content");
                const data = await response.json();
                const selected = data?.settings?.headingFont;
                const key = VALID_FONTS.includes(selected) ? selected : DEFAULT_FONT;
                setFontKey(key);
            } catch {
                setFontKey(DEFAULT_FONT);
            }
        };

        loadFontPreference();
    }, []);

    useEffect(() => {
        if (!fontKey) return;

        // Onceki font class'larini kaldir
        VALID_FONTS.forEach((f) => {
            document.body.classList.remove(`font-${f}`);
        });

        // Yeni font class'ini ekle
        document.body.classList.add(`font-${fontKey}`);

        return () => {
            document.body.classList.remove(`font-${fontKey}`);
        };
    }, [fontKey]);

    // Bu component gorsel bir sey render etmez
    return null;
};

export default FontProvider;
