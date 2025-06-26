// constants/radioTechOptions.js

export const RADIO_TECH_OPTIONS = ["2G", "3G", "4G", "5G"];

export const DATA_USAGE_OPTIONS = [
    "0–50MB",
    "50–250MB",
    "250–500MB",
    "500MB–1GB",
    "1GB+",
];

export const TECH_DATA_AVAILABILITY = {
    "2G": ["0–50MB"],
    "3G": ["0–50MB", "50–250MB"],
    "4G": ["0–50MB", "50–250MB", "250–500MB", "500MB–1GB"],
    "5G": ["0–50MB", "50–250MB", "250–500MB", "500MB–1GB", "1GB+"],
};

export const PRICING_MAP = {
    "2G": { "0–50MB": 10 },
    "3G": { "0–50MB": 15, "50–250MB": 30 },
    "4G": {
        "0–50MB": 20,
        "50–250MB": 40,
        "250–500MB": 60,
        "500MB–1GB": 80,
    },
    "5G": {
        "0–50MB": 25,
        "50–250MB": 50,
        "250–500MB": 75,
        "500MB–1GB": 100,
        "1GB+": 150,
    },
};
