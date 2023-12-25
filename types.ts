export type LineChartData = {
    uv: number;
}

export type BarChartData = {
    name: string;
    uv: number;
}

export type TeamData = {
    name: string;
    money: number;
    gems: number;
}

export type TenderData = {
    name: string;
    cost: number;
    profit: number;
}

export type TenderWithResultsData = {
    name: string;
    cost: number
    profit: number;
    teams: [{
    name: string;
        is_winner: boolean | null
    }]
}

export type RoundData = {
    number: number;
    status: number;
    info: null | TenderData[];
    till_time: string;
} | null