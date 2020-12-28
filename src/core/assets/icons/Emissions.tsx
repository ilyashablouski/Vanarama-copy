import React, { FC, memo } from 'react';

const Svg: FC = memo(() => (
  <svg width="1em" height="1em" viewBox="0 0 64 64">
    <title>Emissions</title>
    <path
      d="M50.7394 31.4579C50.521 29.4123 49.7901 27.4548 48.6143 25.7667C47.4385 24.0785 45.8559 22.7142 44.0129 21.8001C42.1699 20.886 40.126 20.4516 38.0706 20.5371C36.0151 20.6226 34.0144 21.2252 32.2536 22.2892C30.6408 21.1584 28.7631 20.4635 26.8027 20.272C24.8423 20.0804 22.8656 20.3985 21.0644 21.1957C19.2631 21.9928 17.6983 23.2417 16.5218 24.8215C15.3452 26.4013 14.5968 28.2582 14.3491 30.2124C11.5852 31.0843 9.22468 32.9166 7.6945 35.3778C6.16433 37.8391 5.56556 40.7667 6.00654 43.6311C6.44752 46.4955 7.89911 49.1074 10.0987 50.9945C12.2983 52.8815 15.1007 53.919 17.9988 53.9192H19.1925C20.7337 55.8101 22.6766 57.3342 24.88 58.381C27.0835 59.4277 29.4924 59.9707 31.9318 59.9707C34.3713 59.9707 36.7801 59.4277 38.9836 58.381C41.1871 57.3342 43.1299 55.8101 44.6711 53.9192H46.3364C49.0402 53.9196 51.6601 52.9804 53.7479 51.2624C55.8358 49.5444 57.2618 47.1543 57.7821 44.501C58.3023 41.8477 57.8845 39.0961 56.6 36.7169C55.3155 34.3376 53.2443 32.4786 50.7405 31.4579H50.7394ZM31.6258 34.8221C33.0185 33.511 34.8591 32.781 36.7718 32.781C38.6845 32.781 40.5251 33.511 41.9178 34.8221C43.2567 36.1726 44.0079 37.9974 44.0079 39.8991C44.0079 41.8008 43.2567 43.6256 41.9178 44.9761C40.525 46.2871 38.6845 47.017 36.7718 47.017C34.8592 47.017 33.0186 46.2871 31.6258 44.9761C30.2865 43.6258 29.535 41.801 29.535 39.8991C29.535 37.9972 30.2865 36.1724 31.6258 34.8221V34.8221ZM18.0561 34.8316C18.7305 34.1622 19.5329 33.6357 20.4154 33.2833C21.2979 32.931 22.2423 32.7601 23.1923 32.7809C24.2712 32.7637 25.3405 32.9865 26.3228 33.4333C27.305 33.8801 28.1756 34.5397 28.8716 35.3644L26.9603 37.5331C26.5408 36.9671 25.9937 36.5079 25.3636 36.1928C24.7334 35.8777 24.0378 35.7156 23.3333 35.7196C22.2344 35.6977 21.17 36.1042 20.3655 36.8532C19.544 37.6091 19.1333 38.6278 19.1335 39.9093C19.1337 41.1908 19.5214 42.2196 20.2967 42.9957C20.6624 43.3717 21.1011 43.669 21.586 43.869C22.0709 44.0691 22.5915 44.1677 23.116 44.1589C23.8317 44.1732 24.5407 44.0181 25.185 43.7061C25.8293 43.3942 26.3908 42.9344 26.8236 42.3641L28.7948 44.3947C27.23 46.1565 25.3866 47.0376 23.2645 47.0378C21.1424 47.0379 19.3942 46.3674 18.0198 45.0262C16.6912 43.6598 15.9512 41.827 15.9585 39.9211C15.9659 38.0153 16.7201 36.1882 18.0592 34.8321L18.0561 34.8316ZM47.999 48.1017H44.0957V47.0878L45.6634 45.4813C45.8995 45.2506 46.1182 45.0025 46.3174 44.7392C46.4263 44.6 46.4893 44.4305 46.4978 44.2539C46.5 44.186 46.4884 44.1183 46.4637 44.0551C46.4389 43.9918 46.4016 43.9342 46.3539 43.8857C46.3058 43.837 46.248 43.7988 46.1842 43.7737C46.1205 43.7485 46.0522 43.737 45.9837 43.7398C45.6924 43.7398 45.4057 43.9612 45.1314 44.3976L45.0784 44.4813L43.9642 43.8221L44.0217 43.7332C44.2363 43.382 44.5204 43.0783 44.8565 42.8408C45.2088 42.6231 45.618 42.5152 46.0318 42.5308C46.4927 42.5256 46.94 42.6873 47.2909 42.9862C47.472 43.1393 47.6157 43.3318 47.7111 43.5489C47.8065 43.766 47.851 44.002 47.8413 44.2389C47.8405 44.5288 47.7649 44.8135 47.6219 45.0657C47.4028 45.4192 47.1418 45.7452 46.8447 46.0363L46.0641 46.8478H47.9987L47.999 48.1017ZM33.8731 43.0435C33.1108 42.1752 32.6904 41.0592 32.6904 39.9037C32.6904 38.7482 33.1108 37.6322 33.8731 36.7639C34.2388 36.3543 34.687 36.0265 35.1882 35.8021C35.6894 35.5777 36.2323 35.4617 36.7815 35.4617C37.3306 35.4617 37.8736 35.5777 38.3748 35.8021C38.8759 36.0265 39.3241 36.3543 39.6898 36.7639C40.4525 37.6321 40.8731 38.7481 40.8731 39.9037C40.8731 41.0593 40.4525 42.1754 39.6898 43.0435C39.3223 43.4502 38.8736 43.7752 38.3726 43.9977C37.8716 44.2202 37.3296 44.3352 36.7815 44.3352C36.2333 44.3352 35.6913 44.2202 35.1903 43.9977C34.6894 43.7752 34.2406 43.4502 33.8731 43.0435ZM10.4809 22.0367C11.0135 22.0368 11.5342 22.1948 11.977 22.4907C12.4199 22.7867 12.765 23.2073 12.9688 23.6994C13.1726 24.1915 13.2259 24.733 13.122 25.2554C13.0181 25.7777 12.7616 26.2576 12.385 26.6342C12.0083 27.0109 11.5285 27.2673 11.0061 27.3713C10.4837 27.4752 9.9422 27.4219 9.4501 27.2181C8.958 27.0143 8.53738 26.6691 8.24143 26.2263C7.94548 25.7835 7.78748 25.2628 7.78743 24.7302C7.78743 24.0158 8.0712 23.3307 8.57632 22.8256C9.08144 22.3205 9.76654 22.0367 10.4809 22.0367V22.0367ZM7.76757 14.9897C7.76762 14.6421 7.87077 14.3022 8.06397 14.0132C8.25717 13.7241 8.53174 13.4988 8.85296 13.3658C9.17419 13.2328 9.52764 13.198 9.86862 13.2659C10.2096 13.3338 10.5228 13.5012 10.7686 13.7471C11.0145 13.9929 11.1819 14.3062 11.2497 14.6472C11.3175 14.9882 11.2826 15.3416 11.1496 15.6628C11.0165 15.984 10.7912 16.2586 10.5021 16.4517C10.213 16.6449 9.87317 16.7479 9.5255 16.7479C9.29459 16.7479 9.06596 16.7024 8.85265 16.614C8.63935 16.5255 8.44555 16.396 8.28233 16.2327C8.11911 16.0693 7.98967 15.8754 7.90139 15.6621C7.81312 15.4487 7.76774 15.2201 7.76785 14.9892L7.76757 14.9897ZM30.1739 5.5337C30.1739 5.18596 30.277 4.84602 30.4702 4.55689C30.6634 4.26775 30.938 4.04239 31.2593 3.90932C31.5805 3.77624 31.9341 3.74143 32.2751 3.80927C32.6162 3.87711 32.9295 4.04456 33.1754 4.29045C33.4213 4.53634 33.5887 4.84963 33.6565 5.19069C33.7244 5.53175 33.6896 5.88527 33.5565 6.20654C33.4234 6.52781 33.1981 6.80241 32.9089 6.9956C32.6198 7.1888 32.2799 7.29192 31.9321 7.29192C31.7012 7.29192 31.4725 7.24642 31.2591 7.15803C31.0458 7.06963 30.8519 6.94007 30.6887 6.77674C30.5254 6.61342 30.3959 6.41952 30.3076 6.20614C30.2192 5.99276 30.1738 5.76406 30.1739 5.53312V5.5337ZM39.7477 8.46694C39.7477 8.19788 39.8274 7.93486 39.9769 7.71114C40.1264 7.48742 40.3389 7.31306 40.5875 7.21009C40.836 7.10713 41.1096 7.08019 41.3735 7.13268C41.6374 7.18517 41.8798 7.31473 42.07 7.50499C42.2603 7.69525 42.3898 7.93765 42.4423 8.20154C42.4948 8.46543 42.4679 8.73896 42.3649 8.98754C42.2619 9.23612 42.0876 9.44859 41.8639 9.59807C41.6401 9.74755 41.3771 9.82734 41.1081 9.82734C40.9294 9.82734 40.7524 9.79213 40.5873 9.72373C40.4222 9.65533 40.2722 9.55507 40.1459 9.42869C40.0196 9.3023 39.9194 9.15226 39.851 8.98714C39.7827 8.82203 39.7476 8.64506 39.7477 8.46636V8.46694ZM20.4683 7.40965C20.4684 7.1406 20.5482 6.87761 20.6977 6.65393C20.8472 6.43025 21.0597 6.25593 21.3083 6.15301C21.5569 6.05008 21.8304 6.02319 22.0943 6.07571C22.3581 6.12823 22.6005 6.25782 22.7907 6.44809C22.981 6.63836 23.1105 6.88076 23.163 7.14464C23.2154 7.40853 23.1885 7.68204 23.0855 7.93061C22.9825 8.17917 22.8082 8.39162 22.5845 8.54109C22.3608 8.69056 22.0977 8.77034 21.8287 8.77034C21.65 8.7703 21.4731 8.73506 21.308 8.66662C21.1429 8.59818 20.9929 8.49789 20.8666 8.37148C20.7403 8.24506 20.6402 8.09501 20.5719 7.92987C20.5036 7.76474 20.4685 7.58777 20.4686 7.40907L20.4683 7.40965ZM42.6058 15.7177C42.6058 15.2734 42.7375 14.839 42.9844 14.4695C43.2313 14.1 43.5822 13.8121 43.9927 13.642C44.4032 13.472 44.855 13.4275 45.2908 13.5142C45.7266 13.6009 46.1269 13.8148 46.4411 14.1291C46.7553 14.4433 46.9693 14.8436 47.056 15.2794C47.1427 15.7152 47.0982 16.167 46.9282 16.5775C46.7581 16.988 46.4701 17.3389 46.1007 17.5858C45.7312 17.8327 45.2968 17.9644 44.8525 17.9644C44.5574 17.9644 44.2652 17.9062 43.9927 17.7933C43.7201 17.6803 43.4724 17.5148 43.2638 17.3061C43.0552 17.0974 42.8897 16.8497 42.7769 16.577C42.664 16.3044 42.606 16.0122 42.6061 15.7171L42.6058 15.7177ZM16.8396 15.0795C16.8396 14.6351 16.9714 14.2007 17.2183 13.8312C17.4653 13.4617 17.8162 13.1737 18.2269 13.0037C18.6375 12.8337 19.0893 12.7893 19.5251 12.8761C19.961 12.9629 20.3613 13.177 20.6755 13.4914C20.9896 13.8057 21.2035 14.2062 21.29 14.6421C21.3765 15.078 21.3318 15.5298 21.1616 15.9403C20.9913 16.3508 20.7031 16.7016 20.3335 16.9483C19.9638 17.195 19.5293 17.3265 19.0849 17.3262C18.7899 17.3262 18.4978 17.268 18.2253 17.1551C17.9528 17.0421 17.7052 16.8765 17.4967 16.6678C17.2882 16.4591 17.1229 16.2114 17.0102 15.9387C16.8975 15.6661 16.8396 15.374 16.8399 15.079L16.8396 15.0795ZM51.995 14.4417C51.995 14.0939 52.0981 13.754 52.2913 13.4649C52.4845 13.1757 52.7591 12.9504 53.0803 12.8173C53.4016 12.6842 53.7551 12.6494 54.0961 12.7172C54.4372 12.785 54.7505 12.9524 54.9964 13.1983C55.2423 13.4442 55.4098 13.7574 55.4776 14.0985C55.5455 14.4395 55.5107 14.793 55.3777 15.1143C55.2447 15.4356 55.0194 15.7102 54.7303 15.9034C54.4412 16.0966 54.1013 16.1998 53.7535 16.1999C53.5226 16.1999 53.2939 16.1544 53.0806 16.066C52.8672 15.9776 52.6733 15.848 52.5101 15.6847C52.3468 15.5214 52.2173 15.3275 52.129 15.1141C52.0407 14.9007 51.9952 14.672 51.9953 14.4411L51.995 14.4417ZM29.0967 15.2082C29.0967 14.6475 29.263 14.0994 29.5745 13.6331C29.8861 13.1669 30.3288 12.8035 30.8469 12.5889C31.3649 12.3744 31.935 12.3182 32.4849 12.4276C33.0349 12.537 33.54 12.807 33.9365 13.2035C34.333 13.6 34.603 14.1052 34.7124 14.6551C34.8218 15.2051 34.7657 15.7751 34.5511 16.2931C34.3365 16.8112 33.9731 17.254 33.5069 17.5655C33.0407 17.877 32.4925 18.0433 31.9318 18.0433C31.5595 18.0433 31.1908 17.9699 30.8468 17.8273C30.5029 17.6848 30.1903 17.4759 29.9271 17.2126C29.6639 16.9493 29.4551 16.6367 29.3126 16.2927C29.1702 15.9487 29.097 15.58 29.097 15.2076L29.0967 15.2082ZM51.278 24.3482C51.278 23.8155 51.4359 23.2947 51.7319 22.8518C52.0279 22.4088 52.4485 22.0636 52.9407 21.8597C53.4328 21.6559 53.9744 21.6025 54.4969 21.7065C55.0194 21.8104 55.4993 22.0669 55.876 22.4436C56.2527 22.8203 56.5092 23.3002 56.6131 23.8227C56.7171 24.3452 56.6637 24.8868 56.4599 25.3789C56.256 25.8711 55.9108 26.2917 55.4678 26.5877C55.0249 26.8837 54.5041 27.0416 53.9714 27.0416C53.6177 27.0416 53.2674 26.9719 52.9406 26.8365C52.6138 26.7011 52.3169 26.5026 52.0668 26.2524C51.8168 26.0023 51.6184 25.7053 51.4831 25.3785C51.3478 25.0516 51.2782 24.7013 51.2783 24.3476L51.278 24.3482Z"
      fill="currentColor"
    />
  </svg>
));

export default Svg;