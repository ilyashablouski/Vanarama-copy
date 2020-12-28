import React, { FC, memo } from 'react';

const Svg: FC = memo(() => (
  <svg width="1em" height="1em" viewBox="0 0 64 64">
    <title>WarrantyRosette2</title>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M55.5891 28.3231C55.5891 27.5567 56.0734 26.7096 56.5863 25.8125L56.5896 25.8067C57.2216 24.7032 57.8743 23.5627 57.6275 22.4746C57.3806 21.3866 56.2987 20.6393 55.2525 19.917L55.2485 19.9143L55.2485 19.9143C54.3978 19.3262 53.5945 18.7709 53.2632 18.0792C52.9134 17.3499 52.9863 16.3011 53.0573 15.2874C53.1439 14.0447 53.2329 12.76 52.5672 11.9241C51.8867 11.0703 50.6006 10.8687 49.3569 10.6738L49.3558 10.6737L49.3534 10.6733C48.3628 10.518 47.3385 10.3574 46.7235 9.86667C46.104 9.37174 45.7191 8.40499 45.3468 7.46994L45.3452 7.46585C44.882 6.2998 44.4021 5.09449 43.4265 4.62213C43.0944 4.46785 42.7312 4.39203 42.3651 4.40054C41.5647 4.4523 40.7752 4.61456 40.0193 4.88272C39.0437 5.17556 37.9955 5.46111 37.2687 5.29365C36.51 5.11897 35.7521 4.42106 35.0183 3.74532L35.0166 3.74376C34.0859 2.88676 33.1234 2.00056 32.0202 2C30.966 2 30.023 2.86216 29.1108 3.6961L29.1089 3.69788L29.1005 3.70552C28.3458 4.39485 27.5677 5.10555 26.7687 5.28692C26.0186 5.4569 24.962 5.16349 23.9715 4.86392C23.2202 4.59345 22.4348 4.42944 21.638 4.37669C21.2843 4.36858 20.9334 4.44121 20.6119 4.58903C19.6173 5.06588 19.1317 6.28073 18.6622 7.4566L18.6612 7.45915C18.2915 8.38401 17.909 9.34089 17.3009 9.82599C16.6745 10.3244 15.6417 10.4866 14.642 10.6428L14.6376 10.6435H14.6375C13.4031 10.8368 12.1279 11.0365 11.4569 11.8784C10.7809 12.7245 10.8677 14.0167 10.9517 15.2681L10.9525 15.28C11.0208 16.2833 11.0914 17.3203 10.7447 18.0332C10.402 18.742 9.54672 19.3297 8.71896 19.898L8.7174 19.899C7.68003 20.6115 6.60694 21.3484 6.36275 22.4121C6.12264 23.4533 6.75826 24.5739 7.37256 25.6569C7.87437 26.5411 8.39302 27.4552 8.39246 28.2656C8.39246 29.032 7.90812 29.8791 7.39517 30.7763L7.39191 30.782C6.75966 31.8852 6.10693 33.026 6.35405 34.1138C6.60117 35.2016 7.68279 35.9491 8.72906 36.6719L8.73454 36.6757C9.58468 37.2634 10.3872 37.8181 10.7184 38.5095C11.0682 39.2388 10.9952 40.2882 10.9243 41.3022L10.924 41.306C10.8377 42.5474 10.7485 43.8301 11.414 44.6654C12.0942 45.5192 13.3809 45.7209 14.6255 45.9156C14.9375 45.9644 15.2527 46.0137 15.5575 46.0737C17.3157 45.7175 19.0826 45.419 20.8555 45.1782C18.0428 43.3231 15.7117 40.7771 14.109 37.7446C11.6024 33.0019 11.0826 27.4577 12.6637 22.3318C13.8429 18.5091 16.1291 15.122 19.2332 12.5987C22.3374 10.0754 26.12 8.52927 30.1029 8.1558C34.0858 7.78232 38.09 8.59828 41.6091 10.5005C45.1282 12.4028 48.0043 15.3058 49.8735 18.8426C51.7427 22.3794 52.5212 26.391 52.1105 30.3702C51.6998 34.3494 50.1183 38.1175 47.5661 41.1979C46.2842 42.7451 44.7863 44.0839 43.127 45.1782C44.9228 45.422 46.7126 45.7252 48.4934 46.0876C48.7716 46.0349 49.057 45.9902 49.3396 45.9459L49.3398 45.9459L49.3469 45.9448C50.5789 45.7516 51.8544 45.5516 52.5254 44.71C53.2014 43.8629 53.1145 42.5689 53.0284 41.3159C52.9602 40.31 52.8898 39.27 53.2357 38.5552C53.5787 37.8464 54.4343 37.2583 55.2618 36.6906C56.2994 35.9777 57.3731 35.2401 57.6174 34.1763C57.8575 33.1351 57.2222 32.0145 56.6076 30.9315C56.1058 30.0468 55.5888 29.1329 55.5891 28.3231ZM33.0404 54.3055C32.3132 54.295 31.5859 54.2955 30.8588 54.3068C31.2122 54.4821 31.578 54.5889 31.9608 54.589C32.3334 54.589 32.6921 54.4814 33.0404 54.3055Z"
      fill="currentColor"
    />
    <path
      d="M62 51.964C59.761 50.5994 57.5653 48.8645 55.3058 47.1318L50.6826 54.4249C52.6843 56.1575 54.5704 57.8955 56.517 59.1053L55.1706 52.7988L62 51.964Z"
      fill="currentColor"
    />
    <path
      d="M1.98279 51.964C4.22175 50.5994 6.41752 48.8645 8.67611 47.1318L13.3002 54.4249C11.2988 56.1575 9.41243 57.8955 7.46575 59.1053L8.80991 52.7988L1.98279 51.964Z"
      fill="currentColor"
    />
    <path
      d="M25.3317 35.7322C25.3161 35.5505 25.2293 35.3824 25.0902 35.2645C24.9511 35.1467 24.771 35.0886 24.5892 35.1031H23.6611C23.3381 36.033 22.8829 36.9116 22.3095 37.7117C21.8716 37.0785 21.4883 36.4093 21.1637 35.7112C21.0457 35.5091 20.8727 35.3446 20.665 35.237C20.4572 35.1293 20.2231 35.0829 19.99 35.1031H19C19.5062 36.5952 20.263 37.9901 21.2378 39.228V41.1255C21.2345 41.2708 21.2608 41.4153 21.3153 41.5501C21.3697 41.6848 21.451 41.8071 21.5543 41.9094C21.6575 42.0117 21.7806 42.0919 21.9159 42.1451C22.0512 42.1982 22.1959 42.2232 22.3412 42.2186H23.1971V39.2395C23.8571 38.4855 25.3317 36.3303 25.3317 35.7322ZM31.2613 41.2702V40.517C30.7186 40.6539 30.1606 40.7197 29.601 40.713H29.0854C28.0954 40.713 27.8479 40.4456 27.8479 39.6818V39.4239H29.5284C30.2193 39.4239 30.6009 39.1352 30.6009 38.6196V37.9081H27.8475C27.8513 37.5049 27.8754 37.1022 27.9197 36.7015H30.0853C30.9103 36.7015 31.2693 36.2478 31.2693 35.5672V35.1031H27.3942C27.2256 35.0832 27.0548 35.0985 26.8924 35.1479C26.73 35.1973 26.5796 35.2799 26.4508 35.3904C26.3219 35.5008 26.2173 35.6368 26.1436 35.7897C26.07 35.9426 26.0287 36.1091 26.0226 36.2787C25.9372 36.9145 25.8961 37.5554 25.8997 38.1968V39.3922C25.8997 41.3619 26.9309 42.3106 28.7974 42.3106H29.6017C30.8591 42.3114 31.2613 41.9195 31.2613 41.2698V41.2702ZM38.4386 42.2186C38.1105 39.9927 37.4094 37.8382 36.3647 35.8456C36.2207 35.6106 36.0169 35.418 35.7741 35.2875C35.5313 35.1571 35.2583 35.0934 34.9828 35.1031H34.219C32.9834 36.3922 31.6325 40.3108 31.6325 41.3401C31.6198 41.4611 31.6347 41.5835 31.6763 41.6979C31.7178 41.8123 31.7849 41.9157 31.8723 42.0003C31.9597 42.085 32.0653 42.1486 32.181 42.1864C32.2967 42.2242 32.4194 42.2352 32.54 42.2186H33.334C33.4165 41.7751 33.5403 41.0533 33.6949 40.5381H36.1493C36.2318 40.8371 36.2936 41.1155 36.3452 41.3733C36.4689 42.0123 36.8402 42.2186 37.5517 42.2186H38.4386ZM35.7471 39.0011H34.1177C34.3282 38.2696 34.6043 37.5586 34.9427 36.8768C35.2687 37.5616 35.5378 38.2722 35.7471 39.0011ZM45.1725 42.0845V42.0329C44.9803 41.7603 44.8141 41.4703 44.676 41.1667L44.1309 40.0117C43.8636 39.4446 43.6875 39.1868 43.3472 39.0321C44.0278 38.8774 44.6458 38.073 44.6458 37.1243C44.6458 35.8353 43.563 35 42.0368 35H41.2435C40.5218 35.0132 39.8046 35.1171 39.1089 35.3094V41.0945C39.1032 41.2508 39.1311 41.4066 39.1909 41.5511C39.2507 41.6956 39.3408 41.8256 39.4553 41.9323C39.5697 42.0389 39.7058 42.1196 39.8542 42.169C40.0026 42.2184 40.1599 42.2353 40.3154 42.2186H41.0682V39.5477L41.3776 39.5786C41.8416 39.6302 42.0376 39.7539 42.316 40.3624L42.8419 41.5173C42.9501 41.7604 43.1315 41.9635 43.3607 42.0985C43.59 42.2334 43.8556 42.2934 44.1206 42.2701C44.4806 42.2859 44.8396 42.2225 45.1725 42.0845ZM41.8622 36.5465C41.9734 36.5307 42.0866 36.5408 42.1931 36.5761C42.2997 36.6113 42.3967 36.6706 42.4765 36.7495C42.5564 36.8283 42.6169 36.9245 42.6535 37.0306C42.69 37.1367 42.7016 37.2498 42.6872 37.3611C42.6905 37.4712 42.671 37.5808 42.63 37.683C42.5891 37.7853 42.5275 37.878 42.4491 37.9554C42.3708 38.0328 42.2773 38.0932 42.1745 38.1329C42.0718 38.1726 41.962 38.1907 41.8519 38.1861C41.5903 38.1925 41.3285 38.1822 41.0682 38.1552V36.5892C41.198 36.5684 41.3288 36.5546 41.4601 36.548L41.8622 36.5465Z"
      fill="currentColor"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M49.0753 57.9168C37.8473 55.2069 26.1357 55.2069 14.9077 57.9168L9.79303 49.0448C24.3155 45.001 39.6667 45.001 54.1891 49.0448L49.0753 57.9168ZM32.9926 53.0184C32.8358 53.0318 32.6787 52.9959 32.5433 52.9157C32.4079 52.8355 32.301 52.715 32.2375 52.571L31.9289 51.8872C31.7654 51.527 31.6484 51.4532 31.3755 51.4221L31.1926 51.403L31.1881 52.9822H30.7429C30.651 52.9918 30.558 52.9815 30.4704 52.952C30.3828 52.9225 30.3025 52.8745 30.2351 52.8112C30.1676 52.748 30.1145 52.671 30.0794 52.5855C30.0443 52.5 30.028 52.4079 30.0316 52.3155L30.0417 48.8934C30.4532 48.7808 30.8773 48.7206 31.3039 48.7141H31.7735C32.6759 48.7169 33.3163 49.2126 33.3126 49.975C33.3218 50.2206 33.2517 50.4626 33.1128 50.6653C32.9739 50.8681 32.7736 51.0208 32.5412 51.1009C32.7421 51.1929 32.845 51.3458 33.0027 51.6816L33.3241 52.3654C33.4048 52.5451 33.5022 52.7169 33.615 52.8784V52.909C33.418 52.9905 33.2055 53.0278 32.9926 53.0184ZM31.4293 49.6297C31.3516 49.6333 31.2742 49.6412 31.1974 49.6532L31.1945 50.5789C31.3484 50.5952 31.5032 50.6018 31.6579 50.5985C31.723 50.6014 31.7879 50.5909 31.8487 50.5675C31.9095 50.5442 31.9649 50.5087 32.0114 50.463C32.0578 50.4174 32.0944 50.3627 32.1188 50.3023C32.1432 50.242 32.155 50.1772 32.1533 50.1121C32.162 50.0463 32.1554 49.9794 32.134 49.9166C32.1126 49.8538 32.077 49.7968 32.0299 49.75C31.9828 49.7032 31.9255 49.6679 31.8626 49.6469C31.7996 49.6259 31.7327 49.6197 31.6669 49.6288L31.4293 49.6297ZM28.5783 52.9582C28.7173 53.0318 28.8759 53.0601 29.0318 53.0392C29.2443 53.0386 29.4542 52.9916 29.6467 52.9015V52.8709C29.5262 52.7149 29.4206 52.548 29.3311 52.3724L28.9771 51.7048C28.8035 51.3769 28.6932 51.2294 28.4879 51.1472C28.7162 51.056 28.9091 50.8938 29.0382 50.6845C29.1672 50.4753 29.2256 50.23 29.2046 49.9851C29.1695 49.2235 28.5076 48.759 27.6057 48.8L27.1367 48.8213C26.7107 48.8486 26.2897 48.9293 25.8837 49.0614L26.0389 52.4793C26.0397 52.5718 26.0605 52.663 26.0997 52.7468C26.1389 52.8306 26.1956 52.9049 26.2661 52.9648C26.3366 53.0248 26.4191 53.0688 26.5081 53.094C26.5971 53.1193 26.6905 53.125 26.7819 53.111L27.2265 53.0908L27.155 51.513L27.3387 51.5228C27.6144 51.5399 27.7334 51.6086 27.9143 51.9607L28.2562 52.6288C28.3266 52.7695 28.4392 52.8847 28.5783 52.9582ZM27.0759 49.7643C27.152 49.7484 27.229 49.7367 27.3064 49.7293L27.544 49.7181C27.6092 49.7058 27.6764 49.7087 27.7403 49.7267C27.8042 49.7446 27.8631 49.7771 27.9123 49.8215C27.9616 49.866 28 49.9212 28.0244 49.9829C28.0488 50.0446 28.0587 50.1111 28.0531 50.1772C28.0579 50.2422 28.0493 50.3074 28.0279 50.3689C28.0064 50.4304 27.9725 50.4868 27.9283 50.5346C27.8841 50.5824 27.8306 50.6206 27.771 50.6469C27.7114 50.6731 27.647 50.6869 27.5819 50.6872C27.4275 50.6981 27.2725 50.699 27.1179 50.69L27.0759 49.7643ZM24.4417 52.7766C24.5503 53.1463 24.78 53.247 25.199 53.208L25.7199 53.1595C25.4046 51.867 24.8736 50.637 24.1491 49.5211C24.0514 49.3907 23.9207 49.2886 23.7706 49.2251C23.6204 49.1617 23.4561 49.1393 23.2945 49.1601L22.8456 49.2022C22.1879 50.0294 21.6095 52.4114 21.6656 53.0184C21.665 53.0903 21.6807 53.1613 21.7115 53.2262C21.7424 53.2911 21.7875 53.3481 21.8436 53.393C21.8997 53.4379 21.9653 53.4695 22.0354 53.4854C22.1054 53.5012 22.1782 53.501 22.2482 53.4846L22.7155 53.4408L22.7252 53.3321C22.7484 53.0672 22.7804 52.7034 22.8353 52.431L24.2801 52.2956C24.3455 52.4681 24.3971 52.6277 24.4417 52.7766ZM23.3679 50.2075C23.2064 50.6273 23.0832 51.0609 22.9996 51.5029L23.959 51.4131C23.7953 50.9957 23.5977 50.5925 23.3679 50.2075ZM20.3915 53.7615L20.0782 53.8097C19.9722 53.826 19.8637 53.8127 19.7648 53.7714C19.6658 53.7301 19.5802 53.6623 19.5172 53.5755C19.118 53.0649 18.7885 52.5034 18.5374 51.9059C18.4589 52.6731 18.2671 53.4244 17.9683 54.1354L17.6546 54.1839C17.5471 54.2001 17.4372 54.1871 17.3364 54.1462C17.2356 54.1052 17.1477 54.038 17.0819 53.9514C16.1937 52.8675 15.5414 51.6104 15.1666 50.2602L15.8297 50.1578C15.988 50.1241 16.1531 50.1524 16.2912 50.2367C16.4293 50.321 16.5298 50.455 16.5722 50.6111C16.7794 51.2375 17.0564 51.8385 17.398 52.403C17.584 51.6187 17.6941 50.8184 17.7267 50.0131L18.1245 49.9517C18.3137 49.904 18.514 49.9317 18.6832 50.0287C18.8525 50.1258 18.9775 50.2847 19.0319 50.472C19.2387 51.0177 19.5034 51.5396 19.8215 52.0288C20.0146 51.1997 20.1073 50.3504 20.0975 49.4992L20.6762 49.41C20.7439 49.3958 20.8138 49.396 20.8814 49.4106C20.949 49.4252 21.0127 49.4539 21.0685 49.4947C21.1243 49.5355 21.1709 49.5877 21.2052 49.6477C21.2396 49.7077 21.2609 49.7743 21.2678 49.8431C21.2771 49.9059 21.2808 49.9693 21.2787 50.0327C21.1689 51.3127 20.8699 52.5692 20.3915 53.7615ZM37.212 53.1671C36.7913 53.1455 36.5787 53.0128 36.5251 52.6316C36.5024 52.4779 36.4743 52.3116 36.4348 52.1323L34.9851 52.0586C34.8913 52.3219 34.8067 52.6799 34.7455 52.9389L34.7215 53.0403L34.2525 53.0165C34.1809 53.0226 34.1089 53.0123 34.0418 52.9866C33.9748 52.9608 33.9144 52.9201 33.8654 52.8677C33.8163 52.8152 33.7798 52.7523 33.7586 52.6836C33.7373 52.615 33.7319 52.5425 33.7428 52.4715C33.7739 51.8625 34.6895 49.589 35.4592 48.865L35.91 48.888C36.0729 48.8906 36.2323 48.9364 36.3717 49.0208C36.5112 49.1051 36.6258 49.2249 36.7038 49.368C37.2606 50.5762 37.6096 51.8697 37.736 53.194L37.212 53.1671ZM35.832 49.9326C35.6118 50.3252 35.4274 50.7369 35.2811 51.1626L36.2432 51.2114C36.1414 50.7746 36.0039 50.3469 35.832 49.9326ZM41.3598 53.5598C40.8866 53.5113 40.5183 53.2653 40.2131 52.5472L39.6344 51.1887C39.5632 51.0736 39.5058 50.9505 39.4636 50.8218L39.2061 53.3396L38.7329 53.2911C38.6471 53.2852 38.5634 53.2618 38.487 53.2225C38.4106 53.1831 38.343 53.1285 38.2884 53.0621C38.2338 52.9957 38.1933 52.9188 38.1695 52.8362C38.1456 52.7536 38.1389 52.667 38.1497 52.5817L38.5121 49.0387L39.0704 49.0948C39.3502 49.1171 39.6167 49.2244 39.834 49.4022C40.0513 49.5799 40.2092 49.8198 40.2866 50.0897L40.9079 51.6858L41.1511 49.3077L41.6608 49.3598C41.8098 49.3702 41.9487 49.439 42.0474 49.5511C42.1461 49.6633 42.1965 49.8099 42.1878 49.959L41.815 53.6055L41.3598 53.5598ZM45.5394 50.8892L44.9483 50.7997L44.4622 54.0019L43.9618 53.9259C43.8767 53.925 43.7928 53.9052 43.7163 53.8679C43.6397 53.8306 43.5725 53.7767 43.5193 53.7101C43.4662 53.6436 43.4286 53.566 43.4092 53.4831C43.3899 53.4002 43.3892 53.314 43.4073 53.2308L43.8028 50.6258L42.6132 50.4448L42.6735 50.0468C42.6908 49.9686 42.7235 49.8946 42.7697 49.8292C42.8159 49.7638 42.8746 49.7082 42.9425 49.6656C43.0103 49.6231 43.086 49.5945 43.165 49.5815C43.244 49.5685 43.3249 49.5713 43.4028 49.5899L46.3217 50.0328L46.2611 50.4308C46.2175 50.5821 46.12 50.7123 45.9871 50.7967C45.8541 50.8811 45.6949 50.914 45.5394 50.8892ZM48.6364 52.9752L48.2902 54.7031L47.794 54.6038C47.7092 54.5898 47.6281 54.5585 47.5558 54.512C47.4835 54.4655 47.4214 54.4048 47.3734 54.3334C47.3254 54.2621 47.2924 54.1817 47.2766 54.0972C47.2608 54.0127 47.2623 53.9258 47.2813 53.842L47.5015 52.7418C47.0799 51.911 46.803 51.0144 46.6827 50.0905L47.2569 50.2055C47.3946 50.2208 47.5252 50.2748 47.6333 50.3615C47.7415 50.4481 47.8228 50.5637 47.8678 50.6947C47.9747 51.137 48.1191 51.5694 48.2992 51.9873C48.7244 51.5899 49.0902 51.1333 49.3853 50.6316L49.9236 50.7391C50.0307 50.7517 50.1284 50.8063 50.1954 50.8908C50.2624 50.9753 50.2931 51.083 50.281 51.1901C50.2117 51.5365 49.1065 52.6153 48.6364 52.9752Z"
      fill="currentColor"
    />
    <path
      d="M39.0803 30.0698V28.715H30.3829C30.6809 28.2273 31.5209 27.4416 32.144 26.9539L35.0161 24.705C37.834 22.4832 38.8907 21.2639 38.8907 18.5003C38.8907 15.5198 36.2625 13 32.6859 13C28.0527 13 26.3999 15.1676 26.3999 17.3352V18.6628H26.5354C27.7547 17.01 29.2991 16.2514 32.0086 16.2514C34.0678 16.2514 35.2329 17.3081 35.2329 18.988C35.2329 19.8008 34.9619 20.6679 33.9594 21.4807L29.6242 25.0843C26.7521 27.4687 26.129 28.8234 26.129 30.0427C26.129 31.0723 26.9418 31.8851 27.9985 31.8851H36.5876C38.0778 31.8851 39.0803 31.2349 39.0803 30.0698Z"
      fill="currentColor"
    />
  </svg>
));

export default Svg;