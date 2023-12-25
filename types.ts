export type LineChartData = {
    uv: number;
}

export type BarChartData = {
    name: string;
    uv: number;
    gems: number;
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

export type TeamResultData = {
    name: string;
    is_winner: boolean | null
}

export type TenderWithResultsData = {
    name: string;
    cost: number
    profit: number;
    teams: TeamResultData[]
}

export type AttacksResultData = {
  attacking: {name: string};
  attacked: {name: string};
  is_success: boolean;
  stolen: number;
}

export type RoundData = {
    number: number;
    status: number;
    info: null | TenderData[] | TenderWithResultsData[] | AttacksResultData[];
    till_time: string;
} | null

export type ColumnData = {
    key: string;
    title: string;
}

