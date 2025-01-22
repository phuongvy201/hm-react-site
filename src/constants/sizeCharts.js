// Định nghĩa measurements cho từng loại sản phẩm và gender
export const productMeasurements = {
  "Baseball Jackets": {
    Male: {
      sizes: ["S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
      types: ["LENGTH", "BUST", "SLEEVE"],
    },
    Female: {
      sizes: ["S", "M", "L", "XL", "2XL"],
      types: ["SLEEVE LENGTH", "LENGTH", "1/2 BUST"],
    },
    Youth: {
      sizes: ["S", "M", "L", "XL"],
      types: ["SLEEVE LENGTH", "LENGTH", "1/2 BUST"],
    },
    Unisex: {
      sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
      types: ["LENGTH", "BUST"],
    },
    Kids: {
      sizes: ["XS", "S", "M", "L", "XL"],
      types: ["WIDTH", "LENGTH", "SLEEVE LENGTH FROM CENTER BACK"],
    },
  },
  "Baseball Jerseys": {
    Male: {
      sizes: [
        "XS",
        "S",
        "M",
        "L",
        "XL",
        "2XL",
        "3XL",
        "4XL",
        "5XL",
        "6XL",
        "7XL",
      ],
      types: ["LENGTH", "BUST", "SHOULDER", "SLEEVE"],
    },
    Female: {
      sizes: ["XS", "S", "M", "L", "XL", "2XL"],
      types: ["LENGTH", "SLEEVE", "CHEST"],
    },
    Youth: {
      sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
      types: ["BODY LENGTH", "WIDTH"],
    },
    Unisex: {
      sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
      types: ["LENGTH", "BUST"],
    },
    Kids: {
      sizes: ["XS", "S", "M", "L", "XL"],
      types: ["WIDTH", "LENGTH", "SLEEVE LENGTH FROM CENTER BACK"],
    },
  },
  "T-Shirts": {
    Male: {
      sizes: [
        "XS",
        "S",
        "M",
        "L",
        "XL",
        "2XL",
        "3XL",
        "4XL",
        "5XL",
        "6XL",
        "7XL",
      ],
      types: ["LENGTH", "BUST", "SHOULDER", "SLEEVE"],
    },
    Female: {
      sizes: ["XS", "S", "M", "L", "XL", "2XL"],
      types: ["LENGTH", "SLEEVE", "CHEST"],
    },
    Youth: {
      sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
      types: ["BODY LENGTH", "WIDTH"],
    },
    Unisex: {
      sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
      types: ["LENGTH", "BUST"],
    },
    Kids: {
      sizes: ["XS", "S", "M", "L", "XL"],
      types: ["WIDTH", "LENGTH", "SLEEVE LENGTH FROM CENTER BACK"],
    },
  },
  "T-Shirts": {
    Male: {
      sizes: [
        "XS",
        "S",
        "M",
        "L",
        "XL",
        "2XL",
        "3XL",
        "4XL",
        "5XL",
        "6XL",
        "7XL",
      ],
      types: ["LENGTH", "BUST", "SHOULDER", "SLEEVE"],
    },
    Female: {
      sizes: ["XS", "S", "M", "L", "XL", "2XL"],
      types: ["LENGTH", "SLEEVE", "CHEST"],
    },
    Youth: {
      sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
      types: ["BODY LENGTH", "WIDTH"],
    },
    Unisex: {
      sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
      types: ["LENGTH", "BUST"],
    },
    Kids: {
      sizes: ["XS", "S", "M", "L", "XL"],
      types: ["WIDTH", "LENGTH", "SLEEVE LENGTH FROM CENTER BACK"],
    },
  },
  "SweatShirts": {
    Male: {
      sizes: [
        "XS",
        "S",
        "M",
        "L",
        "XL",
        "2XL",
        "3XL",
        "4XL",
        "5XL",
        "6XL",
        "7XL",
      ],
      types: ["LENGTH", "BUST", "SHOULDER", "SLEEVE"],
    },
    Female: {
      sizes: ["XS", "S", "M", "L", "XL", "2XL"],
      types: ["LENGTH", "SLEEVE", "CHEST"],
    },
    Youth: {
      sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
      types: ["BODY LENGTH", "WIDTH"],
    },
    Unisex: {
      sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
      types: ["LENGTH", "BUST"],
    },
    Kids: {
      sizes: ["XS", "S", "M", "L", "XL"],
      types: ["WIDTH", "LENGTH", "SLEEVE LENGTH FROM CENTER BACK"],
    },
  },
  // ... các sản phẩm khác
};

export const sizeCharts = {
  "Baseball Jackets": {
    Male: {
      cm: {
        LENGTH: [66, 69, 71, 74, 76, 79, 81, 83],
        BUST: [102, 112, 122, 132, 142, 152, 158, 164],
        SLEEVE: [62, 63, 65, 66, 67, 68, 69, 70],
      },
      inches: {
        LENGTH: [25.98, 27.17, 27.95, 29.13, 29.92, 31.1, 31.89, 32.68],
        BUST: [40.16, 44.09, 48.03, 51.97, 55.91, 59.84, 61.81, 63.78],
        SLEEVE: [24.41, 24.8, 25.19, 25.59, 25.98, 26.38, 26.77, 27.17],
      },
    },
    Female: {
      cm: {
        "SLEEVE LENGTH": [24.8, 25.4, 26, 26.6, 27.2],
        LENGTH: [25, 26, 26.5, 27, 27.5],
        "1/2 BUST": [21, 22, 23, 24, 25],
      },
      inches: {
        "SLEEVE LENGTH": [9.76, 9.96, 10.24, 10.51, 10.79],
        LENGTH: [9.84, 10.24, 10.43, 10.63, 10.83],
        "1/2 BUST": [8.27, 8.66, 9.06, 9.46, 9.86],
      },
    },
    Youth: {
      cm: {
        "SLEEVE LENGTH": [20.5, 21.3, 22, 22.9],
        LENGTH: [22.5, 23.5, 24.5, 25.5],
        "1/2 BUST": [18.5, 19.5, 20.5, 21.5],
      },
      inches: {
        "SLEEVE LENGTH": [8.07, 8.39, 8.66, 9.02],
        LENGTH: [8.86, 9.25, 9.65, 10.04],
        "1/2 BUST": [7.28, 7.68, 8.07, 8.47],
      },
    },
    Unisex: {
      cm: {
        LENGTH: [24.8, 25.6, 26.4, 27.6, 28.7, 29.9, 31.1, 32.3, 33.5],
        BUST: [33.86, 36.22, 38.58, 40.94, 43.3, 45.66, 48.02, 50.38, 52.74],
      },
      inches: {
        LENGTH: [9.76, 10.08, 10.43, 10.94, 11.3, 11.77, 12.24, 12.72, 13.23],
        BUST: [13.33, 14.26, 15.19, 16.1, 17.01, 17.95, 18.89, 19.84, 20.79],
      },
    },
    Kids: {
      cm: {
        WIDTH: [40.6, 43, 46, 48, 51],
        LENGTH: [50.2, 54, 57, 61, 65],
        "SLEEVE LENGTH FROM CENTER BACK": [59.7, 67.3, 70.5, 76.8, 83.8],
      },
      inches: {
        WIDTH: [15.98, 16.93, 18.11, 18.9, 19.69],
        LENGTH: [19.76, 21.26, 22.44, 24.41, 25.59],
        "SLEEVE LENGTH FROM CENTER BACK": [23.5, 26.5, 27.8, 30.2, 32.6],
      },
    },
  },
  "Baseball Jerseys": {
    Male: {
      cm: {
        LENGTH: [78, 80, 81, 82, 83, 85, 86, 88, 90, 92, 94],
        BUST: [100, 110, 121, 131, 141, 151, 160, 170, 178, 188, 198],
        SHOULDER: [42, 46, 49, 52, 55, 58, 62, 65, 67, 70, 73],
        SLEEVE: [
          25.4, 26.0, 26.6, 27.3, 27.9, 28.5, 29.1, 29.6, 30.0, 30.5, 31,
        ],
      },
      inches: {
        LENGTH: [
          30.7, 31.5, 31.9, 32.3, 32.7, 33.5, 33.9, 34.6, 35.4, 36.2, 37,
        ],
        BUST: [39.4, 43.3, 47.6, 51.6, 55.5, 59.4, 63.0, 66.9, 70.1, 74, 77.9],
        SHOULDER: [
          16.5, 18.1, 19.3, 20.5, 21.7, 22.8, 24.4, 25.6, 26.4, 27.5, 28.7,
        ],
        SLEEVE: [
          10.0, 10.2, 10.5, 10.7, 11.0, 11.2, 11.5, 11.7, 11.8, 12, 12.2,
        ],
      },
    },
    Female: {
      cm: {
        LENGTH: [60.96, 66.04, 71.12, 76.2, 81.28, 86.36],
        SLEEVE: [18.42, 19.96, 20.96, 21.59, 24.77, 26.67],
        CHEST: [81.28, 86.36, 91.44, 96.52, 101.6, 106.68],
      },
      inches: {
        LENGTH: [24, 26, 28, 30, 32, 34],
        SLEEVE: [7.25, 7.75, 8.25, 8.5, 9.75, 10.5],
        CHEST: [32, 34, 36, 38, 40, 42],
      },
    },
    Youth: {
      cm: {
        "BODY LENGTH": [56, 61, 63.5, 66, 68.5, 71, 74],
        WIDTH: [40.5, 42, 44.5, 47, 49.5, 54.5, 56],
      },
      inches: {
        "BODY LENGTH": [22.05, 23.23, 24.61, 25.98, 27.36, 28.74, 30.71],
        WIDTH: [16.93, 17.32, 17.91, 18.5, 19.09, 20.28, 20.87],
      },
    },
    Unisex: {
      cm: {
        LENGTH: [63, 65, 67, 70, 73, 76, 79, 81, 83],
        BUST: [86, 92, 98, 104, 110, 116, 122, 126, 134],
      },
      inches: {
        LENGTH: [24.8, 25.6, 26.4, 27.6, 28.7, 29.9, 31.1, 32.3, 33.5],
        BUST: [33.86, 36.22, 38.58, 40.94, 43.3, 45.66, 48.02, 50.38, 52.74],
      },
    },
    Kids: {
      cm: {
        WIDTH: [40.6, 43, 46, 48, 51],
        LENGTH: [50.2, 54, 57, 61, 65],
        "SLEEVE LENGTH FROM CENTER BACK": [59.7, 67.3, 70.5, 76.8, 83.8],
      },
      inches: {
        WIDTH: [15.98, 16.93, 18.11, 18.9, 19.69],
        LENGTH: [19.76, 21.26, 22.44, 24.41, 25.59],
        "SLEEVE LENGTH FROM CENTER BACK": [23.5, 26.5, 27.8, 30.2, 32.6],
      },
    },
    "T-hirts": {
      cm: {
        LENGTH: [63, 65, 67, 70, 73, 76, 79, 81, 83],
        BUST: [86, 92, 98, 104, 110, 116, 122, 126, 134],
      },
    },

    // ... các sản phẩm khác
  },
  "T-Shirts": {
    Male: {
      cm: {
        LENGTH: [78, 80, 81, 82, 83, 85, 86, 88, 90, 92, 94],
        BUST: [100, 110, 121, 131, 141, 151, 160, 170, 178, 188, 198],
        SHOULDER: [42, 46, 49, 52, 55, 58, 62, 65, 67, 70, 73],
        SLEEVE: [
          25.4, 26.0, 26.6, 27.3, 27.9, 28.5, 29.1, 29.6, 30.0, 30.5, 31,
        ],
      },
      inches: {
        LENGTH: [
          30.7, 31.5, 31.9, 32.3, 32.7, 33.5, 33.9, 34.6, 35.4, 36.2, 37,
        ],
        BUST: [39.4, 43.3, 47.6, 51.6, 55.5, 59.4, 63.0, 66.9, 70.1, 74, 77.9],
        SHOULDER: [
          16.5, 18.1, 19.3, 20.5, 21.7, 22.8, 24.4, 25.6, 26.4, 27.5, 28.7,
        ],
        SLEEVE: [
          10.0, 10.2, 10.5, 10.7, 11.0, 11.2, 11.5, 11.7, 11.8, 12, 12.2,
        ],
      },
    },
    Female: {
      cm: {
        LENGTH: [60.96, 66.04, 71.12, 76.2, 81.28, 86.36],
        SLEEVE: [18.42, 19.96, 20.96, 21.59, 24.77, 26.67],
        CHEST: [81.28, 86.36, 91.44, 96.52, 101.6, 106.68],
      },
      inches: {
        LENGTH: [24, 26, 28, 30, 32, 34],
        SLEEVE: [7.25, 7.75, 8.25, 8.5, 9.75, 10.5],
        CHEST: [32, 34, 36, 38, 40, 42],
      },
    },
    Youth: {
      cm: {
        "BODY LENGTH": [56, 61, 63.5, 66, 68.5, 71, 74],
        WIDTH: [40.5, 42, 44.5, 47, 49.5, 54.5, 56],
      },
      inches: {
        "BODY LENGTH": [22.05, 23.23, 24.61, 25.98, 27.36, 28.74, 30.71],
        WIDTH: [16.93, 17.32, 17.91, 18.5, 19.09, 20.28, 20.87],
      },
    },
    Unisex: {
      cm: {
        LENGTH: [63, 65, 67, 70, 73, 76, 79, 81, 83],
        BUST: [86, 92, 98, 104, 110, 116, 122, 126, 134],
      },
      inches: {
        LENGTH: [24.8, 25.6, 26.4, 27.6, 28.7, 29.9, 31.1, 32.3, 33.5],
        BUST: [33.86, 36.22, 38.58, 40.94, 43.3, 45.66, 48.02, 50.38, 52.74],
      },
    },
    Kids: {
      cm: {
        WIDTH: [40.6, 43, 46, 48, 51],
        LENGTH: [50.2, 54, 57, 61, 65],
        "SLEEVE LENGTH FROM CENTER BACK": [59.7, 67.3, 70.5, 76.8, 83.8],
      },
      inches: {
        WIDTH: [15.98, 16.93, 18.11, 18.9, 19.69],
        LENGTH: [19.76, 21.26, 22.44, 24.41, 25.59],
        "SLEEVE LENGTH FROM CENTER BACK": [23.5, 26.5, 27.8, 30.2, 32.6],
      },
    },

    // ... các sản phẩm khác
  },
  "SweatShirts": {
    Male: {
      cm: {
        LENGTH: [78, 80, 81, 82, 83, 85, 86, 88, 90, 92, 94],
        BUST: [100, 110, 121, 131, 141, 151, 160, 170, 178, 188, 198],
        SHOULDER: [42, 46, 49, 52, 55, 58, 62, 65, 67, 70, 73],
        SLEEVE: [
          25.4, 26.0, 26.6, 27.3, 27.9, 28.5, 29.1, 29.6, 30.0, 30.5, 31,
        ],
      },
      inches: {
        LENGTH: [
          30.7, 31.5, 31.9, 32.3, 32.7, 33.5, 33.9, 34.6, 35.4, 36.2, 37,
        ],
        BUST: [39.4, 43.3, 47.6, 51.6, 55.5, 59.4, 63.0, 66.9, 70.1, 74, 77.9],
        SHOULDER: [
          16.5, 18.1, 19.3, 20.5, 21.7, 22.8, 24.4, 25.6, 26.4, 27.5, 28.7,
        ],
        SLEEVE: [
          10.0, 10.2, 10.5, 10.7, 11.0, 11.2, 11.5, 11.7, 11.8, 12, 12.2,
        ],
      },
    },
    Female: {
      cm: {
        LENGTH: [60.96, 66.04, 71.12, 76.2, 81.28, 86.36],
        SLEEVE: [18.42, 19.96, 20.96, 21.59, 24.77, 26.67],
        CHEST: [81.28, 86.36, 91.44, 96.52, 101.6, 106.68],
      },
      inches: {
        LENGTH: [24, 26, 28, 30, 32, 34],
        SLEEVE: [7.25, 7.75, 8.25, 8.5, 9.75, 10.5],
        CHEST: [32, 34, 36, 38, 40, 42],
      },
    },
    Youth: {
      cm: {
        "BODY LENGTH": [56, 61, 63.5, 66, 68.5, 71, 74],
        WIDTH: [40.5, 42, 44.5, 47, 49.5, 54.5, 56],
      },
      inches: {
        "BODY LENGTH": [22.05, 23.23, 24.61, 25.98, 27.36, 28.74, 30.71],
        WIDTH: [16.93, 17.32, 17.91, 18.5, 19.09, 20.28, 20.87],
      },
    },
    Unisex: {
      cm: {
        LENGTH: [63, 65, 67, 70, 73, 76, 79, 81, 83],
        BUST: [86, 92, 98, 104, 110, 116, 122, 126, 134],
      },
      inches: {
        LENGTH: [24.8, 25.6, 26.4, 27.6, 28.7, 29.9, 31.1, 32.3, 33.5],
        BUST: [33.86, 36.22, 38.58, 40.94, 43.3, 45.66, 48.02, 50.38, 52.74],
      },
    },
    Kids: {
      cm: {
        WIDTH: [40.6, 43, 46, 48, 51],
        LENGTH: [50.2, 54, 57, 61, 65],
        "SLEEVE LENGTH FROM CENTER BACK": [59.7, 67.3, 70.5, 76.8, 83.8],
      },
      inches: {
        WIDTH: [15.98, 16.93, 18.11, 18.9, 19.69],
        LENGTH: [19.76, 21.26, 22.44, 24.41, 25.59],
        "SLEEVE LENGTH FROM CENTER BACK": [23.5, 26.5, 27.8, 30.2, 32.6],
      },
    },

    // ... các sản phẩm khác
  },
};
