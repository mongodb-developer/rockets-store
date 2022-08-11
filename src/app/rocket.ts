export class RocketShortInfo {
    name: string;
    image: string;
    price: string;
    rocketHeight: string;
}

export class Rocket extends RocketShortInfo {
    _id: string;
    cmp: string;
    wiki: string;
    status: string;
    liftoffThrust: string;
    payloadToLEO: string;
    stages: number;
    strapOns: number;
    payloadToGTO: string;
    fairingDiameter: string;
    fairingHeight: string;
}
