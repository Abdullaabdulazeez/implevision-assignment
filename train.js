class UndergroundSystem {
    constructor() {
        this.checkIns = new Map(); 
        this.travelTimes = new Map(); 
    }

    checkIn(id, stationName, t) {
        this.checkIns.set(id, { station: stationName, time: t });
    }

    checkOut(id, stationName, t) {
        const checkInData = this.checkIns.get(id);
        if (checkInData) {
            this.checkIns.delete(id);
            const routeKey = `${checkInData.station}_${stationName}`;
            const travelTime = t - checkInData.time;

            if (!this.travelTimes.has(routeKey)) {
                this.travelTimes.set(routeKey, { totalTime: 0, count: 0 });
            }

            const travelData = this.travelTimes.get(routeKey);
            travelData.totalTime += travelTime;
            travelData.count += 1;
        }
    }

    getAverageTime(startStation, endStation) {
        const routeKey = `${startStation}_${endStation}`;
        const travelData = this.travelTimes.get(routeKey);
        if (travelData) {
            return travelData.totalTime / travelData.count;
        } else {
            return 0.0;
        }
    }
}


const system = new UndergroundSystem();
system.checkIn(1, "StationA", 3);
system.checkOut(1, "StationB", 33);
console.log(system.getAverageTime("StationA", "StationB")); 