import React, { FC, memo } from 'react';

const Svg: FC = memo(() => (
  <svg width="1em" height="1em" viewBox="0 0 64 64">
    <title>FuelEconomy</title>
    <path
      d="M30.2915 3.98798H33.7866C34.1426 4.03273 34.4975 4.0825 34.8545 4.12172C40.3427 4.72544 45.2751 6.70036 49.5604 10.1923C54.9578 14.5892 58.31 20.2236 59.5601 27.0846C59.7544 28.1512 59.8557 29.2348 60 30.3106V33.5873C59.9593 33.7414 59.9284 33.8981 59.9076 34.0562C59.6652 37.8976 58.5823 41.6389 56.7355 45.016C52.3836 52.9075 45.7791 57.7573 36.91 59.4671C35.8437 59.6727 34.7555 59.7651 33.6773 59.9099H30.4007C30.0058 59.8649 29.6109 59.8183 29.2159 59.7748C23.729 59.1693 18.795 57.1981 14.5148 53.7019C8.88649 49.1049 5.49272 43.2028 4.38533 36.0063C4.26738 35.2389 4.17997 34.4666 4.07834 33.6965V30.2014C4.17102 29.485 4.25553 28.7675 4.35795 28.0527C5.21078 22.0859 7.96426 16.5529 12.2099 12.2745C16.4556 7.99619 21.9673 5.20036 27.9274 4.30181C28.7128 4.1807 29.5032 4.09171 30.2915 3.98798ZM57.8176 31.9293C57.8167 28.5366 57.1458 25.1774 55.8434 22.0446C54.5409 18.9118 52.6325 16.0671 50.2278 13.6738C47.8231 11.2804 44.9694 9.38559 41.8305 8.09799C38.6915 6.81039 35.3292 6.15541 31.9365 6.17063C17.7809 6.19696 6.23966 17.7695 6.25914 31.913C6.25807 35.2983 6.92379 38.6507 8.2183 41.7787C9.5128 44.9067 11.4107 47.7491 13.8037 50.1436C18.6366 54.9796 25.1927 57.6976 32.0296 57.6997C38.8665 57.7019 45.4242 54.988 50.2602 50.1552C55.0961 45.3223 57.8141 38.7662 57.8163 31.9293H57.8176Z"
      fill="currentColor"
    />
    <path
      d="M34.0244 16.4086C34.0232 15.8332 34.5075 15.3734 35.0766 15.4581C39.6316 16.1358 44.4457 19.4011 46.6184 23.3965C46.6366 23.4298 46.6469 23.4825 46.6136 23.5008C46.378 23.6304 46.1416 23.7588 45.9053 23.8872C45.437 24.1415 44.9687 24.3957 44.5065 24.6604C43.4238 25.2799 43.0526 26.4509 43.6107 27.449C44.1687 28.4471 45.2819 28.7452 46.3897 28.1788C46.6931 28.0233 46.994 27.8633 47.3 27.6989C47.8469 27.405 48.5267 27.6752 48.6777 28.2774C49.2254 30.4629 49.319 32.742 48.9475 34.9728C48.2537 39.2508 46.2136 42.7369 42.9322 45.4934C42.5142 45.8445 42.4238 46.4607 42.7477 46.9001L43.4469 47.8485C43.7695 48.2862 44.3849 48.3878 44.8118 48.051C51.2139 43 53.9478 33.8064 51.3056 25.9948C48.359 17.2833 40.2951 11.6674 31.2324 12.0153C22.3381 12.3566 14.5487 18.6516 12.3847 27.2284C11.3399 31.2705 11.5729 35.5371 13.0516 39.4414C14.4127 43.0353 16.7678 46.1599 19.8325 48.4559C20.2726 48.7857 20.8931 48.6656 21.2035 48.2116L21.8397 47.2811C22.151 46.8257 22.0329 46.2066 21.5969 45.8687C19.0159 43.8677 17.0507 41.1695 15.9406 38.0836C14.8611 35.0831 14.6382 31.8501 15.2838 28.7442C15.4155 28.1108 16.1271 27.8222 16.6873 28.1458C17.1155 28.3931 17.5341 28.6305 17.9615 28.8501C18.1986 28.9771 18.4596 29.0534 18.7277 29.0742C18.9959 29.0949 19.2655 29.0597 19.5193 28.9707C19.7731 28.8816 20.0057 28.7408 20.2021 28.5571C20.3986 28.3734 20.5548 28.1509 20.6606 27.9036C20.8691 27.4478 20.8972 26.9299 20.7392 26.4542C20.5812 25.9786 20.2489 25.5804 19.8092 25.3398C19.2141 24.9795 18.6087 24.6362 18.0044 24.2937C17.5495 24.0359 17.3697 23.4679 17.6415 23.0213C19.9278 19.2643 25.4685 15.5808 29.147 15.3622C29.6535 15.3322 30.0334 15.7653 30.032 16.2727C30.0308 16.7299 30.0303 17.1892 30.0357 17.6485C30.0512 18.9476 30.8743 19.8104 32.0716 19.7949C33.2229 19.78 34.0105 18.908 34.0224 17.6261C34.0254 17.2207 34.0252 16.8149 34.0244 16.4086Z"
      fill="currentColor"
    />
    <path
      d="M33.0801 34.0087L32.1121 30.7891L31.9726 30.8102C31.9637 30.835 31.9544 30.8596 31.9452 30.8843C31.9259 30.9356 31.9067 30.9868 31.8906 31.0392C31.6218 31.9134 31.3518 32.7873 31.0818 33.6611C30.2888 36.2272 29.4958 38.7932 28.7351 41.3688C28.5351 42.0813 28.4463 42.8204 28.4718 43.56C28.518 45.3293 29.8193 46.6091 31.6676 46.8178C32.4845 46.912 33.3084 46.7129 33.9921 46.2559C34.6757 45.7989 35.1747 45.1138 35.4 44.3229C35.6452 43.3792 35.6142 42.3849 35.3106 41.4583C34.7341 39.5133 34.1503 37.5707 33.5665 35.628C33.4043 35.0882 33.2421 34.5485 33.0801 34.0087Z"
      fill="currentColor"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M32 60C47.464 60 60 47.464 60 32C60 16.536 47.464 4 32 4C16.536 4 4 16.536 4 32C4 47.464 16.536 60 32 60ZM32 56C45.2548 56 56 45.2548 56 32C56 18.7452 45.2548 8 32 8C18.7452 8 8 18.7452 8 32C8 45.2548 18.7452 56 32 56Z"
      fill="currentColor"
    />
  </svg>
));

export default Svg;
