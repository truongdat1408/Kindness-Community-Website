const Administrators: Objects = {
    data: [{
        "id": 1,
        "username": "naldins0",
        "role": "MODERATOR",
        "activation": true,
        "recentActivityTime": "2021-02-23 19:31:51"
    }, {
        "id": 2,
        "username": "egreenfield1",
        "role": "MODERATOR",
        "activation": false,
        "recentActivityTime": "2021-04-07 07:06:02"
    }, {
        "id": 3,
        "username": "shannant2",
        "role": "ADMIN",
        "activation": false,
        "recentActivityTime": "2021-12-11 05:42:37"
    }, {
        "id": 4,
        "username": "pkarys3",
        "role": "ADMIN",
        "activation": false,
        "recentActivityTime": "2021-11-28 04:46:37"
    }, {
        "id": 5,
        "username": "gfrediani4",
        "role": "MODERATOR",
        "activation": false,
        "recentActivityTime": "2021-09-22 16:31:47"
    }, {
        "id": 6,
        "username": "hmcgougan5",
        "role": "ADMIN",
        "activation": false,
        "recentActivityTime": "2021-10-20 18:42:22"
    }, {
        "id": 7,
        "username": "cjerwood6",
        "role": "ADMIN",
        "activation": false,
        "recentActivityTime": "2021-10-23 02:32:28"
    }, {
        "id": 8,
        "username": "mwhyberd7",
        "role": "MODERATOR",
        "activation": false,
        "recentActivityTime": "2021-12-16 10:45:28"
    }, {
        "id": 9,
        "username": "cewdale8",
        "role": "MODERATOR",
        "activation": true,
        "recentActivityTime": "2021-02-21 05:02:59"
    }, {
        "id": 10,
        "username": "vrodders9",
        "role": "ADMIN",
        "activation": false,
        "recentActivityTime": "2021-03-29 01:19:22"
    }, {
        "id": 11,
        "username": "bgilffillana",
        "role": "MODERATOR",
        "activation": false,
        "recentActivityTime": "2021-09-25 04:04:01"
    }, {
        "id": 12,
        "username": "anewbandb",
        "role": "ADMIN",
        "activation": false,
        "recentActivityTime": "2021-02-14 23:20:42"
    }]
}

export default class ApplicationConstant {
    static
        get dataAd(): Object {
        return Administrators;
    }
}