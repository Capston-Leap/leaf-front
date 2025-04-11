import { IconProps } from "@shared/types/icon.ts";

function PolicyIcon({ color }: IconProps) {
  return (
    <svg width='29' height='28' viewBox='0 0 29 28' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <g clipPath='url(#clip0_457_3886)'>
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M3.5 7.75C3.5 6.75544 3.88631 5.80161 4.57394 5.09835C5.26158 4.39509 6.19421 4 7.16667 4H21.8333C22.8058 4 23.7384 4.39509 24.4261 5.09835C25.1137 5.80161 25.5 6.75544 25.5 7.75V20.25C25.5 21.2446 25.1137 22.1984 24.4261 22.9017C23.7384 23.6049 22.8058 24 21.8333 24H7.16667C6.19421 24 5.26158 23.6049 4.57394 22.9017C3.88631 22.1984 3.5 21.2446 3.5 20.25V7.75ZM8.02539 11.6667C8.02539 12.4555 8.33875 13.212 8.89654 13.7698C9.45432 14.3276 10.2108 14.641 10.9997 14.641C11.7885 14.641 12.545 14.3276 13.1028 13.7698C13.6606 13.212 13.974 12.4555 13.974 11.6667C13.974 10.8778 13.6606 10.1213 13.1028 9.56353C12.545 9.00574 11.7885 8.69238 10.9997 8.69238C10.2108 8.69238 9.45432 9.00574 8.89654 9.56353C8.33875 10.1213 8.02539 10.8778 8.02539 11.6667ZM18 8.33301C17.4477 8.33301 17 8.78072 17 9.33301C17 9.88529 17.4477 10.333 18 10.333H20.3333C20.8856 10.333 21.3333 9.88529 21.3333 9.33301C21.3333 8.78072 20.8856 8.33301 20.3333 8.33301H18ZM17 14C17 13.4477 17.4477 13 18 13H20.3333C20.8856 13 21.3333 13.4477 21.3333 14C21.3333 14.5523 20.8856 15 20.3333 15H18C17.4477 15 17 14.5523 17 14ZM8.6665 17.667C8.11422 17.667 7.6665 18.1147 7.6665 18.667C7.6665 19.2193 8.11422 19.667 8.6665 19.667H20.3332C20.8855 19.667 21.3332 19.2193 21.3332 18.667C21.3332 18.1147 20.8855 17.667 20.3332 17.667H8.6665Z'
          fill={color}
        />
      </g>
      <defs>
        <clipPath id='clip0_457_3886'>
          <rect width='28' height='28' fill='white' transform='translate(0.5)' />
        </clipPath>
      </defs>
    </svg>
  );
}

export default PolicyIcon;
