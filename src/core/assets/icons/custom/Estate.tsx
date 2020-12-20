import React, { FC, memo } from 'react';

const Svg: FC = memo(() => (
  <svg
    width="87"
    height="38"
    viewBox="0 0 87 38"
    xmlns="http://www.w3.org/2000/svg"
    style={{ fill: 'none' }}
  >
    <path
      d="M1 26.3776C1 29.2196 3 29.9696 4.06 29.9696H8.37201C8.51909 32.0049 9.43138 33.909 10.9254 35.2989C12.4194 36.6889 14.3844 37.4616 16.425 37.4616C18.4656 37.4616 20.4306 36.6889 21.9246 35.2989C23.4186 33.909 24.3309 32.0049 24.478 29.9696H63.019C63.1678 32.0041 64.0809 33.9069 65.575 35.2958C67.0692 36.6847 69.0336 37.4566 71.0735 37.4566C73.1135 37.4566 75.0778 36.6847 76.572 35.2958C78.0661 33.9069 78.9792 32.0041 79.128 29.9696H82.928C82.9679 29.9738 83.0079 29.9758 83.048 29.9756C83.4936 29.9864 83.9367 29.907 84.3507 29.7419C84.7648 29.5769 85.141 29.3296 85.4569 29.0152C85.7728 28.7007 86.0217 28.3255 86.1886 27.9123C86.3555 27.499 86.4369 27.0562 86.428 26.6105L86.44 26.4105C86.5406 25.6997 86.5186 24.9769 86.375 24.2736C86.2862 23.8563 86.0816 23.4726 85.7846 23.1664C85.4876 22.8602 85.1103 22.644 84.696 22.5426C83.623 18.1106 75.713 15.2426 69.319 12.9196C67.471 12.2456 65.727 11.6196 64.355 11.0196C62.6917 10.2404 61.1025 9.31194 59.607 8.24556C55.461 5.47456 50.762 2.33455 39.377 1.45755C29.1183 0.768286 18.8221 0.857881 8.577 1.72555C8.45506 1.74115 8.3416 1.7963 8.254 1.88255C2.137 8.37155 2.754 19.9106 2.992 22.5466C1.354 22.8096 1 24.2736 1 26.3776ZM63.976 29.3396C63.976 27.9353 64.3924 26.5626 65.1726 25.395C65.9527 24.2274 67.0616 23.3174 68.3589 22.78C69.6563 22.2426 71.0839 22.102 72.4612 22.376C73.8384 22.6499 75.1035 23.3261 76.0965 24.3191C77.0894 25.312 77.7656 26.5772 78.0396 27.9544C78.3135 29.3317 78.1729 30.7593 77.6356 32.0566C77.0982 33.354 76.1881 34.4628 75.0205 35.243C73.8529 36.0232 72.4802 36.4396 71.076 36.4396C70.1432 36.4401 69.2194 36.2568 68.3575 35.9001C67.4955 35.5435 66.7123 35.0205 66.0526 34.3611C65.3929 33.7016 64.8695 32.9186 64.5125 32.0568C64.1555 31.195 63.9719 30.2714 63.972 29.3386L63.976 29.3396ZM9.332 29.3396C9.332 27.935 9.74862 26.5619 10.5291 25.3942C11.3096 24.2264 12.419 23.3164 13.7168 22.7792C15.0146 22.2421 16.4426 22.102 17.8201 22.3766C19.1976 22.6512 20.4627 23.3282 21.4553 24.3219C22.4479 25.3157 23.1235 26.5815 23.3965 27.9593C23.6696 29.3371 23.5279 30.7649 22.9892 32.0621C22.4506 33.3594 21.5394 34.4677 20.3707 35.2469C19.2021 36.0261 17.8286 36.4411 16.424 36.4396C14.542 36.4377 12.7377 35.6887 11.4077 34.3572C10.0777 33.0257 9.33074 31.2206 9.33101 29.3386L9.332 29.3396ZM2.022 26.3776C2.022 23.7476 2.616 23.5296 3.522 23.5236L3.543 23.5355H9.27901C9.41049 23.5297 9.53466 23.4734 9.62564 23.3783C9.71662 23.2832 9.76741 23.1567 9.76741 23.0251C9.76741 22.8934 9.71662 22.7669 9.62564 22.6718C9.53466 22.5767 9.41049 22.5204 9.27901 22.5146H4.008C3.814 20.2206 3.178 8.92756 8.858 2.72456C18.9832 1.87494 29.1581 1.79068 39.296 2.47255C50.414 3.33055 54.996 6.39356 59.037 9.09056C60.5814 10.1948 62.2244 11.1542 63.945 11.9566C65.345 12.5626 67.103 13.1986 68.964 13.8786C74.986 16.0586 82.327 18.7596 83.545 22.5146H78.431C78.2995 22.5204 78.1754 22.5767 78.0844 22.6718C77.9934 22.7669 77.9426 22.8934 77.9426 23.0251C77.9426 23.1567 77.9934 23.2832 78.0844 23.3783C78.1754 23.4734 78.2995 23.5297 78.431 23.5355H84.265C84.28 23.5355 84.287 23.5236 84.302 23.5176L84.333 23.5296C84.398 23.5356 85.077 23.5046 85.391 24.5626C85.4939 25.15 85.5034 25.7501 85.419 26.3406L85.404 26.5466C85.4222 26.8702 85.3714 27.1941 85.2548 27.4965C85.1383 27.799 84.9587 28.0733 84.728 28.301C84.4973 28.5288 84.2208 28.7049 83.9168 28.8175C83.6129 28.9302 83.2884 28.9769 82.965 28.9546L79.155 28.9486C79.0624 26.8681 78.1707 24.9035 76.6658 23.464C75.1608 22.0246 73.1585 21.2212 71.076 21.2212C68.9934 21.2212 66.9912 22.0246 65.4862 23.464C63.9813 24.9035 63.0896 26.8681 62.997 28.9486H24.502C24.4066 26.8704 23.514 24.9089 22.0096 23.472C20.5052 22.035 18.5049 21.2332 16.4245 21.2332C14.3441 21.2332 12.3438 22.035 10.8394 23.472C9.33503 24.9089 8.44236 26.8704 8.347 28.9486H4.06C3.851 28.9486 2.021 28.8526 2.021 26.3776H2.022Z"
      style={{
        fill: 'var(--class-color, currentColor)',
      }}
    />
    <path
      d="M9.21 10.0036C9.16227 10.5545 9.23131 11.1094 9.41259 11.6318C9.59386 12.1543 9.88329 12.6326 10.262 13.0356C11.874 14.7306 14.937 15.0836 17.222 15.0836C17.8463 15.0879 18.4705 15.0602 19.092 15.0006L64.052 15.0066C64.1209 15.0097 64.1898 14.9987 64.2544 14.9744C64.319 14.9501 64.378 14.913 64.4279 14.8653C64.4777 14.8176 64.5174 14.7603 64.5445 14.6969C64.5716 14.6334 64.5856 14.5651 64.5856 14.4961C64.5856 14.4271 64.5716 14.3588 64.5445 14.2953C64.5174 14.2319 64.4777 14.1746 64.4279 14.1269C64.378 14.0792 64.319 14.0421 64.2544 14.0178C64.1898 13.9935 64.1209 13.9826 64.052 13.9856C63.054 13.5566 62.0853 13.0625 61.152 12.5066C56.352 9.88961 47.417 5.0176 39.276 4.3936C35.216 4.0796 30.809 3.92261 26.184 3.92261C18.384 3.92261 13.344 4.38061 11.194 4.57161L10.717 4.61461C10.6165 4.62353 10.5209 4.66186 10.4421 4.72482C10.3634 4.78779 10.3049 4.87258 10.274 4.9686C9.69457 6.59146 9.33667 8.28506 9.21 10.0036ZM41.982 5.79361V13.9866H22.93V4.9756C23.96 4.9576 25.03 4.94461 26.187 4.94461C30.787 4.94461 35.167 5.1016 39.202 5.4086C40.1362 5.48679 41.0656 5.61532 41.986 5.79361H41.982ZM43.01 13.9866V6.01561C49.81 7.51061 56.683 11.2346 60.669 13.4026C61.066 13.6266 61.42 13.8156 61.733 13.9866H43.01ZM10.229 10.0566C10.3372 8.53739 10.6455 7.03909 11.146 5.6006L11.284 5.58861C12.994 5.43761 16.574 5.1216 21.903 4.9946V13.9876H19.031C18.966 13.9876 18.241 14.0706 17.22 14.0706C15.51 14.0706 12.432 13.8426 11.005 12.3356C10.7213 12.0326 10.5057 11.6723 10.3729 11.2791C10.2401 10.8858 10.1931 10.4686 10.235 10.0556L10.229 10.0566Z"
      style={{
        fill: 'var(--class-color, currentColor)',
      }}
    />
    <path
      d="M23.676 22.5145H63.82C63.9515 22.5203 64.0757 22.5767 64.1666 22.6718C64.2576 22.7669 64.3084 22.8934 64.3084 23.025C64.3084 23.1567 64.2576 23.2832 64.1666 23.3783C64.0757 23.4734 63.9515 23.5297 63.82 23.5355H23.676C23.5445 23.5297 23.4203 23.4734 23.3294 23.3783C23.2384 23.2832 23.1876 23.1567 23.1876 23.025C23.1876 22.8934 23.2384 22.7669 23.3294 22.6718C23.4203 22.5767 23.5445 22.5203 23.676 22.5145Z"
      style={{
        fill: 'var(--class-color, currentColor)',
      }}
    />
    <path
      d="M66.184 29.3396C66.184 30.3067 66.4708 31.2522 67.0081 32.0563C67.5454 32.8605 68.3092 33.4872 69.2027 33.8573C70.0962 34.2275 71.0794 34.3243 72.028 34.1356C72.9766 33.9469 73.8479 33.4812 74.5318 32.7973C75.2156 32.1135 75.6814 31.2421 75.87 30.2936C76.0587 29.345 75.9619 28.3618 75.5918 27.4683C75.2217 26.5747 74.5949 25.811 73.7907 25.2737C72.9866 24.7364 72.0412 24.4496 71.074 24.4496C69.7774 24.4506 68.5342 24.9662 67.6174 25.883C66.7006 26.7998 66.1851 28.043 66.184 29.3396ZM67.205 29.3396C67.205 28.5744 67.4319 27.8263 67.857 27.1901C68.2822 26.5538 68.8864 26.0579 69.5934 25.7651C70.3004 25.4723 71.0783 25.3956 71.8288 25.5449C72.5793 25.6942 73.2687 26.0627 73.8098 26.6038C74.3509 27.1449 74.7194 27.8343 74.8687 28.5848C75.0179 29.3353 74.9413 30.1132 74.6485 30.8202C74.3557 31.5271 73.8597 32.1314 73.2235 32.5565C72.5872 32.9817 71.8392 33.2086 71.074 33.2086C70.0485 33.2067 69.0654 32.7985 68.3403 32.0733C67.6151 31.3482 67.2069 30.3651 67.205 29.3396Z"
      style={{
        fill: 'var(--class-color, currentColor)',
      }}
    />
    <path
      d="M11.536 29.3396C11.536 30.3069 11.8229 31.2524 12.3603 32.0566C12.8978 32.8608 13.6617 33.4876 14.5554 33.8576C15.4491 34.2277 16.4325 34.3243 17.3811 34.1354C18.3298 33.9465 19.2011 33.4804 19.8848 32.7963C20.5686 32.1121 21.0341 31.2405 21.2224 30.2917C21.4108 29.343 21.3135 28.3597 20.9429 27.4662C20.5723 26.5727 19.9451 25.8092 19.1406 25.2722C18.336 24.7353 17.3903 24.449 16.423 24.4496C15.1268 24.4509 13.8841 24.9666 12.9678 25.8835C12.0515 26.8003 11.5365 28.0434 11.536 29.3396ZM12.557 29.3396C12.557 28.5742 12.784 27.8261 13.2093 27.1898C13.6345 26.5534 14.2389 26.0575 14.9461 25.7648C15.6532 25.4721 16.4313 25.3956 17.1819 25.5451C17.9325 25.6947 18.6219 26.0635 19.1629 26.6048C19.7038 27.1462 20.0721 27.8359 20.221 28.5866C20.37 29.3373 20.2929 30.1154 19.9996 30.8223C19.7063 31.5292 19.21 32.1332 18.5733 32.558C17.9367 32.9828 17.1883 33.2092 16.423 33.2086C15.3977 33.2067 14.415 32.7984 13.6903 32.0732C12.9656 31.3479 12.5581 30.3649 12.557 29.3396Z"
      style={{
        fill: 'var(--class-color, currentColor)',
      }}
    />
    <path
      d="M41.98 21.4686V16.6216C41.9769 16.5527 41.9879 16.4838 42.0122 16.4192C42.0365 16.3546 42.0736 16.2956 42.1213 16.2458C42.169 16.1959 42.2263 16.1562 42.2897 16.1291C42.3532 16.102 42.4215 16.088 42.4905 16.088C42.5595 16.088 42.6278 16.102 42.6913 16.1291C42.7547 16.1562 42.812 16.1959 42.8597 16.2458C42.9074 16.2956 42.9445 16.3546 42.9688 16.4192C42.9931 16.4838 43.0041 16.5527 43.001 16.6216V21.4686C43.0041 21.5376 42.9931 21.6064 42.9688 21.671C42.9445 21.7356 42.9074 21.7946 42.8597 21.8445C42.812 21.8943 42.7547 21.934 42.6913 21.9611C42.6278 21.9882 42.5595 22.0022 42.4905 22.0022C42.4215 22.0022 42.3532 21.9882 42.2897 21.9611C42.2263 21.934 42.169 21.8943 42.1213 21.8445C42.0736 21.7946 42.0365 21.7356 42.0122 21.671C41.9879 21.6064 41.9769 21.5376 41.98 21.4686Z"
      style={{
        fill: 'var(--class-color, currentColor)',
      }}
    />
    <path
      d="M22.464 16.1116C22.5312 16.1113 22.5977 16.1244 22.6599 16.1499C22.722 16.1755 22.7784 16.2132 22.8259 16.2607C22.8734 16.3082 22.9111 16.3646 22.9366 16.4267C22.9622 16.4888 22.9753 16.5554 22.975 16.6226V21.4696C22.9781 21.5385 22.9671 21.6074 22.9428 21.672C22.9185 21.7366 22.8814 21.7956 22.8337 21.8454C22.786 21.8953 22.7287 21.935 22.6653 21.9621C22.6018 21.9892 22.5335 22.0032 22.4645 22.0032C22.3955 22.0032 22.3272 21.9892 22.2637 21.9621C22.2003 21.935 22.143 21.8953 22.0953 21.8454C22.0476 21.7956 22.0105 21.7366 21.9862 21.672C21.9619 21.6074 21.951 21.5385 21.954 21.4696V16.6226C21.9537 16.5555 21.9667 16.489 21.9923 16.4269C22.0178 16.3649 22.0553 16.3085 22.1027 16.261C22.1501 16.2135 22.2064 16.1759 22.2684 16.1502C22.3304 16.1246 22.3969 16.1114 22.464 16.1116Z"
      style={{
        fill: 'var(--class-color, currentColor)',
      }}
    />
    <path
      d="M66.202 15.5956C67.8439 16.51 69.321 17.6931 70.572 19.0956C70.6161 19.1475 70.6494 19.2077 70.67 19.2727C70.6905 19.3376 70.6978 19.4061 70.6915 19.4739C70.6852 19.5417 70.6654 19.6076 70.6332 19.6677C70.6011 19.7278 70.5572 19.7808 70.5043 19.8237C70.4513 19.8666 70.3903 19.8984 70.3249 19.9174C70.2595 19.9364 70.1909 19.942 70.1232 19.9341C70.0555 19.9262 69.9901 19.9048 69.9308 19.8712C69.8716 19.8376 69.8196 19.7925 69.778 19.7386C68.6084 18.4423 67.2362 17.3444 65.715 16.4876C65.6559 16.4562 65.6036 16.4134 65.5612 16.3617C65.5188 16.3099 65.487 16.2503 65.4679 16.1861C65.4487 16.122 65.4425 16.0548 65.4495 15.9882C65.4566 15.9217 65.4768 15.8572 65.509 15.7986C65.5742 15.68 65.6838 15.5921 65.8136 15.5541C65.9435 15.5161 66.0831 15.531 66.202 15.5956Z"
      style={{
        fill: 'var(--class-color, currentColor)',
      }}
    />
    <path
      d="M1 26.3776C1 29.2196 3 29.9696 4.06 29.9696H8.37201C8.51909 32.0049 9.43138 33.909 10.9254 35.2989C12.4194 36.6889 14.3844 37.4616 16.425 37.4616C18.4656 37.4616 20.4306 36.6889 21.9246 35.2989C23.4186 33.909 24.3309 32.0049 24.478 29.9696H63.019C63.1678 32.0041 64.0809 33.9069 65.575 35.2958C67.0692 36.6847 69.0336 37.4566 71.0735 37.4566C73.1135 37.4566 75.0778 36.6847 76.572 35.2958C78.0661 33.9069 78.9792 32.0041 79.128 29.9696H82.928C82.9679 29.9738 83.0079 29.9758 83.048 29.9756C83.4936 29.9864 83.9367 29.907 84.3507 29.7419C84.7648 29.5769 85.141 29.3296 85.4569 29.0152C85.7728 28.7007 86.0217 28.3255 86.1886 27.9123C86.3555 27.499 86.4369 27.0562 86.428 26.6105L86.44 26.4105C86.5406 25.6997 86.5186 24.9769 86.375 24.2736C86.2862 23.8563 86.0816 23.4726 85.7846 23.1664C85.4876 22.8602 85.1103 22.644 84.696 22.5426C83.623 18.1106 75.713 15.2426 69.319 12.9196C67.471 12.2456 65.727 11.6196 64.355 11.0196C62.6917 10.2404 61.1025 9.31194 59.607 8.24556C55.461 5.47456 50.762 2.33455 39.377 1.45755C29.1183 0.768286 18.8221 0.857881 8.577 1.72555C8.45506 1.74115 8.3416 1.7963 8.254 1.88255C2.137 8.37155 2.754 19.9106 2.992 22.5466C1.354 22.8096 1 24.2736 1 26.3776ZM63.976 29.3396C63.976 27.9353 64.3924 26.5626 65.1726 25.395C65.9527 24.2274 67.0616 23.3174 68.3589 22.78C69.6563 22.2426 71.0839 22.102 72.4612 22.376C73.8384 22.6499 75.1035 23.3261 76.0965 24.3191C77.0894 25.312 77.7656 26.5772 78.0396 27.9544C78.3135 29.3317 78.1729 30.7593 77.6356 32.0566C77.0982 33.354 76.1881 34.4628 75.0205 35.243C73.8529 36.0232 72.4802 36.4396 71.076 36.4396C70.1432 36.4401 69.2194 36.2568 68.3575 35.9001C67.4955 35.5435 66.7123 35.0205 66.0526 34.3611C65.3929 33.7016 64.8695 32.9186 64.5125 32.0568C64.1555 31.195 63.9719 30.2714 63.972 29.3386L63.976 29.3396ZM9.332 29.3396C9.332 27.935 9.74862 26.5619 10.5291 25.3942C11.3096 24.2264 12.419 23.3164 13.7168 22.7792C15.0146 22.2421 16.4426 22.102 17.8201 22.3766C19.1976 22.6512 20.4627 23.3282 21.4553 24.3219C22.4479 25.3157 23.1235 26.5815 23.3965 27.9593C23.6696 29.3371 23.5279 30.7649 22.9892 32.0621C22.4506 33.3594 21.5394 34.4677 20.3707 35.2469C19.2021 36.0261 17.8286 36.4411 16.424 36.4396C14.542 36.4377 12.7377 35.6887 11.4077 34.3572C10.0777 33.0257 9.33074 31.2206 9.33101 29.3386L9.332 29.3396ZM2.022 26.3776C2.022 23.7476 2.616 23.5296 3.522 23.5236L3.543 23.5355H9.27901C9.41049 23.5297 9.53466 23.4734 9.62564 23.3783C9.71662 23.2832 9.76741 23.1567 9.76741 23.0251C9.76741 22.8934 9.71662 22.7669 9.62564 22.6718C9.53466 22.5767 9.41049 22.5204 9.27901 22.5146H4.008C3.814 20.2206 3.178 8.92756 8.858 2.72456C18.9832 1.87494 29.1581 1.79068 39.296 2.47255C50.414 3.33055 54.996 6.39356 59.037 9.09056C60.5814 10.1948 62.2244 11.1542 63.945 11.9566C65.345 12.5626 67.103 13.1986 68.964 13.8786C74.986 16.0586 82.327 18.7596 83.545 22.5146H78.431C78.2995 22.5204 78.1754 22.5767 78.0844 22.6718C77.9934 22.7669 77.9426 22.8934 77.9426 23.0251C77.9426 23.1567 77.9934 23.2832 78.0844 23.3783C78.1754 23.4734 78.2995 23.5297 78.431 23.5355H84.265C84.28 23.5355 84.287 23.5236 84.302 23.5176L84.333 23.5296C84.398 23.5356 85.077 23.5046 85.391 24.5626C85.4939 25.15 85.5034 25.7501 85.419 26.3406L85.404 26.5466C85.4222 26.8702 85.3714 27.1941 85.2548 27.4965C85.1383 27.799 84.9587 28.0733 84.728 28.301C84.4973 28.5288 84.2208 28.7049 83.9168 28.8175C83.6129 28.9302 83.2884 28.9769 82.965 28.9546L79.155 28.9486C79.0624 26.8681 78.1707 24.9035 76.6658 23.464C75.1608 22.0246 73.1585 21.2212 71.076 21.2212C68.9934 21.2212 66.9912 22.0246 65.4862 23.464C63.9813 24.9035 63.0896 26.8681 62.997 28.9486H24.502C24.4066 26.8704 23.514 24.9089 22.0096 23.472C20.5052 22.035 18.5049 21.2332 16.4245 21.2332C14.3441 21.2332 12.3438 22.035 10.8394 23.472C9.33503 24.9089 8.44236 26.8704 8.347 28.9486H4.06C3.851 28.9486 2.021 28.8526 2.021 26.3776H2.022Z"
      style={{
        stroke: 'var(--class-color, currentColor)',
        strokeWidth: 0.25,
        strokeMiterlimit: 10,
      }}
    />
    <path
      d="M9.21 10.0036C9.16227 10.5545 9.23131 11.1094 9.41259 11.6318C9.59386 12.1543 9.88329 12.6326 10.262 13.0356C11.874 14.7306 14.937 15.0836 17.222 15.0836C17.8463 15.0879 18.4705 15.0602 19.092 15.0006L64.052 15.0066C64.1209 15.0097 64.1898 14.9987 64.2544 14.9744C64.319 14.9501 64.378 14.913 64.4279 14.8653C64.4777 14.8176 64.5174 14.7603 64.5445 14.6969C64.5716 14.6334 64.5856 14.5651 64.5856 14.4961C64.5856 14.4271 64.5716 14.3588 64.5445 14.2953C64.5174 14.2319 64.4777 14.1746 64.4279 14.1269C64.378 14.0792 64.319 14.0421 64.2544 14.0178C64.1898 13.9935 64.1209 13.9826 64.052 13.9856C63.054 13.5566 62.0853 13.0625 61.152 12.5066C56.352 9.88961 47.417 5.0176 39.276 4.3936C35.216 4.0796 30.809 3.92261 26.184 3.92261C18.384 3.92261 13.344 4.38061 11.194 4.57161L10.717 4.61461C10.6165 4.62353 10.5209 4.66186 10.4421 4.72482C10.3634 4.78779 10.3049 4.87258 10.274 4.9686C9.69457 6.59146 9.33667 8.28506 9.21 10.0036ZM41.982 5.79361V13.9866H22.93V4.9756C23.96 4.9576 25.03 4.94461 26.187 4.94461C30.787 4.94461 35.167 5.1016 39.202 5.4086C40.1362 5.48679 41.0656 5.61532 41.986 5.79361H41.982ZM43.01 13.9866V6.01561C49.81 7.51061 56.683 11.2346 60.669 13.4026C61.066 13.6266 61.42 13.8156 61.733 13.9866H43.01ZM10.229 10.0566C10.3372 8.53739 10.6455 7.03909 11.146 5.6006L11.284 5.58861C12.994 5.43761 16.574 5.1216 21.903 4.9946V13.9876H19.031C18.966 13.9876 18.241 14.0706 17.22 14.0706C15.51 14.0706 12.432 13.8426 11.005 12.3356C10.7213 12.0326 10.5057 11.6723 10.3729 11.2791C10.2401 10.8858 10.1931 10.4686 10.235 10.0556L10.229 10.0566Z"
      style={{
        stroke: 'var(--class-color, currentColor)',
        strokeWidth: 0.25,
        strokeMiterlimit: 10,
      }}
    />
    <path
      d="M23.676 22.5145H63.82C63.9515 22.5203 64.0757 22.5767 64.1666 22.6718C64.2576 22.7669 64.3084 22.8934 64.3084 23.025C64.3084 23.1567 64.2576 23.2832 64.1666 23.3783C64.0757 23.4734 63.9515 23.5297 63.82 23.5355H23.676C23.5445 23.5297 23.4203 23.4734 23.3294 23.3783C23.2384 23.2832 23.1876 23.1567 23.1876 23.025C23.1876 22.8934 23.2384 22.7669 23.3294 22.6718C23.4203 22.5767 23.5445 22.5203 23.676 22.5145Z"
      style={{
        stroke: 'var(--class-color, currentColor)',
        strokeWidth: 0.25,
        strokeMiterlimit: 10,
      }}
    />
    <path
      d="M66.184 29.3396C66.184 30.3067 66.4708 31.2522 67.0081 32.0563C67.5454 32.8605 68.3092 33.4872 69.2027 33.8573C70.0962 34.2275 71.0794 34.3243 72.028 34.1356C72.9766 33.9469 73.8479 33.4812 74.5318 32.7973C75.2156 32.1135 75.6814 31.2421 75.87 30.2936C76.0587 29.345 75.9619 28.3618 75.5918 27.4683C75.2217 26.5747 74.5949 25.811 73.7907 25.2737C72.9866 24.7364 72.0412 24.4496 71.074 24.4496C69.7774 24.4506 68.5342 24.9662 67.6174 25.883C66.7006 26.7998 66.1851 28.043 66.184 29.3396ZM67.205 29.3396C67.205 28.5744 67.4319 27.8263 67.857 27.1901C68.2822 26.5538 68.8864 26.0579 69.5934 25.7651C70.3004 25.4723 71.0783 25.3956 71.8288 25.5449C72.5793 25.6942 73.2687 26.0627 73.8098 26.6038C74.3509 27.1449 74.7194 27.8343 74.8687 28.5848C75.0179 29.3353 74.9413 30.1132 74.6485 30.8202C74.3557 31.5271 73.8597 32.1314 73.2235 32.5565C72.5872 32.9817 71.8392 33.2086 71.074 33.2086C70.0485 33.2067 69.0654 32.7985 68.3403 32.0733C67.6151 31.3482 67.2069 30.3651 67.205 29.3396Z"
      style={{
        stroke: 'var(--class-color, currentColor)',
        strokeWidth: 0.25,
        strokeMiterlimit: 10,
      }}
    />
    <path
      d="M11.536 29.3396C11.536 30.3069 11.8229 31.2524 12.3603 32.0566C12.8978 32.8608 13.6617 33.4876 14.5554 33.8576C15.4491 34.2277 16.4325 34.3243 17.3811 34.1354C18.3298 33.9465 19.2011 33.4804 19.8848 32.7963C20.5686 32.1121 21.0341 31.2405 21.2224 30.2917C21.4108 29.343 21.3135 28.3597 20.9429 27.4662C20.5723 26.5727 19.9451 25.8092 19.1406 25.2722C18.336 24.7353 17.3903 24.449 16.423 24.4496C15.1268 24.4509 13.8841 24.9666 12.9678 25.8835C12.0515 26.8003 11.5365 28.0434 11.536 29.3396ZM12.557 29.3396C12.557 28.5742 12.784 27.8261 13.2093 27.1898C13.6345 26.5534 14.2389 26.0575 14.9461 25.7648C15.6532 25.4721 16.4313 25.3956 17.1819 25.5451C17.9325 25.6947 18.6219 26.0635 19.1629 26.6048C19.7038 27.1462 20.0721 27.8359 20.221 28.5866C20.37 29.3373 20.2929 30.1154 19.9996 30.8223C19.7063 31.5292 19.21 32.1332 18.5733 32.558C17.9367 32.9828 17.1883 33.2092 16.423 33.2086C15.3977 33.2067 14.415 32.7984 13.6903 32.0732C12.9656 31.3479 12.5581 30.3649 12.557 29.3396Z"
      style={{
        stroke: 'var(--class-color, currentColor)',
        strokeWidth: 0.25,
        strokeMiterlimit: 10,
      }}
    />
    <path
      d="M41.98 21.4686V16.6216C41.9769 16.5527 41.9879 16.4838 42.0122 16.4192C42.0365 16.3546 42.0736 16.2956 42.1213 16.2458C42.169 16.1959 42.2263 16.1562 42.2897 16.1291C42.3532 16.102 42.4215 16.088 42.4905 16.088C42.5595 16.088 42.6278 16.102 42.6913 16.1291C42.7547 16.1562 42.812 16.1959 42.8597 16.2458C42.9074 16.2956 42.9445 16.3546 42.9688 16.4192C42.9931 16.4838 43.0041 16.5527 43.001 16.6216V21.4686C43.0041 21.5376 42.9931 21.6064 42.9688 21.671C42.9445 21.7356 42.9074 21.7946 42.8597 21.8445C42.812 21.8943 42.7547 21.934 42.6913 21.9611C42.6278 21.9882 42.5595 22.0022 42.4905 22.0022C42.4215 22.0022 42.3532 21.9882 42.2897 21.9611C42.2263 21.934 42.169 21.8943 42.1213 21.8445C42.0736 21.7946 42.0365 21.7356 42.0122 21.671C41.9879 21.6064 41.9769 21.5376 41.98 21.4686Z"
      style={{
        stroke: 'var(--class-color, currentColor)',
        strokeWidth: 0.25,
        strokeMiterlimit: 10,
      }}
    />
    <path
      d="M22.464 16.1116C22.5312 16.1113 22.5977 16.1244 22.6599 16.1499C22.722 16.1755 22.7784 16.2132 22.8259 16.2607C22.8734 16.3082 22.9111 16.3646 22.9366 16.4267C22.9622 16.4888 22.9753 16.5554 22.975 16.6226V21.4696C22.9781 21.5385 22.9671 21.6074 22.9428 21.672C22.9185 21.7366 22.8814 21.7956 22.8337 21.8454C22.786 21.8953 22.7287 21.935 22.6653 21.9621C22.6018 21.9892 22.5335 22.0032 22.4645 22.0032C22.3955 22.0032 22.3272 21.9892 22.2637 21.9621C22.2003 21.935 22.143 21.8953 22.0953 21.8454C22.0476 21.7956 22.0105 21.7366 21.9862 21.672C21.9619 21.6074 21.951 21.5385 21.954 21.4696V16.6226C21.9537 16.5555 21.9667 16.489 21.9923 16.4269C22.0178 16.3649 22.0553 16.3085 22.1027 16.261C22.1501 16.2135 22.2064 16.1759 22.2684 16.1502C22.3304 16.1246 22.3969 16.1114 22.464 16.1116Z"
      style={{
        stroke: 'var(--class-color, currentColor)',
        strokeWidth: 0.25,
        strokeMiterlimit: 10,
      }}
    />
    <path
      d="M66.202 15.5956C67.8439 16.51 69.321 17.6931 70.572 19.0956C70.6161 19.1475 70.6494 19.2077 70.67 19.2727C70.6905 19.3376 70.6978 19.4061 70.6915 19.4739C70.6852 19.5417 70.6654 19.6076 70.6332 19.6677C70.6011 19.7278 70.5572 19.7808 70.5043 19.8237C70.4513 19.8666 70.3903 19.8984 70.3249 19.9174C70.2595 19.9364 70.1909 19.942 70.1232 19.9341C70.0555 19.9262 69.9901 19.9048 69.9308 19.8712C69.8716 19.8376 69.8196 19.7925 69.778 19.7386C68.6084 18.4423 67.2362 17.3444 65.715 16.4876C65.6559 16.4562 65.6036 16.4134 65.5612 16.3617C65.5188 16.3099 65.487 16.2503 65.4679 16.1861C65.4487 16.122 65.4425 16.0548 65.4495 15.9882C65.4566 15.9217 65.4768 15.8572 65.509 15.7986C65.5742 15.68 65.6838 15.5921 65.8136 15.5541C65.9435 15.5161 66.0831 15.531 66.202 15.5956Z"
      style={{
        stroke: 'var(--class-color, currentColor)',
        strokeWidth: 0.25,
        strokeMiterlimit: 10,
      }}
    />
  </svg>
));

export default Svg;
