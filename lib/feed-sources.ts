export interface FeedSource {
  id: string
  name: string
  url: string
  feedUrl: string
  city: string
  province: string
  airportCode: string
}

export const FEED_SOURCES: FeedSource[] = [
  {
    id: "yul",
    name: "YUL Deals",
    url: "https://www.yuldeals.com",
    feedUrl: "https://www.yuldeals.com/atom/1",
    city: "Montreal",
    province: "Quebec",
    airportCode: "YUL",
  },
  {
    id: "yyc",
    name: "YYC Deals",
    url: "https://www.yycdeals.com",
    feedUrl: "https://www.yycdeals.com/atom/1",
    city: "Calgary",
    province: "Alberta",
    airportCode: "YYC",
  },
  {
    id: "yhz",
    name: "YHZ Deals",
    url: "https://www.yhzdeals.com",
    feedUrl: "https://www.yhzdeals.com/atom/1",
    city: "Halifax",
    province: "Nova Scotia",
    airportCode: "YHZ",
  },
  {
    id: "ylw",
    name: "YLW Deals",
    url: "https://www.ylwdeals.com",
    feedUrl: "https://www.ylwdeals.com/atom/1",
    city: "Kelowna",
    province: "British Columbia",
    airportCode: "YLW",
  },
  {
    id: "yxu",
    name: "YXU Deals",
    url: "http://www.yxudeals.com",
    feedUrl: "http://www.yxudeals.com/atom/1",
    city: "London",
    province: "Ontario",
    airportCode: "YXU",
  },
  {
    id: "yow",
    name: "YOW Deals",
    url: "https://www.yowdeals.com",
    feedUrl: "https://www.yowdeals.com/atom/1",
    city: "Ottawa",
    province: "Ontario",
    airportCode: "YOW",
  },
  {
    id: "yqr",
    name: "YQR Deals",
    url: "https://www.yqrdeals.com",
    feedUrl: "https://www.yqrdeals.com/atom/1",
    city: "Regina",
    province: "Saskatchewan",
    airportCode: "YQR",
  },
  {
    id: "yxe",
    name: "YXE Deals",
    url: "https://www.yxedeals.com",
    feedUrl: "https://www.yxedeals.com/atom/1",
    city: "Saskatoon",
    province: "Saskatchewan",
    airportCode: "YXE",
  },
  {
    id: "yyt",
    name: "YYT Deals",
    url: "https://www.yytdeals.com",
    feedUrl: "https://www.yytdeals.com/atom/1",
    city: "St. John's",
    province: "Newfoundland and Labrador",
    airportCode: "YYT",
  },
  {
    id: "yqt",
    name: "YQT Deals",
    url: "https://www.yqtdeals.com",
    feedUrl: "https://www.yqtdeals.com/atom/1",
    city: "Thunder Bay",
    province: "Ontario",
    airportCode: "YQT",
  },
  {
    id: "yyz",
    name: "YYZ Deals",
    url: "https://www.yyzdeals.com",
    feedUrl: "https://www.yyzdeals.com/atom/1",
    city: "Toronto",
    province: "Ontario",
    airportCode: "YYZ",
  },
  {
    id: "yvr",
    name: "YVR Deals",
    url: "https://www.yvrdeals.com",
    feedUrl: "https://www.yvrdeals.com/atom/1",
    city: "Vancouver",
    province: "British Columbia",
    airportCode: "YVR",
  },
  {
    id: "ywg",
    name: "YWG Deals",
    url: "https://www.ywgdeals.com",
    feedUrl: "https://www.ywgdeals.com/atom/1",
    city: "Winnipeg",
    province: "Manitoba",
    airportCode: "YWG",
  },
]

export const PROVINCES = [...new Set(FEED_SOURCES.map((s) => s.province))].sort()

export function getSourceById(id: string): FeedSource | undefined {
  return FEED_SOURCES.find((s) => s.id === id)
}

export function getSourcesByProvince(province: string): FeedSource[] {
  return FEED_SOURCES.filter((s) => s.province === province)
}
