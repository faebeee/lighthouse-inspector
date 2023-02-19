import { Group } from "@visx/group";
import Pie from "@visx/shape/lib/shapes/Pie";
import { SCORE_MAP, STATUS_COLORS } from "../../config";

const defaultMargin = { top: 20, right: 20, bottom: 20, left: 20 };

export type SingleStatProps = {
    width: number;
    height: number;
    margin?: typeof defaultMargin;
    animate?: boolean;
    value: number;
    label: string;
};
export const SingleStat = ({ width, height, margin = defaultMargin, label, value }: SingleStatProps) => {
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    const radius = Math.min(innerWidth, innerHeight) / 2;
    const centerY = innerHeight / 2;
    const centerX = innerWidth / 2;
    const donutThickness = 15;

    const data = [
        { label, value: value },
        { label: "Item 2", value: 100 - value }
    ];

    const getColor = (index: number) => {
        const value = data[index].value;
        if (index === 1) {
            return "rgba(0, 0, 0, 0)";
        }

        const c = Object.entries(SCORE_MAP).reverse().filter(([ val, color ]) => {
            return (value >= parseInt(val));
        })[1] ?? [ , STATUS_COLORS.POOR ];
        return c[1];
    };

    return (
        <svg width={ width } height={ height }>
            <Group top={ centerY + margin.top } left={ centerX + margin.left }>
                <Pie
                    data={ data }
                    pieValue={ (v) => v.value }
                    outerRadius={ radius }
                    innerRadius={ radius - donutThickness }
                    cornerRadius={ 3 }
                    padAngle={ 0.005 }
                >
                    { (pie) => (<g key={ pie.pie.name }>
                            { pie.arcs.map((arc) => {
                                return (
                                    <g key={ pie.pie.name }>
                                        { pie.path && <path
                                            /*@ts-ignore*/
                                          d={ pie.path({
                                              ...arc,
                                              startAngle: arc.startAngle,
                                              endAngle: arc.endAngle
                                          }) }
                                          fill={ getColor(arc.index) }
                                        /> }
                                    </g>
                                );
                            }) }

                            <text
                                fill="white"
                                fontSize={ 32 }
                                dy={ 12 }
                                textAnchor="middle"
                                pointerEvents="none"
                            >
                                { Math.round(value) }
                            </text>
                        </g>
                    ) }
                </Pie>
            </Group>

        </svg>
    );
};
