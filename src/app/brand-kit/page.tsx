"use client";

import { PageHeader } from "@/components/layout/PageHeader";
import { Copy, Download, Type, Palette, Terminal, Box } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const COLORS = [
    { name: "Surface", variable: "--color-surface", hex: "#fdfbf7", description: "The foundation of our brand. A warm paper-like off-white that reduces eye strain and provides a premium risograph feel.", badge: "bg-[var(--color-surface)] border-ink/10" },
    { name: "Ink", variable: "--color-ink", hex: "#0f172a", description: "Our primary text and contrast color. Not pure black, but a deep navy-gray that maintains readability across all surfaces.", badge: "bg-[var(--color-ink)] text-white" },
    { name: "Primary", variable: "--color-primary", hex: "#4f46e5", description: "Our signature Indigo. Used for primary actions, branding highlights, and core interactive elements.", badge: "bg-[var(--color-primary)] text-white" },
    { name: "Secondary", variable: "--color-secondary", hex: "#ff4500", description: "Blaze Orange. High-energy accent color used for punchy details, secondary highlights, and breaking the 'clean' look.", badge: "bg-[var(--color-secondary)] text-white" },
    { name: "Accent", variable: "--color-accent", hex: "#7c3aed", description: "Violet. A secondary branding color used for specialized elements and to add depth to our gradients.", badge: "bg-[var(--color-accent)] text-white" }
];

const FONTS = [
    { 
        name: "Space Grotesk", 
        usage: "Primary Headline Font", 
        description: "A geometric sans-serif with idiosyncratic details. Used for all major headings and primary UI labels.", 
        className: "font-sans",
        preview: "ABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789"
    },
    { 
        name: "Space Mono", 
        usage: "Data & Technical Font", 
        description: "A monospace font that reinforces our 'Mission Terminal' aesthetic. Used for metadata and technical details.", 
        className: "font-(family-name:--font-jetbrains)",
        preview: "const build = () => { success: true };"
    },
    { 
        name: "Meow Script", 
        usage: "Expressive Callouts", 
        description: "Adds a touch of human handwriting to our brutalist digital space. Used sparingly for contrast.", 
        className: "font-(family-name:--font-meow)",
        preview: "Summer of Code"
    },
    { 
        name: "JetBrains Mono", 
        usage: "Code & Tags", 
        description: "Used for actual code blocks and specific branding elements like 'of <CODE>'.", 
        className: "font-(family-name:--font-jetbrains)",
        preview: "import { Atria } from 'opensource';"
    }
];

