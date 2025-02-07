import React from 'react'

interface PropInterface {
    color1: string;
    color2: string;
    size: string;
}

function LogoIcon({ color1, color2, size }: PropInterface) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 5.74001C22 7.44001 21.16 9.04 19.72 9.94C18.42 10.76 16.54 11.59 14 11.88V5.74001C14 3.68001 15.68 2 17.74 2H18.26C20.32 2 22 3.68001 22 5.74001Z" stroke={color1} strokeWidth="1.5" strokeMiterlimit="10"/>
      <path d="M22 8V18.26C22 20.32 20.32 22 18.26 22H17.74C15.68 22 14 20.32 14 18.26V11.88C19.58 11.23 22 8 22 8Z" stroke={color2} strokeWidth="1.5" strokeMiterlimit="10"/>
      <path d="M2 18.2601C2 16.5601 2.84003 14.9601 4.28003 14.0601C5.58003 13.2401 7.46 12.4101 10 12.1201V18.2601C10 20.3201 8.32001 22.0001 6.26001 22.0001H5.73999C3.67999 22.0001 2 20.3201 2 18.2601Z" stroke={color2} strokeWidth="1.5" strokeMiterlimit="10"/>
      <path d="M2 5.74001C2 3.68001 3.67999 2 5.73999 2H6.26001C8.32001 2 10 3.68001 10 5.74001V12.12C4.42 12.77 2 16 2 16V9.67999" stroke={color1} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M10 12.0999C10.63 12.0399 11.29 11.9999 12 11.9999C12.71 11.9999 13.37 11.9599 14 11.8799" stroke={color2} strokeWidth="1.5" strokeMiterlimit="10"/>
      <path d="M2 18V15.23" stroke={color2} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export default LogoIcon;
