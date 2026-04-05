interface BrandDecorProps {
    className?: string;
}

function roundCoordinate(value: number) {
    return Number(value.toFixed(3));
}

export function BrandWavePattern({ className = "" }: BrandDecorProps) {
    return (
        <svg
            aria-hidden="true"
            viewBox="0 0 420 240"
            className={className}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            {Array.from({ length: 11 }).map((_, index) => {
                const x = 24 + index * 32;

                return (
                    <path
                        key={x}
                        d={`M ${x} -10 C ${x - 18} 24, ${x - 18} 56, ${x} 86 C ${x + 18} 116, ${x + 18} 148, ${x} 178 C ${x - 18} 208, ${x - 18} 240, ${x} 274`}
                        stroke={index % 3 === 0 ? "var(--delta-violet)" : index % 2 === 0 ? "var(--delta-blue)" : "var(--delta-azure)"}
                        strokeOpacity={index % 3 === 0 ? 0.52 : 0.72}
                        strokeWidth="2.4"
                        strokeLinecap="round"
                    />
                );
            })}
        </svg>
    );
}

export function BrandOrbitCluster({ className = "" }: BrandDecorProps) {
    const orbits = [
        { cx: 54, cy: 56, rx: 28, ry: 18, rotate: -12 },
        { cx: 132, cy: 42, rx: 22, ry: 14, rotate: 18 },
        { cx: 208, cy: 84, rx: 34, ry: 20, rotate: -4 },
        { cx: 92, cy: 140, rx: 24, ry: 34, rotate: 22 },
        { cx: 188, cy: 162, rx: 38, ry: 24, rotate: -8 },
        { cx: 268, cy: 54, rx: 28, ry: 16, rotate: 11 },
        { cx: 286, cy: 136, rx: 32, ry: 22, rotate: -18 }
    ];

    return (
        <svg
            aria-hidden="true"
            viewBox="0 0 320 220"
            className={className}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            {orbits.map((orbit) => (
                <g key={`${orbit.cx}-${orbit.cy}`} transform={`rotate(${orbit.rotate} ${orbit.cx} ${orbit.cy})`}>
                    <ellipse cx={orbit.cx} cy={orbit.cy} rx={orbit.rx} ry={orbit.ry} stroke="var(--delta-blue)" strokeOpacity="0.88" strokeWidth="2" />
                    <ellipse cx={orbit.cx} cy={orbit.cy} rx={orbit.rx + 6} ry={orbit.ry + 6} stroke="var(--delta-azure)" strokeOpacity="0.72" strokeWidth="1.5" />
                    <ellipse cx={orbit.cx} cy={orbit.cy} rx={orbit.rx + 12} ry={orbit.ry + 12} stroke="var(--delta-violet)" strokeOpacity="0.42" strokeWidth="1.2" />
                </g>
            ))}
        </svg>
    );
}

export function BrandSpark({ className = "" }: BrandDecorProps) {
    return (
        <svg
            aria-hidden="true"
            viewBox="0 0 180 180"
            className={className}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            {Array.from({ length: 12 }).map((_, index) => {
                const angle = (index / 12) * Math.PI * 2;
                const x1 = roundCoordinate(90 + Math.cos(angle) * 48);
                const y1 = roundCoordinate(90 + Math.sin(angle) * 48);
                const x2 = roundCoordinate(90 + Math.cos(angle) * 68);
                const y2 = roundCoordinate(90 + Math.sin(angle) * 68);

                return (
                    <line
                        key={index}
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke={index % 2 === 0 ? "var(--delta-violet)" : "var(--delta-blue)"}
                        strokeOpacity="0.84"
                        strokeWidth="6"
                        strokeLinecap="square"
                    />
                );
            })}
        </svg>
    );
}