export default function BrandKitPage() {
    const [copiedColor, setCopiedColor] = useState<string | null>(null);

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopiedColor(text);
        setTimeout(() => setCopiedColor(null), 2000);
    };

    const handleDownload = (filepath: string) => {
        // Download files from public folder
        const link = document.createElement('a');
        link.href = `/assets/${filepath}`;
        link.download = filepath.split('/').pop() || filepath;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <motion.div
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12"
        >
            <div className="text-center space-y-4 max-w-3xl mx-auto">
                <PageHeader
                    title="Brand Guidelines"
                    description="The visual language and assets of Atria Summer of Code. We combine retro-futuristic aesthetics with modern brutalist design."
                />
            </div>

            <div className="space-y-32">
                {/* Intro Section */}
                <section>
                    <div className="flex items-center gap-4 mb-8">
                        <Terminal className="w-8 h-8 text-primary" />
                        <h2 className="text-4xl font-black uppercase tracking-tighter">The Vision</h2>
                    </div>
                    <p className="text-xl text-ink/70 font-(family-name:--font-jetbrains) leading-relaxed">
                        ASoC branding is built on the concept of <span className="text-primary font-bold">Open Technicality</span>. We embrace the textures of paper, the sharpness of the CLI, and the energy of a summer mission. Our design system is intentionally low-fidelity in texture but high-fidelity in execution.
                    </p>
                </section>

                    {/* Color Palette */}
                    <section>
                        <div className="flex items-center gap-4 mb-12">
                            <Palette className="w-8 h-8 text-secondary" />
                            <h2 className="text-4xl font-black uppercase tracking-tighter">Color Palette</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {COLORS.map((color) => (
                                <div key={color.name} className="group border border-ink/10 bg-surface-light p-6 transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0_0_var(--color-ink)]">
                                    <div className={`h-32 w-full mb-6 border border-ink/10 ${color.badge} flex items-end p-4 font-(family-name:--font-jetbrains) font-bold text-xs uppercase tracking-widest`}>
                                        {color.name}
                                    </div>
                                    <div className="space-y-4">
                                        <h3 className="text-xl font-bold uppercase tracking-tight">{color.name}</h3>
                                        <p className="text-ink/60 text-sm font-(family-name:--font-jetbrains) leading-relaxed h-20 overflow-hidden">
                                            {color.description}
                                        </p>
                                        <div className="flex items-center justify-between pt-4 border-t border-ink/5">
                                            <code className="text-xs font-bold text-ink/40">{color.hex}</code>
                                            <Button 
                                                variant="outline" 
                                                size="sm" 
                                                className="h-8 px-3 font-(family-name:--font-jetbrains) text-[10px] uppercase tracking-widest"
                                                onClick={() => copyToClipboard(color.hex)}
                                            >
                                                {copiedColor === color.hex ? "Copied!" : (
                                                    <>
                                                        <Copy className="w-3 h-3 mr-2" />
                                                        Copy Hex
                                                    </>
                                                )}
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Typography */}
                    <section>
                        <div className="flex items-center gap-4 mb-12">
                            <Type className="w-8 h-8 text-accent" />
                            <h2 className="text-4xl font-black uppercase tracking-tighter">Typography</h2>
                        </div>
                        <div className="space-y-12">
                            {FONTS.map((font) => (
                                <div key={font.name} className="border-l-4 border-primary pl-8 py-4 bg-surface/50">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                                        <div>
                                            <h3 className="text-2xl font-black uppercase tracking-tight">{font.name}</h3>
                                            <p className="text-primary font-(family-name:--font-jetbrains) text-xs font-bold uppercase tracking-widest">{font.usage}</p>
                                        </div>
                                        <p className="text-ink/60 text-sm max-w-md font-(family-name:--font-jetbrains)">
                                            {font.description}
                                        </p>
                                    </div>
                                    <div className={`text-2xl md:text-5xl border-t border-ink/5 pt-6 tracking-tight ${font.className}`}>
                                        {font.preview}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Logo Variations */}
                    <section>
                        <div className="flex items-center gap-4 mb-12">
                            <Box className="w-8 h-8 text-primary" />
                            <h2 className="text-4xl font-black uppercase tracking-tighter">Logo Variations</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            {/* Main Logo - Light Background */}
                            <div className="space-y-6">
                                <div className="bg-surface border-2 border-ink h-64 flex items-center justify-center relative overflow-hidden group">
                                    <div className="absolute inset-0 pattern-halftone opacity-5" />
                                    <div className="transform group-hover:scale-105 transition-transform">
                                        <Image
                                            src="/assets/MainLogo.png"
                                            alt="Atria Summer of Code Logo"
                                            width={200}
                                            height={200}
                                            className="h-auto"
                                        />
                                    </div>
                                    <div className="absolute top-4 right-4 text-[10px] font-(family-name:--font-jetbrains) text-ink/20 font-bold tracking-widest">VR-01 // LIGHT</div>
                                </div>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-bold uppercase">Main Logo (Light)</h3>
                                        <p className="text-xs text-ink/60 font-(family-name:--font-jetbrains) uppercase">Use: Main landing, posters, light surfaces.</p>
                                    </div>
                                    <div className="flex gap-3">
                                        <Button variant="outline" size="sm" className="font-(family-name:--font-jetbrains) text-[10px]" onClick={() => handleDownload('MainLogo.png')}>
                                        <Download className="w-3 h-3" />
                                        PNG
                                    </Button>
                                    <Button variant="outline" size="sm" className="font-(family-name:--font-jetbrains) text-[10px]" onClick={() => handleDownload('MainLogo.svg')}>
                                        <Download className="w-3 h-3" />
                                        SVG
                                    </Button>
                                    </div>
                                </div>
                            </div>

                            {/* Main Logo - Dark Background */}
                            <div className="space-y-6">
                                <div className="bg-ink h-64 flex items-center justify-center relative overflow-hidden group">
                                    <div className="absolute inset-0 pattern-halftone opacity-5" />
                                    <div className="transform group-hover:scale-105 transition-transform">
                                        <Image
                                            src="/assets/MainLogo.png"
                                            alt="Atria Summer of Code Logo"
                                            width={200}
                                            height={200}
                                            className="h-auto"
                                        />
                                    </div>
                                    <div className="absolute top-4 right-4 text-[10px] font-(family-name:--font-jetbrains) text-white/20 font-bold tracking-widest">VR-01 // DARK</div>
                                </div>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-bold uppercase">Main Logo (Dark)</h3>
                                        <p className="text-xs text-ink/60 font-(family-name:--font-jetbrains) uppercase">Use: Dark surfaces, social media, backgrounds.</p>
                                    </div>
                                    <div className="flex gap-3">
                                        <Button variant="outline" size="sm" className="font-(family-name:--font-jetbrains) text-[10px]" onClick={() => handleDownload('MainLogo.png')}>
                                        <Download className="w-3 h-3" />
                                        PNG
                                    </Button>
                                    <Button variant="outline" size="sm" className="font-(family-name:--font-jetbrains) text-[10px]" onClick={() => handleDownload('MainLogo.svg')}>
                                        <Download className="w-3 h-3" />
                                        SVG
                                    </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Wordmark Variations */}
                    <section>
                        <div className="flex items-center gap-4 mb-12">
                            <Type className="w-8 h-8 text-accent" />
                            <h2 className="text-4xl font-black uppercase tracking-tighter">Wordmark Variations</h2>
                        </div>
                        
                        {/* Main Wordmark */}
                        <div className="mb-16">
                            <h3 className="text-2xl font-bold uppercase mb-6">Main Wordmark</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                                {/* Main Wordmark - Light */}
                                <div className="space-y-6">
                                    <div className="bg-surface border-2 border-ink h-64 flex items-center justify-center relative overflow-hidden group">
                                        <div className="absolute inset-0 pattern-halftone opacity-5" />
                                        <div className="text-center transform group-hover:scale-105 transition-transform">
                                            <h3 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter uppercase leading-[0.78] text-transparent bg-clip-text bg-linear-to-b from-slate-900 to-slate-700 relative z-20">
                                                Atria<br/>
                                                <span className="font-(family-name:--font-meow) text-primary inline-block -rotate-6 text-4xl sm:text-5xl tracking-wide -mt-4 sm:-mt-6 relative z-10 capitalize bottom-2 sm:bottom-4" style={{ fontVariantCaps: 'normal' }}>Summer</span> <br />
                                                <span className="font-(family-name:--font-jetbrains) text-lg sm:text-xl text-slate-800 tracking-tight block -mt-3 sm:-mt-5 normal-case relative z-0 bottom-2">of &lt;CODE&gt;</span>
                                            </h3>
                                        </div>
                                        <div className="absolute top-4 right-4 text-[10px] font-(family-name:--font-jetbrains) text-ink/20 font-bold tracking-widest">WM-01 // LIGHT</div>
                                    </div>
                                    <div className="flex justify-between items-start">
                                        <p className="text-xs text-ink/60 font-(family-name:--font-jetbrains) uppercase">Light Background</p>
                                        <Button variant="outline" size="sm" className="font-(family-name:--font-jetbrains) text-[10px]" onClick={() => handleDownload('main-wordmark/Main_WordMark_Primary_Light.png')}>
                                            <Download className="w-3 h-3 mr-2" />
                                            PNG
                                        </Button>
                                    </div>
                                </div>

                                {/* Main Wordmark - Dark */}
                                <div className="space-y-6">
                                    <div className="bg-ink h-64 flex items-center justify-center relative overflow-hidden group">
                                        <div className="absolute inset-0 pattern-halftone opacity-5" />
                                        <div className="text-center transform group-hover:scale-105 transition-transform text-white">
                                            <h3 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter uppercase leading-[0.78] text-white relative z-20">
                                                Atria<br/>
                                                <span className="font-(family-name:--font-meow) text-primary inline-block -rotate-6 text-4xl sm:text-5xl tracking-wide -mt-4 sm:-mt-6 relative z-10 capitalize bottom-2 sm:bottom-4" style={{ fontVariantCaps: 'normal' }}>Summer</span> <br />
                                                <span className="font-(family-name:--font-jetbrains) text-lg sm:text-xl text-white/80 tracking-tight block -mt-3 sm:-mt-5 normal-case relative z-0 bottom-2">of &lt;CODE&gt;</span>
                                            </h3>
                                        </div>
                                        <div className="absolute top-4 right-4 text-[10px] font-(family-name:--font-jetbrains) text-white/20 font-bold tracking-widest">WM-01 // DARK</div>
                                    </div>
                                    <div className="flex justify-between items-start">
                                        <p className="text-xs text-ink/60 font-(family-name:--font-jetbrains) uppercase">Dark Background</p>
                                        <Button variant="outline" size="sm" className="font-(family-name:--font-jetbrains) text-[10px]" onClick={() => handleDownload('main-wordmark/Main_WordMark_Primary_Dark.png')}>
                                            <Download className="w-3 h-3 mr-2" />
                                            PNG
                                        </Button>
                                    </div>
                                </div>
                                {/* Main Wordmark Secondary - Light */}
                                <div className="space-y-6">
                                    <div className="bg-surface border-2 border-ink h-64 flex items-center justify-center relative overflow-hidden group">
                                        <div className="absolute inset-0 pattern-halftone opacity-5" />
                                        <div className="text-center transform group-hover:scale-105 transition-transform">
                                            <h3 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter uppercase leading-[0.78] text-transparent bg-clip-text bg-linear-to-b from-slate-900 to-slate-700 relative z-20">
                                                Atria<br/>
                                                <span className="font-(family-name:--font-meow) text-secondary inline-block -rotate-6 text-4xl sm:text-5xl tracking-wide -mt-4 sm:-mt-6 relative z-10 capitalize bottom-2 sm:bottom-4" style={{ fontVariantCaps: 'normal' }}>Summer</span> <br />
                                                <span className="font-(family-name:--font-jetbrains) text-lg sm:text-xl text-slate-800 tracking-tight block -mt-3 sm:-mt-5 normal-case relative z-0 bottom-2">of &lt;CODE&gt;</span>
                                            </h3>
                                        </div>
                                        <div className="absolute top-4 right-4 text-[10px] font-(family-name:--font-jetbrains) text-ink/20 font-bold tracking-widest">WM-01 // LIGHT</div>
                                    </div>
                                    <div className="flex justify-between items-start">
                                        <p className="text-xs text-ink/60 font-(family-name:--font-jetbrains) uppercase">Light Background</p>
                                        <Button variant="outline" size="sm" className="font-(family-name:--font-jetbrains) text-[10px]" onClick={() => handleDownload('main-wordmark/Main_WordMark_Secondary_Light.png')}>
                                            <Download className="w-3 h-3 mr-2" />
                                            PNG
                                        </Button>
                                    </div>
                                </div>

                                {/* Main Wordmark Secondary - Dark */}
                                <div className="space-y-6">
                                    <div className="bg-ink h-64 flex items-center justify-center relative overflow-hidden group">
                                        <div className="absolute inset-0 pattern-halftone opacity-5" />
                                        <div className="text-center transform group-hover:scale-105 transition-transform text-white">
                                            <h3 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter uppercase leading-[0.78] text-white relative z-20">
                                                Atria<br/>
                                                <span className="font-(family-name:--font-meow) text-secondary inline-block -rotate-6 text-4xl sm:text-5xl tracking-wide -mt-4 sm:-mt-6 relative z-10 capitalize bottom-2 sm:bottom-4" style={{ fontVariantCaps: 'normal' }}>Summer</span> <br />
                                                <span className="font-(family-name:--font-jetbrains) text-lg sm:text-xl text-white/80 tracking-tight block -mt-3 sm:-mt-5 normal-case relative z-0 bottom-2">of &lt;CODE&gt;</span>
                                            </h3>
                                        </div>
                                        <div className="absolute top-4 right-4 text-[10px] font-(family-name:--font-jetbrains) text-white/20 font-bold tracking-widest">WM-01 // DARK</div>
                                    </div>
                                    <div className="flex justify-between items-start">
                                        <p className="text-xs text-ink/60 font-(family-name:--font-jetbrains) uppercase">Dark Background</p>
                                        <Button variant="outline" size="sm" className="font-(family-name:--font-jetbrains) text-[10px]" onClick={() => handleDownload('main-wordmark/Main_WordMark_Secondary_Dark.png')}>
                                            <Download className="w-3 h-3 mr-2" />
                                            PNG
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            <p className="text-xs text-ink/60 font-(family-name:--font-jetbrains) uppercase">Use: Posters, hero sections, primary branding</p>
                        </div>

                        {/* Compact Wordmark */}
                        <div>
                            <h3 className="text-2xl font-bold uppercase mb-6">Compact Wordmark</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                                {/* Compact Wordmark - Light */}
                                <div className="space-y-6">
                                    <div className="bg-surface border-2 border-ink h-64 flex items-center justify-center relative group">
                                        <div className="text-ink transform group-hover:scale-110 transition-transform text-5xl font-black tracking-tighter flex items-baseline gap-1">
                                            <span className="font-sans">A</span>
                                            <span className="font-(family-name:--font-meow) text-primary text-6xl -ml-4 -mr-3 z-30 leading-none">S</span>
                                            <span className="font-(family-name:--font-jetbrains)">oC</span>
                                        </div>
                                        <div className="absolute top-4 right-4 text-[10px] font-(family-name:--font-jetbrains) text-ink/20 font-bold tracking-widest">WM-02 // LIGHT</div>
                                    </div>
                                    <div className="flex justify-between items-start">
                                        <p className="text-xs text-ink/60 font-(family-name:--font-jetbrains) uppercase">Light Background</p>
                                        <Button variant="outline" size="sm" className="font-(family-name:--font-jetbrains) text-[10px]" onClick={() => handleDownload('compact-wordmark/Compact_WordMark_Primary_Light.png')}>
                                            <Download className="w-3 h-3 mr-2" />
                                            PNG
                                        </Button>
                                    </div>
                                </div>

                                {/* Compact Wordmark - Dark */}
                                <div className="space-y-6">
                                    <div className="bg-ink h-64 flex items-center justify-center relative group">
                                        <div className="text-white transform group-hover:scale-110 transition-transform text-5xl font-black tracking-tighter flex items-baseline gap-1">
                                            <span className="font-sans">A</span>
                                            <span className="font-(family-name:--font-meow) text-primary text-6xl -ml-4 -mr-3 z-30 leading-none">S</span>
                                            <span className="font-(family-name:--font-jetbrains)">oC</span>
                                        </div>
                                        <div className="absolute top-4 right-4 text-[10px] font-(family-name:--font-jetbrains) text-white/20 font-bold tracking-widest">WM-02 // DARK</div>
                                    </div>
                                    <div className="flex justify-between items-start">
                                        <p className="text-xs text-ink/60 font-(family-name:--font-jetbrains) uppercase">Dark Background</p>
                                        <Button variant="outline" size="sm" className="font-(family-name:--font-jetbrains) text-[10px]" onClick={() => handleDownload('compact-wordmark/Compact_WordMark_Primary_Dark.png')}>
                                            <Download className="w-3 h-3 mr-2" />
                                            PNG
                                        </Button>
                                    </div>
                                </div>

                                {/* Compact Wordmark Secondary - Light */}
                                <div className="space-y-6">
                                    <div className="bg-surface border-2 border-ink h-64 flex items-center justify-center relative group">
                                        <div className="text-ink transform group-hover:scale-110 transition-transform text-5xl font-black tracking-tighter flex items-baseline gap-1">
                                            <span className="font-sans">A</span>
                                            <span className="font-(family-name:--font-meow) text-secondary text-6xl -ml-4 -mr-3 z-30 leading-none">S</span>
                                            <span className="font-(family-name:--font-jetbrains)">oC</span>
                                        </div>
                                        <div className="absolute top-4 right-4 text-[10px] font-(family-name:--font-jetbrains) text-ink/20 font-bold tracking-widest">WM-02 // LIGHT</div>
                                    </div>
                                    <div className="flex justify-between items-start">
                                        <p className="text-xs text-ink/60 font-(family-name:--font-jetbrains) uppercase">Dark Background</p>
                                        <Button variant="outline" size="sm" className="font-(family-name:--font-jetbrains) text-[10px]" onClick={() => handleDownload('compact-wordmark/Compact_WordMark_Secondary_Light.png')}>
                                            <Download className="w-3 h-3 mr-2" />
                                            PNG
                                        </Button>
                                    </div>
                                </div>

                                {/* Compact Wordmark Secondary - Dark */}
                                <div className="space-y-6">
                                    <div className="bg-ink h-64 flex items-center justify-center relative group">
                                        <div className="text-white transform group-hover:scale-110 transition-transform text-5xl font-black tracking-tighter flex items-baseline gap-1">
                                            <span className="font-sans">A</span>
                                            <span className="font-(family-name:--font-meow) text-secondary text-6xl -ml-4 -mr-3 z-30 leading-none">S</span>
                                            <span className="font-(family-name:--font-jetbrains)">oC</span>
                                        </div>
                                        <div className="absolute top-4 right-4 text-[10px] font-(family-name:--font-jetbrains) text-white/20 font-bold tracking-widest">WM-02 // DARK</div>
                                    </div>
                                    <div className="flex justify-between items-start">
                                        <p className="text-xs text-ink/60 font-(family-name:--font-jetbrains) uppercase">Dark Background</p>
                                        <Button variant="outline" size="sm" className="font-(family-name:--font-jetbrains) text-[10px]" onClick={() => handleDownload('compact-wordmark/Compact_WordMark_Secondary_Dark.png')}>
                                            <Download className="w-3 h-3 mr-2" />
                                            PNG
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            <p className="text-xs text-ink/60 font-(family-name:--font-jetbrains) uppercase">Use: Navbar, avatars, tight spaces</p>
                        </div>
                    </section>

                    {/* Downloads Section */}
                    <section className="bg-ink text-white p-12 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary opacity-20 blur-[100px]" />
                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                            <div className="space-y-4">
                                <h2 className="text-4xl font-black uppercase tracking-tighter">Ready to Build?</h2>
                                <p className="text-white/60 font-(family-name:--font-jetbrains) max-w-md">
                                    Download the complete asset package containing logos, type samples, and a design token JSON.
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-4">
                                <Button variant="brutalist" size="xl" className="bg-primary hover:bg-primary-600" onClick={() => handleDownload('ASoC-BrandKit.zip')}>
                                    <Download className="mr-2 h-5 w-5" />
                                    Download Full Kit (ZIP)
                                </Button>
                            </div>
                        </div>
                    </section>
                </div>
        </motion.div>
    );
}
